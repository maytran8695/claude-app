import { useCallback, useEffect, useRef, useState } from "react";
import {
  findQuoteOffsets,
  findSectionLabel,
  getContainerText,
  getTextOffsets,
  rangeFromOffsets,
  tryExpandSection,
  unwrapMark,
  wrapRangeInMarks,
} from "./textRangeUtils";
import { authedFetch, silentAuthedFetch } from "./notesAuth";

// Tailwind utilities applied directly to the injected <mark> — visually
// distinct (indigo, dotted underline) from this app's existing curated
// critique highlights (which use red/amber solid marks), so a user never
// confuses "my personal note" with "author's pre-written critique".
const HIGHLIGHT_CLASS =
  "bg-indigo-100 text-inherit rounded-sm cursor-pointer border-b-2 border-dotted border-indigo-400 hover:bg-indigo-200 transition-colors";
const CONTEXT_LEN = 40;

// Attaches a personal-note highlighting layer to `containerRef`'s rendered
// text, scoped to `articleId`. Notes are fetched from / persisted to
// /api/notes (Cloudflare Pages Function + D1). Does nothing (no fetch, no
// DOM listeners, no highlighting) when `enabled` is false, so it's safe to
// mount unconditionally and gate activation per-article.
export function useTextAnnotations(articleId, containerRef, { enabled = true, refreshSignal } = {}) {
  const [notes, setNotes] = useState([]);
  const [unlocated, setUnlocated] = useState([]);
  const [loading, setLoading] = useState(false);
  // true once a read has come back 401 — i.e. nobody has entered the
  // correct password in this browser tab yet, so notes exist but are
  // hidden. Distinct from "notes.length === 0" (genuinely no notes yet).
  const [locked, setLocked] = useState(false);
  const [pendingSelection, setPendingSelection] = useState(null);
  const [openNote, setOpenNote] = useState(null);
  const marksRef = useRef(new Map());

  // Automatic/background load — never prompts for a password (see
  // silentAuthedFetch), so simply opening/switching articles never
  // interrupts reading with a dialog. Uses whatever secret (if any) is
  // already cached from an earlier explicit unlock this session.
  const fetchNotes = useCallback(async () => {
    if (!enabled || !articleId) return;
    setLoading(true);
    try {
      const res = await silentAuthedFetch(`/api/notes?article=${encodeURIComponent(articleId)}`);
      if (res.status === 401) {
        setLocked(true);
        setNotes([]);
        return;
      }
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = await res.json();
      setLocked(false);
      setNotes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn("[annotations] could not load notes, treating as empty:", err);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  }, [articleId, enabled]);

  // Explicit, user-initiated unlock — prompts for the password if not
  // already cached (via authedFetch), then loads. Wire this to whatever UI
  // action first reveals notes (e.g. clicking the notes-panel toggle) so
  // the one-time prompt only appears when the user actually wants to see
  // notes, not on every article switch.
  const unlockNotes = useCallback(async () => {
    if (!enabled || !articleId) return { ok: false };
    setLoading(true);
    try {
      const res = await authedFetch(`/api/notes?article=${encodeURIComponent(articleId)}`);
      if (res.status === 401) setLocked(true);
      if (!res.ok) return { ok: false, message: "(Không có quyền ghi chú)" };
      const data = await res.json();
      setLocked(false);
      setNotes(Array.isArray(data) ? data : []);
      return { ok: true };
    } catch (err) {
      return { ok: false, message: "Không kết nối được server: " + err.message };
    } finally {
      setLoading(false);
    }
  }, [articleId, enabled]);

  // reset + (re)load whenever the active article changes
  useEffect(() => {
    setNotes([]);
    setUnlocated([]);
    setPendingSelection(null);
    setOpenNote(null);
    fetchNotes();
  }, [fetchNotes]);

  // Re-sync when notified of a change made elsewhere — specifically, the
  // global "all notes" modal has its own independent fetch/state (it lists
  // every article, not just this one), so deleting a note there wouldn't
  // otherwise update this article's panel/highlights if it happened to be
  // the currently-active one. App.jsx bumps `refreshSignal` after any
  // modal delete; this only re-fetches on actual signal changes; skip the
  // very first render since the article-change effect above already loads.
  const isFirstRefreshSignal = useRef(true);
  useEffect(() => {
    if (refreshSignal === undefined) return;
    if (isFirstRefreshSignal.current) {
      isFirstRefreshSignal.current = false;
      return;
    }
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshSignal]);

  const attachMarkClick = useCallback((mark, note) => {
    mark.addEventListener("click", (e) => {
      e.stopPropagation();
      setOpenNote({ note, rect: mark.getBoundingClientRect() });
    });
  }, []);

  // (re)apply highlights to the DOM whenever the note list changes
  useEffect(() => {
    if (!enabled) return;
    const container = containerRef.current;
    if (!container) return;

    for (const marks of marksRef.current.values()) {
      for (const m of marks) unwrapMark(m);
    }
    marksRef.current = new Map();

    const stillUnlocated = [];
    for (const note of notes) {
      const found = findQuoteOffsets(container, note.quote, note.prefix, note.suffix);
      const range = found ? rangeFromOffsets(container, found.start, found.end) : null;
      if (!range) {
        stillUnlocated.push(note);
        continue;
      }
      const marks = wrapRangeInMarks(range, HIGHLIGHT_CLASS, { "data-note-id": note.id });
      marks.forEach((m) => attachMarkClick(m, note));
      marksRef.current.set(note.id, marks);
    }
    setUnlocated(stillUnlocated);
  }, [notes, enabled, containerRef, attachMarkClick]);

  // Some articles conditionally render collapsed sections (e.g. accordions)
  // — their text may not exist in the DOM yet when notes first load, so a
  // note ends up "unlocated" through no fault of its own. Re-attempt only
  // the still-unlocated notes whenever the container's DOM changes later
  // (e.g. a section gets expanded). Deliberately scoped to `unlocated`
  // only (never re-touches already-applied marks) so this can't loop on
  // its own mutations once every note is located — once `unlocated` is
  // empty the observer stops attaching entirely.
  useEffect(() => {
    if (!enabled || unlocated.length === 0) return;
    const container = containerRef.current;
    if (!container) return;

    let timer = null;
    const rescan = () => {
      const c = containerRef.current;
      if (!c) return;
      setUnlocated((prev) => {
        const stillUnlocated = [];
        for (const note of prev) {
          const found = findQuoteOffsets(c, note.quote, note.prefix, note.suffix);
          const range = found ? rangeFromOffsets(c, found.start, found.end) : null;
          if (!range) {
            stillUnlocated.push(note);
            continue;
          }
          const marks = wrapRangeInMarks(range, HIGHLIGHT_CLASS, { "data-note-id": note.id });
          marks.forEach((m) => attachMarkClick(m, note));
          marksRef.current.set(note.id, marks);
        }
        return stillUnlocated.length === prev.length ? prev : stillUnlocated;
      });
    };

    const observer = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(rescan, 250);
    });
    observer.observe(container, { childList: true, subtree: true });
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [enabled, unlocated, containerRef, attachMarkClick]);

  // full teardown on unmount
  useEffect(() => {
    return () => {
      for (const marks of marksRef.current.values()) {
        for (const m of marks) unwrapMark(m);
      }
      marksRef.current = new Map();
    };
  }, []);

  // track live text selection inside the container
  useEffect(() => {
    if (!enabled) return;
    const container = containerRef.current;
    if (!container) return;

    function handleSelectionChange() {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) {
        setPendingSelection(null);
        return;
      }
      const range = sel.getRangeAt(0);
      if (!container.contains(range.commonAncestorContainer)) {
        setPendingSelection(null);
        return;
      }
      const text = range.toString().trim();
      if (!text) {
        setPendingSelection(null);
        return;
      }
      setPendingSelection({ range: range.cloneRange(), rect: range.getBoundingClientRect(), text });
    }

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => document.removeEventListener("selectionchange", handleSelectionChange);
  }, [enabled, containerRef]);

  // `selection` is the {range, text} object captured at the moment the
  // user opened the compose popup — passed explicitly rather than reading
  // the hook's own (volatile) pendingSelection, because focusing the
  // comment textarea collapses the browser's live text selection and
  // would otherwise null it out mid-compose.
  // Returns { ok: true } or { ok: false, message } — the message is shown
  // directly in the UI so a misconfigured server (missing/wrong
  // NOTES_WRITE_SECRET, missing D1 binding, etc.) is diagnosable instead of
  // silently re-prompting for a password forever.
  const saveNote = useCallback(
    async (comment, selection) => {
      const container = containerRef.current;
      if (!selection || !container || !comment.trim()) {
        return { ok: false, message: "Thiếu nội dung ghi chú." };
      }
      const { range, text } = selection;
      const { start, end } = getTextOffsets(container, range);
      const fullText = getContainerText(container);
      const prefix = fullText.slice(Math.max(0, start - CONTEXT_LEN), start);
      const suffix = fullText.slice(end, end + CONTEXT_LEN);
      const sectionLabel = findSectionLabel(container, range.startContainer);

      const body = JSON.stringify({
        article_id: articleId,
        quote: text,
        prefix,
        suffix,
        comment: comment.trim(),
        section_label: sectionLabel,
      });

      try {
        const res = await authedFetch("/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        });
        if (!res.ok) {
          return { ok: false, message: "(Không có quyền ghi chú)" };
        }
        await res.json();
        // Re-sync from the server (rather than just appending the new
        // note) so that if this was the first notes interaction this
        // session (save before ever opening the panel), any pre-existing
        // notes — hidden until now because reads are permission-gated too
        // — get revealed in the same pass, not just the one just created.
        setLocked(false);
        await fetchNotes();
        setPendingSelection(null);
        window.getSelection()?.removeAllRanges();
        return { ok: true };
      } catch (err) {
        console.warn("[annotations] could not save note:", err);
        return { ok: false, message: "Không kết nối được server: " + err.message };
      }
    },
    [containerRef, articleId, fetchNotes]
  );

  const deleteNote = useCallback(async (noteId) => {
    try {
      const res = await authedFetch(`/api/notes/${encodeURIComponent(noteId)}`, { method: "DELETE" });
      if (!res.ok) {
        return { ok: false, message: "(Không có quyền ghi chú)" };
      }
    } catch (err) {
      console.warn("[annotations] could not delete note:", err);
      return { ok: false, message: "Không kết nối được server: " + err.message };
    }
    setLocked(false);
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
    setUnlocated((prev) => prev.filter((n) => n.id !== noteId));
    setOpenNote(null);
    return { ok: true };
  }, []);

  // Click-to-navigate for the notes panel: if the note is already
  // highlighted, just scroll+flash it. Otherwise try to locate it directly
  // (cheap, e.g. the section just happened to already be open), and if
  // that fails too, best-effort auto-expand the accordion/section it was
  // captured under (via section_label) and retry once. Always returns
  // { ok, message? } so the UI can show a clear fallback instead of doing
  // nothing when a note truly can't be found.
  const goToNote = useCallback(
    async (note) => {
      const container = containerRef.current;
      if (!container) return { ok: false, message: "Không tìm thấy nội dung bài." };

      const scrollAndFlash = (markEl) => {
        markEl.scrollIntoView({ behavior: "smooth", block: "center" });
        markEl.classList.add("ring-2", "ring-indigo-500");
        setTimeout(() => markEl.classList.remove("ring-2", "ring-indigo-500"), 1500);
      };

      const attemptLocate = () => {
        // idempotent: the independent "rescan unlocated notes" observer
        // (see the effect above) can race with this same click — e.g. its
        // own debounce fires from the very same "expand section" mutation
        // this function triggers below — and may already have wrapped this
        // note by the time we get here. Re-wrapping would nest a duplicate
        // <mark> inside the one it just created, so check first.
        const already = marksRef.current.get(note.id);
        if (already && already.length > 0 && container.contains(already[0])) return already[0];

        const found = findQuoteOffsets(container, note.quote, note.prefix, note.suffix);
        const range = found ? rangeFromOffsets(container, found.start, found.end) : null;
        if (!range) return null;
        const marks = wrapRangeInMarks(range, HIGHLIGHT_CLASS, { "data-note-id": note.id });
        marks.forEach((m) => attachMarkClick(m, note));
        marksRef.current.set(note.id, marks);
        setUnlocated((prev) => prev.filter((n) => n.id !== note.id));
        return marks[0] || null;
      };

      const existing = marksRef.current.get(note.id);
      if (existing && existing.length > 0 && container.contains(existing[0])) {
        scrollAndFlash(existing[0]);
        return { ok: true };
      }

      let mark = attemptLocate();
      if (mark) {
        scrollAndFlash(mark);
        return { ok: true };
      }

      const expanded = tryExpandSection(container, note.section_label);
      if (!expanded) {
        return {
          ok: false,
          message: note.section_label
            ? `Không tự mở được — thử tìm mục "${note.section_label}" trong bài rồi bấm lại.`
            : "Không tìm thấy vị trí — nội dung bài có thể đã đổi, hoặc mục chứa đoạn này đang thu gọn.",
        };
      }

      await new Promise((resolve) => setTimeout(resolve, 300));
      mark = attemptLocate();
      if (mark) {
        scrollAndFlash(mark);
        return { ok: true };
      }
      return {
        ok: false,
        message: note.section_label
          ? `Đã mở "${note.section_label}" nhưng vẫn chưa thấy — thử tìm thủ công.`
          : "Vẫn chưa định vị được, thử tìm thủ công.",
      };
    },
    [containerRef, attachMarkClick]
  );

  const dismissPendingSelection = useCallback(() => {
    setPendingSelection(null);
    window.getSelection()?.removeAllRanges();
  }, []);

  const closeOpenNote = useCallback(() => setOpenNote(null), []);

  return {
    loading,
    locked,
    notes,
    unlocated,
    pendingSelection,
    openNote,
    saveNote,
    deleteNote,
    goToNote,
    unlockNotes,
    dismissPendingSelection,
    closeOpenNote,
  };
}

import { useCallback, useEffect, useRef, useState } from "react";
import {
  findQuoteOffsets,
  getContainerText,
  getTextOffsets,
  rangeFromOffsets,
  unwrapMark,
  wrapRangeInMarks,
} from "./textRangeUtils";

// Tailwind utilities applied directly to the injected <mark> — visually
// distinct (indigo, dotted underline) from this app's existing curated
// critique highlights (which use red/amber solid marks), so a user never
// confuses "my personal note" with "author's pre-written critique".
const HIGHLIGHT_CLASS =
  "bg-indigo-100 text-inherit rounded-sm cursor-pointer border-b-2 border-dotted border-indigo-400 hover:bg-indigo-200 transition-colors";
const CONTEXT_LEN = 40;

// Write-protection for POST/DELETE: the user types a password once per
// browser tab (never embedded in the built JS, unlike a hardcoded key),
// cached in sessionStorage for the rest of the session, sent as the
// X-Notes-Secret header. The Function checks it against NOTES_WRITE_SECRET.
const SECRET_STORAGE_KEY = "study_hub_notes_secret";

function getOrPromptSecret() {
  let secret = sessionStorage.getItem(SECRET_STORAGE_KEY);
  if (secret) return secret;
  secret = window.prompt("Nhập mật khẩu để lưu/xoá ghi chú:") || "";
  if (secret) sessionStorage.setItem(SECRET_STORAGE_KEY, secret);
  return secret;
}

function clearStoredSecret() {
  sessionStorage.removeItem(SECRET_STORAGE_KEY);
}

// Attaches a personal-note highlighting layer to `containerRef`'s rendered
// text, scoped to `articleId`. Notes are fetched from / persisted to
// /api/notes (Cloudflare Pages Function + D1). Does nothing (no fetch, no
// DOM listeners, no highlighting) when `enabled` is false, so it's safe to
// mount unconditionally and gate activation per-article.
export function useTextAnnotations(articleId, containerRef, { enabled = true } = {}) {
  const [notes, setNotes] = useState([]);
  const [unlocated, setUnlocated] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pendingSelection, setPendingSelection] = useState(null);
  const [openNote, setOpenNote] = useState(null);
  const marksRef = useRef(new Map());

  const fetchNotes = useCallback(async () => {
    if (!enabled || !articleId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/notes?article=${encodeURIComponent(articleId)}`);
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = await res.json();
      setNotes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.warn("[annotations] could not load notes, treating as empty:", err);
      setNotes([]);
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
  const saveNote = useCallback(
    async (comment, selection) => {
      const container = containerRef.current;
      if (!selection || !container || !comment.trim()) return false;
      const { range, text } = selection;
      const { start, end } = getTextOffsets(container, range);
      const fullText = getContainerText(container);
      const prefix = fullText.slice(Math.max(0, start - CONTEXT_LEN), start);
      const suffix = fullText.slice(end, end + CONTEXT_LEN);

      const body = JSON.stringify({ article_id: articleId, quote: text, prefix, suffix, comment: comment.trim() });
      const doPost = (secret) =>
        fetch("/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Notes-Secret": secret },
          body,
        });

      try {
        let res = await doPost(getOrPromptSecret());
        if (res.status === 401) {
          clearStoredSecret();
          res = await doPost(getOrPromptSecret());
        }
        if (!res.ok) throw new Error(`status ${res.status}`);
        const saved = await res.json();
        setNotes((prev) => [...prev, saved]);
        setPendingSelection(null);
        window.getSelection()?.removeAllRanges();
        return true;
      } catch (err) {
        console.warn("[annotations] could not save note:", err);
        return false;
      }
    },
    [containerRef, articleId]
  );

  const deleteNote = useCallback(async (noteId) => {
    const doDelete = (secret) =>
      fetch(`/api/notes/${encodeURIComponent(noteId)}`, {
        method: "DELETE",
        headers: { "X-Notes-Secret": secret },
      });

    try {
      let res = await doDelete(getOrPromptSecret());
      if (res.status === 401) {
        clearStoredSecret();
        res = await doDelete(getOrPromptSecret());
      }
      if (!res.ok) throw new Error(`status ${res.status}`);
    } catch (err) {
      console.warn("[annotations] could not delete note:", err);
      return false;
    }
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
    setUnlocated((prev) => prev.filter((n) => n.id !== noteId));
    setOpenNote(null);
    return true;
  }, []);

  const dismissPendingSelection = useCallback(() => {
    setPendingSelection(null);
    window.getSelection()?.removeAllRanges();
  }, []);

  const closeOpenNote = useCallback(() => setOpenNote(null), []);

  return {
    loading,
    notes,
    unlocated,
    pendingSelection,
    openNote,
    saveNote,
    deleteNote,
    dismissPendingSelection,
    closeOpenNote,
  };
}

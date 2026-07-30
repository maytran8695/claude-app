import { useEffect, useRef, useState } from "react";
import { useTextAnnotations } from "../hooks/useTextAnnotations";

// Renders the interactive chrome (floating "+ note" trigger, compose
// popup, view/delete popup, notes panel) for the personal annotation
// feature. Mount unconditionally next to an article's content container;
// pass enabled={false} to fully no-op (used to pilot-scope the feature to
// one article at a time).
//
// `jumpToNote` (optional): a full note object handed down from the global
// "all notes" modal after switching to this article — this component will
// attempt to locate/expand/scroll to it as soon as the article's content
// has actually rendered (retrying a few times, since a lazy-loaded article
// chunk can take a moment to mount right after switching tabs), then call
// `onJumpHandled` so the caller can clear the pending jump.
export default function TextAnnotationLayer({ articleId, containerRef, enabled, jumpToNote, onJumpHandled, refreshSignal, scrollIdle }) {
  const {
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
    closeOpenNote,
  } = useTextAnnotations(articleId, containerRef, { enabled, refreshSignal });

  const [composing, setComposing] = useState(null);
  const [draft, setDraft] = useState("");
  const [composeError, setComposeError] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelError, setPanelError] = useState("");
  const [navigatingId, setNavigatingId] = useState(null);
  const composeRef = useRef(null);
  const noteRef = useRef(null);

  useEffect(() => {
    if (!jumpToNote || !enabled) return;
    let cancelled = false;
    (async () => {
      const delays = [0, 400, 900, 1600];
      for (const d of delays) {
        if (d) await new Promise((r) => setTimeout(r, d));
        if (cancelled) return;
        const result = await goToNote(jumpToNote);
        if (result.ok) break;
      }
      if (!cancelled) onJumpHandled?.();
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jumpToNote, enabled]);

  useEffect(() => {
    if (!openNote) return;
    function onDown(e) {
      if (noteRef.current && !noteRef.current.contains(e.target)) closeOpenNote();
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [openNote, closeOpenNote]);

  useEffect(() => {
    if (!composing) return;
    function onDown(e) {
      if (composeRef.current && !composeRef.current.contains(e.target)) {
        setComposing(null);
        setDraft("");
        setComposeError("");
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [composing]);

  if (!enabled) return null;

  // Only prompts for the password on the first explicit notes interaction
  // in this browser tab (via unlockNotes -> authedFetch); once entered, it
  // stays cached for the rest of the session so switching articles or
  // reopening the panel afterwards never asks again.
  async function handleTogglePanel() {
    if (locked) {
      setPanelError("");
      const result = await unlockNotes();
      if (!result.ok) {
        setPanelError(result.message || "Không mở khoá được ghi chú.");
        setPanelOpen(true);
        return;
      }
    }
    setPanelOpen((v) => !v);
  }

  async function handleSave() {
    if (!composing || !draft.trim()) return;
    setComposeError("");
    const result = await saveNote(draft, composing);
    if (result.ok) {
      setComposing(null);
      setDraft("");
    } else {
      setComposeError(result.message || "Không lưu được, thử lại.");
    }
  }

  async function handleDelete(noteId) {
    setPanelError("");
    const result = await deleteNote(noteId);
    if (!result.ok) setPanelError(result.message || "Không xoá được, thử lại.");
  }

  async function handleGoTo(note) {
    setPanelError("");
    setNavigatingId(note.id);
    const result = await goToNote(note);
    setNavigatingId(null);
    if (result.ok) {
      setPanelOpen(false);
    } else {
      setPanelError(result.message || "Không tìm được vị trí, thử lại.");
    }
  }

  const clampLeft = (x, w) => Math.min(window.innerWidth - w - 8, Math.max(8, x));
  const clampTop = (y, h) => Math.min(window.innerHeight - h - 8, Math.max(8, y));

  // Popover positioning: `top` is clamped using a rough height *estimate*
  // (so it doesn't naively hang off the bottom edge), but real content can
  // still end up taller than that estimate (long quote, long comment) —
  // that previously pushed the Save button below the viewport with no way
  // to reach it. Fixing it properly means not trusting the estimate for
  // *sizing*: maxHeight is derived from the actual chosen `top`, so the box
  // can never extend past the viewport regardless of content length; it
  // scrolls internally instead.
  const popupStyle = (rect, estHeight, width) => {
    const top = clampTop(rect.bottom + 8, estHeight);
    return {
      position: "fixed",
      top,
      left: clampLeft(rect.left, width),
      maxHeight: `calc(100vh - ${top + 8}px)`,
      overflowY: "auto",
      zIndex: 300,
    };
  };

  return (
    <>
      {pendingSelection && !composing && (
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            setComposing(pendingSelection);
            setDraft("");
            setComposeError("");
          }}
          style={{
            position: "fixed",
            top: clampTop(pendingSelection.rect.top - 38, 32),
            left: clampLeft(pendingSelection.rect.left, 110),
            zIndex: 300,
          }}
          className="flex items-center gap-1.5 rounded-full bg-indigo-600 text-white text-xs font-semibold px-3 py-1.5 shadow-lg hover:bg-indigo-700"
        >
          ✎ Ghi chú
        </button>
      )}

      {composing && (
        <div
          ref={composeRef}
          style={popupStyle(composing.rect, 150, 288)}
          className="w-72 rounded-xl border border-slate-200 bg-white shadow-xl p-3"
        >
          <div className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wide mb-1">
            Ghi chú của bạn
          </div>
          <div className="text-[12px] text-slate-500 italic mb-2 line-clamp-2">"{composing.text}"</div>
          <textarea
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Viết ghi chú..."
            rows={3}
            className="w-full text-sm border border-slate-200 rounded-lg p-2 outline-none focus:border-indigo-400 resize-none"
          />
          {composeError && <div className="text-[11px] text-red-600 mt-1.5">{composeError}</div>}
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => {
                setComposing(null);
                setDraft("");
                setComposeError("");
              }}
              className="text-xs px-2.5 py-1 rounded-lg text-slate-500 hover:bg-slate-100"
            >
              Huỷ
            </button>
            <button
              onClick={handleSave}
              disabled={!draft.trim()}
              className="text-xs px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-40"
            >
              Lưu
            </button>
          </div>
        </div>
      )}

      {openNote && (
        <div
          ref={noteRef}
          style={popupStyle(openNote.rect, 140, 288)}
          className="w-72 rounded-xl border border-indigo-200 bg-indigo-50 shadow-xl p-3"
        >
          <div className="text-[11px] font-semibold text-indigo-700 uppercase tracking-wide mb-1">
            Ghi chú của bạn
          </div>
          <div className="text-sm text-slate-700 whitespace-pre-wrap">{openNote.note.comment}</div>
          {panelError && <div className="text-[11px] text-red-600 mt-1.5">{panelError}</div>}
          <div className="flex justify-end mt-2">
            <button
              onClick={() => handleDelete(openNote.note.id)}
              className="text-xs px-2.5 py-1 rounded-lg text-red-600 hover:bg-red-100 font-semibold"
            >
              Xoá
            </button>
          </div>
        </div>
      )}

      {/* Góc dưới-phải, CÙNG hàng với cụm "Về đầu trang/Xuống cuối trang"
          (App.jsx) nhưng lệch sang trái đủ xa để không bao giờ đè lên
          nhau dù cụm đó có 1 hay 2 nút. Mờ dần khi không cuộn, giống hệt
          hành vi của cụm nút kia (qua prop scrollIdle từ App.jsx). */}
      <button
        onClick={handleTogglePanel}
        className={`fixed bottom-6 right-24 md:bottom-8 md:right-28 z-290 flex items-center gap-1.5 rounded-full bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 shadow-lg hover:bg-slate-700 transition-opacity duration-300 ${scrollIdle ? "opacity-40 hover:opacity-100 focus-within:opacity-100" : "opacity-100"}`}
        title={locked ? "Cần mật khẩu để xem ghi chú" : undefined}
      >
        {locked ? "🔒" : "📝"} {locked ? "" : loading ? "…" : notes.length}
        {!locked && unlocated.length > 0 && <span className="text-amber-300">⚠{unlocated.length}</span>}
      </button>

      {panelOpen && (
        <div
          style={{ maxHeight: "calc(100vh - 116px)" }}
          className="fixed bottom-20 right-24 md:bottom-24 md:right-28 z-290 w-80 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl p-3"
        >
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-2">
            {notes.length} ghi chú trong bài này
          </div>
          {panelError && <div className="text-[11px] text-red-600 mb-2">{panelError}</div>}
          {notes.length === 0 && (
            <div className="text-xs text-slate-400 italic">
              Chưa có ghi chú nào. Bôi đen 1 đoạn text để thêm.
            </div>
          )}
          <ul className="space-y-2">
            {notes.map((n) => {
              const isUnlocated = unlocated.some((u) => u.id === n.id);
              return (
                <li
                  key={n.id}
                  onClick={() => handleGoTo(n)}
                  title="Bấm để tới đúng vị trí trong bài"
                  className={
                    "rounded-lg border p-2 text-xs cursor-pointer hover:brightness-95 " +
                    (isUnlocated ? "border-amber-300 bg-amber-50" : "border-slate-100 bg-slate-50")
                  }
                >
                  <div className="text-slate-400 italic line-clamp-1 mb-1">"{n.quote}"</div>
                  <div className="text-slate-700 whitespace-pre-wrap">{n.comment}</div>
                  {isUnlocated && (
                    <div className="text-amber-600 mt-1">
                      {navigatingId === n.id
                        ? "Đang tìm vị trí…"
                        : n.section_label
                          ? `⚠ có thể trong mục "${n.section_label}" — bấm để tự mở & tới đó`
                          : "⚠ không tìm thấy vị trí trong bài — bấm để thử tìm lại"}
                    </div>
                  )}
                  <div className="flex justify-end mt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(n.id);
                      }}
                      className="text-red-600 hover:underline"
                    >
                      Xoá
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

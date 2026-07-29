import { useEffect, useRef, useState } from "react";
import { useTextAnnotations } from "../hooks/useTextAnnotations";

// Renders the interactive chrome (floating "+ note" trigger, compose
// popup, view/delete popup, notes panel) for the personal annotation
// feature. Mount unconditionally next to an article's content container;
// pass enabled={false} to fully no-op (used to pilot-scope the feature to
// one article at a time).
export default function TextAnnotationLayer({ articleId, containerRef, enabled }) {
  const {
    loading,
    notes,
    unlocated,
    pendingSelection,
    openNote,
    saveNote,
    deleteNote,
    closeOpenNote,
  } = useTextAnnotations(articleId, containerRef, { enabled });

  const [composing, setComposing] = useState(null);
  const [draft, setDraft] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const composeRef = useRef(null);
  const noteRef = useRef(null);

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
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [composing]);

  if (!enabled) return null;

  async function handleSave() {
    if (!composing || !draft.trim()) return;
    const ok = await saveNote(draft, composing);
    if (ok) {
      setComposing(null);
      setDraft("");
    }
  }

  const clampLeft = (x, w) => Math.min(window.innerWidth - w - 8, Math.max(8, x));
  const clampTop = (y, h) => Math.min(window.innerHeight - h - 8, Math.max(8, y));

  return (
    <>
      {pendingSelection && !composing && (
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            setComposing(pendingSelection);
            setDraft("");
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
          style={{
            position: "fixed",
            top: clampTop(composing.rect.bottom + 8, 150),
            left: clampLeft(composing.rect.left, 288),
            zIndex: 300,
          }}
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
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => {
                setComposing(null);
                setDraft("");
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
          style={{
            position: "fixed",
            top: clampTop(openNote.rect.bottom + 8, 140),
            left: clampLeft(openNote.rect.left, 288),
            zIndex: 300,
          }}
          className="w-72 rounded-xl border border-indigo-200 bg-indigo-50 shadow-xl p-3"
        >
          <div className="text-[11px] font-semibold text-indigo-700 uppercase tracking-wide mb-1">
            Ghi chú của bạn
          </div>
          <div className="text-sm text-slate-700 whitespace-pre-wrap">{openNote.note.comment}</div>
          <div className="flex justify-end mt-2">
            <button
              onClick={() => deleteNote(openNote.note.id)}
              className="text-xs px-2.5 py-1 rounded-lg text-red-600 hover:bg-red-100 font-semibold"
            >
              Xoá
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setPanelOpen((v) => !v)}
        style={{ position: "fixed", right: 18, bottom: 18, zIndex: 290 }}
        className="flex items-center gap-1.5 rounded-full bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 shadow-lg hover:bg-slate-700"
      >
        📝 {loading ? "…" : notes.length}
        {unlocated.length > 0 && <span className="text-amber-300">⚠{unlocated.length}</span>}
      </button>

      {panelOpen && (
        <div
          style={{ position: "fixed", right: 18, bottom: 64, zIndex: 290, maxHeight: "60vh" }}
          className="w-80 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl p-3"
        >
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-2">
            {notes.length} ghi chú trong bài này
          </div>
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
                  className={
                    "rounded-lg border p-2 text-xs " +
                    (isUnlocated ? "border-amber-300 bg-amber-50" : "border-slate-100 bg-slate-50")
                  }
                >
                  <div className="text-slate-400 italic line-clamp-1 mb-1">"{n.quote}"</div>
                  <div className="text-slate-700 whitespace-pre-wrap">{n.comment}</div>
                  {isUnlocated && (
                    <div className="text-amber-600 mt-1">
                      ⚠ không tìm thấy vị trí trong bài (nội dung có thể đã đổi)
                    </div>
                  )}
                  <div className="flex justify-end mt-1">
                    <button onClick={() => deleteNote(n.id)} className="text-red-600 hover:underline">
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

import { useEffect, useState } from "react";
import { authedFetch } from "../hooks/notesAuth";

// Global "review all my notes" view — a table of every personal note
// across every article, opened from a fixed top-right button in App.jsx
// (separate from the per-article floating panel, which only shows notes
// for the article currently open). Clicking a row asks the parent to
// switch to that article and scroll/highlight the note there.
export default function AllNotesModal({ open, onClose, articleMeta, onJumpToNote }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setError("");
    // Opening this modal is an explicit user action, so prompting for the
    // password here (if not already cached this session) is appropriate —
    // unlike the per-article panel's automatic background load.
    authedFetch("/api/notes")
      .then((res) => {
        if (res.status === 401) throw new Error("unauthorized");
        if (!res.ok) throw new Error(`status ${res.status}`);
        return res.json();
      })
      .then((data) => setNotes(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.warn("[annotations] could not load all notes:", err);
        setError(
          err.message === "unauthorized"
            ? "Sai mật khẩu, hoặc server chưa có biến NOTES_WRITE_SECRET."
            : "Không tải được danh sách ghi chú."
        );
        setNotes([]);
      })
      .finally(() => setLoading(false));
  }, [open]);

  async function handleDelete(noteId) {
    setError("");
    try {
      const res = await authedFetch(`/api/notes/${encodeURIComponent(noteId)}`, { method: "DELETE" });
      if (res.status === 401) {
        setError("Sai mật khẩu, hoặc server chưa có biến NOTES_WRITE_SECRET.");
        return;
      }
      if (!res.ok) {
        setError(`Lỗi server (${res.status})`);
        return;
      }
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
    } catch (err) {
      setError("Không kết nối được server: " + err.message);
    }
  }

  if (!open) return null;

  const formatDate = (iso) => {
    try {
      return new Date(iso.replace(" ", "T") + "Z").toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  return (
    <div
      className="fixed inset-0 z-[400] flex items-start justify-center bg-black/40 p-4 sm:p-8 overflow-y-auto"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl mt-4 sm:mt-8 flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 shrink-0">
          <div>
            <div className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wide">Tất cả ghi chú</div>
            <div className="text-sm text-slate-500">{loading ? "Đang tải…" : `${notes.length} ghi chú trên toàn bộ app`}</div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100"
            aria-label="Đóng"
          >
            ✕
          </button>
        </div>

        {error && <div className="mx-5 mt-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}

        <div className="overflow-auto flex-1">
          {notes.length === 0 && !loading ? (
            <div className="p-8 text-center text-sm text-slate-400 italic">Chưa có ghi chú nào. Bôi đen 1 đoạn text trong bất kỳ bài nào để bắt đầu.</div>
          ) : (
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-slate-50 border-b border-slate-200">
                <tr className="text-left text-slate-500 uppercase tracking-wide text-[10px]">
                  <th className="px-4 py-2 font-semibold">Bài viết</th>
                  <th className="px-4 py-2 font-semibold">Mục</th>
                  <th className="px-4 py-2 font-semibold">Trích dẫn</th>
                  <th className="px-4 py-2 font-semibold">Ghi chú</th>
                  <th className="px-4 py-2 font-semibold">Ngày</th>
                  <th className="px-4 py-2 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {notes.map((n) => {
                  const meta = articleMeta[n.article_id];
                  return (
                    <tr
                      key={n.id}
                      onClick={() => onJumpToNote(n)}
                      className="border-b border-slate-100 hover:bg-indigo-50 cursor-pointer align-top"
                      title="Bấm để tới đúng vị trí trong bài"
                    >
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <div className="font-semibold text-slate-700">{meta?.title || n.article_id}</div>
                        <div className="text-slate-400">{meta?.category || ""}</div>
                      </td>
                      <td className="px-4 py-2.5 text-slate-500 max-w-[140px]">
                        {n.section_label ? <span className="line-clamp-2">{n.section_label}</span> : "—"}
                      </td>
                      <td className="px-4 py-2.5 text-slate-500 italic max-w-[220px]">
                        <span className="line-clamp-2">"{n.quote}"</span>
                      </td>
                      <td className="px-4 py-2.5 text-slate-700 max-w-[220px]">
                        <span className="line-clamp-3 whitespace-pre-wrap">{n.comment}</span>
                      </td>
                      <td className="px-4 py-2.5 text-slate-400 whitespace-nowrap">{formatDate(n.created_at)}</td>
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(n.id);
                          }}
                          className="text-red-600 hover:underline"
                        >
                          Xoá
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

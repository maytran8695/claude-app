import { useCallback, useEffect, useState } from "react";
import { authedFetch, silentAuthedFetch, getOrPromptName } from "./notesAuth";

// Reply threads attached to an article's pre-written critique annotations
// (fixed ids like "ann-...", not reader-selected text — see
// useTextAnnotations.js for that). Persisted to /api/annotation-replies
// (Cloudflare Pages Function + D1), gated by the same shared secret as the
// personal-notes feature (see notesAuth.js).
export function useAnnotationReplies(articleId) {
  const [repliesByAnnotation, setRepliesByAnnotation] = useState({});
  const [loading, setLoading] = useState(false);
  const [locked, setLocked] = useState(false);

  // Automatic/background load — never prompts for a password, so opening an
  // article never interrupts reading with a dialog. Uses whatever secret (if
  // any) is already cached from an earlier explicit unlock this session.
  const fetchReplies = useCallback(async () => {
    if (!articleId) return;
    setLoading(true);
    try {
      const res = await silentAuthedFetch(`/api/annotation-replies?article=${encodeURIComponent(articleId)}`);
      if (res.status === 401) {
        setLocked(true);
        setRepliesByAnnotation({});
        return;
      }
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = await res.json();
      setLocked(false);
      const grouped = {};
      (Array.isArray(data) ? data : []).forEach((r) => {
        if (!grouped[r.annotation_id]) grouped[r.annotation_id] = [];
        grouped[r.annotation_id].push(r);
      });
      setRepliesByAnnotation(grouped);
    } catch (err) {
      console.warn("[annotation-replies] could not load, treating as empty:", err);
      setRepliesByAnnotation({});
    } finally {
      setLoading(false);
    }
  }, [articleId]);

  useEffect(() => {
    setRepliesByAnnotation({});
    fetchReplies();
  }, [fetchReplies]);

  // Each of these is user-initiated (typed after clicking a button), so they
  // use authedFetch — prompts for the password if not already cached, and
  // re-syncs the full list afterward so a first-ever write also reveals any
  // pre-existing replies that were hidden until now (reads are gated too).
  const addReply = useCallback(
    async (annotationId, text) => {
      const trimmed = text.trim();
      if (!trimmed) return { ok: false, message: "Thiếu nội dung." };
      try {
        const author = getOrPromptName();
        const res = await authedFetch("/api/annotation-replies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ annotation_id: annotationId, article_id: articleId, text: trimmed, author }),
        });
        if (!res.ok) {
          return { ok: false, message: "(Không có quyền bình luận)" };
        }
        await fetchReplies();
        return { ok: true };
      } catch (err) {
        return { ok: false, message: "Không kết nối được server: " + err.message };
      }
    },
    [articleId, fetchReplies]
  );

  const editReply = useCallback(
    async (annotationId, replyId, text) => {
      const trimmed = text.trim();
      if (!trimmed) return { ok: false, message: "Thiếu nội dung." };
      try {
        const res = await authedFetch(`/api/annotation-replies/${encodeURIComponent(replyId)}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: trimmed }),
        });
        if (!res.ok) {
          return { ok: false, message: "(Không có quyền bình luận)" };
        }
        await fetchReplies();
        return { ok: true };
      } catch (err) {
        return { ok: false, message: "Không kết nối được server: " + err.message };
      }
    },
    [fetchReplies]
  );

  const deleteReply = useCallback(async (annotationId, replyId) => {
    try {
      const res = await authedFetch(`/api/annotation-replies/${encodeURIComponent(replyId)}`, { method: "DELETE" });
      if (!res.ok) {
        return { ok: false, message: "(Không có quyền bình luận)" };
      }
      setRepliesByAnnotation((prev) => {
        const next = { ...prev };
        next[annotationId] = (next[annotationId] || []).filter((r) => r.id !== replyId);
        return next;
      });
      return { ok: true };
    } catch (err) {
      return { ok: false, message: "Không kết nối được server: " + err.message };
    }
  }, []);

  return { repliesByAnnotation, loading, locked, addReply, editReply, deleteReply };
}

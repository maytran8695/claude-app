// Cloudflare Pages Function — GET/POST /api/annotation-replies
// Reply threads attached to pre-written critique annotations (fixed,
// author-defined ids like "ann-tiente-0-1" hardcoded in fin_expert_note.jsx /
// fin_foundation.jsx) — not the reader-highlight notes in /api/notes.
// Same shared-secret protection as /api/notes (X-Notes-Secret header checked
// against NOTES_WRITE_SECRET) for both reads and writes.
// GET without ?article= returns replies across every article; GET with
// ?article= scopes to one (used by the per-article reply-thread UI).

function checkSecret(request, env) {
  const provided = request.headers.get("X-Notes-Secret");
  return Boolean(env.NOTES_WRITE_SECRET) && provided === env.NOTES_WRITE_SECRET;
}

export async function onRequestGet({ request, env }) {
  if (!checkSecret(request, env)) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const articleId = url.searchParams.get("article");

  const query = articleId
    ? env.DB.prepare(
        "SELECT id, annotation_id, article_id, text, author, created_at, edited_at FROM annotation_replies WHERE article_id = ? ORDER BY created_at ASC"
      ).bind(articleId)
    : env.DB.prepare(
        "SELECT id, annotation_id, article_id, text, author, created_at, edited_at FROM annotation_replies ORDER BY article_id ASC, created_at ASC"
      );

  const { results } = await query.all();
  return Response.json(results);
}

export async function onRequestPost({ request, env }) {
  if (!checkSecret(request, env)) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body.annotation_id !== "string" || typeof body.article_id !== "string" || typeof body.text !== "string") {
    return Response.json({ error: "invalid body: require annotation_id, article_id, text" }, { status: 400 });
  }
  if (!body.annotation_id.trim() || !body.article_id.trim() || !body.text.trim()) {
    return Response.json({ error: "annotation_id, article_id, text must be non-empty" }, { status: 400 });
  }

  const id = crypto.randomUUID();
  await env.DB.prepare(
    "INSERT INTO annotation_replies (id, annotation_id, article_id, text, author) VALUES (?, ?, ?, ?, ?)"
  )
    .bind(id, body.annotation_id, body.article_id, body.text.trim(), typeof body.author === "string" ? body.author.trim() || null : null)
    .run();

  const { results } = await env.DB.prepare(
    "SELECT id, annotation_id, article_id, text, author, created_at, edited_at FROM annotation_replies WHERE id = ?"
  )
    .bind(id)
    .all();

  return Response.json(results[0], { status: 201 });
}

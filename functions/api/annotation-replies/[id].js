// Cloudflare Pages Function — PATCH/DELETE /api/annotation-replies/:id
// Same shared-secret protection as POST /api/annotation-replies (see index.js).

function checkSecret(request, env) {
  const provided = request.headers.get("X-Notes-Secret");
  return Boolean(env.NOTES_WRITE_SECRET) && provided === env.NOTES_WRITE_SECRET;
}

export async function onRequestPatch({ request, params, env }) {
  if (!checkSecret(request, env)) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = params;
  if (!id) {
    return Response.json({ error: "missing id" }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body.text !== "string" || !body.text.trim()) {
    return Response.json({ error: "invalid body: require non-empty text" }, { status: 400 });
  }

  await env.DB.prepare("UPDATE annotation_replies SET text = ?, edited_at = datetime('now') WHERE id = ?")
    .bind(body.text.trim(), id)
    .run();

  const { results } = await env.DB.prepare(
    "SELECT id, annotation_id, article_id, text, author, created_at, edited_at FROM annotation_replies WHERE id = ?"
  )
    .bind(id)
    .all();

  if (results.length === 0) {
    return Response.json({ error: "not found" }, { status: 404 });
  }

  return Response.json(results[0]);
}

export async function onRequestDelete({ request, params, env }) {
  if (!checkSecret(request, env)) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = params;
  if (!id) {
    return Response.json({ error: "missing id" }, { status: 400 });
  }

  await env.DB.prepare("DELETE FROM annotation_replies WHERE id = ?").bind(id).run();

  return Response.json({ ok: true });
}

// Cloudflare Pages Function — GET/POST /api/notes
// Both reads AND writes require the shared secret (X-Notes-Secret header,
// checked against the NOTES_WRITE_SECRET environment variable set in the
// Cloudflare Pages dashboard) — only whoever knows the password can see or
// change notes; a stranger with the URL sees nothing.
// GET without ?article= returns notes across every article (used by the
// global "all notes" view); GET with ?article= scopes to one (used by the
// per-article highlight layer).

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
        "SELECT id, article_id, quote, prefix, suffix, comment, section_label, created_at FROM annotations WHERE article_id = ? ORDER BY created_at ASC"
      ).bind(articleId)
    : env.DB.prepare(
        "SELECT id, article_id, quote, prefix, suffix, comment, section_label, created_at FROM annotations ORDER BY article_id ASC, created_at ASC"
      );

  const { results } = await query.all();
  return Response.json(results);
}

export async function onRequestPost({ request, env }) {
  if (!checkSecret(request, env)) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body.article_id !== "string" || typeof body.quote !== "string" || typeof body.comment !== "string") {
    return Response.json({ error: "invalid body: require article_id, quote, comment" }, { status: 400 });
  }
  if (!body.article_id.trim() || !body.quote.trim() || !body.comment.trim()) {
    return Response.json({ error: "article_id, quote, comment must be non-empty" }, { status: 400 });
  }

  const id = crypto.randomUUID();
  await env.DB.prepare(
    "INSERT INTO annotations (id, article_id, quote, prefix, suffix, comment, section_label) VALUES (?, ?, ?, ?, ?, ?, ?)"
  )
    .bind(id, body.article_id, body.quote, body.prefix ?? "", body.suffix ?? "", body.comment, body.section_label ?? null)
    .run();

  const { results } = await env.DB.prepare(
    "SELECT id, article_id, quote, prefix, suffix, comment, section_label, created_at FROM annotations WHERE id = ?"
  )
    .bind(id)
    .all();

  return Response.json(results[0], { status: 201 });
}

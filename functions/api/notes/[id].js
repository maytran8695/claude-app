// Cloudflare Pages Function — DELETE /api/notes/:id
// Same shared-secret protection as POST /api/notes (see index.js).

export async function onRequestDelete({ request, params, env }) {
  const provided = request.headers.get("X-Notes-Secret");
  if (!env.NOTES_WRITE_SECRET || provided !== env.NOTES_WRITE_SECRET) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = params;
  if (!id) {
    return Response.json({ error: "missing id" }, { status: 400 });
  }

  await env.DB.prepare("DELETE FROM annotations WHERE id = ?").bind(id).run();

  return Response.json({ ok: true });
}

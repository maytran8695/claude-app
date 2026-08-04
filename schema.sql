CREATE TABLE IF NOT EXISTS annotations (
  id TEXT PRIMARY KEY,
  article_id TEXT NOT NULL,
  quote TEXT NOT NULL,
  prefix TEXT,
  suffix TEXT,
  comment TEXT NOT NULL,
  section_label TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_annotations_article ON annotations(article_id);

-- Reply threads attached to pre-written critique annotations (the
-- `annotations` object hardcoded in fin_expert_note.jsx / fin_foundation.jsx,
-- e.g. { id: "ann-...", quote, critique, severity }) — NOT the same as the
-- `annotations` table above, which is for reader-created highlight+note pairs
-- anchored to arbitrary selected text. Here `annotation_id` is one of those
-- fixed, author-defined ids, not a D1-generated one.
-- `author` is a self-chosen display name (prompted once client-side, cached
-- in localStorage — see notesAuth.js), NOT a real login identity: everyone
-- who knows the shared secret can write/edit/delete any reply regardless of
-- whose name is on it. It exists purely to visually tell commenters apart
-- ("Bạn" vs someone else's name) since the whole feature is gated by one
-- shared password, not per-user accounts.
CREATE TABLE IF NOT EXISTS annotation_replies (
  id TEXT PRIMARY KEY,
  annotation_id TEXT NOT NULL,
  article_id TEXT NOT NULL,
  text TEXT NOT NULL,
  author TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  edited_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_annotation_replies_annotation ON annotation_replies(annotation_id);

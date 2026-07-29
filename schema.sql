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

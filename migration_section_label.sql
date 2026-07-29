-- One-time migration for DBs created before section_label existed.
-- Safe to run again (guarded by a manual check below is not needed since
-- ALTER TABLE ADD COLUMN fails loudly if the column already exists — just
-- don't re-run it after it succeeds once).
ALTER TABLE annotations ADD COLUMN section_label TEXT;

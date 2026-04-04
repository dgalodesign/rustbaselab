-- Migration: replace raid_cost_sulfur + raid_costs with raid_rockets
-- Run in Supabase SQL Editor

ALTER TABLE bases ADD COLUMN IF NOT EXISTS raid_rockets integer;

DROP VIEW IF EXISTS published_bases;

CREATE VIEW published_bases AS
SELECT
  id,
  created_at,
  updated_at,
  title,
  slug,
  seo_title,
  seo_description,
  og_image_url,
  image_main_url,
  video_youtube_id,
  features,
  type_id,
  footprint_id,
  creator_id,
  status,
  youtube_clicks,
  raid_rockets,
  build_time_min,
  upkeep_hq,
  upkeep_metal,
  upkeep_stone,
  materials_hq,
  materials_metal,
  materials_stone
FROM bases
WHERE status = 'published';

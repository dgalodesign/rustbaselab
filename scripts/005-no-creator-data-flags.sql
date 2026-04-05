-- Migration: add build_cost_no_creator_data and upkeep_no_creator_data flags
-- Run in Supabase SQL Editor

ALTER TABLE bases
  ADD COLUMN IF NOT EXISTS build_cost_no_creator_data boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS upkeep_no_creator_data boolean NOT NULL DEFAULT false;

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
  materials_stone,
  build_cost_no_creator_data,
  upkeep_no_creator_data
FROM bases
WHERE status = 'published';

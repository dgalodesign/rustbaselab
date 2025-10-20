-- Drop the existing published_bases view
DROP VIEW IF EXISTS published_bases;

-- Recreate the published_bases view with youtube_clicks column
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
  raid_cost_sulfur,
  raid_costs,
  build_time_min,
  upkeep_hq,
  upkeep_metal,
  upkeep_stone,
  materials_hq,
  materials_metal,
  materials_stone
FROM bases
WHERE status = 'published';

-- Add comment to the view
COMMENT ON VIEW published_bases IS 'View containing only published bases with all columns including youtube_clicks';

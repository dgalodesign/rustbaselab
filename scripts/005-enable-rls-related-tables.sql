-- Enable RLS on all related tables
ALTER TABLE creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE footprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE types ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE base_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE base_teams ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access to creators" ON creators;
DROP POLICY IF EXISTS "Allow public read access to footprints" ON footprints;
DROP POLICY IF EXISTS "Allow public read access to types" ON types;
DROP POLICY IF EXISTS "Allow public read access to team_sizes" ON team_sizes;
DROP POLICY IF EXISTS "Allow public read access to tags" ON tags;
DROP POLICY IF EXISTS "Allow public read access to base_tags" ON base_tags;
DROP POLICY IF EXISTS "Allow public read access to base_teams" ON base_teams;

-- Create policies for public read access
CREATE POLICY "Allow public read access to creators"
  ON creators FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to footprints"
  ON footprints FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to types"
  ON types FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to team_sizes"
  ON team_sizes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to tags"
  ON tags FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to base_tags"
  ON base_tags FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to base_teams"
  ON base_teams FOR SELECT
  TO public
  USING (true);

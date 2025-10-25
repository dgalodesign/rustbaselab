-- Enable RLS on all tables (if not already enabled)
ALTER TABLE bases ENABLE ROW LEVEL SECURITY;
ALTER TABLE types ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_sizes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access to published bases" ON bases;
DROP POLICY IF EXISTS "Allow public read access to types" ON types;
DROP POLICY IF EXISTS "Allow public read access to team sizes" ON team_sizes;

-- Create policy for public read access to PUBLISHED bases only
CREATE POLICY "Allow public read access to published bases"
ON bases
FOR SELECT
TO anon, authenticated
USING (status = 'published');

-- Create policy for public read access to types
CREATE POLICY "Allow public read access to types"
ON types
FOR SELECT
TO anon, authenticated
USING (true);

-- Create policy for public read access to team sizes
CREATE POLICY "Allow public read access to team sizes"
ON team_sizes
FOR SELECT
TO anon, authenticated
USING (true);

-- Verify the view still works with RLS
-- The published_bases view will automatically respect the RLS policies

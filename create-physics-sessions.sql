CREATE TABLE IF NOT EXISTS physics_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  short_code text UNIQUE NOT NULL,
  display_name text,
  progress jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_physics_sessions_short_code ON physics_sessions(short_code);

ALTER TABLE physics_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read" ON physics_sessions FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert" ON physics_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update" ON physics_sessions FOR UPDATE USING (true);

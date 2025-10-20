-- Agregar campo para contar clicks al video de YouTube
ALTER TABLE bases 
ADD COLUMN IF NOT EXISTS youtube_clicks INTEGER DEFAULT 0;

-- Agregar índice para mejorar performance en queries ordenadas por clicks
CREATE INDEX IF NOT EXISTS idx_bases_youtube_clicks ON bases(youtube_clicks DESC);

-- Agregar índice para mejorar performance en queries ordenadas por fecha
CREATE INDEX IF NOT EXISTS idx_bases_created_at ON bases(created_at DESC);

COMMENT ON COLUMN bases.youtube_clicks IS 'Contador de clicks al enlace del video de YouTube';

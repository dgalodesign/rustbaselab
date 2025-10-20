-- Agregar campo youtube_clicks a la tabla bases
ALTER TABLE bases 
ADD COLUMN IF NOT EXISTS youtube_clicks INTEGER DEFAULT 0;

-- Crear índice para mejorar performance en queries ordenadas por clicks
CREATE INDEX IF NOT EXISTS idx_bases_youtube_clicks ON bases(youtube_clicks DESC);

-- Actualizar bases existentes con valor inicial de 0
UPDATE bases 
SET youtube_clicks = 0 
WHERE youtube_clicks IS NULL;

-- Comentario en la columna
COMMENT ON COLUMN bases.youtube_clicks IS 'Contador de clicks al enlace de YouTube de la base';

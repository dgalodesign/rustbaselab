-- Crear función RPC para incrementar clicks de YouTube de forma segura
CREATE OR REPLACE FUNCTION increment_youtube_clicks(base_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE bases
  SET youtube_clicks = COALESCE(youtube_clicks, 0) + 1
  WHERE id = base_id;
END;
$$;

-- Dar permisos de ejecución a usuarios anónimos
GRANT EXECUTE ON FUNCTION increment_youtube_clicks(uuid) TO anon;
GRANT EXECUTE ON FUNCTION increment_youtube_clicks(uuid) TO authenticated;

COMMENT ON FUNCTION increment_youtube_clicks IS 'Incrementa el contador de clicks al video de YouTube de una base';

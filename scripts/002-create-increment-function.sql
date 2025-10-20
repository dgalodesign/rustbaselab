-- Función para incrementar el contador de clicks de forma segura
CREATE OR REPLACE FUNCTION increment_youtube_clicks(base_id UUID)
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

-- Comentario en la función
COMMENT ON FUNCTION increment_youtube_clicks IS 'Incrementa el contador de clicks de YouTube para una base específica';

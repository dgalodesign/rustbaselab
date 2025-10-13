-- Primero, limpiar datos existentes si los hay
TRUNCATE TABLE bases CASCADE;

-- Insertar bases de ejemplo
INSERT INTO bases (title, description, image_url, video_url, difficulty, size, build_time, type_id, materials, raid_cost, upkeep_cost, tc_count, views) VALUES
('Base 2x2 para Principiantes', 'Una base compacta perfecta para jugadores nuevos. Fácil de construir y defender con recursos mínimos.', '/placeholder.svg?height=400&width=600', 'dQw4w9WgXcQ', 'beginner', '2x2', '30 minutos', 1, '{"metal_fragments": 5000, "stone": 8000, "wood": 15000}', '{"explosives": 8, "rockets": 4}', 50, 2, 0),

('Base 3x3 Intermedia', 'Base intermedia con múltiples habitaciones y buena seguridad. Ideal para grupos pequeños.', '/placeholder.svg?height=400&width=600', 'dQw4w9WgXcQ', 'intermediate', '3x3', '1 hora', 2, '{"metal_fragments": 15000, "stone": 25000, "wood": 30000, "high_quality_metal": 500}', '{"explosives": 16, "rockets": 8}', 150, 4, 0),

('Base 4x4 Avanzada', 'Base grande con sistema de honeycombing y múltiples capas de defensa. Para jugadores experimentados.', '/placeholder.svg?height=400&width=600', 'dQw4w9WgXcQ', 'advanced', '4x4', '2 horas', 3, '{"metal_fragments": 35000, "stone": 50000, "wood": 40000, "high_quality_metal": 2000}', '{"explosives": 32, "rockets": 16}', 300, 6, 0),

('Base Solo Compacta', 'Diseño eficiente para jugadores solitarios. Máxima seguridad con mínimos recursos.', '/placeholder.svg?height=400&width=600', 'dQw4w9WgXcQ', 'beginner', '2x1', '20 minutos', 1, '{"metal_fragments": 3000, "stone": 5000, "wood": 10000}', '{"explosives": 6, "rockets": 3}', 30, 1, 0),

('Base Clan 5x5', 'Base masiva para clanes grandes con múltiples pisos y áreas de almacenamiento.', '/placeholder.svg?height=400&width=600', 'dQw4w9WgXcQ', 'expert', '5x5', '4 horas', 4, '{"metal_fragments": 75000, "stone": 100000, "wood": 60000, "high_quality_metal": 5000, "armored": 1000}', '{"explosives": 64, "rockets": 32}', 800, 10, 0),

('Base Bunker Subterránea', 'Base con diseño de bunker y entrada oculta. Muy difícil de raidear.', '/placeholder.svg?height=400&width=600', 'dQw4w9WgXcQ', 'expert', '3x3', '3 horas', 3, '{"metal_fragments": 45000, "stone": 60000, "wood": 35000, "high_quality_metal": 3000}', '{"explosives": 40, "rockets": 20}', 400, 8, 0),

('Base Torre Defensiva', 'Torre alta con excelente visibilidad y posiciones de francotirador.', '/placeholder.svg?height=400&width=600', 'dQw4w9WgXcQ', 'intermediate', '2x2', '1.5 horas', 2, '{"metal_fragments": 20000, "stone": 30000, "wood": 25000, "high_quality_metal": 1000}', '{"explosives": 20, "rockets": 10}', 200, 5, 0),

('Base Económica Starter', 'La base más económica para comenzar rápidamente en un servidor nuevo.', '/placeholder.svg?height=400&width=600', 'dQw4w9WgXcQ', 'beginner', '1x1', '15 minutos', 1, '{"metal_fragments": 2000, "stone": 3000, "wood": 8000}', '{"explosives": 4, "rockets": 2}', 20, 1, 0);

-- Verificar que se insertaron los datos
SELECT COUNT(*) as total_bases FROM bases;

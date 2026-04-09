-- seed.sql
-- Datos de prueba para RetailAseo (ejecutar DESPUÉS de iniciar el servidor
-- para que Sequelize cree las tablas primero)
-- En psql: \i seed.sql  o  pegarlo directo en pgAdmin

-- Categorías
INSERT INTO categories (nombre, descripcion, "createdAt", "updatedAt") VALUES
  ('Limpieza del Hogar', 'Productos para limpiar superficies, pisos y cocinas', NOW(), NOW()),
  ('Higiene Personal', 'Jabones, shampoo y cuidado corporal', NOW(), NOW()),
  ('Lavandería', 'Detergentes y suavizantes para ropa', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Usuarios de prueba (passwords en texto plano — en módulo 8 se hashearán con bcrypt)
INSERT INTO users (nombre, email, password, rol, "createdAt", "updatedAt") VALUES
  ('Admin RetailAseo', 'admin@retailaseo.com', 'admin123', 'admin', NOW(), NOW()),
  ('María González', 'maria@gmail.com', '123456', 'cliente', NOW(), NOW()),
  ('Carlos López', 'carlos@gmail.com', '123456', 'cliente', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Productos
INSERT INTO products (nombre, descripcion, precio, stock, "category_id", "createdAt", "updatedAt") VALUES
  ('Cloro Líquido 1L',     'Desinfectante multiusos para el hogar', 1500, 50, 1, NOW(), NOW()),
  ('Limpiapisos Pino 2L',  'Limpiador con aroma a pino para todo tipo de pisos', 2800, 30, 1, NOW(), NOW()),
  ('Jabón de Manos Aloe',  'Jabón líquido hidratante con aloe vera 500ml', 3200, 80, 2, NOW(), NOW()),
  ('Shampoo Neutro 400ml', 'Shampoo sin sulfatos para cabello delicado', 4500, 45, 2, NOW(), NOW()),
  ('Detergente Líquido 3L','Detergente concentrado para ropa blanca y color', 5900, 25, 3, NOW(), NOW()),
  ('Suavizante Lavanda 2L','Suavizante para ropa con aroma a lavanda', 3800, 35, 3, NOW(), NOW())
ON CONFLICT DO NOTHING;

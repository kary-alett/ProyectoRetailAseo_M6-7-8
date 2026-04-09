// src/config/database.js
// Conexión a PostgreSQL usando Sequelize
// Se eligió Sequelize porque permite trabajar con modelos, relaciones y migraciones
// de forma más segura y mantenible que el SQL manual.

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false, // Cambiar a console.log para ver las queries SQL en consola
  }
);

// Función para probar la conexión al iniciar el servidor
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a PostgreSQL establecida correctamente.');
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error.message);
    process.exit(1); // Detiene el servidor si no hay conexión
  }
};

module.exports = { sequelize, connectDB };

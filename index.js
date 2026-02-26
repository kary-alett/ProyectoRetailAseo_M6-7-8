// index.js - Archivo principal del servidor
// Se eligió "index.js" por convención en proyectos Node.js: es el punto
// de entrada estándar que npm y Node reconocen automáticamente.

// Carga las variables de entorno desde el archivo .env
require("dotenv").config();

const express = require("express");
const path = require("path");

// Importamos el router externo con todas las rutas de la aplicación
const router = require("./routes/router");

// Importamos el middleware de logging personalizado
const loggerMiddleware = require("./middlewares/logger");

// Creamos la instancia de la aplicación Express
const app = express();

// ── Middlewares globales ────────────────────────────────────────────────────

// Permite parsear el body de peticiones JSON
app.use(express.json());

// Permite parsear datos de formularios HTML (urlencoded)
app.use(express.urlencoded({ extended: true }));

// Sirve archivos estáticos desde la carpeta /public
// Ejemplo: http://localhost:3000/styles.css carga public/styles.css
app.use(express.static(path.join(__dirname, "public")));

// Middleware personalizado: registra cada petición en log.txt
app.use(loggerMiddleware);

// ── Rutas ───────────────────────────────────────────────────────────────────

// Conectamos todas las rutas definidas en router.js
app.use("/", router);

// ── Iniciar servidor ────────────────────────────────────────────────────────

// Leemos el puerto desde .env; si no existe, usamos 3000 por defecto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor iniciado en http://localhost:${PORT}`);
  console.log(`📁 Entorno: ${process.env.NODE_ENV || "development"}`);
});
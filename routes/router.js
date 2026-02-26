// routes/router.js - Enrutador central de la aplicación
// Se usa app.use() en index.js para conectar este router,
// manteniendo el archivo principal limpio y escalable.

const express = require("express");
const router = express.Router();

// Importamos los controladores que manejan la lógica de cada ruta
const homeController = require("../controllers/homeController");
const statusController = require("../controllers/statusController");

// ── Rutas públicas ──────────────────────────────────────────────────────────

// GET / → Página principal (responde con HTML)
router.get("/", homeController.getHome);

// GET /status → Estado del servidor (responde con JSON)
router.get("/status", statusController.getStatus);

module.exports = router;
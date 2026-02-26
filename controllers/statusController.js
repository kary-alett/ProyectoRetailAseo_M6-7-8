// controllers/statusController.js
// Controlador para la ruta "/status"
// Responde con JSON informando el estado actual del servidor

const statusController = {
  // Maneja GET /status
  // Devuelve un objeto JSON con información del servidor
  getStatus: (req, res) => {
    res.status(200).json({
      status: "OK",
      message: "El servidor está en funcionamiento",
      data: {
        app: process.env.APP_NAME || "Node-Express-WebApp",
        entorno: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString(),
        uptime: `${Math.floor(process.uptime())} segundos`,
      },
    });
  },
};

module.exports = statusController;
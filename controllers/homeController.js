// controllers/homeController.js
// Controlador para la ruta raíz "/"
// Separa la lógica de negocio del enrutamiento (patrón MVC)

const homeController = {
  // Maneja GET /
  // Devuelve una página HTML de bienvenida
  getHome: (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Node & Express App</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <div class="container">
          <h1>🚀 Bienvenido a la App</h1>
          <p>Servidor Node.js + Express funcionando correctamente.</p>
          <a href="/status">Ver estado del servidor →</a>
        </div>
      </body>
      </html>
    `);
  },
};

module.exports = homeController;
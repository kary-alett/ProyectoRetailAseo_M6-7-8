require('dotenv').config();
const express = require('express');
const path = require('path');

const { connectDB } = require('./src/config/database');
const { syncDB } = require('./src/models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const logger = require('./middlewares/logger');
app.use(logger);

app.use('/api/usuarios',   require('./src/routes/userRoutes'));
app.use('/api/categorias', require('./src/routes/categoryRoutes'));
app.use('/api/productos',  require('./src/routes/productRoutes'));
app.use('/api/pedidos',    require('./src/routes/orderRoutes'));
app.use('/api/auth',   require('./src/routes/authRoutes'));
app.use('/api/upload', require('./src/routes/uploadRoutes'));

app.use('/', require('./routes/router'));

app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  console.error('❌ Error global:', err.message);
  res.status(500).json({ status: 'error', message: err.message || 'Error interno del servidor' });
});

const startServer = async () => {
  await connectDB();
  await syncDB();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
};

startServer();
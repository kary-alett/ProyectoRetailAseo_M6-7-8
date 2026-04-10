// src/routes/uploadRoutes.js

const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const { verifyToken } = require('../middlewares/authMiddleware');
const { User } = require('../models');

// POST /api/upload/avatar — sube foto de perfil y la asocia al usuario 🔒
router.post('/avatar', verifyToken, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'error', message: 'No se recibió ningún archivo' });
    }
    const avatarUrl = `/uploads/${req.file.filename}`;
    await User.update({ avatar: avatarUrl }, { where: { id: req.user.id } });
    res.json({
      status: 'ok',
      message: 'Avatar subido correctamente',
      data: { avatar: avatarUrl },
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// POST /api/upload/producto/:id — sube imagen de producto (solo admin) 🔒
router.post('/producto/:id', verifyToken, upload.single('imagen'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'error', message: 'No se recibió ningún archivo' });
    }
    const { Product } = require('../models');
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }
    const imagenUrl = `/uploads/${req.file.filename}`;
    await product.update({ imagen: imagenUrl });
    res.json({
      status: 'ok',
      message: 'Imagen del producto subida correctamente',
      data: { imagen: imagenUrl },
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

module.exports = router;
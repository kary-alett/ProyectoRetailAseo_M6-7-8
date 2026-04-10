// src/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderService = require('../services/orderService');
const { verifyToken } = require('../middlewares/authMiddleware');

// GET /api/pedidos 🔒
router.get('/', verifyToken, async (req, res) => {
  try {
    const orders = await orderService.getAllOrders(req.user.id, req.user.rol);
    res.json({ status: 'ok', message: 'Pedidos obtenidos', data: orders });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// GET /api/pedidos/:id 🔒
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id, req.user.id, req.user.rol);
    res.json({ status: 'ok', message: 'Pedido encontrado', data: order });
  } catch (error) {
    const code = error.message === 'Pedido no encontrado' ? 404 : 500;
    res.status(code).json({ status: 'error', message: error.message });
  }
});

// POST /api/pedidos 🔒
// Body: { "user_id": 1, "items": [{ "product_id": 1, "cantidad": 2 }] }
router.post('/', verifyToken, async (req, res) => {
  try {
    const { user_id, items } = req.body;
    if (!user_id || !items || !items.length) {
      return res.status(400).json({
        status: 'error',
        message: 'Se requiere user_id e items (array con al menos 1 elemento)',
      });
    }
    const order = await orderService.createOrder(user_id, items);
    res.status(201).json({
      status: 'ok',
      message: 'Pedido creado exitosamente con transacción',
      data: order,
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

// PUT /api/pedidos/:id/estado 🔒
// Body: { "estado": "enviado" }
router.put('/:id/estado', verifyToken, async (req, res) => {
  try {
    const { estado } = req.body;
    const estadosValidos = ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'];
    if (!estado || !estadosValidos.includes(estado)) {
      return res.status(400).json({
        status: 'error',
        message: `Estado inválido. Opciones: ${estadosValidos.join(', ')}`,
      });
    }
    const order = await orderService.updateOrderStatus(req.params.id, estado);
    res.json({ status: 'ok', message: 'Estado del pedido actualizado', data: order });
  } catch (error) {
    const code = error.message === 'Pedido no encontrado' ? 404 : 400;
    res.status(code).json({ status: 'error', message: error.message });
  }
});

module.exports = router;
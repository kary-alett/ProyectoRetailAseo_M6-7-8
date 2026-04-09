// src/services/orderService.js
// Servicio de pedidos — incluye transaccionalidad (Lección 4)
// Si alguna operación dentro del pedido falla, se hace rollback completo

const { sequelize, Order, OrderItem, Product, User } = require('../models');
const fs = require('fs');
const path = require('path');

// Log de transacciones fallidas (Tarea PLUS Lección 4)
const logTransactionError = (error, datos) => {
  const logPath = path.join(__dirname, '../../logs/transactions.log');
  const linea = `[${new Date().toLocaleString()}] ERROR TRANSACCIÓN — ${error.message} — Datos: ${JSON.stringify(datos)}\n`;
  fs.appendFile(logPath, linea, (err) => {
    if (err) console.error('No se pudo escribir el log de transacción:', err.message);
  });
};

// Crear pedido con transacción: descuenta stock y registra items
const createOrder = async (user_id, items) => {
  const t = await sequelize.transaction();
  try {
    // 1. Calcular total y verificar stock de cada producto
    let total = 0;
    const itemsConPrecio = [];

    for (const item of items) {
      const product = await Product.findByPk(item.product_id, { transaction: t });
      if (!product) throw new Error(`Producto con ID ${item.product_id} no encontrado`);
      if (product.stock < item.cantidad) {
        throw new Error(`Stock insuficiente para "${product.nombre}" (disponible: ${product.stock})`);
      }
      total += product.precio * item.cantidad;
      itemsConPrecio.push({ product, cantidad: item.cantidad, precio_unitario: product.precio });
    }

    // 2. Crear el pedido
    const order = await Order.create({ user_id, total }, { transaction: t });

    // 3. Crear los items y descontar stock
    for (const { product, cantidad, precio_unitario } of itemsConPrecio) {
      await OrderItem.create(
        { order_id: order.id, product_id: product.id, cantidad, precio_unitario },
        { transaction: t }
      );
      await product.update({ stock: product.stock - cantidad }, { transaction: t });
    }

    // 4. Confirmar la transacción
    await t.commit();
    console.log(`✅ Pedido #${order.id} creado exitosamente — Total: $${total}`);
    return order;

  } catch (error) {
    await t.rollback();
    console.error('❌ Rollback ejecutado:', error.message);
    logTransactionError(error, { user_id, items });
    throw error;
  }
};

const getAllOrders = async (user_id = null, rol = 'cliente') => {
  const where = rol === 'admin' ? {} : { user_id };
  return await Order.findAll({
    where,
    include: [
      { model: User, attributes: ['id', 'nombre', 'email'] },
      {
        model: OrderItem,
        include: [{ model: Product, attributes: ['id', 'nombre', 'precio'] }],
      },
    ],
    order: [['createdAt', 'DESC']],
  });
};

const getOrderById = async (id, user_id, rol) => {
  const order = await Order.findByPk(id, {
    include: [
      { model: User, attributes: ['id', 'nombre', 'email'] },
      {
        model: OrderItem,
        include: [{ model: Product, attributes: ['id', 'nombre', 'precio'] }],
      },
    ],
  });
  if (!order) throw new Error('Pedido no encontrado');
  if (rol !== 'admin' && order.user_id !== user_id) {
    throw new Error('No tienes permiso para ver este pedido');
  }
  return order;
};

const updateOrderStatus = async (id, estado) => {
  const order = await Order.findByPk(id);
  if (!order) throw new Error('Pedido no encontrado');
  await order.update({ estado });
  return order;
};

module.exports = { createOrder, getAllOrders, getOrderById, updateOrderStatus };

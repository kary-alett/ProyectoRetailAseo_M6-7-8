// src/models/Order.js
// Modelo de Pedido — registra compras de los usuarios
// Relación: Pertenece a 1 User (N:1) y tiene muchos OrderItems (1:N)

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'),
    defaultValue: 'pendiente',
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  // user_id se agrega automáticamente por la asociación en index.js
}, {
  tableName: 'orders',
  timestamps: true,
});

module.exports = Order;

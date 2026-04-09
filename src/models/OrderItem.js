// src/models/OrderItem.js
// Tabla intermedia entre Order y Product (relación N:M)
// Guarda cantidad y precio histórico de cada producto en el pedido

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: { args: [1], msg: 'La cantidad debe ser al menos 1' },
    },
  },
  precio_unitario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    // Se guarda el precio al momento de la compra (precio histórico)
  },
  // order_id y product_id se agregan automáticamente por las asociaciones
}, {
  tableName: 'order_items',
  timestamps: false,
});

module.exports = OrderItem;

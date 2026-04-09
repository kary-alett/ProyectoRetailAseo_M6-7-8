// src/models/index.js
const { sequelize } = require('../config/database');
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');

// ─── ASOCIACIONES ───────────────────────────────────────────────────────────
User.hasMany(Order, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'user_id' });

Category.hasMany(Product, { foreignKey: 'category_id', onDelete: 'SET NULL' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

Order.hasMany(OrderItem, { foreignKey: 'order_id', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

// ─── SINCRONIZACIÓN ─────────────────────────────────────────────────────────
const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Tablas sincronizadas con PostgreSQL.');
  } catch (error) {
    console.error('❌ Error al sincronizar tablas:', error.message);
  }
};

module.exports = { sequelize, syncDB, User, Category, Product, Order, OrderItem };
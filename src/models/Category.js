// src/models/Category.js
// Modelo de Categoría — agrupa los productos de la tienda
// Relación: 1 Categoría tiene muchos Productos (1:N)

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El nombre de categoría no puede estar vacío' },
    },
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'categories',
  timestamps: true,
});

module.exports = Category;

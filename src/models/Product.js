// src/models/Product.js
// Modelo de Producto — artículos de higiene y limpieza de la tienda
// Relación: Pertenece a 1 Categoría (N:1) y aparece en muchos OrderItems (1:N)

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El nombre del producto no puede estar vacío' },
    },
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: { msg: 'El precio debe ser un número válido' },
      min: { args: [0], msg: 'El precio no puede ser negativo' },
    },
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: { args: [0], msg: 'El stock no puede ser negativo' },
    },
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // category_id se agrega automáticamente por la asociación en index.js
}, {
  tableName: 'products',
  timestamps: true,
});

module.exports = Product;

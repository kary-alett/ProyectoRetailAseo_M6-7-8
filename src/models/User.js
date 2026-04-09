// src/models/User.js
// Modelo de Usuario — entidad principal del sistema
// Define la estructura de la tabla "users" en PostgreSQL

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El nombre no puede estar vacío' },
      len: { args: [2, 100], msg: 'El nombre debe tener entre 2 y 100 caracteres' },
    },
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: { msg: 'Este email ya está registrado' },
    validate: {
      isEmail: { msg: 'El email no tiene un formato válido' },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM('admin', 'cliente'),
    defaultValue: 'cliente',
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'users',
  timestamps: true, // Agrega createdAt y updatedAt automáticamente
});

module.exports = User;

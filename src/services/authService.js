// src/services/authService.js
// Lógica de registro y login con bcrypt y JWT

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const register = async ({ nombre, email, password, rol }) => {
  const existe = await User.findOne({ where: { email } });
  if (existe) throw new Error('Ya existe un usuario con ese email');

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ nombre, email, password: passwordHash, rol });

  const { password: _, ...userSafe } = user.toJSON();
  return userSafe;
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Email o contraseña incorrectos');

  const passwordValida = await bcrypt.compare(password, user.password);
  if (!passwordValida) throw new Error('Email o contraseña incorrectos');

  const token = jwt.sign(
    { id: user.id, email: user.email, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );

  const { password: _, ...userSafe } = user.toJSON();
  return { token, user: userSafe };
};

const getMe = async (id) => {
  const user = await User.findByPk(id, {
    attributes: ['id', 'nombre', 'email', 'rol', 'avatar', 'createdAt'],
  });
  if (!user) throw new Error('Usuario no encontrado');
  return user;
};

module.exports = { register, login, getMe };
// src/services/userService.js
// Capa de servicio para usuarios — aquí va la lógica de negocio y acceso a datos
// Separar la lógica del controlador permite reutilizarla y testearla más fácil

const { User } = require('../models');
const { Op } = require('sequelize');

// Campos seguros a devolver (nunca incluir password)
const SAFE_ATTRIBUTES = ['id', 'nombre', 'email', 'rol', 'avatar', 'createdAt'];

// Obtener todos los usuarios (con filtro opcional por nombre)
const getAllUsers = async (nombre = null) => {
  const where = nombre ? { nombre: { [Op.iLike]: `%${nombre}%` } } : {};
  return await User.findAll({
    where,
    attributes: SAFE_ATTRIBUTES,
    order: [['createdAt', 'DESC']],
  });
};

// Obtener un usuario por ID
const getUserById = async (id) => {
  const user = await User.findByPk(id, { attributes: SAFE_ATTRIBUTES });
  if (!user) throw new Error('Usuario no encontrado');
  return user;
};

// Crear un usuario nuevo
const createUser = async ({ nombre, email, password, rol }) => {
  const existe = await User.findOne({ where: { email } });
  if (existe) throw new Error('Ya existe un usuario con ese email');

  return await User.create({ nombre, email, password, rol });
};

// Actualizar campos de un usuario (solo los campos enviados)
const updateUser = async (id, campos) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('Usuario no encontrado');

  // Solo se actualizan los campos que vienen en el body (patch parcial)
  const camposPermitidos = ['nombre', 'email', 'rol', 'avatar'];
  camposPermitidos.forEach((campo) => {
    if (campos[campo] !== undefined) user[campo] = campos[campo];
  });

  await user.save();
  const { password: _, ...userSafe } = user.toJSON();
  return userSafe;
};

// Eliminar un usuario por ID
const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('Usuario no encontrado');
  await user.destroy();
  return { message: `Usuario ${user.nombre} eliminado correctamente` };
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };

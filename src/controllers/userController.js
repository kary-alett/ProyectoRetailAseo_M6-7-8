// src/controllers/userController.js
// Controlador de usuarios — recibe req/res y delega la lógica al servicio

const userService = require('../services/userService');

// GET /api/usuarios?nombre=Juan
const getUsers = async (req, res) => {
  try {
    const { nombre } = req.query;
    const users = await userService.getAllUsers(nombre);
    res.json({ status: 'ok', message: 'Usuarios obtenidos', data: users });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// GET /api/usuarios/:id
const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json({ status: 'ok', message: 'Usuario encontrado', data: user });
  } catch (error) {
    const code = error.message === 'Usuario no encontrado' ? 404 : 500;
    res.status(code).json({ status: 'error', message: error.message });
  }
};

// POST /api/usuarios
const createUser = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    if (!nombre || !email || !password) {
      return res.status(400).json({ status: 'error', message: 'nombre, email y password son requeridos' });
    }
    const user = await userService.createUser({ nombre, email, password, rol });
    const { password: _, ...userSafe } = user.toJSON();
    res.status(201).json({ status: 'ok', message: 'Usuario creado', data: userSafe });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

// PUT /api/usuarios/:id
const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json({ status: 'ok', message: 'Usuario actualizado', data: user });
  } catch (error) {
    const code = error.message === 'Usuario no encontrado' ? 404 : 400;
    res.status(code).json({ status: 'error', message: error.message });
  }
};

// DELETE /api/usuarios/:id
const deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    res.json({ status: 'ok', message: result.message });
  } catch (error) {
    const code = error.message === 'Usuario no encontrado' ? 404 : 500;
    res.status(code).json({ status: 'error', message: error.message });
  }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };

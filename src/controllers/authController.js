// src/controllers/authController.js

const authService = require('../services/authService');

const register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    if (!nombre || !email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'nombre, email y password son requeridos',
      });
    }
    const user = await authService.register({ nombre, email, password, rol });
    res.status(201).json({ status: 'ok', message: 'Usuario registrado', data: user });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'email y password son requeridos',
      });
    }
    const result = await authService.login({ email, password });
    res.json({ status: 'ok', message: 'Login exitoso', data: result });
  } catch (error) {
    res.status(401).json({ status: 'error', message: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await authService.getMe(req.user.id);
    res.json({ status: 'ok', message: 'Usuario autenticado', data: user });
  } catch (error) {
    res.status(404).json({ status: 'error', message: error.message });
  }
};

module.exports = { register, login, getMe };
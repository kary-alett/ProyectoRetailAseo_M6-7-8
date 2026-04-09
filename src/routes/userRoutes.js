// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.get('/', getUsers);         // GET /api/usuarios?nombre=Juan
router.get('/:id', getUserById);   // GET /api/usuarios/1
router.post('/', createUser);      // POST /api/usuarios
router.put('/:id', updateUser);    // PUT /api/usuarios/1
router.delete('/:id', deleteUser); // DELETE /api/usuarios/1

module.exports = router;

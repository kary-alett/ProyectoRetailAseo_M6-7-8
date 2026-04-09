// src/routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

router.get('/', getCategories);          // GET /api/categorias?search=limpieza
router.get('/:id', getCategoryById);     // GET /api/categorias/1 (incluye sus productos)
router.post('/', createCategory);        // POST /api/categorias
router.put('/:id', updateCategory);      // PUT /api/categorias/1
router.delete('/:id', deleteCategory);   // DELETE /api/categorias/1

module.exports = router;

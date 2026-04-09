// src/controllers/categoryController.js

const categoryService = require('../services/categoryService');

const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories(req.query.search);
    res.json({ status: 'ok', message: 'Categorías obtenidas', data: categories });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    res.json({ status: 'ok', message: 'Categoría encontrada', data: category });
  } catch (error) {
    const code = error.message === 'Categoría no encontrada' ? 404 : 500;
    res.status(code).json({ status: 'error', message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    if (!nombre) return res.status(400).json({ status: 'error', message: 'El nombre es requerido' });
    const category = await categoryService.createCategory({ nombre, descripcion });
    res.status(201).json({ status: 'ok', message: 'Categoría creada', data: category });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await categoryService.updateCategory(req.params.id, req.body);
    res.json({ status: 'ok', message: 'Categoría actualizada', data: category });
  } catch (error) {
    const code = error.message === 'Categoría no encontrada' ? 404 : 400;
    res.status(code).json({ status: 'error', message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const result = await categoryService.deleteCategory(req.params.id);
    res.json({ status: 'ok', message: result.message });
  } catch (error) {
    const code = error.message === 'Categoría no encontrada' ? 404 : 500;
    res.status(code).json({ status: 'error', message: error.message });
  }
};

module.exports = { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory };

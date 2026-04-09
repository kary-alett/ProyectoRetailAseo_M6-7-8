// src/services/categoryService.js

const { Category, Product } = require('../models');
const { Op } = require('sequelize');

const getAllCategories = async (search = null) => {
  const where = search ? { nombre: { [Op.iLike]: `%${search}%` } } : {};
  return await Category.findAll({ where, order: [['nombre', 'ASC']] });
};

const getCategoryById = async (id) => {
  const category = await Category.findByPk(id, {
    include: [{ model: Product, attributes: ['id', 'nombre', 'precio', 'stock'] }],
  });
  if (!category) throw new Error('Categoría no encontrada');
  return category;
};

const createCategory = async ({ nombre, descripcion }) => {
  return await Category.create({ nombre, descripcion });
};

const updateCategory = async (id, campos) => {
  const category = await Category.findByPk(id);
  if (!category) throw new Error('Categoría no encontrada');
  await category.update(campos);
  return category;
};

const deleteCategory = async (id) => {
  const category = await Category.findByPk(id);
  if (!category) throw new Error('Categoría no encontrada');
  await category.destroy();
  return { message: `Categoría "${category.nombre}" eliminada` };
};

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };

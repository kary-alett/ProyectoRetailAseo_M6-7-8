// src/services/productService.js
// Capa de servicio para productos

const { Product, Category } = require('../models');
const { Op } = require('sequelize');

const getAllProducts = async ({ search, category, minPrice, maxPrice } = {}) => {
  const where = {};
  if (search) where.nombre = { [Op.iLike]: `%${search}%` };
  if (category) where.category_id = category;
  if (minPrice) where.precio = { ...where.precio, [Op.gte]: minPrice };
  if (maxPrice) where.precio = { ...where.precio, [Op.lte]: maxPrice };

  return await Product.findAll({
    where,
    include: [{ model: Category, attributes: ['id', 'nombre'] }],
    order: [['nombre', 'ASC']],
  });
};

const getProductById = async (id) => {
  const product = await Product.findByPk(id, {
    include: [{ model: Category, attributes: ['id', 'nombre'] }],
  });
  if (!product) throw new Error('Producto no encontrado');
  return product;
};

const createProduct = async (datos) => {
  return await Product.create(datos);
};

const updateProduct = async (id, campos) => {
  const product = await Product.findByPk(id);
  if (!product) throw new Error('Producto no encontrado');
  await product.update(campos);
  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) throw new Error('Producto no encontrado');
  await product.destroy();
  return { message: `Producto "${product.nombre}" eliminado` };
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };

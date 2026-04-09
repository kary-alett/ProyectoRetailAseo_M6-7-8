// src/controllers/productController.js

const productService = require('../services/productService');

const getProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice } = req.query;
    const products = await productService.getAllProducts({ search, category, minPrice, maxPrice });
    res.json({ status: 'ok', message: 'Productos obtenidos', data: products });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json({ status: 'ok', message: 'Producto encontrado', data: product });
  } catch (error) {
    const code = error.message === 'Producto no encontrado' ? 404 : 500;
    res.status(code).json({ status: 'error', message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, category_id } = req.body;
    if (!nombre || !precio) {
      return res.status(400).json({ status: 'error', message: 'nombre y precio son requeridos' });
    }
    const product = await productService.createProduct({ nombre, descripcion, precio, stock, category_id });
    res.status(201).json({ status: 'ok', message: 'Producto creado', data: product });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.json({ status: 'ok', message: 'Producto actualizado', data: product });
  } catch (error) {
    const code = error.message === 'Producto no encontrado' ? 404 : 400;
    res.status(code).json({ status: 'error', message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await productService.deleteProduct(req.params.id);
    res.json({ status: 'ok', message: result.message });
  } catch (error) {
    const code = error.message === 'Producto no encontrado' ? 404 : 500;
    res.status(code).json({ status: 'error', message: error.message });
  }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };

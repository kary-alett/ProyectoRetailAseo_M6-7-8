// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

router.get('/', getProducts);          // GET /api/productos?search=detergente&category=1
router.get('/:id', getProductById);    // GET /api/productos/1
router.post('/', createProduct);       // POST /api/productos
router.put('/:id', updateProduct);     // PUT /api/productos/1
router.delete('/:id', deleteProduct);  // DELETE /api/productos/1

module.exports = router;


const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get all products 

router.get('/', productController.getAllProducts);

// Create a new product 
router.post('/', productController.createProduct);

// Get a specific product 
router.get('/:id', productController.getProduct);

// Update a product 
router.put('/:id', productController.updateProduct);

// Delete a product 
router.delete('/:id', productController.deleteProduct);

module.exports = router;

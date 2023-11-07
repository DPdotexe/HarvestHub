const { Product } = require('../models/Product');

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name } = req.body;

    // Create a new product
    const product = await Product.create({ name });

    res.status(201).json({ message: 'Product inserted successfully' });
  } catch (error) {
    console.error('Error while inserting the product:', error);
    res.status(500).json({ error: 'Error while inserting the product' });
  }
};

// Get a specific product
const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product by ID
    const product = await Product.findByPk(productId);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error while reading the product:', error);
    res.status(500).json({ error: 'Error while reading the product' });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name } = req.body;

    // Find the product by ID
    const product = await Product.findByPk(productId);

    if (product) {
      // Update the product name
      await product.update({ name });

      res.status(200).json({ message: 'Product updated successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error while updating the product:', error);
    res.status(500).json({ error: 'Error while updating the product' });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product by ID
    const product = await Product.findByPk(productId);

    if (product) {
      // Delete the product
      await product.destroy();
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error while deleting the product:', error);
    res.status(500).json({ error: 'Error while deleting the product' });
  }
};

module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};

const { Op, Sequelize } = require('sequelize');
const   Product   = require('../models/Product');
const   Order    = require('../models/Order');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error while getting all products:', error);
    res.status(500).json({ error: 'Error while getting all products' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name } = req.body;
    const product = await Product.create({ name });

    console.log('Product inserted successfully:', product);
    res.status(201).json({ message: 'Product inserted successfully' });
  } catch (error) {
    console.error('Error while inserting the product:', error);
    res.status(500).json({ error: 'Error while inserting the product' });
  }
};

const getProductsByName = async (req, res) => {
  try {
    const { name } = req.query;
    let whereClause = {};

    if (name) {
      whereClause = {
        [Op.or]: [
          sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', `%${name.toLowerCase()}%`),
        ],
      };
    }

    const products = await Product.findAll({
      where: whereClause,
    });

    res.status(200).json(products);
  } catch (error) {
    console.error('Error while getting products:', error);
    res.status(500).json({ error: 'Error while getting products' });
  }
};


/////// ottieni il prodotto


const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
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

////// aggiorna il prodotto

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name } = req.body;

    const product = await Product.findByPk(productId);

    if (product) {
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

////////// cancella il prodotto

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    await Product.destroy({
      where: {
        id: productId,
      },
    });

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error while deleting the product:', error);
    res.status(500).json({ error: 'Error while deleting the product' });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductsByName,
  getProduct,
  updateProduct,
  deleteProduct,
};

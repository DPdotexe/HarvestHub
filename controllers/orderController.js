const { Order, Product, User } = require('../models/Order');

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { order_date, productIds, userIds } = req.body;

    // Create a new order
    const order = await Order.create({ order_date });

    // Associate products and users with the order
    if (productIds && userIds) {
      const products = await Product.findAll({ where: { id: productIds } });
      const users = await User.findAll({ where: { id: userIds } });

      await order.addProducts(products);
      await order.addUsers(users);
    }

    res.status(201).json({ message: 'Order inserted successfully' });
  } catch (error) {
    console.error('Error while inserting the order:', error);
    res.status(500).json({ error: 'Error while inserting the order' });
  }
};

// Get a specific order
const getOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Find the order by ID and include associated products and users
    const order = await Order.findByPk(orderId, {
      include: [Product, User],
    });

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error('Error while reading the order:', error);
    res.status(500).json({ error: 'Error while reading the order' });
  }
};

// Update an order
const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { order_date, productIds, userIds } = req.body;

    // Find the order by ID
    const order = await Order.findByPk(orderId);

    if (order) {
      // Update the order date
      await order.update({ order_date });

      // If there are new products and users, update them in the order
      if (productIds && userIds) {
        const products = await Product.findAll({ where: { id: productIds } });
        const users = await User.findAll({ where: { id: userIds } });

        await order.setProducts(products);
        await order.setUsers(users);
      }

      res.status(200).json({ message: 'Order updated successfully' });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error('Error while updating the order:', error);
    res.status(500).json({ error: 'Error while updating the order' });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Find the order by ID
    const order = await Order.findByPk(orderId);

    if (order) {
      // Delete the order
      await order.destroy();
      res.status(200).json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error('Error while deleting the order:', error);
    res.status(500).json({ error: 'Error while deleting the order' });
  }
};

module.exports = {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
};

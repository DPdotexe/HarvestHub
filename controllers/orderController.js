const { Op, Sequelize } = require('sequelize');
const  User  = require('../models/User');
const  Product  = require('../models/Product');
const  Order = require('../models/Order');


/////// get all orders 

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      attributes: ['id', 'createdAt', 'updatedAt'],
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['id', 'first_name', 'last_name', 'email'],
          through: { attributes: [] },
        },
        {
          model: Product,
          as: 'Product',
          attributes: ['name'],
        },
      ],
    });
    

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error while reading orders:', error);
    res.status(500).json({ error: 'Error while reading orders' });
  }
};
///// create order 

const createOrder = async (req, res) => {
  try {
    const { userIds, productIds } = req.body;

    if (!userIds || userIds.length === 0 || !productIds || productIds.length === 0) {
      return res.status(400).json({ error: 'Invalid userIds or productIds' });
    }

    const userId = userIds[0];

    const order = await Order.create({ userId, createdAt });

    await Promise.all(
      userIds.map(async (uid) => {
        const user = await User.findByPk(uid);
        if (user) {
          await order.addUser(user, { through: { UserId: user.id } });
        }
      })
    );

    await Promise.all(
      productIds.map(async (productId) => {
        const product = await Product.findByPk(productId);
        if (product) {
          await order.addProduct(product, { through: { ProductId: product.id } });
        }
      })
    );

    const { userId: excludedUserId, ...orderWithoutUserId } = order.toJSON();

    res.status(201).json({ message: 'Order created successfully', order: orderWithoutUserId });
  } catch (error) {
    console.error('Error while creating order:', error);
    res.status(500).json({ error: 'Error while creating order' });
  }
};

///// filter by date 

const getOrdersByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query; 

    let whereClause = {};

    if (startDate && endDate) {
      whereClause = {
        createdAt: {
          [Op.between]: [startDate, new Date(new Date(endDate).setHours(23, 59, 59, 999))],
        },
      };
    }

    const orders = await Order.findAll({
      attributes: ['id', 'createdAt', 'updatedAt'],
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['id', 'first_name', 'last_name', 'email'],
          through: { attributes: [] },
        },
        {
          model: Product,
          as: 'Product',
          attributes: ['id', 'name'],
          through: { attributes: ['productId'] },
        },
      ],
      where: whereClause,
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error while getting orders by date:', error);
    res.status(500).json({ error: 'Error while getting orders by date' });
  }
};

//////// get order by id

const getOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByPk(orderId, {
      attributes: ['id', 'createdAt', 'updatedAt'],
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['id', 'first_name', 'last_name', 'email'],
          through: { attributes: [] },
        },
        {
          model: Product,
          as: 'Product',
          attributes: ['id', 'name'],
          through: { attributes: [] },
        },
      ],
    });

    if (order) {
      res.status(200).json([order]);  
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error('Error while reading the order:', error);
    res.status(500).json({ error: 'Error while reading the order' });
  }
};


/////// update your order


const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { productId } = req.body;

    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: User,
          as: 'User',
          through: 'orderusers'
        },
        {
          model: Product,
          as: 'Product',
          through: 'orderproducts',
        },
      ],
    });

    if (order) {
      await order.update(req.body);

      if (productId) {
        const product = await Product.findByPk(productId);

        if (product) {

          await order.setProduct([]);

          await order.addProduct(product);
          
        } else {
          res.status(404).json({ error: 'Product not found' });
          return;
        }
      }

      res.status(200).json({ message: 'Order updated successfully', order: await order.reload() });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error('Error while updating the order:', error);
    res.status(500).json({ error: 'Error while updating the order' });
  }
};


/////// delete order


const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByPk(orderId);

    if (order) {
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
  getAllOrders,
  createOrder,
  getOrdersByDate,
  getOrder,
  updateOrder,
  deleteOrder,
};
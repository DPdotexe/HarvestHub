const { Op, Sequelize } = require('sequelize');
const  User  = require('../models/User');
const  Product  = require('../models/Product');
const  Order = require('../models/Order');


/////// get all orders 

const getAllOrders = async (req, res) => {
  try {
    // Utilizza gli stessi alias definiti nelle relazioni delle migrazioni e nei modelli
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
    const { userIds, products } = req.body;

    if (!userIds || userIds.length === 0) {
      return res.status(400).json({ error: 'Invalid userIds' });
    }

    const order = await Order.create({ userId: userIds[0] });

    const validProducts = req.body.products ?? [];

    for (const { productId } of validProducts) {
      if (!productId) {
        return res.status(400).json({ error: 'Invalid productId' });
      }

      await order.addProduct(productId, { through: { productId: productId } });
    }

    res.status(201).json({ message: 'Order created successfully', order });
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
      console.log('Start Date:', startDate);
      console.log('End Date:', endDate);

      whereClause = {
        createdAt: {
          [Op.between]: [
            Sequelize.literal(`CONVERT_TZ('${startDate} 00:00:00', '+00:00', '+03:00')`),
            Sequelize.literal(`CONVERT_TZ('${endDate} 23:59:59', '+00:00', '+03:00')`),
          ],
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
          through: { attributes: ['productId'] }, 
        },
      ],
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

/////// update your order


const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { productId } = req.body;

    // Trova l'ordine con i modelli associati
    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: User,
          as: 'User',
        },
        {
          model: Product,
          as: 'Product',
          through: 'orderproducts',
        },
      ],
    });

    if (order) {
      // Aggiorna l'ordine
      await order.update(req.body);

      // Aggiorna l'associazione del prodotto se è stato fornito productId
      if (productId) {
        const product = await Product.findByPk(productId);

        if (product) {
          await order.setProducts([product]);
        } else {
          res.status(404).json({ error: 'Product not found' });
          return;
        }
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
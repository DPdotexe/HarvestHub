const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// get all orders route
router.get('/', orderController.getAllOrders);

// filter by date route
router.get('/date', orderController.getOrdersByDate);


router.get('/:id', orderController.getOrder);

// create order route
router.post('/', orderController.createOrder);

// get order route
router.put('/:id', orderController.updateOrder);

// delete order route
router.delete('/:id', orderController.deleteOrder);

module.exports = router;

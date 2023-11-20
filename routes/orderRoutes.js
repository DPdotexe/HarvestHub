const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Rotta per ottenere tutti gli ordini
router.get('/', orderController.getAllOrders);

// Rotta per ottenere gli ordini filtrati per data
router.get('/date', orderController.getOrdersByDate);


router.get('/:id', orderController.getOrder);

// Rotta per creare un nuovo ordine
router.post('/', orderController.createOrder);

// Rotta per aggiornare un ordine esistente
router.put('/:id', orderController.updateOrder);

// Rotta per cancellare un ordine
router.delete('/:id', orderController.deleteOrder);

module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create a new user
router.post('/users', userController.createUser);

// Get a specific user
router.get('/users/:id', userController.getUser);

// Update a user
router.put('/users/:id', userController.updateUser);

// Delete a user
router.delete('/users/:id', userController.deleteUser);

module.exports = router;

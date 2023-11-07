const { User } = require('../models/User');

// Create a new user
const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email } = req.body;

    // Create a new user
    const user = await User.create({ first_name, last_name, email });

    res.status(201).json({ message: 'User inserted successfully' });
  } catch (error) {
    console.error('Error while inserting the user:', error);
    res.status(500).json({ error: 'Error while inserting the user' });
  }
};

// Get a specific user
const getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID
    const user = await User.findByPk(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error while reading the user:', error);
    res.status(500).json({ error: 'Error while reading the user' });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { first_name, last_name, email } = req.body;

    // Find the user by ID
    const user = await User.findByPk(userId);

    if (user) {
      // Update user information
      await user.update({ first_name, last_name, email });

      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error while updating the user:', error);
    res.status(500).json({ error: 'Error while updating the user' });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID
    const user = await User.findByPk(userId);

    if (user) {
      // Delete the user
      await user.destroy();
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error while deleting the user:', error);
    res.status(500).json({ error: 'Error while deleting the user' });
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  deleteUser,
};

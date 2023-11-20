const { Op, Sequelize } = require('sequelize');
const  User  = require('../models/User');


////// create user

const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email } = req.body;
    const user = await User.create({ first_name, last_name, email });

    console.log('User inserted successfully:', user);
    res.status(201).json({ message: 'User inserted successfully' });
  } catch (error) {
    console.error('Error while inserting the user:', error);
    res.status(500).json({ error: 'Error while inserting the user' });
  }
};


///// get all users

const getAllUsers = async (req, res) => {
  try {
    console.log('User model:', User); 
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error while getting users:', error);
    res.status(500).json({ error: 'Error while getting users' });
  }
};

//////// update user

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
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

/////// update user

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { first_name, last_name, email } = req.body;

    const user = await User.findByPk(userId);

    if (user) {
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

//////// delete user

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);

    if (user) {
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
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};

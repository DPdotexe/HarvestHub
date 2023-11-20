// models/Order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');

const Order = sequelize.define(
  'Order',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// Aggiungi l'alias 'User' alla relazione con User
Order.belongsToMany(User, { through: 'orderusers', as: 'User', foreignKey: 'orderId' });

// Aggiungi l'alias 'Product' alla relazione con Product
Order.belongsToMany(Product, { through: 'orderproducts', as: 'Product', foreignKey: 'orderId' });

module.exports = Order;

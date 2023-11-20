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


Order.belongsToMany(User, { through: 'orderusers', as: 'User', foreignKey: 'orderId' });
Order.belongsToMany(Product, { through: 'orderproducts', as: 'Product', foreignKey: 'orderId' });

module.exports = Order;

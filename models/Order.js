// models/Order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');
const User = require('./User');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  order_date: DataTypes.DATE,
});

// Definisci le relazioni tra modelli
Order.belongsToMany(Product, { through: 'OrderProducts' });
Order.belongsTo(User);

module.exports = Order;

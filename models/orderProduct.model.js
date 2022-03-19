const { DataTypes, Model } = require('sequelize');
const sequelize = require('../data/database-mysql');

const Order_Product = sequelize.define(
  'Order_Product',
  {
    quantity: DataTypes.INTEGER,
  },
  { timestamps: false }
);

module.exports = Order_Product;

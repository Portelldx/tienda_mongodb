const { Model, DataTypes } = require('sequelize');
const sequelize = require('../data/database-mysql');
const Product = require('./product.model');
const Order = require('./order.model');

const OrderProduct = sequelize.define(
  'OrderProduct',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { timestamps: false }
);

Order.belongsToMany(Product, { through: OrderProduct, as: 'items' });
Product.belongsToMany(Order, { through: OrderProduct, as: 'orders' });
module.exports = OrderProduct;

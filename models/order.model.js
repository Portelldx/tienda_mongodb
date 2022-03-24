const { Model, DataTypes } = require('sequelize');
const sequelize = require('../data/database-mysql');
const Product = require('./product.model');
const User = require('./user.model');

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['pending', 'fulfilled', 'cancelled'],
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    totalQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Order',
  }
);

Order.belongsTo(User, { as: 'user' });

module.exports = Order;

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../data/database-mysql');
const Order = require('./order.model');
const Order_Product = require('./orderProduct.model');
class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.VIRTUAL,
      get() {
        const rawValue = this.getDataValue('image');
        return `/products/assets/images/${rawValue}`;
      },
      set() {
        throw new Error('Do not try to set the `imageUrl` value!');
      },
    },
  },
  {
    sequelize,
    modelName: 'Products',
  }
);

Product.belongsToMany(Order, { through: Order_Product });

module.exports = Product;

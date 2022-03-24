const Order = require('../models/order.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');

const OrderProduct = require('../models/orderProduct.model');

async function getOrders(req, res, next) {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, as: 'user' },
        { model: Product, as: 'items' },
      ],
      where: { UserId: res.locals.uid },
    });
    res.render('customer/orders/all-orders', {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart;

  let user;
  try {
    user = await User.findByPk(res.locals.uid);
  } catch (error) {
    return next(error);
  }
  const order = await Order.create({
    status: 'pending',
    totalQuantity: cart.totalQuantity,
    totalPrice: cart.totalPrice,
  });

  order.setUser(user);
  cart.items.forEach((item) =>
    OrderProduct.create({
      quantity: item.quantity,
      totalPrice: item.totalPrice,
      OrderId: order.id,
      ProductId: item.id,
    })
  );

  req.session.cart = null;

  res.redirect('/orders');
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
};

const Order = require('../models/order.model');
const User = require('../models/user.model');

async function getOrders(req, res, next) {
  try {
    const orders = await Order.findAll({
      include: { model: User, as: 'user' },
      where: { UserId: res.locals.uid },
    });
    console.log('----->', orders[0].user);
    res.render('customer/orders/all-orders', {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart;
  console.log(cart.items[0].product);
  let user;
  try {
    user = await User.findByPk(res.locals.uid);
  } catch (error) {
    return next(error);
  }

  const order = await Order.create({
    status: 'pending',
  });

  order.setUser(user);
  cart.items.forEach(({ product }) => product.setOrders([order]));

  req.session.cart = null;

  res.redirect('/orders');
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
};

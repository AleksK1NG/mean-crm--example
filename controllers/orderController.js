const Order = require('../models/Order');
const errorHandler = require('../utils/errorsHandler');

// @GET api/v1/order?offset=2&limit=5
module.exports.getAllOrders = async (req, res) => {
  const user = req.user;
  const { offset, limit, startDate, endDate, order } = req.query;

  const query = {
    user: user._id
  };

  // start = Start Date
  if (startDate) {
    query.date = {
      $gte: startDate
    };
  }

  if (endDate) {
    if (!query.date) {
      query.date = {};
    }

    query.date['$lte'] = endDate;
  }

  if (order) {
    query.order = +order;
  }

  try {
    // + - convert String to Integer
    const orders = await Order.find(query)
      .sort({ date: -1 })
      .skip(+offset)
      .limit(+limit);

    res.json(orders);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.createOrder = async (req, res) => {
  const user = req.user;
  const { list } = req.body;
  try {
    const lastOrder = Order.findOne({ user: user._id }).sort({ date: -1 });
    const maxOrder = lastOrder ? lastOrder.order : 0;

    const order = new Order({
      user: user._id,
      list,
      order: maxOrder + 1
    });

    await order.save();

    res.json(order);
  } catch (error) {
    errorHandler(res, error);
  }
};

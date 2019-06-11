const Order = require('../models/Order');
const errorHandler = require('../utils/errorsHandler');
const getOrdersMap = require('../utils/getOrdersMap');
const calculatePrice = require('../utils/calculatePrice');
const moment = require('moment');

module.exports.overview = async (req, res) => {
  const user = req.user;

  try {
    const allOrders = await Order.find({ user: user._id }).sort(1);
    const ordersMap = getOrdersMap(allOrders);
    const yesterdayOrders =
      ordersMap[
        moment()
          .add(-1, 'd')
          .format('DD.MM.YYYY')
      ] || [];

    const yesterdayOrdersNumber = yesterdayOrders.length;
    const totalOrdersNumber = allOrders.length;
    const daysNumber = Object.keys(ordersMap).length;
    const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(0);
    const ordersPercent = ((yesterdayOrdersNumber / ordersPerDay - 1) * 100).toFixed(2);
    const totalGain = calculatePrice(allOrders);
    const gainPerDay = totalGain / daysNumber;
    const yesterdayGain = calculatePrice(yesterdayOrders);
    const gainPercent = ((yesterdayGain / gainPerDay - 1) * 100).toFixed(2);
    const compareGain = (yesterdayGain - gainPerDay).toFixed(2);
    const compareNumber = (yesterdayOrdersNumber - ordersPerDay).toFixed(2);

    res.status(200).json({
      gain: {
        percent: Math.abs(+gainPercent),
        compare: Math.abs(+compareGain),
        yesterday: +yesterdayGain,
        isHigher: +gainPercent > 0
      },
      orders: {
        percent: Math.abs(+ordersPercent),
        compare: Math.abs(+compareNumber),
        yesterday: +yesterdayOrdersNumber,
        isHigher: +ordersPercent > 0
      }
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports.analytics = async (req, res) => {
  const user = req.user;

  try {
    const allOrders = await Order.find({ user: user._id });

    res.json(categories);
  } catch (error) {
    errorHandler(res, error);
  }
};

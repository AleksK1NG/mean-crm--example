module.exports = function calculatePrice(orders = []) {
  return orders.reduce((total, order) => {
    const orderPrice = order.list.reduce((acc, item) => {
      acc += item.cost * item.quantity;
      return acc;
    }, 0);
    total += orderPrice;
    return total;
  }, 0);
};

const Order = require("../../models/order.model");
const Status = require("../../enums/status.enum");

async function createOrder({ customer, executor, adress, typeOfCleaning, description, date, expectedTime, regularity }) {
  const order = new Order({
    customer,
    executor,
    adress,
    typeOfCleaning,
    description,
    date,
    expectedTime,
    regularity,
    status: Status.New
  });
  order.save();
  return order;
}

async function getOrders(userId) {
  return await Order.find({ customer: userId })
    .populate("customer")
    .exec();
}

async function acceptOrder(orderId) {
  Order.findById(orderId, (err, res) => {
    if (res.status !== Status.New) throw "Заказ не новый"
  })

  return await Order.findByIdAndUpdate(
    orderId,
    { "status":  Status.Accepted })
    .exec();
}

async function cancelOrder(orderId) {
  Order.findById(orderId, (err, res) => {
    if (res.status !== Status.New) throw "Заказ не новый"
  })

  return await Order.findByIdAndUpdate(
    orderId,
    { "status":  Status.Canceled })
    .exec();
}

module.exports = {
  createOrder,
  getOrders,
  acceptOrder,
  cancelOrder
};
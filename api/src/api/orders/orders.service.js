const Order = require("../../models/order.model");
const Status = require("../../enums/status.enum");
const httpStatus = require("http-status");
const Role = require('../../enums/roles.enum')

async function createOrder({
  customer,
  executor,
  adress,
  typeOfCleaning,
  description,
  date,
  expectedTime,
  regularity
}) {
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

async function getOrders(user) {
  if (user.role == Role.User) {
    return await Order.find({ customer: user.id })
      // .populate("customer")
      .exec();
  } else if (user.role == Role.Executor) {
    return await Order.find({ executor: user.id })
      // .populate("executor")
      .exec();
  }
}

async function acceptOrder(orderId) {
  return await Order.findByIdAndUpdate(orderId, {
    status: Status.Accepted
  }).exec();
}

async function cancelOrder(orderId) {
  console.log(`orderId = ${orderId}`);
  return await Order.findByIdAndUpdate(orderId, {
    status: Status.Canceled
  }).exec();
}

async function confirmOrder(orderId) {
  return await Order.findByIdAndUpdate(orderId, {
    status: Status.Done
  }).exec();
}

module.exports = {
  createOrder,
  getOrders,
  acceptOrder,
  cancelOrder,
  confirmOrder
};

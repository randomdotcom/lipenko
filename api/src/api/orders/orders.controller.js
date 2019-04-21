const entity = "orders";

const httpStatus = require("http-status");
const service = require(`./${entity}.service`);
const Status = require("../../enums/status.enum");
const { sendOrderStatusMessage } = require("../../config/nodemailer");

module.exports.get = (req, res, next) => {
  service
    .getOrders(req.user, req.query)
    .then(orders => res.status(httpStatus.OK).json(orders))
    .catch(err => {
      res.status(httpStatus.CONFLICT).send(err.message);
    });
};

module.exports.getById = (req, res) => {
  res.send(`getById: ${req.params.id}`);
};

module.exports.create = (req, res) => {
  service
    .createOrder(req.body)
    .then(data => {
      sendOrderStatusMessage(data.email, data.orderId, null, Status.Done);
    })
    .then(() => {
      res.status(httpStatus.CREATED).json("Created");
    })
    .catch(err => {
      res.status(httpStatus.CONFLICT).send(err.message);
    });
};

module.exports.accept = (req, res) => {
  service
    .acceptOrder(req.body.orderId)
    .then(() => {
      res.status(httpStatus.OK).json("Order accepted");
    })
    .catch(err => {
      res.status(httpStatus.CONFLICT).send(err.message);
    });
};

module.exports.cancel = (req, res) => {
  service
    .cancelOrder(req.body)
    .then(() => {
      res.status(httpStatus.OK).json("Order canceled");
    })
    .catch(err => {
      res.status(httpStatus.CONFLICT).send(err.message);
    });
};

module.exports.confirm = (req, res) => {
  service
    .confirmOrder(req.body.orderId)
    .then(() => {
      res.status(httpStatus.OK).json("Order confirmed");
    })
    .catch(err => {
      res.status(httpStatus.CONFLICT).send(err.message);
    });
};

module.exports.history = (req, res, next) => {
  service
    .ordersHistory(req.user)
    .then(orders => {
      res.status(httpStatus.OK).json(orders);
    })
    .catch(err => {
      res.status(httpStatus.CONFLICT).send(err.message);
    });
};

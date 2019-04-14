const entity = "orders";

const httpStatus = require("http-status");
const service = require(`./${entity}.service`);
const Status = require("../../enums/status.enum");
const Order = require("../../models/order.model");

module.exports.get = (req, res, next) => {
  service
    .getOrders(req.user)
    .then(orders => res.status(httpStatus.OK).json(orders))
    .catch(err => {
      res.send(err.message);
    });
};

module.exports.getById = (req, res) => {
  res.send(`getById: ${req.params.id}`);
};

module.exports.create = (req, res) => {
  service
    .createOrder(req.body)
    .then(() => {
      res.status(httpStatus.CREATED).json("Created");
    })
    .catch(err => {
      res.send(err.message);
    });
};

module.exports.accept = (req, res) => {
  Order.find(
    {
      _id: req.body.orderId,
      executor: req.user.id
    },
    (err, order) => {
      if (err) return res.send(err);
      if (!order[0].status) return res.send("Нет доступа");
      if (order[0].status != Status.New) return res.send("Заказ не новый");

      service
        .acceptOrder(req.body.orderId)
        .then(() => {
          res.status(httpStatus.OK).json("Order accepted");
        })
        .catch(err => {
          res.send(err.message);
        });
    }
  );
};

module.exports.cancel = (req, res) => {
  Order.find(
    {
      $or: [
        { _id: req.body.orderId, customer: req.user.id },
        { _id: req.body.orderId, executor: req.user.id }
      ]
    },
    (err, order) => {
      if (err) return res.send(err);
      if (!order[0].status) return res.send("Нет доступа");
      if (order[0].status != Status.New) return res.send("Заказ не новый");

      service
        .cancelOrder(req.body.orderId)
        .then(() => {
          res.status(httpStatus.OK).json("Order canceled");
        })
        .catch(err => {
          res.send(err.message);
        });
    }
  );
};

module.exports.confirm = (req, res) => {
  Order.find(
    {
      _id: req.body.orderId,
      customer: req.user.id
    },
    (err, order) => {
      if (err) return res.send(err);
      if (!order[0].status) return res.send("Нет доступа");
      if (order[0].status != Status.Accepted)
        return res.send(`Заказ не со статусом "Accepted"`);

      service
        .confirmOrder(req.body.orderId)
        .then(() => {
          res.status(httpStatus.OK).json("Order confirmed");
        })
        .catch(err => {
          res.send(err.message);
        });
    }
  );
};

module.exports.history = (req, res, next) => {
  service
    .ordersHistory(req.user)
    .then(orders => {
      res.status(httpStatus.OK).json(orders);
    })
    .catch(err => {
      res.send(err.message);
    });
};

const entity = "orders";

const httpStatus = require("http-status");
const service = require(`./${entity}.service`);
const Status = require("../../enums/status.enum");
const Order = require('../../models/order.model')


module.exports.get = (req, res, next) => {
  service
    .getOrders(req.user)
    .then(orders => res.status(httpStatus.OK).json(orders))
    .catch(err => next(err));
};

module.exports.getById = (req, res) => {
  res.send(`getById: ${req.params.id}`);
};

module.exports.create = (req, res) => {
  const model = {
    customer: req.user.id,
    ...req.body
  };

  service
    .createOrder(model)
    .then(() => {
      res.status(httpStatus.CREATED).json("Created");
    })
    .catch(err => next(err));
};

module.exports.accept = (req, res) => {
  if (req.body.status !== Status.New) res.send("Заказ не новый");
  else {
    service
      .acceptOrder(req.body.orderId)
      .then(() => {
        res.status(httpStatus.OK).json("Order accepted");
      })
      .catch(err => {
        res.send(err);
      });
  }
};

module.exports.cancel = (req, res) => {
  Order.findById(req.body.orderId, (err, doc) => {
    if (doc.status !== Status.New) res.send("Заказ не новый");
    if (req.user.id !== (doc.executor | doc.customer)) res.send("Нет доступа");
    else {
      service
        .cancelOrder(req.user.id, req.body.orderId)
        .then(() => {
          res.status(httpStatus.OK).json("Order canceled");
        })
        .catch(err => {
          res.send(err);
        });
    }
  });
};

module.exports.confirm = (req, res) => {
  Order.findById(req.body.orderId, (err, doc) => {
    if (doc.status !== "accepted") res.send("Заказ не принят");
    console.log(req.user.id);
    console.log(doc.customer);
    if (req.user.id != doc.customer) res.send("Нет доступа");
    else {
      service
        .confirmOrder(req.user.id, req.body.orderId)
        .then(() => {
          res.status(httpStatus.OK).json("Order confirmed");
        })
        .catch(err => {
          res.send(err);
        });
    }
  });
};

// module.exports.put = (req, res) => {
//   res.send("put");
// };

// module.exports.delete = (req, res) => {
//   res.send("delete");
// };

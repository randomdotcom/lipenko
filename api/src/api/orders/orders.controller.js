const entity = "orders";

const httpStatus = require("http-status");
const service = require(`./${entity}.service`);

module.exports.get = (req, res) => {
  service
    .getOrders(req.user.id)
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
  service
    .acceptOrder(req.body.orderId)
    .then(() => {
      res.status(httpStatus.OK).json("Order accepted");
    })
};

module.exports.cancel = (req, res) => {
  service
    .cancelOrder(req.body.orderId)
    .then(() => {
      res.status(httpStatus.OK).json("Order canceled");
    })
};

// module.exports.put = (req, res) => {
//   res.send("put");
// };

// module.exports.delete = (req, res) => {
//   res.send("delete");
// };

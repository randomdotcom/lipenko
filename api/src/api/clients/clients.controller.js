const entity = "clients";

const httpStatus = require("http-status");
const service = require(`./${entity}.service`);
const Role = require("../../enums/roles.enum");

///

module.exports.signin = (req, res, next) => {
  service
    .authenticate(req.body)
    .then(user =>
      user
        ? res.json(user)
        : res
            .status(httpStatus.UNAUTHORIZED)
            .json({ message: "Username or password is incorrect" })
    )
    .catch(err => next(err));
};

module.exports.signout = (req, res, next) => {
  service.logout(req.body).then(result => {
    result
      ? res.status(httpStatus.OK).json("Ok")
      : res.status(httpStatus.INTERNAL_SERVER_ERROR).json("Internal Error");
  });
};

////

module.exports.register = (req, res, next) => {
  service
    .register(req.body, Role.User)
    .then(() => {
      res.status(httpStatus.CREATED).json("Created");
    })
    .catch(err => next(err));
};

module.exports.get = (req, res, next) => {
  service
    .getClients()
    .then(companies => res.status(httpStatus.OK).json(companies))
    .catch(err => next(err));
};

module.exports.block = (req, res, next) => {
  service
    .blockClient(req.body)
    .then(() => {
      res.status(httpStatus.OK).json(`Client ${req.body.username} blocked`);
    })
    .catch(err => next(err));
};

module.exports.unblock = (req, res, next) => {
  service
    .unblockClient(req.body)
    .then(() => {
      res.status(httpStatus.OK).json(`Client ${req.body.username} unblocked`);
    })
    .catch(err => next(err));
};

module.exports.edit = (req, res, next) => {
  if (req.body.email && req.body.password && req.body.phoneNumber) {
    service
      .editProfile(req.user.id, req.body)
      .then(() => {
        res.status(httpStatus.OK).json(`Profile ${req.user.id} edited`);
      })
      .catch(err => next(err));
  }
};

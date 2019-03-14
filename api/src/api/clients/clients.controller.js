const entity = "clients";

const httpStatus = require("http-status");
const service = require(`./${entity}.service`);
const Role = require("../../enums/roles.enum");

var randtoken = require('rand-token');

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

module.exports.register = (req, res, next) => {
  service
    .register(req.body, Role.User)
    .then(() => {
      res.status(httpStatus.CREATED).json("Created");
    })
    .catch(err => next(err));
};

module.exports.confirm = (req, res, next) => {
  service
    .confirmEmail(req.query.token)
    .then(user => {
      res.status(httpStatus.CREATED).json(user);
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
    .blockClient(req.params.id, req.body)
    .then(() => {
      res.status(httpStatus.OK).json(`Client ${req.params.id} blocked`);
    })
    .catch(err => next(err));
};

module.exports.unblock = (req, res, next) => {
  service
    .unblockClient(req.params.id)
    .then(() => {
      res.status(httpStatus.OK).json(`Client ${req.params.id} unblocked`);
    })
    .catch(err => next(err));
};

module.exports.edit = (req, res, next) => {
  if (
    req.body.email &&
    req.body.password &&
    req.body.phoneNumber
  ) {
    service
      .editProfile(req.user.id, req.body)
      .then(() => {
        res.status(httpStatus.OK).json(`Profile ${req.user.id} edited`);
      })
      .catch(err => next(err));
  } else res.send("Введены не все данные");
};

module.exports.authSocialNetwork = (req,res,next)=>{
  service
      .authSocialNetwork(req.user)
      .then(data => res.status(httpStatus.OK).json(data))
      .catch(err => next(err));
}
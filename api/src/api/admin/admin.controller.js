const entity = "admin";
const httpStatus = require("http-status");
const service = require(`./${entity}.service`);
const Role = require("../../enums/roles.enum");

module.exports.signin = (req, res, next) => {
  service
    .authenticate(req.body)
    .then(user =>
      user
        ? res.json(user)
        : res
            .status(httpStatus.UNAUTHORIZED)
            .send("Неверное имя пользователя или пароль")
    )
    .catch(err => {
      res.status(httpStatus.CONFLICT).send(err.message);
    });
};

module.exports.current = (req, res, next) => {
  service
    .getCurrent(req.user.id)
    .then(user => {
      res.status(httpStatus.OK).json(user);
    })
    .catch(err => {
      res.status(httpStatus.UNAUTHORIZED).send(err.message);
    });
};

module.exports.register = (req, res, next) => {
  service
    .register(req.body, Role.Admin)
    .then(() => {
      res.status(httpStatus.CREATED).json("Created");
    })
    .catch(err => {
      res.status(httpStatus.BAD_REQUEST).send(err.message);
    });
};

module.exports.edit = (req, res, next) => {
  service
    .editProfile(req.user.id, req.body)
    .then(() => {
      res.status(httpStatus.OK).json(`Profile ${req.user.id} edited`);
    })
    .catch(err => {
      res.status(httpStatus.CONFLICT).send(err.message);
    });
};

module.exports.newPassword = (req, res, next) => {
  service
    .newPassword(req.user.id, req.body)
    .then(() => {
      res.status(httpStatus.OK).json(`Profile ${req.user.id} edited`);
    })
    .catch(err => {
      res.status(httpStatus.CONFLICT).send(err.message);
    });
};

const entity = "admin";
const httpStatus = require("http-status");
const userService = require(`./${entity}.service`);
const Role = require("../../enums/roles.enum");

module.exports.signin = (req, res, next) => {
  userService
    .authenticate(req.body)
    .then(user =>
      user
        ? res.json(user)
        : res
            .status(httpStatus.UNAUTHORIZED)
            .send("Username or password is incorrect")
    )
    .catch(err => {
      res.status(httpStatus.CONFLICT).send(err.message);
    });
};

module.exports.register = (req, res, next) => {
  userService
    .register(req.body, Role.Admin)
    .then(() => {
      res.status(httpStatus.CREATED).json("Created");
    })
    .catch(err => {
      res.status(httpStatus.CONFLICT).status(httpStatus.BAD_REQUEST).send(err.message);
    });
};

module.exports.edit = (req, res, next) => {
  if (req.body.password) {
    service
      .editProfile(req.user.id, req.body)
      .then(() => {
        res.status(httpStatus.OK).json(`Profile ${req.user.id} edited`);
      })
      .catch(err => {
        res.status(httpStatus.CONFLICT).send(err.message);
      });
  } else res.status(httpStatus.CONFLICT).send("Введены не все данные");
};

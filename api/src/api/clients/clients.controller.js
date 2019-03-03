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
      res.status(httpStatus.OK).json(`Client ${req.body.username} is blocked`) 
    })
    .catch(err => next(err));
};

module.exports.unblock = (req, res, next) => {
  service
    .unblockClient(req.body)
    .then(() => { 
      res.status(httpStatus.OK).json(`Client ${req.body.username} is unblocked`) 
    })
    .catch(err => next(err));
};

// module.exports.getById = async (req, res) => {
//   res.send(`get client ${req.params.id}`);
// };

// module.exports.post = async (req, res) => {
//   res.send("create client");
// };

// module.exports.put = async (req, res) => {
//   res.send("edit client");
// };

// module.exports.delete = async (req, res) => {
//   res.send("delete client");
// };

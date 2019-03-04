const entity = "admin";

const httpStatus = require("http-status");
const userService = require(`./${entity}.service`);
const Role = require("../../enums/roles.enum");

///

module.exports.signin = (req, res, next) => {
  userService
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
  userService.logout(req.body).then(result => {
    result
      ? res.status(httpStatus.OK).json("Ok")
      : res.status(httpStatus.INTERNAL_SERVER_ERROR).json("Internal Error");
  });
};

////

module.exports.register = (req, res, next) => {
  console.log('тут')
  userService
    .register(req.body, Role.Admin)
    .then(() => {
      res.status(httpStatus.CREATED).json("Created");
    })
    .catch(err => next(err));
};

// module.exports.get = async (req, res) => {
//   res.send(`get collection of clients`);
// };

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

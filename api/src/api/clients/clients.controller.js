const entity = "clients";

const httpStatus = require("http-status");
const userService = require(`./${entity}.service`);

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

module.exports.get = async (req, res) => {
  res.send(`get collection of clients`);
};

module.exports.getById = async (req, res) => {
  res.send(`get client ${req.params.id}`);
};

module.exports.post = async (req, res) => {
  res.send("create client");
};

module.exports.put = async (req, res) => {
  res.send("edit client");
};

module.exports.delete = async (req, res) => {
  res.send("delete client");
};

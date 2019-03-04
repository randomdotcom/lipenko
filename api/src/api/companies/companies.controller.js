const entity = "companies";

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
    .register(req.body, Role.Executor)
    .then(() => {
      res.status(httpStatus.CREATED).json("Created");
    })
    .catch(err => next(err));
};

module.exports.get = (req, res, next) => {
  service
    .getCompanies()
    .then(companies => res.status(httpStatus.OK).json(companies))
    .catch(err => next(err));
};

module.exports.block = (req, res, next) => {
  service
    .blockCompany(req.body)
    .then(() => { 
      res.status(httpStatus.OK).json(`Company ${req.body.username} blocked`) 
    })
    .catch(err => next(err));
};

module.exports.unblock = (req, res, next) => {
  service
    .unblockCompany(req.body)
    .then(() => { 
      res.status(httpStatus.OK).json(`Company ${req.body.username} unblocked`) 
    })
    .catch(err => next(err));
};

module.exports.rate = (req, res, next) => {
  service
    .rateCompany(req.user.id, req.body)
    .then(() => { 
      res.status(httpStatus.OK).json(`Company ${req.body.username} rated`) 
    })
    .catch(err => next(err));
};

// module.exports.getById = async (req, res) => {
//     res.send(`get company ${req.params.id}`)
// }

// module.exports.post = async (req, res) => {
//     res.send('create company')
// }

// module.exports.put = async (req, res) => {
//     res.send('edit company')
// }

// module.exports.delete = async (req, res) => {
//     res.send('delete company')
// }

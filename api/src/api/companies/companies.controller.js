const entity = "companies";

const httpStatus = require("http-status");
const service = require(`./${entity}.service`);
const Role = require("../../enums/roles.enum");

const { sendExecutorConfirmationMessage } = require("../../config/nodemailer");

module.exports.get = (req, res, next) => {
  service
    .getCompanies(req.query)
    .then(companies => res.status(httpStatus.OK).json(companies))
    .catch(err => {
      res.send(err.message);
    });
};

module.exports.getById = (req, res, next) => {
  service
    .getCompanyById(req.params.id)
    .then(company => res.status(httpStatus.OK).json(company))
    .catch(err => {
      res.send(err.message);
    });
};

module.exports.signin = (req, res, next) => {
  service
    .authenticate(req.body)
    .then(user => {
      if (user.isVerified === false) {
        res.status(httpStatus.OK).json({ isVerified: user.isVerified });
      } else if (user) {
        res.status(httpStatus.OK).json(user);
      } else {
        res
          .status(httpStatus.UNAUTHORIZED)
          .send("Username or password is incorrect");
      }
    })
    .catch(err => {
      res.status(httpStatus.UNAUTHORIZED).send(err.message);
    });
};

module.exports.signout = (req, res, next) => {
  service
    .logout(req.body)
    .then(result => {
      result
        ? res.status(httpStatus.OK).json("Ok")
        : res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Internal Error");
    })
    .catch(err => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    });
};

module.exports.register = (req, res, next) => {
  console.log(req.body);
  service
    .register(req.body, Role.Executor)
    .then(({ email, username, verificationCode }) => {
      return sendExecutorConfirmationMessage(email, username, verificationCode);
    })
    .then(() => {
      res.status(httpStatus.CREATED).json("Created");
    })
    .catch(err => {
      res.send(err.message);
    });
};

module.exports.confirm = (req, res, next) => {
  service
    .confirmEmail(req.body.token)
    .then(user => {
      res.status(httpStatus.CREATED).json(user);
    })
    .catch(err => {
      res.status(httpStatus.NOT_FOUND).send(err.message);
    });
};

module.exports.newVerificationCode = (req, res, next) => {
  service
    .newVerificationCode(req.body)
    .then(({ email, username, verificationCode }) => {
      return sendExecutorConfirmationMessage(email, username, verificationCode);
    })
    .then(() => {
      res.status(httpStatus.CREATED).json("Created");
    })
    .catch(err => {
      res.send(err.message);
    });
};

module.exports.block = (req, res, next) => {
  service
    .blockCompany(req.params.id, req.body)
    .then(() => {
      res.status(httpStatus.OK).json(`Company ${req.params.id} blocked`);
    })
    .catch(err => {
      res.send(err.message);
    });
};

module.exports.unblock = (req, res, next) => {
  service
    .unblockCompany(req.params.id)
    .then(() => {
      res.status(httpStatus.OK).json(`Company ${req.params.id} unblocked`);
    })
    .catch(err => {
      res.send(err.message);
    });
};

module.exports.rate = (req, res, next) => {
  if ((req.body.value > 5) | (req.body.value < 0))
    return res.send("Неверная оценка");

  service
    .rateCompany(req.user.id, req.body, req.params.id)
    .then(() => {
      res.status(httpStatus.OK).json(`Company ${req.params.id} rated`);
    })
    .catch(err => {
      res.send(err.message);
    });
};

module.exports.editMain = (req, res, next) => {
  service
    .editMainInfoProfile(req.user.id, req.body)
    .then(() => {
      res.status(httpStatus.OK).json(`Company ${req.user.id} edited`);
    })
    .catch(err => res.send(err.message));
};

module.exports.editTypesOfCleaning = (req, res, next) => {
  service
    .editTypesOfCleaning(req.user.id, req.body)
    .then(data => {
      res.status(httpStatus.OK).json(data);
    })
    .catch(err => res.send(err.message));
};

module.exports.newPassword = (req, res, next) => {
  service
    .newPassword(req.user.id, req.body)
    .then(() => {
      res.status(httpStatus.OK).json(`Profile ${req.user.id} edited`);
    })
    .catch(err => {
      res.send(err.message);
    });
};

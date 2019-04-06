const entity = "clients";
const httpStatus = require("http-status");
const service = require(`./${entity}.service`);
const Role = require("../../enums/roles.enum");

const { sendUserConfirmationMessage } = require("../../config/nodemailer");

module.exports.signin = (req, res, next) => {
  console.log(`req.body: ${req.body}`);
  service
    .authenticate(req.body)
    .then(user => {
      if (user.isVerified === false) {
        res.status(httpStatus.OK).json({ isVerified: false });
      } else if (user) {
        res.status(httpStatus.OK).json(user);
      } else {
        res
          .status(httpStatus.UNAUTHORIZED)
          .json({ error: "Username or password is incorrect" });
      }
    })
    .catch(err => {
      res.status(httpStatus.UNAUTHORIZED).send(err.message);
    });
};

module.exports.signout = (req, res, next) => {
  service.logout(req.body).then(result => {
    result
      ? res.status(httpStatus.OK).json("Ok")
      : res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .send(`Внутренняя ошибка сервера`);
  });
};

module.exports.register = (req, res, next) => {
  service
    .register(req.body, Role.User)
    .then(({ email, username, verificationCode }) => {
      sendUserConfirmationMessage(email, username, verificationCode);
      return username;
    })
    .then(username => {
      res.status(httpStatus.CREATED).json({ username });
    })
    .catch(err => {
      send(err.message);
    });
};

module.exports.newVerificationCode = (req, res, next) => {
  service
    .newVerificationCode(req.body)
    .then(({ email, username, verificationCode }) => {
      sendUserConfirmationMessage(email, username, verificationCode);
      return username;
    })
    .then(username => {
      res.status(httpStatus.CREATED).json({ username });
    })
    .catch(err => {
      res.send(err.message);
    });
};

module.exports.confirm = (req, res, next) => {
  service
    .confirmEmail(req.body)
    .then(user => {
      res.status(httpStatus.CREATED).json(user);
    })
    .catch(err => {
      res.status(httpStatus.NOT_FOUND).send(err.message);
    });
};

module.exports.get = (req, res, next) => {
  service
    .getClients()
    .then(companies => res.status(httpStatus.OK).json(companies))
    .catch(err => {
      res.send(err.message);
    });
};

module.exports.block = (req, res, next) => {
  service
    .blockClient(req.params.id, req.body)
    .then(() => {
      res
        .status(httpStatus.OK)
        .json(`Пользователь ${req.params.id} заблокирован`);
    })
    .catch(err => {
      res.send(err.message);
    });
};

module.exports.unblock = (req, res, next) => {
  service
    .unblockClient(req.params.id)
    .then(() => {
      res
        .status(httpStatus.OK)
        .json(`Пользователь ${req.params.id} разблокирован`);
    })
    .catch(err => {
      res.send(err.message);
    });
};

module.exports.edit = (req, res, next) => {
  if (req.body.email && req.body.password && req.body.phoneNumber) {
    service
      .editProfile(req.user.id, req.body)
      .then(() => {
        res.status(httpStatus.OK).json(`Profile ${req.user.id} edited`);
      })
      .catch(err => {
        res.send(err.message);
      });
  } else res.send(`Введены не все данные`);
};

module.exports.authSocialNetwork = (req, res, next) => {
  service
    .authSocialNetwork(req.user)
    .then(data => res.status(httpStatus.OK).json(data))
    .catch(err => {
      res.send(err.message);
    });
};

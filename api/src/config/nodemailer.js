const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.EMAIL}`,
    pass: `${process.env.EPASS}`
  }
});

const sendConfirmationMessage = (to, username, token) => {
  const mailOptions = {
    from: `TEST API`, // sender address
    to: `${to}`, // list of receivers
    subject: "TEST API - Подтвердите регистрацию", // Subject line
    html: `<div style="display: flex, justify-content: center"><h1>Подтвердите аккаунт <b>${username}</b></h1><h2><a href="http://${
      process.env.HOST
    }/api/clients/confirm?token=${token}">Подтвердить</a></h2></div>` // plain text body
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) res.send(err);
    else return res.send(info);
  });
};

module.exports = {
  sendConfirmationMessage
};

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
    html: `<div style="width: 100%, display: flex, justify-content: center"><h1>Подтвердите аккаунт <b>${username}</b></h1><h2><a href="http://${
      process.env.HOST
    }/api/clients/confirm?token=${token}">Подтвердить</a></h2></div>` // plain text body
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) res.send(err);
    else return res.send(info);
  });
};

const sendProfileBlockMessage = (to, username, reason) => {
  const mailOptions = {
    from: `TEST API`, // sender address
    to: `${to}`, // list of receivers
    subject: "TEST API - Изменение статуса аккаунта", // Subject line
    html: `<div style="width: 100%, display: flex, justify-content: center"><h2>Аккаунт <b>${username}</b> был заблокирован, Причина: ${reason}</h2>` // plain text body
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) res.send(err);
    else return res.send(info);
  });
};

const sendProfileUnblockMessage = (to, username) => {
  const mailOptions = {
    from: `TEST API`, // sender address
    to: `${to}`, // list of receivers
    subject: "TEST API - Изменение статуса аккаунта", // Subject line
    html: `<div style="width: 100%, display: flex, justify-content: center"><h2>Аккаунт <b>${username}</b> был разблокирован</h2>` // plain text body
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) res.send(err);
    else return res.send(info);
  });
};

const sendOrderStatusMessage = (to, orderId, status) => {
  const mailOptions = {
    from: `TEST API`,
    to: `${to}`,
    subject: "TEST API - Изменение статуса аккаунта",
    html: `<div style="width: 100%, display: flex, justify-content: center"><h2>Заказ <a href="http://${process.env.HOST}/api/orders/${orderId}">${orderId}</a> изменил статус: ${status}</h2>`
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) res.send(err);
    else return res.send(info);
  });
};

module.exports = {
  sendConfirmationMessage,
  sendProfileBlockMessage,
  sendProfileUnblockMessage,
  sendOrderStatusMessage
};

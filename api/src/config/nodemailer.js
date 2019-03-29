const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.EMAIL}`,
    pass: `${process.env.EPASS}`
  }
});

const sendUserConfirmationMessage = (to, username, token) => {
  const mailOptions = {
    from: `TEST API`, // sender address
    to: `${to}`, // list of receivers
    subject: "TEST API - Код для подтверждения регистрации", // Subject line
    html: `
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; font-size: 30pt; font-family: 'Roboto', sans-serif;">
      <p>${username}, ваш код для регистрации:</p>
      <div style="display: flex;">
        <p style="background-color: #1f1f1f; border-radius: 15px; color: #f2f2f2; padding: 5px; padding-left: 8px; padding-right: 8px;">${token}</p>
      </div>
    </div>` // plain text body
  };

  transporter.sendMail(mailOptions);
};
const sendExecutorConfirmationMessage = (to, username, token) => {
  const mailOptions = {
    from: `TEST API`, // sender address
    to: `${to}`, // list of receivers
    subject: "TEST API - Код для подтверждения регистрации", // Subject line
    html: `
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; font-size: 30pt; font-family: 'Roboto', sans-serif;">
      <p>${username}, ваш код для регистрации:</p>
      <div style="display: flex;">
        <a href="http://localhost:3000/auth/confirm?token=${token}">http://localhost:3000/auth/confirm?token=${token}</p>
      </div>
    </div>` // plain text body
  };

  transporter.sendMail(mailOptions);
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
    html: `<div style="width: 100%, display: flex, justify-content: center"><h2>Заказ <a href="http://${
      process.env.HOST
    }/api/orders/${orderId}">${orderId}</a> изменил статус: ${status}</h2>`
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) res.send(err);
    else return res.send(info);
  });
};

module.exports = {
  sendUserConfirmationMessage,
  sendExecutorConfirmationMessage,
  sendProfileBlockMessage,
  sendProfileUnblockMessage,
  sendOrderStatusMessage
};

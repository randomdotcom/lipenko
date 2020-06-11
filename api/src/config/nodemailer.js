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
    from: `CLEANING PLATFORM`, // sender address
    to: `${to}`, // list of receivers
    subject: "CLEANING PLATFORM - Код для подтверждения регистрации", // Subject line
    html: `
    <div style="display: flex; justify-content: center; align-items: center; font-size: 20pt; font-family: 'Roboto', sans-serif;">
      <span>${username}, ваш код для регистрации:</span>
      <span style="background-color: #1f1f1f; border-radius: 8px; color: #f2f2f2; padding: 6px; padding-horizontal: 20px;">${token}</span>
    </div>` // plain text body
  };

  transporter.sendMail(mailOptions);
};
const sendExecutorConfirmationMessage = (to, username, token) => {
  const mailOptions = {
    from: `CLEANING PLATFORM`, // sender address
    to: `${to}`, // list of receivers
    subject: "CLEANING PLATFORM - Код для подтверждения регистрации", // Subject line
    html: `
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; font-size: 20pt; font-family: 'Roboto', sans-serif;">
      <p>${username}, ваша ссылка для подтверждения регистрации:</p>
      <div style="display: flex;">
        <a href="http://${process.env.WEB}/confirm?token=${token}">http://localhost:3000/confirm?token=${token}</p>
      </div>
    </div>` // plain text body
  };

  transporter.sendMail(mailOptions);
};

const sendProfileBlockMessage = (to, username, reason) => {
  const mailOptions = {
    from: `CLEANING PLATFORM`, // sender address
    to: `${to}`, // list of receivers
    subject: "CLEANING PLATFORM - Изменение статуса аккаунта", // Subject line
    html: `<div style="width: 100%, display: flex, justify-content: center"><h2>Аккаунт <b>${username}</b> был заблокирован, Причина: ${reason}</h2>` // plain text body
  };

  transporter.sendMail(mailOptions);
};

const sendProfileUnblockMessage = (to, username) => {
  const mailOptions = {
    from: `CLEANING PLATFORM`, // sender address
    to: `${to}`, // list of receivers
    subject: "CLEANING PLATFORM - Изменение статуса аккаунта", // Subject line
    html: `<div style="width: 100%, display: flex, justify-content: center"><h2>Аккаунт <b>${username}</b> был разблокирован</h2>` // plain text body
  };

  transporter.sendMail(mailOptions);
};

const sendOrderStatusMessage = (to, orderId, reason, status) => {
  const html = reason
    ? `<div style="width: 100%, display: flex, justify-content: center"><h2><a href="http://${process.env.WEB}/profile/bookings?orderId=${orderId}">Заказ</a> изменил статус: ${status}. Причина: ${reason}</h2>`
    : `<div style="width: 100%, display: flex, justify-content: center"><h2><a href="http://${process.env.WEB}/profile/bookings?orderId=${orderId}">Заказ</a> изменил статус: ${status}.</h2>`;

  const mailOptions = {
    from: `CLEANING PLATFORM`,
    to: `${to}`,
    subject: "CLEANING PLATFORM - Изменение статуса чистки",
    html
  };

  transporter.sendMail(mailOptions);
};

const sendOrderCreatedMessage = (to, orderId) => {
  const html = `<div style="width: 100%, display: flex, justify-content: center"><h2>Здравствуйте, вам поступил <a href="http://${process.env.WEB}/profile/bookings?orderId=${orderId}">новый заказ</a></h2>`;

  const mailOptions = {
    from: `CLEANING PLATFORM`,
    to: `${to}`,
    subject: "CLEANING PLATFORM - Поступил новый заказ",
    html
  };

  transporter.sendMail(mailOptions);
};

module.exports = {
  sendUserConfirmationMessage,
  sendExecutorConfirmationMessage,
  sendProfileBlockMessage,
  sendProfileUnblockMessage,
  sendOrderStatusMessage,
  sendOrderCreatedMessage
};

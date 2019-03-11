const jwt = require("jsonwebtoken");
const config = require("../../config/environment");
const User = require("../../models/user.model");
const { transporter } = require("../../config/nodemailer");

var randtoken = require('rand-token');

async function authenticate({ username, password }) {
  try {
    const user = await User.findOne({ username })
      .select("+password")
      .exec();
    if (user === null) throw "User not found";
    if (user.block) throw `User blocked, reason: ${user.block}`;
    if (user.isVerified === false) throw `Пользователь не подтвердил почту`

    let success = await user.comparePassword(password);
    if (success === false) throw "Неверный пароль";

    const data = user.toObject();

    const token = jwt.sign(
      { id: data._id, role: data.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiration }
    );

    const { password: userPassword, ...userWithoutPassword } = data;

    return {
      ...userWithoutPassword,
      token
    };
  } catch (err) {
    throw new Error(err);
  }
}

async function logout({ token }) {
  return true;
}

async function register({ username, password, email, phoneNumber }, role) {
  var verificationCode = randtoken.generate(16);

  const mailOptions = {
    from: `${process.env.EMAIL}`, // sender address
    to: `${email}`, // list of receivers
    subject: "TEST API - Подтвердите регистрацию", // Subject line
    html: `<div style="display: flex, justify-content: center"><h1>Подтвердите аккаунт <b>${username}</b></h1><h2><a href="http://${process.env.HOST}/api/clients/confirm?token=${verificationCode}">Подтвердить</a></h2></div>` // plain text body
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) res.send(err);
    else return res.send(info);
  });

  const user = new User({ username, password, email, verificationCode, phoneNumber, role });

  return user.save().then(({ _id }) => User.findById(_id));
}

async function getClients() {
  return await User.find();
}

async function confirmEmail(token) {
  return await User.findOneAndUpdate({ verificationCode: token }, {new: true}, { $set: { isVerified: true }, $unset: { verificationCode: { $exist: true } } }, (err, user) => {
    if (err) return res.send(err);
  })
}

async function blockClient(userId, data) {
  return await User.findByIdAndUpdate(userId, {
    $set: { block: `${data.block}` }
  });
}

async function unblockClient(userId) {
  return await User.findByIdAndUpdate(userId, {
    $unset: { block: { $exist: true } }
  });
}

async function editProfile(userId, data) {
  return await User.findById(userId, (err, user) => {
    if (err) return res.send(err);

    user.username = data.username;
    user.password = data.password;
    user.email = data.email;
    user.phoneNumber = data.phoneNumber;

    user.save();
  });
}

module.exports = {
  authenticate,
  logout,
  register,
  getClients,
  blockClient,
  unblockClient,
  editProfile,
  confirmEmail
};

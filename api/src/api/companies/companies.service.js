const jwt = require("jsonwebtoken");
const config = require("../../config/environment");
const Executor = require("../../models/executor.model");

const { transporter } = require("../../config/nodemailer");

var randtoken = require("rand-token");

async function authenticate({ username, password }) {
  try {
    const executor = await Executor.findOne({ username })
      .select("+password")
      .exec();
    if (executor === null) throw "Company not found";
    if (executor.block) throw `Company is blocked, reason: ${executor.block}`;
    if (executor.isVerified === false) throw `Пользователь не подтвердил почту`;

    let success = await executor.comparePassword(password);
    if (success === false) throw "пароль неверный";

    const data = executor.toObject();
    const token = jwt.sign(
      { id: data._id, role: data.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiration }
    );

    const { password: executorPassword, ...executorWithoutPassword } = data;

    return {
      ...executorWithoutPassword,
      token
    };
  } catch (err) {
    throw new Error(err);
  }
}

async function logout({ token }) {
  return true;
}

async function register(
  {
    username,
    companyName,
    description,
    adress,
    typesOfCleaning,
    password,
    email,
    phoneNumber
  },
  role
) {
  var verificationCode = randtoken.generate(16);

  const mailOptions = {
    from: `${process.env.EMAIL}`, // sender address
    to: `${email}`, // list of receivers
    subject: "TEST API - Подтвердите регистрацию", // Subject line
    html: `<div style="display: flex, justify-content: center"><h1>Подтвердите аккаунт <b>${username}</b></h1><h2><a href="http://${
      process.env.HOST
      }/api/clients/confirm?token=${verificationCode}">Подтвердить</a></h2></div>` // plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) res.send(err);
    else return res.send(info);
  });

  const executor = new Executor({
    username,
    companyName,
    description,
    adress,
    typesOfCleaning,
    password,
    email,
    verificationCode,
    phoneNumber,
    role
  });
  return executor.save().then(({ _id }) => Executor.findById(_id));
}

async function confirmEmail(code) {
  let user = await Executor.findOne({ verificationCode: code })
    .select("+password")
    .exec();

  user.isVerified = true;
  user.verificationCode = undefined;

  user.save();

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
  }
}

async function getCompanies() {
  return await Executor.find();
}

async function getCompanyById(companyId) {
  return await Executor.find({ _id: companyId });
}

async function blockCompany(companyId, data) {
  return await Executor.findByIdAndUpdate(companyId, {
    $set: { block: `${data.block}` }
  });
}

async function unblockCompany(companyId) {
  return await Executor.findByIdAndUpdate(companyId, {
    $unset: { block: { $exist: true } }
  });
}

async function rateCompany(userId, data, companyId) {
  const executor = await Executor.findById(companyId, err => {
    if (err) res.send(err);
  });

  let ratingList = executor.ratingList;
  ratingList[userId] = {
    value: data.value,
    review: data.review
  };

  let rating = 0;
  for (var key in ratingList) {
    rating += ratingList[key].value;
  }
  rating = rating / Object.keys(ratingList).length;

  await Executor.findByIdAndUpdate(
    companyId,
    { $set: { rating: rating, ratingList: ratingList } },
    err => {
      if (err) res.send(err);
    }
  );
}

async function editProfile(userId, data) {
  return await Executor.findById(userId, (err, company) => {
    if (err) return res.send(err);

    company.companyName = data.companyName;
    company.description = data.description;
    company.adress = data.adress;
    company.username = data.username;
    company.password = data.password;
    company.email = data.email;
    company.phoneNumber = data.phoneNumber;

    company.save();
  });
}

module.exports = {
  authenticate,
  logout,
  register,
  getCompanies,
  blockCompany,
  unblockCompany,
  rateCompany,
  editProfile,
  getCompanyById,
  confirmEmail
};

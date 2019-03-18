const { createToken } = require("../../config/passport")
const Executor = require("../../models/executor.model");

const { sendConfirmationMessage } = require("../../config/nodemailer");

var randtoken = require("rand-token");

async function authenticate({ username, password }) {
  try {
    const executor = await Executor.findOne({ username })
      .select("+password")
      .exec();
    if (executor === null) throw "Company not found";
    if (executor.isBlocked) throw `Company is blocked, reason: ${executor.block}`;
    if (executor.isVerified === false) throw `Пользователь не подтвердил почту`;

    let success = await executor.comparePassword(password);
    if (success === false) throw "пароль неверный";

    const data = executor.toObject();

    const token = createToken(data);

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

  sendConfirmationMessage(email, username, verificationCode);

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
  const user = await Executor.findOneAndUpdate(
    { verificationCode: code },
    {
      $set: { isVerified: true },
      $unset: { verificationCode: { $exist: true } }
    }
  );

  const data = user.toObject();

  const token = createToken(data);

  const { password: userPassword, ...userWithoutPassword } = data;

  return {
    ...userWithoutPassword,
    token
  };
}

async function getCompanies() {
  return await Executor.find();
}

async function getCompanyById(companyId) {
  return await Executor.find({ _id: companyId });
}

async function blockCompany(userId, data) {
  return await Executor.findByIdAndUpdate(
    userId,
    {
      $set: { isBlocked: true, blockReason: `${data.blockReason}` }
    },
    (err, user) => {
      console.log('BLOCKED')
      if (err) throw new Error(err);
      sendProfileBlockMessage(user.email, user.username, data.blockReason);
    }
  );
}

async function unblockCompany(userId) {
  return await Executor.findByIdAndUpdate(
    userId,
    {
      $set: { isBlocked: false },
      $unset: { blockReason: { $exist: true } }
    },
    (err, user) => {
      if (err) throw new Error(err);
      sendProfileUnblockMessage(user.email, user.username);
    }
  );
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

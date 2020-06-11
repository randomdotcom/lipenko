const { createToken } = require("../../config/passport");
const User = require("../../models/user.model");
const Executor = require("../../models/executor.model");
const Admin = require("../../models/admin.model");
const {
  sendConfirmationMessage,
  sendProfileBlockMessage,
  sendProfileUnblockMessage
} = require("../../config/nodemailer");
const Role = require("../../enums/roles.enum");

const randtoken = require("rand-token").generator({
  chars: "0-9"
});

async function authenticate({ username, password }) {
  try {
    const user = await User.findOne({ username })
      .select("+password")
      .exec();
    if (user === null) throw "Пользователь не найден";

    let success = await user.comparePassword(password);
    if (success === false) throw "Неверный пароль";

    if (user.isBlocked)
      throw `Пользователь заблокирован, причина: ${user.blockReason}`;

    const data = user.toObject();

    const token = createToken(data);

    const { password: userPassword, ...userWithoutPassword } = data;

    return {
      ...userWithoutPassword,
      token
    };
  } catch (err) {
    throw new Error(err);
  }
}

async function newVerificationCode({ username }) {
  var verificationCode = randtoken.generate(6);

  const user = await User.findOne({ username })
    .select("+password")
    .exec();
  if (user === null) throw "Пользователь не найден";

  if (user.isBlocked) throw `Пользователь заблокирован, причина: ${user.blockReason}`;

  await User.findOneAndUpdate({ username }, { $set: { verificationCode } });

  return {
    email: user.email,
    username: user.username,
    verificationCode
  };
}

async function register(
  { username, password, email, phoneNumber, adress },
  role
) {
  var verificationCode = randtoken.generate(6);

  const user = new User({
    username,
    password,
    email,
    verificationCode,
    phoneNumber,
    adress,
    role
  });

  return new Promise((resolve, reject) => {
    user.save(err => {
      if (err) reject(err);

      resolve({ email, username, verificationCode });
    });
  });
}

async function getCurrent({ id, role }) {
  if (role === Role.Admin) {
    const user = await Admin.findById(id);
    return user;
  }
  if (role === Role.User) {
    const user = await User.findById(id);
    return user;
  }
  if (role === Role.Executor) {
    const user = await Executor.findById(id);
    return user;
  }

  throw new Error("Unauthorized");
}

async function getClients({
  page = 1,
  perPage = 10,
  adress,
  username,
  email,
  phone
}) {
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10,
    select: "username email adress phoneNumber isBlocked blockReason"
  };

  let query = {};

  if (username) query.username = { $regex: username };
  if (email) query.email = { $regex: email };
  if (phone) query.phoneNumber = { $regex: phone };
  if (adress) query.adress = { $regex: adress };

  const clients = await User.paginate(query, options);

  return clients;
}

async function confirmEmail({ username, verificationCode }) {
  const user = await User.findOneAndUpdate(
    { verificationCode: verificationCode },
    {
      $set: { isVerified: true },
      $unset: { verificationCode: { $exist: true } }
    }
  );

  if (!user) {
    const user = await User.findOneAndUpdate(
      { username: username },
      { $inc: { attempts: 1 } }
    );
    if (!user) throw new Error("Пользователь не существует");

    if (user.attempts >= 4) {
      await User.deleteOne({ username: username });
      throw new Error("Слишком много попыток. Аккаунт удален");
    }
    throw new Error("Неверный код подтверждения");
  }
  const data = user.toObject();

  const token = createToken(data);

  const { password: userPassword, ...userWithoutPassword } = data;

  return {
    ...userWithoutPassword,
    token
  };
}

async function blockClient(userId, data) {
  return await User.findByIdAndUpdate(
    userId,
    {
      $set: { isBlocked: true, blockReason: `${data.reason}` }
    },
    (err, user) => {
      if (err) throw new Error(err);
      sendProfileBlockMessage(user.email, user.username, data.reason);
    }
  );
}

async function unblockClient(userId) {
  return await User.findByIdAndUpdate(
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

async function editProfile(userId, data) {
  if (!userId) throw new Error("Unauthorized");
  if (!data.username | !data.email | !data.phoneNumber | !data.adress) {
    throw new Error("Wrong data");
  }

  return await User.findByIdAndUpdate(userId, {
    username: data.username,
    email: data.email,
    phoneNumber: data.phoneNumber,
    adress: data.adress
  });
}

async function newPassword(userId, data) {
  const user = await User.findById(userId)
    .select("+password")
    .exec();
  if (user === null) throw new Error("Пользователь не найден");

  let success = await user.comparePassword(data.oldPassword);
  if (success === false) throw new Error("Неверный пароль");

  user.password = data.newPassword;
  return new Promise((resolve, reject) => {
    user.save(err => {
      if (err) reject(err);

      resolve();
    });
  });
}

async function authSocialNetwork(user) {
  console.log(user);
  if (user.isBlocked)
    throw new Error(`Пользователь заблокирован, причина: ${user.blockReason}`);

  const token = createToken(user);

  return {
    user,
    token
  };
}

module.exports = {
  authenticate,
  register,
  getCurrent,
  getClients,
  blockClient,
  unblockClient,
  editProfile,
  newPassword,
  confirmEmail,
  authSocialNetwork,
  newVerificationCode
};

const { createToken } = require("../../config/passport");
const User = require("../../models/user.model");
const {
  sendConfirmationMessage,
  sendProfileBlockMessage,
  sendProfileUnblockMessage
} = require("../../config/nodemailer");

const randtoken = require("rand-token");

async function authenticate({ username, password }) {
  try {
    const user = await User.findOne({ username })
      .select("+password")
      .exec();
    if (user === null) throw "The user is not found";
    if (user.isBlocked) throw `The user is blocked, reason: ${user.block}`;
    if (user.isVerified === false) throw `Email confirmation required`;

    let success = await user.comparePassword(password);
    if (success === false) throw "The password is incorrect";

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

async function logout({ token }) {
  return true;
}

async function register({ username, password, email, phoneNumber }, role) {
  var verificationCode = randtoken.generate(16);

  const user = new User({
    username,
    password,
    email,
    verificationCode,
    phoneNumber,
    role
  });

  return user.save().then(() => ({
    email,
    username,
    verificationCode
  }));
}

async function getClients() {
  return await User.find();
}

async function confirmEmail(code) {
  const user = await User.findOneAndUpdate(
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

async function blockClient(userId, data) {
  return await User.findByIdAndUpdate(
    userId,
    {
      $set: { isBlocked: true, blockReason: `${data.blockReason}` }
    },
    (err, user) => {
      console.log("BLOCKED");
      if (err) throw new Error(err);
      sendProfileBlockMessage(user.email, user.username, data.blockReason);
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
  return await User.findById(userId, (err, user) => {
    if (err) throw new Error(err);

    user.password = data.password;
    user.email = data.email;
    user.phoneNumber = data.phoneNumber;

    user.save();
  });
}

async function authSocialNetwork(data) {
  console.log(`authSocialNetwork: ${data}`);
  if (data.isVerified) {
    const token = createToken(data);

    return {
      data,
      token
    };
  } else {
    const token = data.verificationCode;
    console.log(`authSocialNetwork, verification code: ${token}`);

    sendConfirmationMessage(data.email, data.username, data.verificationCode);

    throw new Error("Email confirmation required");
  }
}

module.exports = {
  authenticate,
  logout,
  register,
  getClients,
  blockClient,
  unblockClient,
  editProfile,
  confirmEmail,
  authSocialNetwork
};

const { createToken } = require("../../config/passport");
const User = require("../../models/user.model");
const {
  sendConfirmationMessage,
  sendProfileBlockMessage,
  sendProfileUnblockMessage
} = require("../../config/nodemailer");

const randtoken = require("rand-token").generator({
  chars: "0-9"
});

async function authenticate({ username, password }) {
  try {
    const user = await User.findOne({ username })
      .select("+password")
      .exec();
    if (user === null) throw "The user is not found";

    let success = await user.comparePassword(password);
    if (success === false) throw "The password is incorrect";

    if (user.isBlocked) throw `The user is blocked, reason: ${user.block}`;

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

async function newVerificationCode({ username }) {
  var verificationCode = randtoken.generate(6);

  const user = await User.findOne({ username })
    .select("+password")
    .exec();
  if (user === null) throw "The user is not found";

  if (user.isBlocked) throw `The user is blocked, reason: ${user.block}`;

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

async function getClients() {
  return await User.find();
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
    if (!user) throw new Error("User does not exist");

    if (user.attempts >= 4) {
      await User.deleteOne({ username: username });
      throw new Error("Too many attempts. Account deleted");
    }
    throw new Error("Verification code is incorrect");
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
  if (!userId) throw new Error("Unauthorized");
  console.log(data);
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
  if (user === null) throw new Error("The user is not found");

  let success = await user.comparePassword(data.oldPassword);
  if (success === false) throw new Error("The password is incorrect");

  user.password = data.newPassword;
  return new Promise((resolve, reject) => {
    user.save(err => {
      if (err) reject(err);

      resolve();
    });
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
  newPassword,
  confirmEmail,
  authSocialNetwork,
  newVerificationCode
};

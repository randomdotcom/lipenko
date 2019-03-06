const jwt = require("jsonwebtoken");
const config = require("../../config/environment");
const User = require("../../models/user.model");

async function authenticate({ username, password }) {
  try {
    const user = await User.findOne({ username })
      .select("+password")
      .exec();
    if (user === null) throw "User not found";
    if (user.block) throw `User blocked, reason: ${user.block}`;

    let success = await user.comparePassword(password);
    if (success === false) throw "";

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
  const user = new User({ username, password, email, phoneNumber, role });
  return user.save().then(({ _id }) => User.findById(_id));
}

async function getClients() {
  return await User.find();
}

async function blockClient(data) {
  return await User.findOneAndUpdate(
    { username: `${data.username}` },
    { $set: { block: `${data.block}` } }
  );
}

async function unblockClient(data) {
  return await User.findOneAndUpdate(
    { username: `${data.username}` },
    { $unset: { block: { $exist: true } } }
  );
}

async function editProfile(userId, data) {
  return await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber
      }
    },
    err => {
      if (err) return res.send(err);
    }
  );
}

module.exports = {
  authenticate,
  logout,
  register,
  getClients,
  blockClient,
  unblockClient,
  editProfile
};

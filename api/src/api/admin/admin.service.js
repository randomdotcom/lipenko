const jwt = require("jsonwebtoken");
const config = require("../../config/environment");
const User = require("../../models/user.model");

async function authenticate({ username, password }) {
  try {
    const user = await User.findOne({ username })
      .select("+password")
      .exec();
    if (user === null) throw "User not found";

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
    throw new Error("Username or password is incorrect");
  }
}

async function logout({ token }) {
  return true;
}

async function register({ username, password, email, phoneNumber }, role) {
  const user = new User({ username, password, email, phoneNumber, role });
  return user.save().then(({ _id }) => User.findById(_id));
}

module.exports = {
  authenticate,
  logout,
  register
};
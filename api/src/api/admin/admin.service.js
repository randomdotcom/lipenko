const jwt = require("jsonwebtoken");
const config = require("../../config/environment");
const Admin = require("../../models/admin.model");

async function authenticate({ username, password }) {
  try {
    const admin = await Admin.findOne({ username })
      .select("+password")
      .exec();
    if (admin === null) throw "User not found";

    let success = await admin.comparePassword(password);
    if (success === false) throw "Неверный пароль";

    const data = admin.toObject();

    const token = jwt.sign(
      { id: data._id, role: data.role },
      config.jwt.secret,
      { expiresIn: config.jwt.expiration }
    );

    const { password: adminPassword, ...adminWithoutPassword } = data;

    return {
      ...adminWithoutPassword,
      token
    };
  } catch (err) {
    throw new Error("Username or password is incorrect");
  }
}

async function logout({ token }) {
  return true;
}

async function register({ username, password}, role) {
  const admin = new Admin({ username, password, role });
  return admin.save().then(({ _id }) => Admin.findById(_id));
}

async function editProfile(userId, data) {
  return await User.findById(userId, (err, admin) => {
    if (err) return res.send(err);

    admin.username = data.username;
    admin.password = data.password;

    admin.save();
  });
}

module.exports = {
  authenticate,
  logout,
  register,
  editProfile
};
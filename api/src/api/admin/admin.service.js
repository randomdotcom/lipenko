const { createToken } = require("../../config/passport");
const Admin = require("../../models/admin.model");

async function authenticate({ username, password }) {
  const admin = await Admin.findOne({ username })
    .select("+password")
    .exec();
  if (admin === null) throw new Error("The user is not found");

  let success = await admin.comparePassword(password);
  if (success === false) throw new Error("Password is incorrect");

  const data = admin.toObject();

  const token = createToken(data);

  const { password: adminPassword, ...adminWithoutPassword } = data;

  return {
    ...adminWithoutPassword,
    token
  };
}

async function register({ username, password }, role) {
  const admin = new Admin({ username, password, role });
  return admin.save().then(({ _id }) => Admin.findById(_id));
}

async function editProfile(userId, data) {
  return await User.findById(userId, (err, admin) => {
    if (err) return res.send(err);

    admin.password = data.password;
    admin.email = data.email;

    admin.save();
  });
}

async function editProfile(userId, data) {
  if (!userId) throw new Error("Unauthorized");
  if (!data.username | !data.email) {
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
  const user = await Admin.findById(userId)
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

module.exports = {
  authenticate,
  register,
  editProfile,
  newPassword
};
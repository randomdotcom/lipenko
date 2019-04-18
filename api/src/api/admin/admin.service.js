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

module.exports = {
  authenticate,
  register,
  editProfile
};

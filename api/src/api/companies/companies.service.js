const jwt = require("jsonwebtoken");
const config = require("../../config/environment");
const Executor = require("../../models/executor.model");

async function authenticate({ username, password }) {
  try {
    const executor = await Executor.findOne({ username })
      .select("+password")
      .exec();
    if (executor === null) throw "Company not found";
    if (executor.block) throw `Company is blocked, reason: ${executor.block}`;

    let success = await executor.comparePassword(password);
    if (success === false) throw "";

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
  const executor = new Executor({
    username,
    companyName,
    description,
    adress,
    typesOfCleaning,
    password,
    email,
    phoneNumber,
    role
  });
  return executor.save().then(({ _id }) => Executor.findById(_id));
}

async function getCompanies() {
  return await Executor.find();
}

async function blockCompany(data) {
  return await Executor.findOneAndUpdate(
    { username: `${data.username}` },
    { $set: { block: `${data.block}` } }
  );
}

async function unblockCompany(data) {
  return await Executor.findOneAndUpdate(
    { username: `${data.username}` },
    { $unset: { block: { $exist: true } } }
  );
}

async function rateCompany(userId, data) {
  const executor = await Executor.findOne(
    { username: `${data.username}` },
    err => {
      if (err) res.send(err);
    }
  );
  
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

  await Executor.findOneAndUpdate(
    { username: `${data.username}` },
    { $set: { rating: rating, ratingList: ratingList } },
    err => {
      if (err) res.send(err);
    }
  );
}

module.exports = {
  authenticate,
  logout,
  register,
  getCompanies,
  blockCompany,
  unblockCompany,
  rateCompany
};

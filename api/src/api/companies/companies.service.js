const { createToken } = require("../../config/passport");
const Executor = require("../../models/executor.model");

const { sendExecutorConfirmationMessage } = require("../../config/nodemailer");

var randtoken = require("rand-token");

async function authenticate({ username, password }) {
  try {
    const executor = await Executor.findOne({ username })
      .select("+password")
      .exec();
    if (executor === null) throw "The user is not found";

    let success = await executor.comparePassword(password);
    if (success === false) throw "The password is incorrect";

    if (executor.isBlocked)
      throw `The user is blocked, reason: ${executor.block}`;
    if (executor.isVerified === false) throw `Email confirmation required`;

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

async function register(values, role) {
  var verificationCode = randtoken.generate(6);

  console.log(values);

  const {
    username,
    password,
    email,
    phoneNumber,
    companyName,
    description,
    city,
    standartSmallRoom,
    standartBigRoom,
    standartBathRoom,
    generalBathRoom,
    generalBigRoom,
    generalSmallRoom,
    afterRepairBathRoom,
    afterRepairBigRoom,
    afterRepairSmallRoom,
    smallCarpet,
    bigCarpet,
    office,
    furniture,
    industrial,
    pool
  } = values;

  const user = new Executor({
    username,
    password,
    companyName,
    description,
    city,
    typesOfCleaning: {
      standart: {
        isAvailable: Boolean(
          standartSmallRoom && standartBigRoom && standartBathRoom
        ),
        standartBathRoom,
        standartBigRoom,
        standartSmallRoom
      },
      general: {
        isAvailable: Boolean(
          generalSmallRoom && generalBigRoom && generalBathRoom
        ),
        generalBathRoom,
        generalBigRoom,
        generalSmallRoom
      },
      afterRepair: {
        isAvailable: Boolean(
          afterRepairSmallRoom && afterRepairBigRoom && afterRepairBathRoom
        ),
        afterRepairBathRoom,
        afterRepairBigRoom,
        afterRepairSmallRoom
      },
      carpet: {
        isAvailable: Boolean(smallCarpet && bigCarpet),
        bigCarpet,
        smallCarpet
      },
      office,
      furniture,
      industrial,
      pool
    },
    email,
    verificationCode,
    phoneNumber,
    role
  });

  return new Promise((resolve, reject) => {
    user.save(err => {
      if (err) reject(err);

      resolve({ email, username, verificationCode });
    });
  });
}

async function confirmEmail(code) {
  try {
    const user = await Executor.findOneAndUpdate(
      { verificationCode: code },
      {
        $set: { isVerified: true },
        $unset: { verificationCode: { $exist: true } }
      }
    );

    if (!user) throw "Probably, your code is expired";

    const data = user.toObject();

    const token = createToken(data);

    const { password: userPassword, ...userWithoutPassword } = data;

    return {
      ...userWithoutPassword,
      token
    };
  } catch (err) { throw err }
}

async function newVerificationCode({ username, password }) {
  var verificationCode = randtoken.generate(6);
  console.log(username + " " + password);
  const user = await Executor.findOne({ username })
    .select("+password")
    .exec();
  if (user === null) throw new Error("The user is not found");

  let success = await user.comparePassword(password);
  if (success === false) throw new Error("The password is incorrect");

  if (user.isBlocked)
    throw new Error(`The user is blocked, reason: ${user.block}`);

  await Executor.findOneAndUpdate({ username }, { $set: { verificationCode } });

  sendExecutorConfirmationMessage(email, username, verificationCode);

  return {
    email: user.email,
    username: user.username,
    verificationCode
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
  confirmEmail,
  newVerificationCode
};

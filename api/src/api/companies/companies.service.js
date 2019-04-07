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
        averagePrice:
          (parseInt(standartBathRoom) +
            parseInt(standartBigRoom) +
            parseInt(standartSmallRoom)) /
          3,
        standartBathRoom,
        standartBigRoom,
        standartSmallRoom
      },
      general: {
        isAvailable: Boolean(
          generalSmallRoom && generalBigRoom && generalBathRoom
        ),
        averagePrice:
          (parseInt(generalBathRoom) +
            parseInt(generalBigRoom) +
            parseInt(generalSmallRoom)) /
          3,
        generalBathRoom,
        generalBigRoom,
        generalSmallRoom
      },
      afterRepair: {
        isAvailable: Boolean(
          afterRepairSmallRoom && afterRepairBigRoom && afterRepairBathRoom
        ),
        averagePrice:
          (parseInt(afterRepairBathRoom) +
            parseInt(afterRepairBigRoom) +
            parseInt(afterRepairSmallRoom)) /
          3,
        afterRepairBathRoom,
        afterRepairBigRoom,
        afterRepairSmallRoom
      },
      carpet: {
        isAvailable: Boolean(smallCarpet && bigCarpet),
        averagePrice: (parseInt(smallCarpet) + parseInt(bigCarpet)) / 2,
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
  } catch (err) {
    throw err;
  }
}

async function newVerificationCode({ username }) {
  var verificationCode = randtoken.generate(6);
  console.log(username + " " + password);
  const user = await Executor.findOne({ username })
    .select("+password")
    .exec();
  if (user === null) throw new Error("The user is not found");

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

async function getCompanies({
  page=1,
  perPage=5,
  city,
  sortBy,
  name,
  standart,
  general,
  afterRepair,
  carpet,
  office,
  furniture,
  industrial,
  pool
}) {
  let sort = {};
  if (sortBy === "price" || sortBy === "-price") {
    const type = sortBy === "price" ? 1 : -1;
    if (standart) sort["typesOfCleaning.standart.averagePrice"] = type;
    if (general) sort["typesOfCleaning.general.averagePrice"] = type;
    if (afterRepair) sort["typesOfCleaning.afterRepair.averagePrice"] = type;
    if (carpet) sort["typesOfCleaning.carpet.averagePrice"] = type;
    if (office) sort["typesOfCleaning.office"] = type;
    if (furniture) sort["typesOfCleaning.furniture"] = type;
    if (industrial) sort["typesOfCleaning.industrial"] = type;
    if (pool) sort["typesOfCleaning.pool"] = type;
  }

  if (sortBy === "rating" || sortBy === "-rating") {
    const type = sortBy === "rating" ? 1 : -1;
    sort.rating = type;
  }

  // if (sortBy === 'popularity' || sortBy === '-popularity') {
  //   const type = sortBy === 'popularity' ? 1 : -1;
  //   sort.popularity = type;
  // }

  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10,
    select: "companyName city rating typesOfCleaning",
    sort
  };

  let query = {};

  if (city) query.city = { $regex: city };
  if (name) query.companyName = { $regex: name };
  if (standart) query["typesOfCleaning.standart.isAvailable"] = true;
  if (general) query["typesOfCleaning.general.isAvailable"] = true;
  if (afterRepair) query["typesOfCleaning.afterRepair.isAvailable"] = true;
  if (carpet) query["typesOfCleaning.carpet.isAvailable"] = true;
  if (office) query["typesOfCleaning.office"] = { $gte: 1 };
  if (furniture) query["typesOfCleaning.furniture"] = { $gte: 1 };
  if (industrial) query["typesOfCleaning.industrial"] = { $gte: 1 };
  if (pool) query["typesOfCleaning.pool"] = { $gte: 1 };

  const companies = await Executor.paginate(query, options);

  return companies;
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

const { createToken } = require("../../config/passport");
const Executor = require("../../models/executor.model");
const Review = require("../../models/review.model");
const { uploadImage } = require("../../services/images");
const {
  sendExecutorConfirmationMessage,
  sendProfileBlockMessage,
  sendProfileUnblockMessage
} = require("../../config/nodemailer");
var randtoken = require("rand-token");

async function authenticate({ username, password }) {
  try {
    const executor = await Executor.findOne({ username })
      .select("+password")
      .exec();
    if (executor === null) throw "Пользователь не найден";

    let success = await executor.comparePassword(password);
    if (success === false) throw "Неверный пароль";

    if (executor.isBlocked)
      throw `Пользователь заблокирован, причина: ${executor.block}`;
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
    workingDays,
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

  const workingDaysObj = {
    0: workingDays.indexOf(0) !== -1 ? true : false,
    1: workingDays.indexOf(1) !== -1 ? true : false,
    2: workingDays.indexOf(2) !== -1 ? true : false,
    3: workingDays.indexOf(3) !== -1 ? true : false,
    4: workingDays.indexOf(4) !== -1 ? true : false,
    5: workingDays.indexOf(5) !== -1 ? true : false,
    6: workingDays.indexOf(6) !== -1 ? true : false
  };

  const user = new Executor({
    username,
    password,
    companyName,
    description,
    city,
    workingDays: workingDaysObj,
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
  const user = await Executor.findOne({ username }).select("+password").exec();
  if (user === null) throw new Error("Пользователь не найден");

  if (user.isBlocked)
    throw new Error(`Пользователь заблокирован, причина: ${user.block}`);

  await Executor.findOneAndUpdate({ username }, { $set: { verificationCode } });

  sendExecutorConfirmationMessage(email, username, verificationCode);

  return {
    email: user.email,
    username: user.username,
    verificationCode
  };
}

async function getCompanies(
  {
    page = 1,
    perPage = 10,
    city,
    sortBy,
    name,
    carpet,
    furniture,
    pool,
    type,
    workingDays,
    withBlocked
  },
  user
) {
  let sort = {};
  if (sortBy === "price" || sortBy === "-price") {
    const typeOfSort = sortBy === "price" ? 1 : -1;
    if (type === "standart")
      sort["typesOfCleaning.standart.averagePrice"] = typeOfSort;
    if (type === "general")
      sort["typesOfCleaning.general.averagePrice"] = typeOfSort;
    if (type === "afterRepair")
      sort["typesOfCleaning.afterRepair.averagePrice"] = typeOfSort;
    if (carpet) sort["typesOfCleaning.carpet.averagePrice"] = typeOfSort;
    if (type === "office") sort["typesOfCleaning.office"] = typeOfSort;
    if (furniture) sort["typesOfCleaning.furniture"] = typeOfSort;
    if (type === "industrial") sort["typesOfCleaning.industrial"] = typeOfSort;
    if (pool) sort["typesOfCleaning.pool"] = typeOfSort;
  }

  if (sortBy === "rating" || sortBy === "-rating") {
    const typeOfSort = sortBy === "rating" ? -1 : 1;
    sort.rating = typeOfSort;
  }

  if (sortBy === "popularity" || sortBy === "-popularity") {
    const typeOfSort = sortBy === "popularity" ? -1 : 1;
    sort.popularity = typeOfSort;
  }

  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10,
    select:
      "companyName description city rating typesOfCleaning workingDays popularity isBlocked blockReason isVerified logoUrl",
    sort
  };

  let query = {};

  let workingDaysArray;
  if (workingDays) {
    workingDaysArray = workingDays.split(",");
    if (workingDaysArray.indexOf("0") !== -1) query["workingDays.0"] = true;
    if (workingDaysArray.indexOf("1") !== -1) query["workingDays.1"] = true;
    if (workingDaysArray.indexOf("2") !== -1) query["workingDays.2"] = true;
    if (workingDaysArray.indexOf("3") !== -1) query["workingDays.3"] = true;
    if (workingDaysArray.indexOf("4") !== -1) query["workingDays.4"] = true;
    if (workingDaysArray.indexOf("5") !== -1) query["workingDays.5"] = true;
    if (workingDaysArray.indexOf("6") !== -1) query["workingDays.6"] = true;
  }

  if (city) query.city = { $regex: city };
  if (name) query.companyName = { $regex: name };
  if (type === "standart") query["typesOfCleaning.standart.isAvailable"] = true;
  if (type === "general") query["typesOfCleaning.general.isAvailable"] = true;
  if (type === "afterRepair")
    query["typesOfCleaning.afterRepair.isAvailable"] = true;
  if (carpet) query["typesOfCleaning.carpet.isAvailable"] = true;
  if (type === "office") query["typesOfCleaning.office"] = { $gte: 1 };
  if (furniture) query["typesOfCleaning.furniture"] = { $gte: 1 };
  if (type === "industrial") query["typesOfCleaning.industrial"] = { $gte: 1 };
  if (pool) query["typesOfCleaning.pool"] = { $gte: 1 };

  query["isVerified"] = true;

  if (!withBlocked) query["isBlocked"] = false;

  const companies = await Executor.paginate(query, options);

  return companies;
}

async function getCompanyById(companyId) {
  return await Executor.findById({ _id: companyId });
}

async function blockCompany(userId, data) {
  return await Executor.findByIdAndUpdate(
    userId,
    {
      $set: { isBlocked: true, blockReason: `${data.reason}` }
    },
    (err, user) => {
      if (err) throw new Error(err);
      sendProfileBlockMessage(user.email, user.username, data.reason);
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
  const existReview = await Review.findOne({
    customer: userId,
    executor: companyId
  });
  const company = await Executor.findById(companyId).select("+password").exec();

  if (!company) throw new Error("Company is not found");

  if (existReview) {
    existReview.rating = data.rating;
    existReview.comment = data.comment;
    await existReview.save();
  } else {
    const review = new Review({
      rating: data.rating,
      comment: data.comment,
      customer: userId,
      executor: companyId
    });
    await review.save();
  }

  const reviews = await Review.find({ executor: companyId });

  const ratingSum = reviews.reduce((sum, review) => {
    return sum + review.rating;
  }, 0);

  const rating = parseFloat(ratingSum / reviews.length).toFixed(2);

  await Executor.findByIdAndUpdate(companyId, { $set: { rating } });

  return rating;
}

async function getReviews({ page = 1 }, companyId) {
  const options = {
    page: parseInt(page, 10) || 1,
    limit: 5,
    select: "rating comment customer updated_at",
    sort: "-updated_at"
  };

  if (!companyId) throw new Error("Company is not found");
  let query = { executor: companyId };

  const companies = await Review.paginate(query, options);

  return companies;
}

async function editMainInfoProfile(userId, data) {
  if (!userId) throw new Error("Unauthorized");

  if (
    !data.username |
    !data.email |
    !data.phoneNumber |
    !data.city |
    !data.companyName |
    !data.description
  ) {
    throw new Error("Wrong data");
  }

  return await Executor.findByIdAndUpdate(userId, {
    username: data.username,
    email: data.email,
    phoneNumber: data.phoneNumber,
    city: data.city,
    companyName: data.companyName,
    description: data.description
  });
}

async function uploadLogo(userId, files) {
  if (!files) throw new Error("File upload is failed");
  let logoName, logoUrl;

  if (files.logo) {
    await uploadImage(files.logo).then(image => {
      logoUrl = image.logoUrl;
      logoName = image.logoName;
    });
  }

  await Executor.findByIdAndUpdate(userId, { $set: { logoName, logoUrl } });
  return { logoUrl, logoName };
}

async function newPassword(userId, data) {
  const user = await Executor.findById(userId).select("+password").exec();
  if (user === null) throw new Error("Пользователь не найден");

  let success = await user.comparePassword(data.oldPassword);
  if (success === false) throw new Error("Неверный пароль");

  user.password = data.newPassword;
  return new Promise((resolve, reject) => {
    user.save(err => {
      if (err) reject(err);

      resolve();
    });
  });
}

async function editTypesOfCleaning(userId, values) {
  const {
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

  const typesOfCleaning = {
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
  };

  await Executor.findByIdAndUpdate(userId, { typesOfCleaning });
  return typesOfCleaning;
}

module.exports = {
  authenticate,
  register,
  getCompanies,
  blockCompany,
  unblockCompany,
  rateCompany,
  getReviews,
  editMainInfoProfile,
  uploadLogo,
  editTypesOfCleaning,
  newPassword,
  getCompanyById,
  confirmEmail,
  newVerificationCode
};

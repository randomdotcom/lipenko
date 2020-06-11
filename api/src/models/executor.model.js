const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongoosePaginate = require("mongoose-paginate");

const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validatePNumber = function (phoneNumber) {
  const re = /\+375(29|33|44|25)\d{7}$/;
  return re.test(phoneNumber);
};

const validateUsername = function (username) {
  const re = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,9}$/;
  return re.test(username);
};

const validatePassword = function (password) {
  const re = /^[\S]{5,18}$/;
  return re.test(password);
};

const validateCompanyName = function (companyName) {
  const re = /^(.){3,20}$/;
  return re.test(companyName);
};

const validateDescription = function (description) {
  const re = /^(.){0,80}$/;
  return re.test(description);
};

const validateCity = function (city) {
  const re = /^[А-Яа-я-]{3,14}$/;
  return re.test(city);
};

const validateWorkingDayes = function (workingDays) {
  if ((workingDays.length < 1) | (workingDays.length > 7)) return false;
  if ((Math.max(...workingDays) > 7) | (Math.max(...workingDays) < 0))
    return false;
  if ((Math.min(...workingDays) > 7) | (Math.min(...workingDays) < 0))
    return false;
  return true;
};

var schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [
        validateUsername,
        "The username can contain letters, numbers, -, ., _ and must be between 2 and 9 characters"
      ]
    },
    password: {
      type: String,
      required: true,
      select: false,
      validate: [
        validatePassword,
        "The password cannot contain spaces and must be between 5 and 18 characters"
      ]
    },
    companyName: {
      type: String,
      required: true,
      unique: true,
      validate: [
        validateCompanyName,
        "The company name must be between 3 and 16 characters"
      ]
    },
    description: {
      type: String,
      validate: [
        validateDescription,
        "Company description must contain less then 80 characters"
      ]
    },
    city: {
      type: String,
      required: true,
      validate: [
        validateCity,
        "The city can contain only english letters, -, numbers and must be between 3 and 12 characters"
      ]
    },
    logoUrl: { type: String },
    logoName: { type: String },
    workingDays: {
      0: { type: Boolean, required: true, default: false },
      1: { type: Boolean, required: true, default: false },
      2: { type: Boolean, required: true, default: false },
      3: { type: Boolean, required: true, default: false },
      4: { type: Boolean, required: true, default: false },
      5: { type: Boolean, required: true, default: false },
      6: { type: Boolean, required: true, default: false }
    },
    typesOfCleaning: {
      standart: {
        isAvailable: { type: Boolean, required: true },
        averagePrice: { type: Number, require: true },
        standartBathRoom: { type: Number, required: true },
        standartBigRoom: { type: Number, required: true },
        standartSmallRoom: { type: Number, required: true }
      },
      general: {
        isAvailable: { type: Boolean, required: true },
        averagePrice: { type: Number, require: true },
        generalBathRoom: { type: Number, required: true },
        generalBigRoom: { type: Number, required: true },
        generalSmallRoom: { type: Number, required: true }
      },
      afterRepair: {
        isAvailable: { type: Boolean, required: true },
        averagePrice: { type: Number, require: true },
        afterRepairBathRoom: { type: Number, required: true },
        afterRepairBigRoom: { type: Number, required: true },
        afterRepairSmallRoom: { type: Number, required: true }
      },
      carpet: {
        isAvailable: { type: Boolean, required: true },
        averagePrice: { type: Number, require: true },
        bigCarpet: { type: Number, required: true },
        smallCarpet: { type: Number, required: true }
      },
      office: { type: Number, required: true },
      furniture: { type: Number, required: true },
      industrial: { type: Number, required: true },
      pool: { type: Number, required: true }
    },
    rating: { type: Number, default: 0 },
    popularity: { type: Number, default: 0 },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      validate: [
        validateEmail,
        "Пожалуйста, введите правильный адрес эл. почты"
      ]
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationCode: {
      type: String
    },
    phoneNumber: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      validate: [validatePNumber, "Please fill a valid BY phone number"]
    },
    isBlocked: { type: Boolean, default: false },
    blockReason: { type: String },
    role: { type: String, required: true, lowercase: true }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

schema.plugin(mongoosePaginate);
export const Executors = mongoose.model("Executors", schema);

schema.pre("save", function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

schema.pre("update", function (next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

schema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("Пользователь уже существует"));
  } else {
    next(error);
  }
});

schema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, success) => {
      if (err) return reject(err);
      return resolve(success);
    });
  });
};

schema.set("toObject", {
  transform: function (doc, ret) {
    delete ret.__v;
  }
});

module.exports = mongoose.model("Executor", schema);

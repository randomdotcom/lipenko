const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongoosePaginate = require("mongoose-paginate");

const validateEmail = function(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validatePNumber = function(phoneNumber) {
  const re = /\+375(29|33|44|25)\d{7}$/;
  return re.test(phoneNumber);
};

const validateUsername = function(username) {
  const re = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,9}$/;
  return re.test(username);
};

const validatePassword = function(password) {
  const re = /^[\S]{5,18}$/;
  return re.test(password);
};

const validateCompanyName = function(companyName) {
  const re = /^(.){3,20}$/;
  return re.test(companyName);
};

const validateDescription = function(description) {
  const re = /^(.){0,80}$/;
  return re.test(description);
};

const validateCity = function(city) {
  const re = /^[A-Za-z-]{3,14}$/;
  return re.test(city);
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
        "Company description msut contain less then 80 characters"
      ]
    },
    city: {
      type: String,
      required: true,
      validate: [
        validateCity,
        "The city can contain only letters, -, numbers and must be between 3 and 12 characters"
      ]
    },
    workingDays: {
      sunday: { type: Boolean, required: true, default: false },
      monday: { type: Boolean, required: true, default: true },
      tuesday: { type: Boolean, required: true, default: true },
      wednesday: { type: Boolean, required: true, default: true },
      thursday: { type: Boolean, required: true, default: true },
      friday: { type: Boolean, required: true, default: true },
      saturday: { type: Boolean, required: true, default: false }
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
    ratingList: { type: Object, required: false, default: {} },
    rating: { type: Number, required: false, default: 0 },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      validate: [validateEmail, "Please fill a valid email address"]
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

schema.pre("save", function(next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

schema.pre("update", function(next) {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

schema.post("save", function(error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("User already exist"));
  } else {
    next(error);
  }
});

schema.methods.comparePassword = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, success) => {
      if (err) return reject(err);
      return resolve(success);
    });
  });
};

schema.set("toObject", {
  transform: function(doc, ret) {
    delete ret.__v;
  }
});

module.exports = mongoose.model("Executor", schema);

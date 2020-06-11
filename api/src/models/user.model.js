const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongoosePaginate = require("mongoose-paginate");

const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validatePNumber = function (phoneNumber) {
  const re = /^\+375(29|33|44|25)\d{7}$/;
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

const validateAdress = function (adress) {
  const re = /^.{0,60}$/
  return re.test(adress)
}

var schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validateUsername, "The username can contain letters, numbers, -, ., _ and must be between 2 and 9 characters"]
    },
    password: {
      type: String,
      select: false,
      validate: [validatePassword, "The password cannot contain spaces and must be between 5 and 18 characters"]
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      validate: [validateEmail, "Пожалуйста, введите правильный адрес эл. почты"]
    },
    adress: {
      type: String,
      validate: [validateAdress, "Please fill a valid adress(City, street)"]
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationCode: {
      type: String
    },
    attempts: {
      type: Number,
      default: 0
    },
    phoneNumber: {
      type: String,
      trim: true,
      validate: [validatePNumber, "Please fill a valid BY phone number"]
    },
    isBlocked: { type: Boolean, default: false },
    blockReason: { type: String },
    role: { type: String, required: true, lowercase: true },
    googleId: { type: String },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

schema.plugin(mongoosePaginate);
export const Users = mongoose.model("Users", schema);

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
  console.log(error)
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

module.exports = mongoose.model("User", schema);

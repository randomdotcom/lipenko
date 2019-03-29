const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongoosePaginate = require("mongoose-paginate");

const validateEmail = function(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validatePNumber = function(phoneNumber) {
  const re = /^(29|33|44|25)\d{7}$/;
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
  const re = /^[.]{3,16}$/;
  return re.test(companyName);
};

const validateCity = function(city) {
  const re = /^[A-Za-z-]{3,16}$/;
  return re.test(companyName);
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
        "The company name must be between 5 and 16 characters"
      ]
    },
    description: { type: String },
    city: {
      type: String,
      required: true,
      validate: [
        validateCity,
        "The city can contain only letters, -, numbers and must be between 3 and 12 characters"
      ]
    },
    typesOfCleaning: {
      standart: {
        isAvaible: { type: Boolean, required: true },
        toilet: { type: Number },
        bigRoom: { type: Number },
        smallRoom: { type: Number }
      },
      general: {
        isAvaible: { type: Boolean, required: true },
        toilet: { type: Number },
        bigRoom: { type: Number },
        smallRoom: { type: Number }
      },
      afterRepair: {
        isAvaible: { type: Boolean, required: true },
        toilet: { type: Number },
        bigRoom: { type: Number },
        smallRoom: { type: Number }
      },
      carpet: {
        isAvaible: { type: Boolean, required: true },
        bigCarpet: { type: Number },
        smallCarpet: { type: Number }
      },
      office: { type: Number },
      furniture: { type: Number },
      industrial: { type: Number },
      pool: { type: Number }
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

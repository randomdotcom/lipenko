const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');

const validateRegularity = function (regularity) {
  if (regularity < 0 | regularity > 4) return false;
  return true;
};

const validateRecurrent = function (recurrent) {
  if (reccurent < 0 | recurrent > 4) return false;
  return true;
};

var schema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    executor: { type: mongoose.Schema.Types.ObjectId, ref: 'Executor', required: true },
    adress: { type: String, required: true },
    typeOfCleaning: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    regularity: {
      type: Number, required: true, default: 0, validate: [validateRegularity,
        "must be between 0 and 4"]
    },
    recurrent: { type: Number, default: 0, required: true, validate: [validateRecurrent, "must be between 0 and 5"] },
    status: { type: String, required: true, lowercase: true }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

schema.plugin(mongoosePaginate);
export const Orders = mongoose.model('Orders', schema);

schema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("User already exist"));
  } else {
    next(error);
  }
});

schema.set("toObject", {
  transform: function (doc, ret) {
    delete ret.__v;
  }
});

module.exports = mongoose.model("Order", schema);
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const validateRegularity = function(regularity) {
  if ((regularity < 0) | (regularity > 3)) return false;
  return true;
};

const validateRecurrent = function(recurrent) {
  if ((reccurent < 0) | (recurrent > 7)) return false;
  return true;
};

var schema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    executor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Executor",
      required: true
    },
    adress: { type: String, required: true },
    type: { type: String, required: true },
    smallRooms: { type: Number },
    bigRooms: { type: Number },
    bathRooms: { type: Number },
    squareMeters: { type: Number },
    service: [], ///// ??
    smallCarpets: { type: Number },
    bigCarpet: { type: Number },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    expectedTime: { type: Date, required: true },
    cleaningDays: [], //// ??
    regularity: {
      type: Number,
      required: true,
      default: 0,
      validate: [validateRegularity, "must be between 0 and 3"]
    },
    email: {
      type: String,
      required: true
    },
    recurrence: {
      type: Number,
      default: 0,
      required: true,
      validate: [validateRecurrent, "must be between 0 and 7"]
    },

    status: { type: String, required: true, lowercase: true }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

schema.plugin(mongoosePaginate);
export const Orders = mongoose.model("Orders", schema);

schema.post("save", function(error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("User already exist"));
  } else {
    next(error);
  }
});

schema.set("toObject", {
  transform: function(doc, ret) {
    delete ret.__v;
  }
});

module.exports = mongoose.model("Order", schema);

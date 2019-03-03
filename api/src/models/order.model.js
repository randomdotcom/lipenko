const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    executor: { type: mongoose.Schema.Types.ObjectId, ref: 'Executor', required: true },
    adress: { type: String, required: true },
    typeOfCleaning: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    regularity: { type: String, required: false },
    status: { type: String, required: true, lowercase: true }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

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
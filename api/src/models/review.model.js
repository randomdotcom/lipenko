const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

const schema = new mongoose.Schema(
  {
    rating: { type: Number, required: true, max: 5 },
    comment: { type: String },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    executor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Executor",
      required: true
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

schema.set("toObject", {
  transform: function(doc, ret) {
    delete ret.__v;
  }
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model("Review", schema);

const mongoose = require("mongoose");

const instituteSchema = mongoose.Schema(
  {
    instituteName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Institute = mongoose.model("Institute", instituteSchema);

module.exports = Institute;

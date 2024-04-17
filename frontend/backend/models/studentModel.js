const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    studentName: { type: String, required: true, unique: true },
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;

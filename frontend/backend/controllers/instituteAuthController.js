const Institute = require("../models/instituteModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Controller for institute login
const instituteLogin = async (req, res) => {
  try {
    const { instituteName, password } = req.body;

    // Check if the institute exists
    const institute = await Institute.findOne({ instituteName });
    if (!institute) {
      return res.status(400).json({ message: "Institute Not Found" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, institute.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate and send a JWT token
    // const token = jwt.sign(
    //   { instituteID: institute._id },
    //   process.env.SECRET_KEY
    // );

    const token = jwt.sign(
      { instituteName: institute.instituteName, _id: institute._id },
      process.env.SECRET_KEY
    );

    res.status(200).json({ message: "Login Successful", token, instituteName });
  } catch (err) {
    res.status(500).json({ message: "Login Failed", error: err.message });
  }
};

const instituteRegister = async (req, res) => {
  try {
    const { instituteName, password } = req.body;

    // Check if the instituteName already exists
    const existingInstitute = await Institute.findOne({ instituteName });
    if (existingInstitute) {
      return res.status(400).json({ message: "Institute Name already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new institute
    let newInstitute = new Institute({
      instituteName,
      password: hashedPassword,
    });
    await newInstitute.save();

    // Generate and send a JWT token
    // const token = jwt.sign(
    //   { instituteID: newInstitute._id },
    //   process.env.SECRET_KEY
    // );

    const token = jwt.sign(
      { instituteName: newInstitute.instituteName, _id: newInstitute._id },
      process.env.SECRET_KEY
    );

    res
      .status(201)
      .json({ message: "Registration Successful", token, instituteName });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration Failed", error: err.message });
  }
};

// Controller for institute info
const getallinfo = async (req, res) => {
  try {
    const entries = await Institute.find();
    res.json(entries);
  } catch (err) {
    console.error("Error retrieving entries:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { instituteRegister, instituteLogin, getallinfo };

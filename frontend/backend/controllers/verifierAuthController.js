const Verifier = require("../models/verifierModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Controller for verifier login
const verifierLogin = async (req, res) => {
	try {
		const { verifierName, password } = req.body;

		// Check if the verifier exists
		const verifier = await Verifier.findOne({ verifierName });
		if (!verifier) {
			return res.status(400).json({ message: "Verifier Not Found" });
		}

		// Check password
		const isPasswordValid = await bcrypt.compare(
			password,
			verifier.password
		);
		if (!isPasswordValid) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const token = jwt.sign(
			{ verifierName: verifier.verifierName, _id: verifier._id },
			process.env.SECRET_KEY
		);

		res.status(200).json({
			message: "Login Successful",
			token,
			verifierName,
		});
	} catch (err) {
		res.status(500).json({ message: "Login Failed", error: err.message });
	}
};

const verifierRegister = async (req, res) => {
	try {
		const { verifierName, password } = req.body;

		// Check if the verifierName already exists
		const existingVerifier = await Verifier.findOne({ verifierName });
		if (existingVerifier) {
			return verifierLogin(req, res);
		}

		// Hash the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create a new verifier
		let newVerifier = new Verifier({
			verifierName,
			password: hashedPassword,
		});
		await newVerifier.save();

		const token = jwt.sign(
			{
				verifierName: newVerifier.verifierName,
				_id: newVerifier._id,
			},
			process.env.SECRET_KEY
		);

		res.status(201).json({
			message: "Registration Successful",
			token,
			verifierName,
		});
	} catch (err) {
		res.status(500).json({
			message: "Registration Failed",
			error: err.message,
		});
	}
};

// Controller for verifier info
const getallinfo = async (req, res) => {
	try {
		const entries = await Verifier.find();
		res.json(entries);
	} catch (err) {
		console.error("Error retrieving entries:", err.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = { verifierRegister, verifierLogin, getallinfo };

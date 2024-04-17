const Student = require("../models/studentModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

// Controller for student login
const studentLogin = async (req, res) => {
	try {
		const { mail, password } = req.body;

		// Check if the student exists
		const student = await Student.findOne({ mail });
		if (!student) {
			return res.status(400).json({ message: "Student Not Found" });
		}

		// console.log(student);

		// Check password
		const isPasswordValid = await bcrypt.compare(
			password,
			student.password
		);
		if (!isPasswordValid) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		// Generate and send a JWT token
		// const token = jwt.sign(
		//   { studentID: student._id },
		//   process.env.SECRET_KEY
		// );

		const token = jwt.sign(
			{
				studentName: student.studentName,
				mail: student.mail,
				_id: student._id,
			},
			process.env.SECRET_KEY
		);
		studentName = student.studentName;

		res.status(200).json({
			message: "Login Successful",
			token,
			studentName,
			mail,
		});
	} catch (err) {
		res.status(500).json({ message: "Login Failed", error: err.message });
	}
};

const studentRegister = async (req, res) => {
	try {
		const { studentName, mail, password } = req.body;
		console.log(studentName, mail, password);

		// Check if the studentName already exists
		const existingStudent = await Student.findOne({ mail });
		if (existingStudent) {
			return res.status(400).json({ message: "Student already exists" });
		}

		// Hash the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create a new student
		let newStudent = new Student({
			studentName,
			mail,
			password: hashedPassword,
		});
		await newStudent.save();

		// Generate and send a JWT token
		// const token = jwt.sign(
		//   { studentID: newstudent._id },
		//   process.env.SECRET_KEY
		// );

		const token = jwt.sign(
			{
				studentName: newStudent.studentName,
				mail: newStudent.mail,
				_id: newStudent._id,
			},
			process.env.SECRET_KEY
		);

		res.status(201).json({
			message: "Registration Successful",
			token,
			studentName,
			mail,
		});
	} catch (err) {
		res.status(500).json({
			message: "Registration Failed",
			error: err.message,
		});
	}
};

// Controller for student info
const getallmails = async (req, res) => {
	try {
		const emails = await Student.find().select("mail");
		res.json(emails);
	} catch (err) {
		console.error("Error retrieving entries:", err.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

const sendEmail = async (req) => {
	// to = "achyuth2010093@ssn.edu.in";
	// subject = "Test Email";
	// body = "This is a test email.";
	const { to, subject, body } = req.body;
	try {
		// Create a transporter object using SMTP transport
		let transporter = nodemailer.createTransport({
			service: "Gmail", // Specify your email service provider
			auth: {
				user: `${process.env.emailid}`,
				pass: `${process.env.emailPassword}`,
			},
		});

		// Define email options
		const mailOptions = {
			from: `${process.env.emailid}`,
			to,
			subject,
			text: body,
		};

		// Send email
		const info = await transporter.sendMail(mailOptions);
		console.log("Email sent:", info.response);
	} catch (error) {
		console.error("Error sending email:", error);
		throw error; // You can handle this error in your API route
	}
};

module.exports = { studentRegister, studentLogin, getallmails, sendEmail };

const express = require("express");
const {
	studentRegister,
	studentLogin,
	getallmails,
	sendEmail,
} = require("../controllers/studentAuthController");
const router = express.Router();

// Route for student registration
router.post("/register", studentRegister);

// Route for institute login
router.post("/login", studentLogin);

// Route to get all info:
router.get("/getallmails", getallmails);

// Route to send mail:
router.post("/sendEmail", sendEmail);

module.exports = router;

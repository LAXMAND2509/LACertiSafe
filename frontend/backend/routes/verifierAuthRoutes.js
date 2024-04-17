const express = require("express");
const {
	verifierRegister,
	verifierLogin,
	getallinfo,
} = require("../controllers/verifierAuthController");
const router = express.Router();

router.get("/hello", (req, res) => {
	res.json("hey");
});

// Route for verifier registration
router.post("/register", verifierRegister);

// Route for verifier login
router.post("/login", verifierLogin);

// Route to get all info:
router.get("/getall", getallinfo);

module.exports = router;

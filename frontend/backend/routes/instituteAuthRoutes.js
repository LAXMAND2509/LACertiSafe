const express = require("express");
const {
  instituteRegister,
  instituteLogin,
  getallinfo,
} = require("../controllers/instituteAuthController");
const router = express.Router();

router.get("/hello", (req, res) => {
  res.json("hey");
});

// Route for institute registration
router.post("/register", instituteRegister);

// Route for institute login
router.post("/login", instituteLogin);

// Route to get all info:
router.get("/getall", getallinfo);

module.exports = router;

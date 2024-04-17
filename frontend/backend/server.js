const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const instituteAuthRoutes = require("./routes/instituteAuthRoutes");
const designRoutes = require("./routes/designRoutes");
const studentAuthRoutes = require("./routes/studentAuthRoutes");
const verifierAuthRoutes = require("./routes/verifierAuthRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: ["http://localhost:3000"],
		credentials: true,
	})
);

// Define routes
app.get("/", (req, res) => {
	res.json("We Ball");
});

app.get("/hello", (req, res) => {
	res.json("hey");
});

// Route for authentication
app.use("/api/institutes", instituteAuthRoutes);

app.use("/api/verifier", verifierAuthRoutes);

app.use("/api/designs", designRoutes);
app.use("/api/students", studentAuthRoutes);
const PORT = process.env.PORT || 8000;
const startServer = async () => {
	try {
		await connectDB();
		app.listen(PORT, () => {
			console.log(`Server on ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

startServer();

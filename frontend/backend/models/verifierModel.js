const mongoose = require("mongoose");

const verifierSchema = mongoose.Schema(
	{
		verifierName: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const Verifier = mongoose.model("Verifier", verifierSchema);

module.exports = Verifier;

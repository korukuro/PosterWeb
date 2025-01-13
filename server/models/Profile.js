const mongoose = require("mongoose");

// Define the Profile schema
const profileSchema = new mongoose.Schema({
	gender: {
		type: String,
	},
	dateOfBirth: {
		type: String,
	},
	contactNumber: {
		type: Number,
		trim: true,
	},
	address:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Address",
	}
}); 

// Export the Profile model
module.exports = mongoose.model("Profile", profileSchema);
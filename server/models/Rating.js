const mongoose = require("mongoose");

// Define the Rating schema
const ratingSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user",
	},
	poster:{
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Poster",
	},
	rating: {
		type: Number,
		required: true,
		min: 1,
		max: 5,
	},
	averageRating: {
		type: Number,
		default: 0,
	},

},
	{
		timestamps: true, // Adds `createdAt` and `updatedAt` fields automatically
	}
);

// Export the Rating model
module.exports = mongoose.model("Rating", ratingSchema);
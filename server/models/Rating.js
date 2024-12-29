const mongoose = require("mongoose");

// Define the Rating schema
const ratingSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user",
	},
	rating: {
		type: Number,
		required: true,
	},
	posterType: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Poster",
		index: true, // Indexing for faster search
	},
});

// Export the Rating model
module.exports = mongoose.model("Rating", ratingSchema);
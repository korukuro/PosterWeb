const mongoose = require("mongoose");

// Define the Tags schema
const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: { type: String },
	poster: [
		{
			type: mongoose.Schema.Types.ObjectId, // Reference to the Poster model
			ref: "Poster",
		},
	],
});

// Export the Tags model
module.exports = mongoose.model("Category", categorySchema);
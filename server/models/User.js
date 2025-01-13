// Import the Mongoose library
const mongoose = require("mongoose")

// Define the user schema using the Mongoose Schema constructor
const userSchema = new mongoose.Schema(
  {
    // Define the name field with type String, required, and trimmed
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    // Define the email field with type String, required, and trimmed
    email: {
      type: String,
      required: true,
      trim: true,
    },

    // Define the password field with type String and required
    password: {
      type: String,
      required: true,
    },
    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Profile",
    },
    
    token: {
      type: String,
    },

    resetPasswordExpires: {
      type: Date,
    },
    accountType: {
      type: String,
      enum: ["Admin"],
    },

    image: {
      type: String,
    },
    purchasedPosters: [
      {
        posterId: { type: mongoose.Schema.Types.ObjectId, ref: "Poster" }, // Reference to Poster
        quantity: { type: Number, required: true, default: 1 }, // Quantity purchased
        purchasedOn: { type: Date, default: Date.now }, // Time of purchase
        delivered: { type: Boolean, required: true, default: false }, // New field
      },
    ]
  },
)

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("user", userSchema)

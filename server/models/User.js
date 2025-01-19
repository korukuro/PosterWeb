// Import the Mongoose library
const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema constructor
const userSchema = new mongoose.Schema(
  {
    // Define the firstName field with type String, required, and trimmed
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
      unique: true, // Ensure email is unique
    },
    posters: [
        {
          type: mongoose.Schema.Types.ObjectId, // Reference to the Poster model
          ref: "Poster",
        },
      ],
    
    // Make password optional for Google login
    password: {
      type: String,
      required: function () {
        // Password is only required if the user is not logging in through Google
        return this.googleId ? false : true;
      },
    },

    // Make additionalDetails optional for Google login
    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: function () {
        // Only require additionalDetails if the user is not logging in through Google
        return !this.googleId;
      },
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
        posterId: { type: mongoose.Schema.Types.ObjectId, ref: "Poster" },
        quantity: { type: Number, required: true, default: 1 },
        purchasedOn: { type: Date, default: Date.now },
        deliveryId: {type: mongoose.Schema.Types.ObjectId, ref: "Delivery"},
        delivered: { type: Boolean, required: true, default: false },
        orderId: { type: String, required: true },
      },
    ],
    deliveryDetails:[{type: mongoose.Schema.Types.ObjectId, ref: "Delivery"}],
  },
);

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("user", userSchema);

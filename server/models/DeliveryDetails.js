const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    isDefault: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Delivery",deliverySchema);
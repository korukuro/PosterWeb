const { instance } = require("../config/razorpay");
const Poster = require("../models/Poster");
const crypto = require("crypto");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { paymentSuccessEmail } = require("../mail/paymentSuccessEmail");

// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  const { posterDetails } = req.body; // Array of Poster details, with posterId and quantity

  if (!posterDetails || !Array.isArray(posterDetails) || posterDetails.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide valid Poster details (posterId and quantity)." });
  }

  let totalAmount = 0;
  let errorMessages = [];

  for (const { posterId, quantity } of posterDetails) {
    try {
      // Validate quantity (ensure it's a positive integer)
      if (quantity <= 0 || !Number.isInteger(quantity)) {
        errorMessages.push(`Invalid quantity for poster ID ${posterId}.`);
        continue;
      }

      // Find the Poster by its ID
      const poster = await Poster.findById(posterId);

      // If the Poster is not found, log an error and continue
      if (!poster) {
        errorMessages.push(`Poster with ID ${posterId} not found.`);
        continue;
      }

      // Add the price of the Poster multiplied by quantity to the total amount
      totalAmount += poster.price * quantity;
    } catch (error) {
      console.error(`Error processing Poster ID ${posterId}:`, error);
      errorMessages.push(`Error processing Poster ID ${posterId}: ${error.message}`);
    }
  }

  // If there were errors, return them
  if (errorMessages.length > 0) {
    return res
      .status(400)
      .json({ success: false, message: "Errors encountered", errors: errorMessages });
  }

  // Create a payment order with Razorpay
  const options = {
    amount: totalAmount * 100, // Razorpay expects the amount in paise (INR * 100)
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const paymentResponse = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      data: paymentResponse,
    });
  } catch (error) {
    console.error("Payment initiation error:", error);
    res.status(500).json({ success: false, message: "Could not initiate order." });
  }
};

// Verify the payment
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, posterDetails } = req.body;
    const userId = req.user?.id;

    // Log incoming data for debugging
    console.log("Request Data:", { razorpay_order_id, razorpay_payment_id, razorpay_signature, posterDetails, userId });

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !Array.isArray(posterDetails) ||
      posterDetails.length === 0 ||
      !userId
    ) {
      return res.status(400).json({ success: false, message: "Payment verification failed. Missing or invalid data." });
    }

    // Signature verification
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Mark posters as bought for the user
      await posterBoughtByUser(posterDetails, userId, res);
      return res.status(200).json({ success: true, message: "Payment verified successfully." });
    }

    return res.status(400).json({ success: false, message: "Invalid payment signature." });
  } catch (error) {
    console.error("Payment verification error:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;
  const userId = req.user?.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all required details." });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    await mailSender(
      user.email,
      "Payment Received",
      paymentSuccessEmail(`${user.firstName} ${user.lastName}`, amount / 100, orderId, paymentId)
    );

    res.status(200).json({ success: true, message: "Payment success email sent." });
  } catch (error) {
    console.error("Error sending payment success email:", error);
    res.status(500).json({ success: false, message: "Could not send email." });
  }
};

const posterBoughtByUser = async (posterDetails, userId) => {
  if (!posterDetails || !userId) {
    return { success: false, message: "Please provide poster details and user ID." };
  }

  const errors = [];
  const successfulUpdates = [];

  for (const { posterId, quantity } of posterDetails) {
    try {
      const purchaseTime = new Date(); // Get the current time

      // Update the user's purchasedPosters array
      const user = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            purchasedPosters: {
              posterId: posterId,
              quantity: quantity,
              purchasedOn: purchaseTime, // Add the purchase time
            },
          },
        },
        { new: true }
      );

      successfulUpdates.push({ posterId, quantity, purchasedOn: purchaseTime });
    } catch (error) {
      errors.push({ posterId, error });
    }
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return { success: true, postersBought: successfulUpdates };
};



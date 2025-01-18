const { instance } = require("../config/razorpay");
const Poster = require("../models/Poster");
const crypto = require("crypto");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { paymentSuccessEmail } = require("../mail/paymentSuccessEmail");

// Capture Payment and Create Razorpay Order
exports.capturePayment = async (req, res) => {
  const { posterDetails } = req.body;

  // Validate posterDetails
  if (!posterDetails || !Array.isArray(posterDetails) || posterDetails.length === 0) {
    return res.status(400).json({ success: false, message: "Please provide valid poster details (posterId and quantity)." });
  }

  let totalAmount = 0;
  const errors = [];

  // Calculate total amount and validate poster details
  for (const { posterId, quantity } of posterDetails) {
    try {
      if (quantity <= 0 || !Number.isInteger(quantity)) {
        errors.push(`Invalid quantity for poster ID ${posterId}.`);
        continue;
      }

      const poster = await Poster.findById(posterId);
      if (!poster) {
        errors.push(`Poster with ID ${posterId} not found.`);
        continue;
      }

      totalAmount += poster.price * quantity;
    } catch (error) {
      errors.push(`Error processing poster ID ${posterId}: ${error.message}`);
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: "Errors encountered", errors });
  }

  // Create Razorpay Order
  const options = {
    amount: totalAmount * 100, // Amount in paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const paymentResponse = await instance.orders.create(options);
    res.status(200).json({ success: true, data: paymentResponse });
  } catch (error) {
    console.error("Payment initiation error:", error);
    res.status(500).json({ success: false, message: "Could not initiate payment order." });
  }
};

// Verify Payment
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, posterDetails, deliveryId } = req.body;
    const userId = req.user?.id;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !Array.isArray(posterDetails) || posterDetails.length === 0 || !userId || !deliveryId) {
      return res.status(400).json({ success: false, message: "Payment verification failed. Missing or invalid data." });
    }

    // Verify Razorpay Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body).digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid payment signature." });
    }

    // Mark posters as purchased
    const result = await posterBoughtByUser(posterDetails, userId, deliveryId);

    if (!result.success) {
      return res.status(500).json({ success: false, message: "Error updating user purchase details.", errors: result.errors });
    }

    res.status(200).json({ success: true, message: "Payment verified successfully." });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;
  const userId = req.user?.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res.status(400).json({ success: false, message: "Missing required details for email." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    await mailSender(
      user.email,
      "Payment Successful",
      paymentSuccessEmail(`${user.firstName} ${user.lastName}`, amount / 100, orderId, paymentId)
    );
    await mailSender(
      "learnerxqz@gmail.com",
      "Payment Successful",
      paymentSuccessEmail(`${user.firstName} ${user.lastName}`, amount / 100, orderId, paymentId)
    );

    res.status(200).json({ success: true, message: "Payment success email sent." });
  } catch (error) {
    console.error("Error sending payment success email:", error);
    res.status(500).json({ success: false, message: "Could not send email." });
  }
};

// Helper: Mark Posters as Purchased by User
const posterBoughtByUser = async (posterDetails, userId, deliveryId) => {
  const errors = [];
  const successfulUpdates = [];

  for (const { posterId, quantity } of posterDetails) {
    try {
      const purchaseTime = new Date();

      await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            purchasedPosters: {
              posterId,
              quantity,
              purchasedOn: purchaseTime,
              deliveryId,
            },
          },
        },
        { new: true }
      );

      successfulUpdates.push({ posterId, quantity, purchasedOn: purchaseTime, deliveryId });
    } catch (error) {
      errors.push({ posterId, error: error.message });
    }
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return { success: true, postersBought: successfulUpdates };
};

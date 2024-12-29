const { instance } = require("../config/razorpay")
const Poster = require("../models/Poster")
const crypto = require("crypto")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")
const { paymentSuccessEmail } = require("../mail/paymentSuccessEmail")

// Capture the payment and initiate the Razorpay order

exports.capturePayment = async (req, res) => {
  const { Posters } = req.body; // Array of Poster IDs
  const userId = req.user.id;

  if (!Posters || Posters.length === 0) {
    return res.status(400).json({ success: false, message: "Please provide a Poster ID" });
  }

  let total_amount = 0;
  let errorMessages = [];

  for (const Poster_id of Posters) {
    try {
      // Find the Poster by its ID
      const Poster = await Poster.findById(Poster_id);

      // If the Poster is not found, add an error message and skip to the next Poster
      if (!Poster) {
        errorMessages.push(`Poster with ID ${Poster_id} not found.`);
        continue;
      }

      // Check if the user is already enrolled in the Poster
      const isEnrolled = Poster.studentsEnrolled.some(studentId => studentId.toString() === userId); // Convert the ObjectID to a string for comparison

      if (isEnrolled) {
        errorMessages.push(`User is already enrolled in Poster ID ${Poster_id}.`);
        continue;
      }

      // Add the price of the Poster to the total amount
      total_amount += Poster.price;
    } catch (error) {
      console.error(`Error processing Poster ID ${Poster_id}:`, error);
      errorMessages.push(`Error processing Poster ID ${Poster_id}: ${error.message}`);
    }
  }

  // If there were any errors, return them
  if (errorMessages.length > 0) {
    return res.status(400).json({ success: false, message: "Errors encountered", errors: errorMessages });
  }

  // Create payment order with Razorpay
  const options = {
    amount: total_amount * 100, // Razorpay expects the amount in paise (INR * 100)
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  try {
    const paymentResponse = await instance.orders.create(options);
    res.json({
      success: true,
      data: paymentResponse,
    });
  } catch (error) {
    console.error("Payment initiation error:", error);
    res.status(500).json({ success: false, message: "Could not initiate order." });
  }
};


// verify the payment
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id
  const razorpay_payment_id = req.body?.razorpay_payment_id
  const razorpay_signature = req.body?.razorpay_signature
  const Posters = req.body?.Posters

  const userId = req.user.id

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !Posters ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

  if (expectedSignature === razorpay_signature) {
    await enrollStudents(Posters, userId, res)
    return res.status(200).json({ success: true, message: "Payment Verified" })
  }

  return res.status(200).json({ success: false, message: "Payment Failed" })
}

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body

  const userId = req.user.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledStudent = await User.findById(userId)

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}

// enroll the student in the Posters
const enrollStudents = async (Posters, userId, res) => {
  if (!Posters || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Poster ID and User ID" })
  }

  for (const PosterId of Posters) {
    try {
      // Find the Poster and enroll the student in it
      const enrolledPoster = await Poster.findOneAndUpdate(
        { _id: PosterId },
        { $push: { studentsEnroled: userId } },
        { new: true }
      )

      if (!enrolledPoster) {
        return res
          .status(500)
          .json({ success: false, error: "Poster not found" })
      }
      console.log("Updated Poster: ", enrolledPoster)

      const PosterProgress = await PosterProgress.create({
        PosterID: PosterId,
        userId: userId,
        completedVideos: [],
      })
      // Find the student and add the Poster to their list of enrolled Posters
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            Posters: PosterId,
            PosterProgress: PosterProgress._id,
          },
        },
        { new: true }
      )

      console.log("Enrolled student: ", enrolledStudent)
      // Send an email notification to the enrolled student
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledPoster.PosterName}`,
        PosterEnrollmentEmail(
          enrolledPoster.PosterName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      )

      console.log("Email sent successfully: ", emailResponse.response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false, error: error.message })
    }
  }
}
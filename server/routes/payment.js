// Import the required modules
const express = require("express")
const router = express.Router()
const {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessEmail,
} = require("../controllers/Payment")
const { verifyToken } = require("../middleware/auth")
router.post("/capturePayment",capturePayment)
router.post("/verifyPayment",verifyToken,verifyPayment)
router.post(
  "/sendPaymentSuccessEmail",verifyToken, sendPaymentSuccessEmail
)
// router.post("/verifySignature", verifySignature)

module.exports = router

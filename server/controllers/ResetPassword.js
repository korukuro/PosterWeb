const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// Generate Reset Password Token
exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: `This Email: ${email} is not registered with us. Please enter a valid email.`,
      });
    }

    // Generate Token
    const token = crypto.randomBytes(20).toString("hex");
    const updatedDetails = await User.findOneAndUpdate(
      { email },
      {
        token,
        resetPasswordExpires: Date.now() + 3600000, // 1 hour
      },
      { new: true }
    );

    // Create reset link
    const url = `https://posterweb-frontend.onrender.com/update-password/${token}`

    // Send email
    await mailSender(
      email,
      "Password Reset",
      `Your link for password reset is: ${url}. Please click the link to reset your password.`
    );

    return res.status(200).json({
      success: true,
      message:
        "Email sent successfully. Please check your email to continue further.",
    });
  } catch (error) {
    console.error("Error sending reset password token:", error);
    return res.status(500).json({
      success: false,
      message: "Error in sending the reset password message.",
      error: error.message,
    });
  }
};

// Reset Password Using Token
exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    // Validate passwords
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match.",
      });
    }

    // Find user by token
    const userDetails = await User.findOne({ token });
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "Invalid token.",
      });
    }

    // Check if token is expired
    if (new Date(userDetails.resetPasswordExpires) < new Date()) {
      return res.status(403).json({
        success: false,
        message: "Token has expired. Please regenerate your token.",
      });
    }

    // Encrypt the new password and update user
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { token },
      {
        password: encryptedPassword,
        token: null,
        resetPasswordExpires: null,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successful.",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({
      success: false,
      message: "Error in updating the password.",
      error: error.message,
    });
  }
};

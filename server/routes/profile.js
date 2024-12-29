const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middleware/auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  posterBought,
} = require("../controllers/Profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delete User Account
router.delete("/deleteProfile", verifyToken, deleteAccount)
router.put("/updateProfile", verifyToken, updateProfile)
router.get("/getUserDetails", verifyToken, getAllUserDetails)

// // Get Enrolled poster
// router.get("/posterBought", verifyToken, posterBought)
// router.put("/updateDisplayPicture", verifyToken, updateDisplayPicture)

module.exports = router

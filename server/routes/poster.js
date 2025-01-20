// Import the required modules
const express = require("express")
const router = express.Router()

// Poster Controllers Import
const {
  getAllPoster,
  getPosterDetails,
  createPoster,
  deletePoster,
  updatePoster,
  getAllPosterOfUser,
  getOrderHistory,
  updateDeliveryStatus,
  // getMultiplePosterDetails,
} = require("../controllers/Poster")

// Categories Controllers Import
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category")

// // Rating Controllers Import
const {
  createRating,
  getAverageRating,
} = require("../controllers/Rating")

// Importing Middlewares
const {verifyToken, isAdmin} = require("../middleware/auth")

// ********************************************************************************************************
//                                      Poster routes
// ********************************************************************************************************

// Create a Poster
router.post("/createPoster", verifyToken, isAdmin, createPoster)
// Delete a Poster
router.delete("/deletePoster", verifyToken, isAdmin, deletePoster)
// Get all Registered Posters
router.get("/getAllPoster", getAllPoster)
// Get Details for a Specific Posters
router.post("/getPosterDetails", getPosterDetails)
// Get Details for Multiple Posters
// router.post("/getMultiplePosterDetails", getMultiplePosterDetails)
// Get poster of a specific user
router.post("/getUserPoster",verifyToken,getAllPosterOfUser);
// Update a Poster
router.put("/updatePoster", verifyToken, isAdmin, updatePoster)
// get order history
router.get("/getOrderHistory", verifyToken, getOrderHistory)

// update poster status
router.put("/updateDeliveryStatus", verifyToken, isAdmin, updateDeliveryStatus)


// ********************************************************************************************************
//                                      Category routes
// ********************************************************************************************************
router.post("/createCategory", verifyToken, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", verifyToken, createRating) 
router.post("/getAverageRating", getAverageRating)

module.exports = router

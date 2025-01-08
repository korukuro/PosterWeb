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
} = require("../controllers/Poster")

// Categories Controllers Import
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category")

// // Rating Controllers Import
// const {
//   createRating,
//   getAverageRating,
//   getAllRatingReview,
// } = require("../controllers/Rating")

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
// Update a Poster
router.put("/updatePoster", verifyToken, isAdmin, updatePoster)


// ********************************************************************************************************
//                                      Category routes
// ********************************************************************************************************
router.post("/createCategory", verifyToken, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
// router.post("/createRating", auth, createRating) 
// router.get("/getAverageRating", getAverageRating)

module.exports = router

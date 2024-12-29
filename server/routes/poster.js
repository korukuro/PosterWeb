// // Import the required modules
// const express = require("express")
// const router = express.Router()

// // Import the Controllers

// // Poster Controllers Import
// const {
//   getAllPosters,
//   getPosterDetails,
//   getFullPosterDetails,
// } = require("../controllers/Poster")

// // Tags Controllers Import

// // Categories Controllers Import
// // const {
// //   showAllCategories,
// //   createCategory,
// //   categoryPageDetails,
// // } = require("../controllers/Category")

// // Rating Controllers Import
// const {
//   createRating,
//   getAverageRating,
//   getAllRatingReview,
// } = require("../controllers/Rating")

// // Importing Middlewares
// const {auth} = require("../middleware/auth")

// // ********************************************************************************************************
// //                                      Poster routes
// // ********************************************************************************************************

// // Posters can Only be Created by Instructors
// // Get all Registered Posters
// router.get("/getAllPosters", getAllPosters)
// // Get Details for a Specific Posters
// router.get("/getPosterDetails", getPosterDetails)
// // Get Details for a Specific Posters
// router.get("/getFullPosterDetails", auth, getFullPosterDetails)

// // ********************************************************************************************************
// //                                      Rating and Review
// // ********************************************************************************************************
// router.post("/createRating", auth, createRating) 
// router.get("/getAverageRating", getAverageRating)

// module.exports = router

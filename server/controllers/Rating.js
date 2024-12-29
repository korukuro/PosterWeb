const Rating = require("../models/Rating")
const Poster = require("../models/Poster")
const User = require("../models/User")
const mongoose = require("mongoose")

// Create a new rating and review
exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id
    const { rating, posterId } = req.body

    // Check if the user bought the poster

    const userDetails = await Poster.findOne({
      _id: posterId,
      posterBought: { $elemMatch: { $eq: userId } },
    })

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: `User has not bought the poster`, //
      })
    }

    // Check if the user has already reviewed the course
    // const alreadyReviewed = await Rating.findOne({
    //   user: userId,
    //   poster: posterId,
    // })

    // if (alreadyReviewed) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Course already reviewed by user",
    //   })
    // }

    // Create a new rating
    const createRating = await Rating.create({
      rating,
      poster: posterId,
      user: userId,
    })

    // Add the rating
    await Poster.findByIdAndUpdate(posterId, {
      $push: {
        rating: rating,
      },
    })
    await courseDetails.save()

    return res.status(201).json({
      success: true,
      message: "Rating created successfully",
      ratingReview,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

// Get the average rating for a course
exports.getAverageRating = async (req, res) => {
  try {
    const posterId = req.body.posterId

    // Calculate the average rating using the MongoDB aggregation pipeline
    const result = await Rating.aggregate([
      {
        $match: {
          poster: new mongoose.Types.ObjectId(posterId), // Convert courseId to ObjectId
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ])

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      })
    }

    // If no ratings are found, return 0 as the default rating
    return res.status(200).json({ success: true, averageRating: 0 })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the rating for the course",
      error: error.message,
    })
  }
}

// Get all rating and reviews
exports.getAllRatingReview = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image", // Specify the fields you want to populate from the "Profile" model
      })
      .populate({
        path: "poster",
        select: "posterName", 
      })
      .exec()

    res.status(200).json({
      success: true,
      data: allReviews,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the rating for the course",
      error: error.message,
    })
  }
}

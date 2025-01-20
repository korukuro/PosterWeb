const Rating = require("../models/Rating")
const Poster = require("../models/Poster")
const User = require("../models/User")
const mongoose = require("mongoose")

// Create a new rating and review
exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from authenticated request
    const { rating, posterId } = req.body;

    // Check if the user has bought the poster
    const poster = await Poster.findOne({
      _id: posterId,
      posterBoughtBy: userId,
    });

    if (!poster) {
      return res.status(404).json({
        success: false,
        message: "User has not bought the poster",
      });
    }

    // Check if the user has already reviewed the poster
    const alreadyReviewed = await Rating.findOne({
      user: userId,
      poster: posterId,
    });

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Poster already reviewed by user",
      });
    }

    // Create a new rating
    const newRating = await Rating.create({
      rating,
      poster: posterId,
      user: userId,
    });

    // Update the poster with the new rating
    await Poster.findByIdAndUpdate(posterId, {
      $push: { rating: newRating._id },
    });

    return res.status(201).json({
      success: true,
      message: "Rating created successfully",
      rating: newRating,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


exports.getAverageRating = async (req, res) => {
  try {
    const { posterId } = req.body;

    // Validate posterId
    if (!posterId) {
      return res.status(400).json({
        success: false,
        message: "Invalid poster ID format",
      });
    }

    // Convert posterId to ObjectId if stored as ObjectId in the database
    const posterObjectId = new mongoose.Types.ObjectId(posterId);

    // Calculate the average rating using the MongoDB aggregation pipeline
    const result = await Rating.aggregate([
      {
        $match: {
          poster: posterObjectId, // Match the ObjectId
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    // Check if ratings exist for the poster
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: parseFloat(result[0].averageRating.toFixed(2)), // Format to 2 decimal places
      });
    }

    // If no ratings are found, return 0 as the default rating
    return res.status(200).json({
      success: true,
      averageRating: 0,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the average rating for the poster",
      error: error.message,
    });
  }
};



const Poster = require("../models/Poster")
const Category = require("../models/Category")
const User = require("../models/User")

exports.getAllPoster = async (req, res) => {
    try {
      const allPosters = await Poster.find(
        { status: "Published" },
        {
          PosterName: true,
          price: true,
          image: true,
        }
      )
  
      return res.status(200).json({
        success: true,
        data: allPosters,
      })
    } catch (error) {
      console.log(error)
      return res.status(404).json({
        success: false,
        message: `Can't Fetch Poster Data`,
        error: error.message,
      })
    }
  }

  exports.getPosterDetails = async (req, res) => {
    try {
      const { PosterId } = req.body
      const PosterDetails = await Poster.findOne({
        _id: PosterId,
      })
  
      if (!PosterDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find Poster with id: ${PosterId}`,
        })
      }
  
      return res.status(200).json({
        success: true,
        data: {
          PosterDetails,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
  exports.getFullPosterDetails = async (req, res) => {
    try {
      const { PosterId } = req.body
      const userId = req.user.id
      const PosterDetails = await Poster.findOne({
        _id: PosterId,
      })
  
      if (!PosterDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find Poster with id: ${PosterId}`,
        })
      }
  
      return res.status(200).json({
        success: true,
        data: {
          PosterDetails,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }
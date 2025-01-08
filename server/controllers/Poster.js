const Poster = require("../models/Poster")
const Category = require("../models/Category")
const User = require("../models/User")
const { uploadImageToCloudinary } = require("../utils/imageUploader")

// Create Poster
exports.createPoster = async (req, res) => {
  try {
    // Get user ID from request object
    const userId = req.user.id

    // Get all required fields from request body
    let {
      posterName,
      description,
      price,
      category,
      size
    } = req.body

    // // Get poster image from request files
    const poster = req.files.posterImage

    // Check if any of the required fields are missing
    if (
      !posterName ||
      !description ||
      !price ||
      !poster ||
      !category ||
      !size
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      })
    }
    
    // Check if the user is an admin
    const adminDetails = await User.findById(userId, {
      accountType: "Admin",
    })

    if (!adminDetails) {
      return res.status(404).json({
        success: false,
        message: "Admin Details Not Found",
      })
    }

    const categoryDetails = await Category.findById(category)
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      })
    }

    // Upload the Thumbnail to Cloudinary
    const posterImage = await uploadImageToCloudinary(
      poster,
      process.env.FOLDER_NAME
    )
    // console.log("posterImage: ",posterImage)
    // Create a new poster with the given details
    const newPoster = await Poster.create({
      posterName,
      description,
      admin: adminDetails._id,
      price,
      category: categoryDetails._id,
      image: posterImage.secure_url,
      size,
    })

    // Add the new poster to the User Schema of the admin
    await User.findByIdAndUpdate(
      {
        _id: adminDetails._id,
      },
      {
        $push: {
          posters: newPoster._id,
        },
      },
      { new: true }
    )
    // Add the new course to the Categories
    const categoryDetails2 = await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          courses: newPoster._id,
        },
      },
      { new: true }
    )
    // console.log("HEREEEEEEEE", categoryDetails2)
    // Return the new course and a success message
    res.status(200).json({
      success: true,
      data: newPoster,
      message: "Poster Created Successfully",
    })
  } catch (error) {
    // Handle any errors that occur during the creation of the course
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to create poster",
      error: error.message,
    })
  }
}
// Get all Posters
exports.getAllPoster = async (req, res) => {
    try {
      const allPosters = await Poster.find({})
      .select("posterName price image ratingAndReviews")
      .populate("admin")
      .exec();

      // console.log("allposter: ",allPosters)
  
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
// Get Single Poster Details
exports.getPosterDetails = async (req, res) => {
    try {
      const { posterId } = req.body
      const posterDetails = await Poster.findOne({
        _id: posterId,
      })
      .populate({
        path: "admin",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      // .populate("ratingAndReviews")
      .exec()
  
      if (!posterDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find Poster with id: ${posterId}`,
        })
      }
  
      return res.status(200).json({
        success: true,
        data: {
          posterDetails,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
}
// Delete the Poster
exports.deletePoster = async (req, res) => {
  try {
    const { posterId } = req.body

    // Find the poster
    const poster = await Poster.findById(posterId)
    if (!poster) {
      return res.status(404).json({ message: "Poster not found" })
    }

    // Delete the poster
    await Poster.findByIdAndDelete(posterId)

    return res.status(200).json({
      success: true,
      message: "Poster deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

// Update the Poster
exports.updatePoster = async (req, res) => {
  try {
    const { posterId } = req.body
    const poster = await Poster.findById(posterId)
    if (!poster) {
      return res.status(404).json({ message: "Poster not found" })
    }

    const updatedPoster = await Poster.findByIdAndUpdate(posterId, req.body, {
      new: true,
      runValidators: true,
    })

    return res.status(200).json({
      success: true,
      data: updatedPoster,
      message: "Poster updated successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}
// Importing required modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

exports.verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token ||
                      req.body.token ||
                      (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));
        if (!token) {
            return res.status(401).json({ message: "Token is missing" });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            req.user = decoded;
        } catch (err) {
            return res.status(401).json({ message: "Token is invalid" });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token",
        });
    }
};
exports.isAdmin = async (req, res, next) => {
	try {
		const userDetails = await User.findOne({ email: req.user.email });

		if (userDetails.accountType !== "Admin") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// exports.googleLogin = async (req, res) => {
//   const { credential } = req.body;

//   try {
//     // Verify the ID token
//     const ticket = await client.verifyIdToken({
//       idToken: credential,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });

//     // Get user info from the verified token
//     const payload = ticket.getPayload();
//     const { sub: googleId, email, name, picture } = payload;

//     // Check if the user exists in the database
//     let user = await User.findOne({ email });

//     if (!user) {
//       // Create a new user if it doesn't exist
//       user = new User({
//         email,
//         firstName: name.split(" ")[0],
//         lastName: name.split(" ")[1] || "",
//         image: picture,
//         googleId,
//       });
//       await user.save();
//     }

//     // Create a session or JWT token for the user
//     const token = createJwtToken(user._id); // Your JWT generation logic

//     res.status(200).json({
//       success: true,
//       token,
//       user: {
//         email: user.email,
//         name: user.firstName + " " + user.lastName,
//         image: user.image,
//       },
//     });
//   } catch (error) {
//     console.error("Error verifying Google ID token:", error);
//     res.status(401).json({
//       success: false,
//       message: "Invalid Google ID token",
//     });
//   }
// };
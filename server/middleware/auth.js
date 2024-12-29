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
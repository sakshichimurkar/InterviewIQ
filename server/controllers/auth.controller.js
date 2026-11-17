
import User from "../models/user.model.js";
import genToken from "../config/token.js";

// Google Authentication
// 1. Get user data from frontend
// 2. Find or create user in database
// 3. Generate JWT token
// 4. Save token in HTTP-only cookie

export const googleAuth = async (req, res) => {
    try {
        const { name, email } = req.body;

        // Validate frontend data
        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required"
            });
        }

        // Check whether user already exists
        let user = await User.findOne({ email });

        // Create user if not found
        if (!user) {
            user = await User.create({
                name,
                email
            });
        }

        // Generate JWT token
        const token = await genToken(user._id);

        if (!token) {
            return res.status(500).json({
                message: "Failed to generate authentication token"
            });
        }

        // Save JWT token in browser cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json(user);

    } catch (error) {
        console.error("Google authentication error:", error);

        return res.status(500).json({
            success: false,
            message: "Google authentication failed",
            error: error.message
        });
    }
};


// Logout User
// Clear authentication cookie

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/"
        });

        return res.status(200).json({
            success: true,
            message: "Logout successful"
        });

    } catch (error) {
        console.error("Logout error:", error);

        return res.status(500).json({
            success: false,
            message: "Logout failed",
            error: error.message
        });
    }
};

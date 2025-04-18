import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password should contain at least 8 characters" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email is already in use" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        generateToken(newUser._id, res);

        return res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullName,
            email: newUser.email,
            profilepic: newUser.profilePic
        });
    } catch (error) {
        console.error('❌ Error in signup:', error.message);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email is not registered" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Password is incorrect" });
        }

        generateToken(user._id, res);

        return res.status(200).json({
            _id: user._id,
            fullname: user.fullName,
            email: user.email,
            profilepic: user.profilePic,
            message: "Login successful"
        });
    } catch (error) {
        console.error('❌ Error in login:', error.message);
        return res.status(500).json({ message: "Can't login", error: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 0,
        });

        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ message: "Logout failed", error: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { profilePic, _id: userID } = req.body;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile Pic is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userID,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error("❌ Error in updateProfile:", error.message);
        return res.status(500).json({ message: "Can't update profile", error: error.message });
    }
};

export const checkAuth = async (req, res) => {
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
};

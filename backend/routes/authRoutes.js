const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Helper - Create JWT token
const makeToken = (user) => {
  return jwt.sign(
    { id: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

// CUSTOMER SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must contain at least 8 characters." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = email.trim().toLowerCase();
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ message: "Please enter a valid email." });
    }

    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    if (phone) {
      const existingPhone = await User.findOne({ phone: phone.trim() });
      if (existingPhone) {
        return res.status(409).json({ message: "An account with this phone already exists." });
      }
    }

    // NO HASH HERE - User.js model e hash chesthundhi - Double hash avvakudadhu
    const newUser = await User.create({
      name: name.trim(),
      email: cleanEmail,
      phone: phone ? phone.trim() : undefined,
      password: password,
    });

    const token = makeToken(newUser);
    return res.status(201).json({
      message: "Account created successfully!",
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email, phone: newUser.phone, role: newUser.role },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Unable to create your account." });
  }
});

// CUSTOMER LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter your email and password." });
    }
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = makeToken(user);
    return res.status(200).json({
      message: "Login successful!",
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Unable to login. Please try again." });
  }
});

// GET /me - Get logged in user
router.get("/me", protect, async (req, res) => {
  try {
    return res.json({
      user: { id: req.user._id, name: req.user.name, email: req.user.email, phone: req.user.phone, role: req.user.role },
    });
  } catch (e) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});

module.exports = router;
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token - Please login" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token - Please login" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET missing in .env");
      return res.status(500).json({ message: "Server config error" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found - Please login again" });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Session expired - Please login again" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token - Please login again" });
    }
    console.error("Auth error:", err.message);
    return res.status(401).json({ message: "Session expired - Please login again" });
  }
};

// Admin only - Must be used after protect
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only - Access denied" });
  }
  next();
};

module.exports = { protect, isAdmin };
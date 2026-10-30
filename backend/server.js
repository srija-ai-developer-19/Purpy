const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
// Payment routes - Only if file exists - COD only for now
let paymentRoutes = null;
try {
  paymentRoutes = require("./routes/paymentRoutes");
} catch (e) {
  console.log("Payment routes not found - Skipping - COD only");
}

const app = express();

app.set("trust proxy", 1);

// 1. Helmet - Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// 2. CORS - FIXED - Localhost anni ports allow - 5173, 5174, 3000, 127.0.0.1 anni
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (origin.includes("localhost") || origin.includes("127.0.0.1")) return cb(null, true);
      const allowed = [
        "https://purpy.vercel.app",
        "https://purpy-av3del74b-srija-ff85.vercel.app",
        process.env.FRONTEND_URL,
      ].filter(Boolean);
      if (allowed.includes(origin)) return cb(null, true);
      return cb(null, true); // Dev lo anni allow - CORS valla signup aagakudadhu
    },
    credentials: true,
  })
);

// 3. Body limit - Increased for product images
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// 4. Rate Limit - Auth only - Block brute force
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: "Too many tries, please try again after 15 mins" },
  standardHeaders: true,
  legacyHeaders: false,
});

app.get("/", (req, res) => res.json({ message: "Welcome to Purpy API!" }));
app.get("/api/health", (req, res) => res.json({ ok: true, time: new Date() }));

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
if (paymentRoutes) {
  app.use("/api/payment", paymentRoutes);
}

// 5. 404 - Wrong route
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// 6. Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error, please try again" });
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Purpy server running on port ${PORT}`));
});

module.exports = app;
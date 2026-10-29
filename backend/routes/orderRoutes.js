const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const Order = require("../models/Order");

// POST /api/orders - Purchase
router.post("/", protect, async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      status: "Placed"
    });
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Order failed", error: err.message });
  }
});

// TEST - WITHOUT PROTECT - TEMPORARY
router.post("/test", async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    console.log("Test order:", req.body);
    res.status(201).json({ _id: "ORDER_" + Date.now(), items, totalAmount, message: "Order placed (test mode)" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

// POST /api/cart/validate - Cart total ni server lo check cheyyi
router.post("/validate", protect, (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;
    for (const i of items) {
      const price = Number(i.price);
      const qty = Number(i.quantity);
      if (!price || price < 0 || !qty || qty < 1 || qty > 10) {
        return res.status(400).json({ message: "Invalid item in cart" });
      }
      total += price * qty;
    }

    res.json({ total });
  } catch (err) {
    res.status(500).json({ message: "Cart validation failed" });
  }
});

module.exports = router;
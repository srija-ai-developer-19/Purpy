const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const Product = require("../models/Product");

// POST /api/cart/validate - Cart ye - Order kaadhu
router.post("/validate", protect, async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;
    let fixedItems = [];

    for (const i of items) {
      const qty = Number(i.qty ?? i.quantity ?? 1);
      const productId = i.productId || i._id || i.id;

      if (!qty || qty < 1 || qty > 10) {
        return res.status(400).json({ message: `Invalid quantity for ${i.name || "item"}` });
      }

      // DB price - Nijam
      let realPrice = null;
      let realName = i.name;
      let realImg = i.img || i.image || "";

      if (productId) {
        const dbProduct = await Product.findById(productId);
        if (dbProduct) {
          realPrice = dbProduct.price;
          realName = dbProduct.name;
          realImg = dbProduct.img || dbProduct.image || realImg;
          if (dbProduct.stock !== undefined && qty > dbProduct.stock) {
            return res.status(400).json({ message: `${realName} - Only ${dbProduct.stock} left` });
          }
        }
      }

      if (realPrice === null) {
        realPrice = Number(i.price);
        if (!realPrice || realPrice < 0) {
          return res.status(400).json({ message: "Invalid item in cart" });
        }
      }

      total += realPrice * qty;
      fixedItems.push({
        productId: productId || "",
        name: realName,
        price: realPrice,
        qty,
        quantity: qty,
        img: realImg,
      });
    }

    res.json({ total, items: fixedItems });
  } catch (err) {
    console.error("Cart validation failed:", err.message);
    res.status(500).json({ message: "Cart validation failed" });
  }
});

module.exports = router;
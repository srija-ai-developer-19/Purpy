const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const { protect, isAdmin } = require("../middleware/authMiddleware");

// POST /api/orders - Create new order
router.post("/", protect, async (req, res) => {
  try {
    const { items, total, totalAmount, address, shippingAddress, paymentMethod } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const clientTotal = Number(total ?? totalAmount ?? 0);

    // Verify price from DB - Prevent frontend price tampering
    let realTotal = 0;
    let finalItems = [];

    for (const i of items) {
      const qty = Number(i.qty ?? i.quantity ?? 1);
      if (!qty || qty < 1 || qty > 10) {
        return res.status(400).json({ message: "Invalid quantity in cart" });
      }

      const productId = i.productId || i.product || i._id || i.id;
      let price = Number(i.price);
      let name = i.name;
      let img = i.img || i.image || "";
      let validProductId = null;

      // Fetch real price from DB if productId is valid
      if (productId && mongoose.Types.ObjectId.isValid(productId)) {
        validProductId = productId;
        const p = await Product.findById(productId);
        if (p) {
          price = p.price;
          name = p.name;
          img = p.img || p.image || img;
        }
      }

      if (!name || !price || price < 0) {
        return res.status(400).json({ message: "Invalid item in cart" });
      }

      realTotal += price * qty;

      finalItems.push({
        product: validProductId,
        name,
        price,
        quantity: qty,
        qty: qty,
        image: img,
        img: img,
      });
    }

    if (Math.abs(clientTotal - realTotal) > 1) {
      return res.status(400).json({
        message: `Price changed! Correct total is Rs.${realTotal}. Please refresh cart.`,
        correctTotal: realTotal,
      });
    }

    // Build shipping address - Support both address and shippingAddress from frontend
    const addr = shippingAddress || address || {};
    const finalAddress = {
      name: addr.name || req.user.name || "",
      address: addr.address || addr.fullAddress || addr.street || "",
      city: addr.city || "",
      pincode: addr.pincode || addr.zip || addr.pinCode || "",
      phone: addr.phone || addr.mobile || "",
    };

    if (!finalAddress.address || !finalAddress.city || !finalAddress.pincode || !finalAddress.phone) {
      return res.status(400).json({ message: "Please fill complete delivery address" });
    }

    const order = await Order.create({
      user: req.user._id,
      items: finalItems,
      shippingAddress: finalAddress,
      totalAmount: realTotal,
      total: realTotal,
      paymentMethod: paymentMethod || "COD",
      paymentStatus: "Pending",
      orderStatus: "Placed",
      status: "Placed",
    });

    res.status(201).json({ message: "Order placed!", order });
  } catch (e) {
    console.error("Order create error:", e.message);
    res.status(500).json({ message: "Failed to place order" });
  }
});

// GET /api/orders/my - Logged in user orders
router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// GET /api/orders - Admin - All orders
router.get("/", protect, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(orders);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// GET /api/orders/:id - Single order - Owner or Admin
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (req.user.role !== "admin" && order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }
    res.json(order);
  } catch (e) {
    res.status(400).json({ message: "Invalid order ID" });
  }
});

// PUT /api/orders/:id/status - Admin - Update status
router.put("/:id/status", protect, isAdmin, async (req, res) => {
  try {
    const allowed = ["Placed", "Confirmed", "Shipped", "Delivered", "Cancelled"];
    if (!allowed.includes(req.body.status) && !allowed.includes(req.body.orderStatus)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const newStatus = req.body.status || req.body.orderStatus;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: newStatus, status: newStatus },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (e) {
    res.status(500).json({ message: "Failed to update" });
  }
});

module.exports = router;
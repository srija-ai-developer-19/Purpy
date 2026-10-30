const express = require("express");
const Product = require("../models/Product");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// GET all products - Public - Guest can browse
router.get("/", async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (category && category !== "All") {
      filter.category = { $regex: `^${category}$`, $options: "i" };
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// GET one product by ID - Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Invalid product ID" });
  }
});

// POST create product - ADMIN ONLY
router.post("/", protect, isAdmin, async (req, res) => {
  try {
    const { name, price, category, image, img, description, stock } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price required" });
    }

    if (Number(price) < 0) {
      return res.status(400).json({ message: "Price cannot be negative" });
    }

    // ✅ FIX 1 - img / image - Rendu - Okate - Rendu chotla - Save cheyyi - Ekkada chusina - Kanipisthundhi
    const finalImg = img || image || "";

    const product = await Product.create({
      name: name.trim(),
      price: Number(price),
      category: category || "General",
      img: finalImg,
      image: finalImg,
      description: description || "",
      stock: stock !== undefined ? Number(stock) : 100,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({
      message: "Could not create product",
      error: error.message,
    });
  }
});

// PUT update product - ADMIN ONLY
router.put("/:id", protect, isAdmin, async (req, res) => {
  try {
    if (req.body.price !== undefined && Number(req.body.price) < 0) {
      return res.status(400).json({ message: "Price cannot be negative" });
    }
    if (req.body.stock !== undefined && Number(req.body.stock) < 0) {
      return res.status(400).json({ message: "Stock cannot be negative" });
    }

    // ✅ FIX 2 - Update lo kuda - img / image - Sync cheyyi
    const updateData = { ...req.body };
    if (updateData.img && !updateData.image) updateData.image = updateData.img;
    if (updateData.image && !updateData.img) updateData.img = updateData.image;
    if (updateData.name) updateData.name = updateData.name.trim();
    if (updateData.price !== undefined) updateData.price = Number(updateData.price);
    if (updateData.stock !== undefined) updateData.stock = Number(updateData.stock);

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Could not update product" });
  }
});

// DELETE product - ADMIN ONLY
router.delete("/:id", protect, isAdmin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ message: "Could not delete product" });
  }
});

module.exports = router;
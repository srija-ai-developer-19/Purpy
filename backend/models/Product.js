const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true },
  oldPrice: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, default: "" },
  stock: { type: Number, default: 10 },
  rating: { type: Number, default: 4.3 }
}, { timestamps: true });
module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);
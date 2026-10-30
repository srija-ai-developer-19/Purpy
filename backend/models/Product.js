const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    oldPrice: { type: Number, default: 0, min: 0 },
    category: { type: String, required: true, default: "General", trim: true },
    image: { type: String, default: "" },
    img: { type: String, default: "" },
    stock: { type: Number, default: 10, min: 0 },
    rating: { type: Number, default: 4.3, min: 0, max: 5 },
  },
  { timestamps: true }
);

// Keep img and image in sync - Frontend can use either field
productSchema.pre("save", function (next) {
  if (this.img && !this.image) this.image = this.img;
  if (this.image && !this.img) this.img = this.image;
  next();
});

// Indexes - Faster category filter and search
productSchema.index({ category: 1 });
productSchema.index({ name: "text", description: "text" });

module.exports = mongoose.models.Product || mongoose.model("Product", productSchema);
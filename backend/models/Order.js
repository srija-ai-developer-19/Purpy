const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: { type: String, required: true },
    image: { type: String, default: "" },
    img: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1, max: 10 },
    qty: { type: Number, min: 1, max: 10 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: String, required: true },
      phone: { type: String, required: true },
      name: { type: String, default: "" },
    },
    totalAmount: { type: Number, required: true, min: 0 },
    total: { type: Number, min: 0 },
    paymentMethod: {
      type: String,
      enum: ["COD", "UPI", "Card", "Online"],
      default: "COD",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: ["Placed", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Placed",
    },
    status: {
      type: String,
      enum: ["Placed", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Placed",
    },
  },
  { timestamps: true }
);

// Keep total / status in sync - So frontend works with either field name
orderSchema.pre("save", function (next) {
  if (this.totalAmount !== undefined) this.total = this.totalAmount;
  if (this.orderStatus) this.status = this.orderStatus;
  // Sync item fields - qty <-> quantity, img <-> image
  if (this.items && this.items.length > 0) {
    this.items.forEach((item) => {
      if (item.qty && !item.quantity) item.quantity = item.qty;
      if (item.quantity && !item.qty) item.qty = item.quantity;
      if (item.img && !item.image) item.image = item.img;
      if (item.image && !item.img) item.img = item.image;
    });
  }
  next();
});

orderSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("Order", orderSchema);
const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: String, image: String, price: Number, quantity: Number
  }],
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    phone: { type: String, required: true }
  },
  totalAmount: { type: Number, required: true },
  orderStatus: { type: String, default: "Placed" }
}, { timestamps: true });
module.exports = mongoose.model("Order", orderSchema);
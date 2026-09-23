const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: "USD"
  },
  invoice: {
    type: String,
    default: ""
  },
  paymentId: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ["pending", "paid", "expired"],
    default: "pending"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Payment", paymentSchema);
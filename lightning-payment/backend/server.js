const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Payment = require("./models/Payment");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed");
    console.log(error.message);
  });

app.get("/", (req, res) => {
  res.json({
    message: "Lightning Payment API Running"
  });
});

app.post("/api/payments", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        error: "Valid amount is required"
      });
    }

    const payment = await Payment.create({
      amount: Number(amount),
      currency: "USD",
      status: "pending"
    });

    const paymentLink = `http://localhost:5173/payment/${payment._id}`;

    res.status(201).json({
      success: true,
      payment,
      paymentLink
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});
app.get("/api/payments/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({
        error: "Payment not found"
      });
    }

    res.json({
      success: true,
      payment
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});
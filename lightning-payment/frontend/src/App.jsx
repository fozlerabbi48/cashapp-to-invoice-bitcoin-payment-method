import { useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Payment from "./Payment";
import "./App.css";

function Home() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const quickAmounts = [20, 50, 100];

  const payNow = async () => {
    if (!amount || Number(amount) <= 0) {
      alert("Please enter an amount");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/api/payments",
        {
          amount: Number(amount)
        }
      );

      const paymentId = response.data.payment._id;

      navigate(`/payment/${paymentId}`);
    } catch (error) {
      console.log(error);
      alert("Payment creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="payment-card">

        <div className="cash-logo">
          $
        </div>

        <h1>Cash App</h1>

        <div className="amount-box">
          <span>$</span>

          <input
            type="number"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="quick-amounts">
          {quickAmounts.map((value) => (
            <button
              key={value}
              onClick={() => setAmount(value)}
            >
              ${value}
            </button>
          ))}
        </div>

        <button
          className="pay-button"
          onClick={payNow}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment/:id" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
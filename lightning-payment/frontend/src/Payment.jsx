import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Payment.css";

function Payment() {
  const { id } = useParams();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/payments/${id}`)
      .then((response) => {
        setPayment(response.data.payment);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="payment-page">Loading...</div>;
  }

  if (!payment) {
    return <div className="payment-page">Payment not found</div>;
  }

  return (
    <div className="payment-page">
      <div className="bitcoin-card">

        <div className="bitcoin-logo">
          ₿
        </div>

        <h1>Bitcoin Payment</h1>

        <p className="pay-text">
          Amount to pay
        </p>

        <h2>${payment.amount}</h2>

        <div className="qr-box">
          <span>QR</span>
        </div>

        <p className="payment-status">
          Status: {payment.status}
        </p>

        <button className="bitcoin-pay-button">
          Pay
        </button>

      </div>
    </div>
  );
}

export default Payment;
import React, { useState } from "react";
import api from "../services/api";

function CreatePayment() {
  const [amount, setAmount] = useState("");
  const [trusteeId, setTrusteeId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await api.post("/payments/create-payment", {
        trustee_id: trusteeId,
        student_info: { name: studentName },
        amount,
        gateway_name: "razorpay",
        callback_url: "https://edupay-dashboard.onrender.com/webhooklogs"
      });

      window.location.href = res.data.payment_url;
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Payment creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create Payment</h1>

      <input
        type="text"
        placeholder="Trustee ID"
        value={trusteeId}
        onChange={(e) => setTrusteeId(e.target.value)}
        className="border p-2 mb-2 w-full"
      />

      <input
        type="text"
        placeholder="Student Name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        className="border p-2 mb-2 w-full"
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 mb-2 w-full"
      />

      <button
        onClick={handlePayment}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}

export default CreatePayment;

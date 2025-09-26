import React, { useState } from "react";
import api from "../services/api";


function TransactionStatus() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState(null);

  const handleCheck = async () => {
    try {
      const res = await api.get(
        `/payments/transaction-status/${orderId}`
      );
      setStatus(res.data.status);
    } catch (err) {
      console.error(err);
      setStatus(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Check Transaction Status</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleCheck}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Check Status
        </button>
      </div>
      {status && (
        <div className="mt-4 p-4 border rounded">
          <p>
            <strong>Status:</strong> {status.status}
          </p>
          <p>
            <strong>Transaction Amount:</strong> {status.transaction_amount}
          </p>
        </div>
      )}
    </div>
  );
}

export default TransactionStatus;

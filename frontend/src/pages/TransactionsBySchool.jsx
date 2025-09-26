import React, { useState } from "react";
import api from "../services/api.js";
import Table from "../component/Table.jsx";

const TransactionsBySchool = () => {
  const [schoolId, setSchoolId] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    if (!schoolId) return alert("Please enter a school ID");
    setLoading(true);
    try {
      const res = await api.get(`/transactions/school/${schoolId}`);
      setTransactions(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Transactions by School</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter School ID"
          value={schoolId}
          onChange={(e) => setSchoolId(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleFetch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Fetch Transactions
        </button>
      </div>

      {loading ? <p>Loading...</p> : <Table data={transactions} />}
    </div>
  );
};

export default TransactionsBySchool;

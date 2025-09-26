import React, { useEffect, useState } from "react";
import Table from "../component/Table.jsx";
import Pagination from "../component/Pagination.jsx";
import api from "../services/api.js";

const TransactionsOverview = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const res = await api.get("/transactions", {
        params: {
          page: currentPage,
          limit,
          status: statusFilter,
        },
      });
      setTransactions(res.data.transactions);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [currentPage, statusFilter]);

  return (
    <div>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Transactions Overview</h1>

        {/* Filter by Status */}
        <select
          className="border p-2 mb-4"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>

        {loading ? <p>Loading...</p> : <Table data={transactions} />}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default TransactionsOverview;

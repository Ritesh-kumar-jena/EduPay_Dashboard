import React from "react";

const Table = ({ data }) => {
  if (!data || data.length === 0) return <p>No data found.</p>;

  return (
    <table className="min-w-full border border-gray-300">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2 border">Order ID</th>
          <th className="p-2 border">School ID</th>
          <th className="p-2 border">Gateway</th>
          <th className="p-2 border">Order Amount</th>
          <th className="p-2 border">Transaction Amount</th>
          <th className="p-2 border">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((tx) => (
          <tr key={tx.collect_id} className="border-t hover:bg-gray-50">
            <td className="p-2 border">{tx.collect_id}</td>
            <td className="p-2 border">{tx.school_id}</td>
            <td className="p-2 border">{tx.gateway}</td>
            <td className="p-2 border">{tx.order_amount}</td>
            <td className="p-2 border">{tx.transaction_amount}</td>
            <td className="p-2 border">{tx.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;

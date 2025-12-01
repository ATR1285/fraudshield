import React, { useState } from 'react';
import { CSVLink } from 'react-csv';

const HistoryTable = ({ transactions }) => {
  const [search, setSearch] = useState('');
  const [filterRisk, setFilterRisk] = useState('');

  const filteredTxns = transactions.filter(txn =>
    txn.merchant.toLowerCase().includes(search.toLowerCase()) ||
    txn.country.toLowerCase().includes(search.toLowerCase()) ||
    (filterRisk && txn.risk_score >= parseInt(filterRisk))
  );

  const csvData = filteredTxns.map(t => ({
    ID: t.transaction_id,
    Merchant: t.merchant,
    Amount: t.amount,
    Risk: t.risk_score,
    Country: t.country,
    Time: new Date().toISOString(), // Placeholder; adjust if backend provides timestamp
  }));

  return (
    <div className="glass p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Transaction History</h3>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search by merchant/country"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
        />
        <select
          value={filterRisk}
          onChange={(e) => setFilterRisk(e.target.value)}
          className="p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
        >
          <option value="">All Risks</option>
          <option value="50">Risk &gt;= 50</option>
          <option value="70">Risk &gt;= 70</option>
        </select>
        <CSVLink data={csvData} filename="transactions.csv" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Export CSV
        </CSVLink>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="p-2">Txn ID</th>
              <th className="p-2">Merchant</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Risk</th>
              <th className="p-2">Country</th>
              <th className="p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredTxns.map(txn => (
              <tr key={txn.transaction_id} className="border-b dark:border-gray-600">
                <td className="p-2">{txn.transaction_id}</td>
                <td className="p-2">{txn.merchant}</td>
                <td className="p-2">${txn.amount}</td>
                <td className="p-2">{txn.risk_score}</td>
                <td className="p-2">{txn.country}</td>
                <td className="p-2">{new Date().toLocaleTimeString()}</td> {/* Placeholder for time */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RiskChart = ({ riskScores }) => {
  const data = riskScores.map((score, idx) => ({ name: idx + 1, risk: score }));

  return (
    <div className="glass p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Risk Score Trend (Last 50)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="risk" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskChart;
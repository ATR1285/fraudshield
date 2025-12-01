import React, { useState } from 'react';
import { FaBitcoin, FaShoppingCart } from 'react-icons/fa';
import EvidenceBox from './EvidenceBox';

const TransactionCard = ({ transaction }) => {
  const [expanded, setExpanded] = useState(false);

  if (!transaction) return <div className="glass p-6 rounded-lg">Loading...</div>;

  const { transaction_id, merchant, amount, risk_score, country, explanation, evidence } = transaction;

  // Merchant icon
  const merchantIcon = merchant.toLowerCase().includes('crypto') ? <FaBitcoin /> : <FaShoppingCart />;

  // Country flag
  const countryFlag = country === 'US' ? '🇺🇸' : '🌍'; // Add more as needed

  // Risk color
  const riskColor = risk_score >= 70 ? 'text-red-500' : risk_score >= 50 ? 'text-yellow-500' : 'text-green-500';

  // Fraud badges
  const badges = [];
  if (explanation.toLowerCase().includes('velocity')) badges.push('Velocity');
  if (explanation.toLowerCase().includes('high amount')) badges.push('High Amount');
  if (explanation.toLowerCase().includes('chargeback')) badges.push('Chargeback');
  if (explanation.toLowerCase().includes('cross-border')) badges.push('Cross-border');
  if (risk_score >= 70) badges.push('Fraud Likely');

  return (
    <div className="glass p-6 rounded-lg shadow-lg transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          {merchantIcon}
          <span className="text-lg font-semibold">{merchant}</span>
          <span>{countryFlag}</span>
        </div>
        <span className={`text-2xl font-bold ${riskColor}`}>{risk_score}</span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-2">Amount: ${amount}</p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">Explanation: {explanation}</p>
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {badges.map(badge => (
            <span key={badge} className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded text-sm">
              {badge}
            </span>
          ))}
        </div>
      )}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-blue-500 hover:underline"
      >
        {expanded ? 'Hide Evidence' : 'Show Evidence'}
      </button>
      {expanded && <EvidenceBox evidence={evidence} />}
    </div>
  );
};

export default TransactionCard;
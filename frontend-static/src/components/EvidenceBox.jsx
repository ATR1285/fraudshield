import React from 'react';

const EvidenceBox = ({ evidence }) => {
  return (
    <div className="mt-4 space-y-2">
      {evidence.map((item, idx) => (
        <div key={idx} className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
          <h4 className="font-semibold">{item.doc_type}</h4>
          <p className="text-sm">{item.full_text}</p>
        </div>
      ))}
    </div>
  );
};

export default EvidenceBox;
// Sanctions.tsx
import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const Sanctions: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <FiAlertCircle className="w-5 h-5 mr-3 text-orange-500" />
        Sanctions
      </h4>
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-700">
        <p>This page is for managing sanctions related to contracts or employees.</p>
        {/* Further implementation for sanctions */}
      </div>
    </div>
  );
};

export default Sanctions;
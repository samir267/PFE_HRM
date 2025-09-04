// BenefitsManagement.tsx
import React from 'react';
import { FiTool } from 'react-icons/fi';

const BenefitsManagement: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <FiTool className="w-5 h-5 mr-3 text-orange-500" />
        Benefits Management
      </h4>
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-700">
        <p>This page is for managing employee benefits.</p>
        {/* Further implementation for benefits management */}
      </div>
    </div>
  );
};

export default BenefitsManagement;
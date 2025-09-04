import React, { useState } from 'react';
import { FiPercent, FiMapPin, FiSave } from 'react-icons/fi';

const EnterUnionizationRateHR: React.FC = () => {
  const [unionRate, setUnionRate] = useState<number | ''>('');
  const [location, setLocation] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSave = () => {
    if (unionRate === '' || isNaN(Number(unionRate)) || location === '') {
      setMessage('Please enter a valid rate and select a location.');
      return;
    }
    console.log(`Unionization rate for ${location} saved: ${unionRate}%`);
    setMessage(`Unionization rate for ${location} updated to ${unionRate}%.`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-lg">
        <div className="flex items-center text-orange-600 mb-4">
          <FiPercent size={24} />
          <h2 className="text-xl font-semibold ml-2 text-gray-800">Enter Unionization Rate</h2>
        </div>
        <p className="text-gray-500 mb-4">Set the unionization rate for a specific location.</p>
        
        <div className="flex flex-col mb-4">
          <label htmlFor="location" className="text-gray-500 text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm px-3 py-2 text-gray-900 focus:ring-orange-500 focus:border-orange-500"
            placeholder="e.g., Toronto"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="unionRate" className="text-gray-500 text-sm font-medium mb-1">Unionization Rate (%)</label>
          <input
            type="number"
            id="unionRate"
            value={unionRate}
            onChange={(e) => setUnionRate(Number(e.target.value))}
            className="w-full rounded-md border-gray-300 shadow-sm px-3 py-2 text-gray-900 focus:ring-orange-500 focus:border-orange-500"
            placeholder="e.g., 10.5"
          />
        </div>
        
        <button
          onClick={handleSave}
          className="w-full px-6 py-2 rounded-lg transition-colors bg-orange-600 text-white hover:bg-orange-700 flex items-center justify-center"
        >
          <FiSave className="mr-2" /> Save Rate
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-green-600 font-semibold">{message}</p>
        )}
      </div>
    </div>
  );
};

export default EnterUnionizationRateHR;
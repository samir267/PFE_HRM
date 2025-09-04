import React from 'react';
import { FaHome, FaArrowLeft, FaSyncAlt, FaCloudUploadAlt } from 'react-icons/fa'; // Using Font Awesome icons

const ServiceUnavailable: React.FC = () => {
  const handleGoHome = () => {
    // In a real ServiceUnavailable, you'd use router navigation
    console.log('Navigate to home');
    // Example: window.location.href = '/';
  };

  const handleGoBack = () => {
    // In a real ServiceUnavailable, you'd use window.history.back() or router navigation
    console.log('Go back');
    window.history.back();
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 flex items-center justify-center px-4 font-inter">
      <div className="max-w-md w-full text-center">
        {/* 503 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-600 mb-4">
            503
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-amber-600 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-3">
          <h2 className="text-2xl font-semibold text-gray-800">
            Service Unavailable
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our servers are temporarily overloaded or undergoing maintenance.
            We'll be back online shortly!
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-8">
          <div className="relative mx-auto w-32 h-32 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full flex items-center justify-center">
            <FaCloudUploadAlt className="w-12 h-12 text-yellow-500 animate-pulse" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="w-full bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <FaHome className="w-5 h-5" />
            Go Home
          </button>

          <div className="flex gap-3">
            <button
              onClick={handleGoBack}
              className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
            >
              <FaArrowLeft className="w-4 h-4" />
              Go Back
            </button>

            <button
              onClick={handleRefresh}
              className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
            >
              <FaSyncAlt className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            Please check back in a few minutes or{' '}
            <a href="#" className="text-yellow-600 hover:text-yellow-800 underline transition-colors">
              contact support
            </a>
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-10 w-16 h-16 bg-amber-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-orange-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default ServiceUnavailable;

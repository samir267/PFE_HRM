import React from 'react';
import { MdHome, MdArrowBack, MdSearch, MdRefresh } from 'react-icons/md'; // Importing icons from Material Design

const NotFoundPage: React.FC = () => {
 const handleGoHome = () => {
    // Redirect to the dashboard page
    window.location.href = '/dashboard';
  };

  const handleGoBack = () => {
    // In a real app, you'd use window.history.back() or router navigation
    console.log('Go back');
    window.history.back();
  };

  const handleRefresh = () => {
    window.location.reload();
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-3">
          <h2 className="text-2xl font-semibold text-gray-800">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 leading-relaxed">
            The page you're looking for seems to have vanished into the digital void.
            Don't worry, it happens to the best of us!
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-8">
          <div className="relative mx-auto w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
            <MdSearch className="w-12 h-12 text-blue-500 animate-pulse" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <MdHome className="w-5 h-5" />
            Go Home
          </button>

          <div className="flex gap-3">
            <button
              onClick={handleGoBack}
              className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
            >
              <MdArrowBack className="w-4 h-4" />
              Go Back
            </button>

            <button
              onClick={handleRefresh}
              className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-md flex items-center justify-center gap-2"
            >
              <MdRefresh className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            Still lost? Try checking the URL or{' '}
            <a href="#" className="text-blue-600 hover:text-blue-800 underline transition-colors">
              contact support
            </a>
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-pink-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default NotFoundPage;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setIsLoading(true);
    
    // Password reset logic would go here
    // For demo purposes, we'll simulate a successful request
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
    }, 1000);
  };
  
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-orange-400 text-center">
              Forgot Password
            </h1>
            
            {error && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-700 dark:text-red-400">
                {error}
              </div>
            )}
            
            {success ? (
              <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-700 dark:text-green-400">
                Password reset link has been sent to your email. Please check your inbox.
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Enter your email and we'll send you a link to reset your password.
                </p>
                
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input 
                      type="email" 
                      name="email" 
                      id="email" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-400 dark:hover:bg-orange-600 dark:focus:ring-orange-800"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </form>
              </>
            )}
            
            <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
              Remember your password? <Link to="/login" className="font-medium text-orange-600 hover:underline dark:text-orange-400">Back to Login</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
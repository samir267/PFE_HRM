// pages/onboarding/Onboarding.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { completeOnboarding } from '../../store/slices/userSlice';

interface OnboardingProps {
  onComplete: () => void;
}

const steps = [
  {
    id: 'welcome',
    title: 'Welcome to Excellencia ERP',
    description: 'We\'re excited to have you on board. Let\'s set up your account in a few simple steps.'
  },
  {
    id: 'profile',
    title: 'Complete Your Profile',
    description: 'Tell us more about yourself so we can personalize your experience.'
  },
  {
    id: 'preferences',
    title: 'Set Your Preferences',
    description: 'Configure your workspace according to your needs.'
  },
  {
    id: 'modules',
    title: 'Choose Your Modules',
    description: 'Select the modules you want to use to customize your dashboard.'
  },
  {
    id: 'complete',
    title: 'You\'re All Set!',
    description: 'Your account is now ready to use. Let\'s get started.'
  }
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      dispatch(completeOnboarding());
      onComplete();
      navigate('/dashboard');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    dispatch(completeOnboarding());
    onComplete();
    navigate('/dashboard');
  };

  const renderStepContent = () => {
    const step = steps[currentStep];

    switch (step.id) {
      case 'welcome':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {step.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            <div className="flex justify-center py-8">
              <div className="bg-orange-100 dark:bg-gray-700 rounded-full p-8 w-32 h-32 flex items-center justify-center">
                <span className="text-4xl">👋</span>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {step.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="jobTitle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  id="jobTitle"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your job title"
                />
              </div>
              <div>
                <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                <select
                  name="department"
                  id="department"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select department</option>
                  <option value="finance">Finance</option>
                  <option value="hr">Human Resources</option>
                  <option value="operations">Operations</option>
                  <option value="it">IT</option>
                </select>
              </div>
            </form>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {step.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Theme</h3>
                <div className="flex space-x-4">
                  <button className="bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 focus:ring-2 focus:ring-orange-300">Light</button>
                  <button className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 hover:bg-gray-700 focus:ring-2 focus:ring-orange-300">Dark</button>
                  <button className="bg-gray-200 text-gray-800 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 focus:ring-2 focus:ring-orange-300">System</button>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="emailNotifications"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-orange-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-orange-600 dark:ring-offset-gray-800"
                      defaultChecked
                    />
                    <label htmlFor="emailNotifications" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Email Notifications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="pushNotifications"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-orange-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-orange-600 dark:ring-offset-gray-800"
                      defaultChecked
                    />
                    <label htmlFor="pushNotifications" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Push Notifications
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'modules':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {step.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Finance</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Manage budgets, invoices, and financial reports</p>
                <div className="flex items-center">
                  <input
                    id="financeModule"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-orange-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-orange-600 dark:ring-offset-gray-800"
                    defaultChecked
                  />
                  <label htmlFor="financeModule" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Enable
                  </label>
                </div>
              </div>

              <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="text-3xl mb-2">👥</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">HR Management</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Manage employees, leave, and payroll</p>
                <div className="flex items-center">
                  <input
                    id="hrModule"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-orange-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-orange-600 dark:ring-offset-gray-800"
                    defaultChecked
                  />
                  <label htmlFor="hrModule" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Enable
                  </label>
                </div>
              </div>

              <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="text-3xl mb-2">🚚</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Supply Chain</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Track inventory, suppliers, and logistics</p>
                <div className="flex items-center">
                  <input
                    id="supplyChainModule"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-orange-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-orange-600 dark:ring-offset-gray-800"
                  />
                  <label htmlFor="supplyChainModule" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Enable
                  </label>
                </div>
              </div>

              <div className="p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="text-3xl mb-2">📋</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Project Management</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Plan, track, and manage projects</p>
                <div className="flex items-center">
                  <input
                    id="projectModule"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-orange-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-orange-600 dark:ring-offset-gray-800"
                  />
                  <label htmlFor="projectModule" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Enable
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="space-y-4 text-center">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {step.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
            <div className="flex justify-center py-8">
              <div className="bg-green-100 dark:bg-green-800 rounded-full p-4 w-24 h-24 flex items-center justify-center">
                <span className="text-green-500 dark:text-green-300 text-5xl">✓</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">Your workspace is now set up and ready to use.</p>
              <p className="text-gray-600 dark:text-gray-300">Click "Finish" to go to your dashboard.</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Progress bar
  const renderProgressBar = () => {
    return (
      <div className="mb-6">
        <div className="flex justify-between mb-1">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex flex-col items-center"
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${index < currentStep
                    ? 'bg-orange-600 border-orange-600 text-white dark:bg-orange-400 dark:border-orange-400'
                    : index === currentStep
                      ? 'border-orange-600 text-orange-600 dark:border-orange-400 dark:text-orange-400'
                      : 'border-gray-300 text-gray-400 dark:border-gray-600'
                  }`}
              >
                {index < currentStep ? '✓' : index + 1}
              </div>
              <span className={`text-xs mt-1 ${index <= currentStep ? 'text-orange-600 dark:text-orange-400' : 'text-gray-400 dark:text-gray-500'
                }`}>
                {step.title.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-orange-600 h-2.5 rounded-full dark:bg-orange-400"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 w-full px-20 h-full flex flex-row">
      <div className="flex flex-col items-center justify-center px-6 py-4 mx-8 h-screen lg:py-0 w-full">
        <div className="w-full bg-white rounded-lg shadow dark:border md:my-12 h-full py-8 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 flex flex-col justify-between h-full">
            <div className="justify-start">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-orange-400 text-center md:my-12">
                {steps[currentStep].title}
              </h1>
              <div className="px-auto">
                {renderProgressBar()}
              </div>

              <div className="onboarding-content">
                {renderStepContent()}
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <div>
                {currentStep > 0 && (
                  <button
                    className="text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    onClick={handlePrevious}
                  >
                    Previous
                  </button>
                )}
              </div>

              <div className="flex space-x-3">
                {currentStep < steps.length - 1 ? (
                  <>
                    <button
                      className="text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      onClick={handleSkip}
                    >
                      Skip
                    </button>
                    <button
                      className="text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-400 dark:hover:bg-orange-600 dark:focus:ring-orange-800"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  </>
                ) : (
                  <button
                    className="text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-400 dark:hover:bg-orange-600 dark:focus:ring-orange-800"
                    onClick={handleNext}
                  >
                    Finish
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Onboarding;
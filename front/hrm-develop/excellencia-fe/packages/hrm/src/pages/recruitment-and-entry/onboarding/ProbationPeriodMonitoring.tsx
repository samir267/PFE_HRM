import React, { useState, useEffect } from 'react';
import {
  FiUsers,
  FiUserCheck,
  FiClock,
  FiCalendar,
  FiFileText,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiChevronDown,
  FiChevronRight,
  FiEdit,
  FiTrash2,
  FiPlus,
  FiSend,
  FiBarChart2,
  FiMessageSquare,
  FiBell,
  FiHome,
  FiClipboard,
  FiBriefcase,
  FiSettings,
  FiX,
  FiSearch,
} from 'react-icons/fi';
import {
  EmployeeRecord,
} from './HireEmploye'; // Assuming this file exists and exports this type

// Custom types for this component
interface ProbationMetric {
  id: number;
  metric: string;
  target: string;
  progress: number; // 0 to 100
  notes?: string;
}

interface ProbationReview {
  id: number;
  reviewer: 'Manager' | 'HR' | 'Peer';
  date: string;
  summary: string;
  recommendation: 'Extend' | 'Confirm' | 'Terminate';
  isSigned: boolean;
}

interface ProbationPeriodData {
  employeeId: string;
  startDate: string;
  endDate: string;
  status: 'In Progress' | 'Under Review' | 'Confirmed' | 'Extended' | 'Terminated';
  metrics: ProbationMetric[];
  reviews: ProbationReview[];
  reminders: string[];
}

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

const ProbationPeriodMonitoring: React.FC = () => {
  const [employees, setEmployees] = useState<EmployeeRecord[]>([
    {
      id: '5',
      timestamp: '2025-06-14-08:30:00',
      name: 'CHRIS YELLOW',
      applicantId: '010031',
      status: 'Hired',
      department: 'Engineering',
      position: 'DevOps Engineer',
      email: 'chris.yellow@example.com',
      phone: '+32 483 45 67 89',
      address: '222 Maple Dr, Aalst, Belgium',
    },
    {
      id: '6',
      timestamp: '2025-06-24-11:00:00',
      name: 'PETER JONES',
      applicantId: '010021',
      status: 'Hired',
      department: 'Sales',
      position: 'Sales Manager',
      email: 'peter.jones@example.com',
      phone: '+32 473 45 67 89',
      address: '101 Cedar Rd, Liege, Belgium',
    },
    {
      id: '7',
      timestamp: '2025-05-01-09:00:00',
      name: 'ANNA BROWN',
      applicantId: '010045',
      status: 'Hired',
      department: 'Marketing',
      position: 'Marketing Specialist',
      email: 'anna.brown@example.com',
      phone: '+32 491 23 45 67',
      address: '456 Oak St, Ghent, Belgium',
    },
  ]);

  const [probationData, setProbationData] = useState<ProbationPeriodData[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeRecord | null>(employees[0] || null);
  const [expandedMetrics, setExpandedMetrics] = useState<number[]>([]);
  const [expandedReviews, setExpandedReviews] = useState<number[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalAction, setModalAction] = useState<(() => void) | null>(null);
  const [activeMainTab, setActiveMainTab] = useState('onboarding');

  useEffect(() => {
    // Simulate fetching probation data for hired employees
    const generateProbationData = (): ProbationPeriodData[] => {
      const today = new Date();
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(today.getMonth() - 3);

      return employees.map((emp) => {
        const startDate = new Date(emp.timestamp.split('-')[0] + '-' + emp.timestamp.split('-')[1] + '-' + emp.timestamp.split('-')[2]);
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 6); // Assuming a 6-month probation period
        
        const status = today > endDate ? 'Confirmed' : 'In Progress';
        const notesForChris = 'Requires improvement in project documentation. Excellent technical skills.';
        const notesForPeter = 'Exceeded Q2 sales targets. Strong client relationships.';

        return {
          employeeId: emp.id,
          startDate: startDate.toISOString().slice(0, 10),
          endDate: endDate.toISOString().slice(0, 10),
          status: status as 'In Progress' | 'Under Review' | 'Confirmed' | 'Extended' | 'Terminated',
          metrics: [
            {
              id: 1,
              metric: 'Project Completion Rate',
              target: '95%',
              progress: emp.id === '5' ? 85 : 98,
              notes: 'Evaluated based on successful delivery of assigned project tasks.',
            },
            {
              id: 2,
              metric: 'Client Satisfaction Score',
              target: '4.5/5',
              progress: emp.id === '5' ? 4.1 : 4.8,
              notes: 'Gathered via client feedback surveys and direct communication.',
            },
            {
              id: 3,
              metric: 'Team Collaboration',
              target: 'Positive feedback',
              progress: emp.id === '5' ? 70 : 90,
              notes: 'Measured by peer reviews and manager observations.',
            },
          ],
          reviews: [
            {
              id: 101,
              reviewer: 'Manager',
              date: '2025-07-15',
              summary: emp.id === '5' ? notesForChris : notesForPeter,
              recommendation: emp.id === '5' ? 'Extend' : 'Confirm',
              isSigned: true,
            },
          ],
          reminders: ['Schedule 3-month check-in meeting.', 'Prepare final review document 1 week before end date.'],
        };
      });
    };
    setProbationData(generateProbationData());
  }, [employees]);

  const addNotification = (message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const openConfirmationModal = (actionType: string) => {
    let content = '';
    let action: (() => void) | null = null;
    switch (actionType) {
      case 'confirmProbation':
        content = `Are you sure you want to CONFIRM the probation period for ${selectedEmployee?.name}? This action is final.`;
        action = () => handleUpdateProbationStatus('Confirmed');
        break;
      case 'extendProbation':
        content = `Are you sure you want to EXTEND the probation period for ${selectedEmployee?.name}?`;
        action = () => handleUpdateProbationStatus('Extended');
        break;
      case 'terminateProbation':
        content = `Are you sure you want to TERMINATE the employment of ${selectedEmployee?.name}? This is a sensitive action.`;
        action = () => handleUpdateProbationStatus('Terminated');
        break;
      default:
        content = 'Are you sure you want to proceed?';
        action = null;
    }
    setModalContent(content);
    setModalAction(() => action);
    setShowModal(true);
  };

  const handleModalConfirm = () => {
    if (modalAction) {
      modalAction();
    }
    setShowModal(false);
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setModalContent('');
    setModalAction(null);
  };

  const toggleMetricExpansion = (metricId: number) => {
    setExpandedMetrics((prev) =>
      prev.includes(metricId) ? prev.filter((id) => id !== metricId) : [...prev, metricId]
    );
  };

  const toggleReviewExpansion = (reviewId: number) => {
    setExpandedReviews((prev) =>
      prev.includes(reviewId) ? prev.filter((id) => id !== reviewId) : [...prev, reviewId]
    );
  };

  const getStatusBadgeColor = (status: ProbationPeriodData['status']) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Extended':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Under Review':
        return 'bg-purple-100 text-purple-800';
      case 'Terminated':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUpdateProbationStatus = (newStatus: ProbationPeriodData['status']) => {
    setProbationData((prevData) =>
      prevData.map((data) =>
        data.employeeId === selectedEmployee?.id
          ? { ...data, status: newStatus }
          : data
      )
    );
    addNotification(`Probation status updated to '${newStatus}' for ${selectedEmployee?.name}.`, 'success');
  };

  const getDaysLeft = (endDateStr: string) => {
    const endDate = new Date(endDateStr);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const renderProbationContent = () => {
    const data = probationData.find((d) => d.employeeId === selectedEmployee?.id);

    if (!selectedEmployee || !data) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <FiInfo className="w-12 h-12 mb-4" />
          <p className="text-lg">Select a hired employee to monitor their probation period.</p>
        </div>
      );
    }

    const daysLeft = getDaysLeft(data.endDate);

    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <FiUserCheck className="inline-block mr-3 text-orange-500" size={24} /> Probation Monitoring for {selectedEmployee.name}
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-200 pb-4">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm font-medium text-gray-500">Status:</span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(data.status)}`}>
                  {data.status}
                </span>
              </div>
              <p className="text-lg font-semibold text-gray-800">
                <FiClock className="inline-block mr-2 text-gray-500" />
                Days left: {daysLeft}
              </p>
              <p className="text-sm text-gray-500">
                Start Date: {data.startDate} | End Date: {data.endDate}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center space-x-2 text-sm"
                onClick={() => openConfirmationModal('confirmProbation')}
                disabled={data.status === 'Confirmed'}
              >
                <FiCheckCircle />
                <span>Confirm</span>
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2 text-sm"
                onClick={() => openConfirmationModal('extendProbation')}
                disabled={data.status === 'Extended'}
              >
                <FiCalendar />
                <span>Extend</span>
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center space-x-2 text-sm"
                onClick={() => openConfirmationModal('terminateProbation')}
                disabled={data.status === 'Terminated'}
              >
                <FiTrash2 />
                <span>Terminate</span>
              </button>
            </div>
          </div>

          <div className="space-y-8">
            {/* Performance Metrics Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <FiBarChart2 className="mr-2 text-indigo-500" /> Performance Metrics
                </h3>
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-1 text-sm"
                  onClick={() => addNotification('Add new metric functionality is under development.', 'info')}
                >
                  <FiPlus size={16} />
                  <span>Add Metric</span>
                </button>
              </div>
              <div className="divide-y divide-gray-200 border rounded-lg overflow-hidden">
                {data.metrics.map((metric) => (
                  <div key={metric.id} className="p-4 bg-white">
                    <div className="flex justify-between items-center">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{metric.metric}</h4>
                        <p className="mt-1 text-sm text-gray-500">Target: {metric.target}</p>
                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-green-600 h-2.5 rounded-full"
                            style={{ width: `${metric.progress}%` }}
                          ></div>
                        </div>
                        <p className="mt-1 text-xs text-gray-600">{metric.progress}% Progress</p>
                        {expandedMetrics.includes(metric.id) && (
                          <div className="mt-3 text-sm text-gray-700">
                            <p className="flex items-center">
                              <FiMessageSquare className="mr-2 text-gray-500" />
                              <span className="font-semibold">Notes:</span> {metric.notes}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                        <button
                          className="p-2 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
                          title="Edit Metric"
                          onClick={() => addNotification('Edit metric functionality is under development.', 'info')}
                        >
                          <FiEdit />
                        </button>
                        <button
                          className="p-2 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
                          onClick={() => toggleMetricExpansion(metric.id)}
                        >
                          {expandedMetrics.includes(metric.id) ? <FiChevronDown /> : <FiChevronRight />}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <FiFileText className="mr-2 text-purple-500" /> Reviews & Feedback
                </h3>
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-1 text-sm"
                  onClick={() => addNotification('Add new review functionality is under development.', 'info')}
                >
                  <FiPlus size={16} />
                  <span>Add Review</span>
                </button>
              </div>
              <div className="divide-y divide-gray-200 border rounded-lg overflow-hidden">
                {data.reviews.map((review) => (
                  <div key={review.id} className="p-4 bg-white">
                    <div className="flex justify-between items-center">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{review.reviewer} Review</span>
                          {review.isSigned && <FiCheckCircle className="text-green-500" title="Signed" />}
                        </div>
                        <p className="mt-1 text-sm text-gray-500">Date: {review.date}</p>
                        <p className="mt-1 text-sm font-semibold text-gray-700">
                          Recommendation: <span className={review.recommendation === 'Confirm' ? 'text-green-600' : review.recommendation === 'Extend' ? 'text-blue-600' : 'text-red-600'}>{review.recommendation}</span>
                        </p>
                        {expandedReviews.includes(review.id) && (
                          <div className="mt-3 text-sm text-gray-700">
                            <p className="flex items-center">
                              <FiMessageSquare className="mr-2 text-gray-500" />
                              <span className="font-semibold">Summary:</span> {review.summary}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                        <button
                          className="p-2 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
                          onClick={() => toggleReviewExpansion(review.id)}
                        >
                          {expandedReviews.includes(review.id) ? <FiChevronDown /> : <FiChevronRight />}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiInfo className="mr-2 text-gray-600" /> Quick Actions & Reminders
            </h3>
            <div className="space-y-3">
              {data.reminders.map((reminder, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-600">
                  <FiBell className="text-orange-500" />
                  <p className="text-sm">{reminder}</p>
                </div>
              ))}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2 text-sm"
              onClick={() => addNotification('Reminder sent to manager!', 'success')}
            >
              <FiSend />
              <span>Send Reminder to Manager</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSidePanel = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 lg:w-1/3 flex flex-col min-h-full max-h-full overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          <FiUsers className="w-5 h-5 mr-3 text-orange-500" /> Probation Employees
        </h3>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-3 py-1 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
      </div>
      <div className="overflow-y-auto flex-1 pr-2 -mr-2">
        <ul className="space-y-3">
          {employees.map((employee) => (
            <li
              key={employee.id}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ease-in-out ${
                selectedEmployee?.id === employee.id ? 'bg-orange-100 border-orange-500 shadow-md' : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
              } border`}
              onClick={() => setSelectedEmployee(employee)}
            >
              <div className="flex justify-between items-center mb-1">
                <p className="font-semibold text-gray-900 text-base">{employee.name}</p>
                <span className="text-xs text-gray-500">{employee.position}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">ID: {employee.applicantId}</p>
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(probationData.find(d => d.employeeId === employee.id)?.status || 'In Progress')}`}>
                  {probationData.find(d => d.employeeId === employee.id)?.status}
                </span>
                <FiChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <nav className="bg-orange-600 p-4 text-white shadow-md flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold">HRFlow</div>
          <span className="ml-6 text-sm text-orange-200">Welcome, SULIMANI Mansouen</span>
          <span className="px-3 py-1 bg-orange-700 rounded-full text-xs font-medium">HR Expert</span>
        </div>
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-2 text-sm font-medium hover:text-orange-200 transition-colors" onClick={() => setActiveMainTab('home')}>
            <FiHome />
            <span>Home</span>
          </button>
          <button className="flex items-center space-x-2 text-sm font-medium hover:text-orange-200 transition-colors" onClick={() => setActiveMainTab('employees')}>
            <FiUsers />
            <span>Employees</span>
          </button>
          <button className="flex items-center space-x-2 text-sm font-medium hover:text-orange-200 transition-colors" onClick={() => setActiveMainTab('jobs')}>
            <FiClipboard />
            <span>Jobs</span>
          </button>
          <button className="flex items-center space-x-2 text-sm font-medium hover:text-orange-200 transition-colors" onClick={() => setActiveMainTab('onboarding')}>
            <FiBriefcase />
            <span>Onboarding</span>
          </button>
          <button className="flex items-center space-x-2 text-sm font-medium hover:text-orange-200 transition-colors" onClick={() => setActiveMainTab('reports')}>
            <FiBarChart2 />
            <span>Reports</span>
          </button>
          <button className="flex items-center space-x-2 text-sm font-medium hover:text-orange-200 transition-colors" onClick={() => setActiveMainTab('settings')}>
            <FiSettings />
            <span>Settings</span>
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select className="bg-orange-700 text-white px-3 py-1 rounded-md text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-300">
              <option>Fluxerium - Bank</option>
              <option>Fluxerium - Tech</option>
            </select>
          </div>
          <button className="p-2 rounded-full hover:bg-orange-700 transition-colors relative">
            <FiBell className="w-5 h-5" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-orange-600"></span>
          </button>
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-orange-600 font-bold">
            SM
          </div>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row p-6 space-y-6 lg:space-y-0 lg:space-x-6 h-[calc(100vh-80px)]">
        {renderSidePanel()}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 lg:w-2/3 flex flex-col max-h-full overflow-hidden overflow-y-auto">
          {renderProbationContent()}
        </div>
      </div>

      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-center justify-between p-4 rounded-lg shadow-md text-white transition-all duration-300 ease-in-out transform ${
              notification.type === 'info'
                ? 'bg-blue-500'
                : notification.type === 'success'
                ? 'bg-green-500'
                : notification.type === 'error'
                ? 'bg-red-500'
                : 'bg-yellow-500 text-gray-900'
            }`}
          >
            <span>{notification.message}</span>
            <button onClick={() => removeNotification(notification.id)} className="ml-4 text-white hover:text-gray-200">
              <FiX />
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FiAlertCircle className="mr-2 text-orange-500" /> Confirmation
            </h3>
            <p className="text-gray-700 mb-6">{modalContent}</p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                onClick={handleModalCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                onClick={handleModalConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProbationPeriodMonitoring;
import React, { useState, useEffect } from 'react';
import {
  FiBriefcase,
  FiUser,
  FiFileText,
  FiCheckCircle,
  FiChevronRight,
  FiChevronDown,
  FiUsers,
  FiArrowRight,
  FiClock,
  FiCalendar,
  FiMail,
  FiDollarSign,
  FiMapPin,
  FiSmartphone,
  FiInfo,
  FiDownload,
  FiUpload,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiX,
  FiBell,
  FiHome,
  FiClipboard,
  FiBarChart2,
  FiSettings,
  FiMessageSquare,
  FiCreditCard,
  FiTool,
  FiAlertCircle,
} from 'react-icons/fi';
import {
  EmployeeRecord,
  EmployeeDetails,
} from './HireEmploye'; // Assuming this file exists and exports these types

interface OnboardingTask {
  id: number;
  title: string;
  responsible: 'Employee' | 'HR' | 'IT' | 'Manager';
  status: 'Not Started' | 'In Progress' | 'Completed' | 'Pending Approval';
  dueDate: string;
  notes?: string;
  documents?: string[];
}

interface OnboardingJourneyData {
  employeeId: string;
  onboardingStage: 'Pre-Boarding' | 'First Day' | 'First Week' | 'First Month' | 'Completed';
  tasks: OnboardingTask[];
  welcomeMessage: string;
}

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

const OnboardingJourney: React.FC = () => {
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
    // Add more hired employees here as needed for demonstration
  ]);

  const [onboardingData, setOnboardingData] = useState<OnboardingJourneyData[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeRecord | null>(employees[0] || null);
  const [activeStage, setActiveStage] = useState<OnboardingJourneyData['onboardingStage'] | null>('Pre-Boarding');
  const [expandedTasks, setExpandedTasks] = useState<number[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalAction, setModalAction] = useState<(() => void) | null>(null);
  const [activeMainTab, setActiveMainTab] = useState('onboarding');

  useEffect(() => {
    // Simulate fetching onboarding data for hired employees
    const generateOnboardingData = (): OnboardingJourneyData[] => {
      return employees.map((emp) => ({
        employeeId: emp.id,
        onboardingStage: 'Pre-Boarding',
        welcomeMessage: `Welcome aboard, ${emp.name}! We're thrilled to have you.`,
        tasks: [
          {
            id: 1,
            title: 'Complete New Hire Paperwork',
            responsible: 'Employee',
            status: 'Not Started',
            dueDate: '2025-08-01',
            notes: 'Includes tax forms, non-disclosure agreements, and company policy review.',
            documents: ['new_hire_forms.pdf', 'nda.pdf'],
          },
          {
            id: 2,
            title: 'Setup IT Accounts & Equipment',
            responsible: 'IT',
            status: 'In Progress',
            dueDate: '2025-07-28',
            notes: 'Requires laptop provisioning and access to company systems like Slack and Jira.',
          },
          {
            id: 3,
            title: 'Schedule Welcome Meeting with Manager',
            responsible: 'HR',
            status: 'Completed',
            dueDate: '2025-07-25',
            notes: 'A short 30-minute meeting to go over the first-day plan.',
          },
          {
            id: 4,
            title: 'Read Company Handbook',
            responsible: 'Employee',
            status: 'Not Started',
            dueDate: '2025-08-05',
            notes: 'Mandatory reading for all new employees.',
          },
          {
            id: 5,
            title: 'Request Parking Permit',
            responsible: 'Employee',
            status: 'Not Started',
            dueDate: '2025-08-10',
            notes: 'Submit a request to the facilities department if needed.',
          },
          {
            id: 6,
            title: 'Complete Security Awareness Training',
            responsible: 'Employee',
            status: 'Not Started',
            dueDate: '2025-08-15',
          },
        ],
      }));
    };
    setOnboardingData(generateOnboardingData());
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

  const openConfirmationModal = (actionType: string, task?: OnboardingTask) => {
    let content = '';
    let action: (() => void) | null = null;
    switch (actionType) {
      case 'completeTask':
        content = `Are you sure you want to mark this task as 'Completed'? This action is final.`;
        action = () => {
          if (task) {
            handleUpdateTaskStatus(task.id, 'Completed');
          }
        };
        break;
      case 'updateTask':
        content = `Are you sure you want to save the changes for this task?`;
        action = () => {
          addNotification('Task updated successfully!', 'success');
        };
        break;
      case 'deleteTask':
        content = `Are you sure you want to delete this task? This cannot be undone.`;
        action = () => {
          if (task) {
            handleDeleteTask(task.id);
          }
        };
        break;
      default:
        content = 'Are you sure you want to proceed with this action?';
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

  const toggleTaskExpansion = (taskId: number) => {
    setExpandedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const getStatusBadgeColor = (status: OnboardingTask['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Not Started':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pending Approval':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getResponsibleColor = (responsible: OnboardingTask['responsible']) => {
    switch (responsible) {
      case 'Employee':
        return 'bg-orange-100 text-orange-800';
      case 'HR':
        return 'bg-red-100 text-red-800';
      case 'IT':
        return 'bg-indigo-100 text-indigo-800';
      case 'Manager':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUpdateTaskStatus = (taskId: number, newStatus: OnboardingTask['status']) => {
    setOnboardingData((prevData) =>
      prevData.map((journey) =>
        journey.employeeId === selectedEmployee?.id
          ? {
              ...journey,
              tasks: journey.tasks.map((task) =>
                task.id === taskId ? { ...task, status: newStatus } : task
              ),
            }
          : journey
      )
    );
    addNotification('Task status updated successfully!', 'success');
  };

  const handleDeleteTask = (taskId: number) => {
    setOnboardingData((prevData) =>
      prevData.map((journey) =>
        journey.employeeId === selectedEmployee?.id
          ? {
              ...journey,
              tasks: journey.tasks.filter((task) => task.id !== taskId),
            }
          : journey
      )
    );
    addNotification('Task deleted successfully.', 'warning');
    setShowModal(false);
  };

  const handleAddNewTask = () => {
    const newTask: OnboardingTask = {
      id: Date.now(),
      title: 'New Task',
      responsible: 'HR',
      status: 'Not Started',
      dueDate: new Date().toISOString().slice(0, 10),
    };
    setOnboardingData((prevData) =>
      prevData.map((journey) =>
        journey.employeeId === selectedEmployee?.id
          ? {
              ...journey,
              tasks: [...journey.tasks, newTask],
            }
          : journey
      )
    );
    addNotification('New task added. Please fill in the details.', 'info');
  };

  const renderOnboardingContent = () => {
    const journey = onboardingData.find((j) => j.employeeId === selectedEmployee?.id);

    if (!selectedEmployee || !journey) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <FiInfo className="w-12 h-12 mb-4" />
          <p className="text-lg">Select a hired employee to view their onboarding journey.</p>
        </div>
      );
    }

    const tasksByStage: { [key: string]: OnboardingTask[] } = {
      'Pre-Boarding': journey.tasks.slice(0, 3), // Example distribution
      'First Day': journey.tasks.slice(3, 4),
      'First Week': journey.tasks.slice(4, 5),
      'First Month': journey.tasks.slice(5),
    };

    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          <FiArrowRight className="inline-block mr-3 text-orange-500" size={24} /> Onboarding Journey for {selectedEmployee.name}
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Overall Progress</h3>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center space-x-2 text-sm"
              onClick={handleAddNewTask}
            >
              <FiPlus />
              <span>Add New Task</span>
            </button>
          </div>
          <p className="text-lg text-gray-600 mb-4">{journey.welcomeMessage}</p>

          <div className="space-y-6">
            {Object.entries(tasksByStage).map(([stage, tasks]) => (
              <div key={stage} className="border rounded-lg overflow-hidden">
                <button
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  onClick={() => setActiveStage(activeStage === stage ? null : (stage as OnboardingJourneyData['onboardingStage']))}
                >
                  <div className="flex items-center space-x-3">
                    <FiCheckCircle className={`text-green-600 ${tasks.every(t => t.status === 'Completed') ? 'opacity-100' : 'opacity-30'}`} size={20} />
                    <span className="font-semibold text-gray-800 text-lg">{stage}</span>
                  </div>
                  {activeStage === stage ? <FiChevronDown /> : <FiChevronRight />}
                </button>
                {activeStage === stage && (
                  <div className="divide-y divide-gray-200 bg-white">
                    {tasks.map((task) => (
                      <div key={task.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 truncate">{task.title}</h4>
                            <div className="mt-1 flex items-center text-sm text-gray-500 space-x-2">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(task.status)}`}>
                                {task.status}
                              </span>
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getResponsibleColor(task.responsible)}`}>
                                {task.responsible}
                              </span>
                              <div className="flex items-center">
                                <FiCalendar className="w-4 h-4 mr-1 text-gray-400" />
                                <span>Due: {task.dueDate}</span>
                              </div>
                            </div>
                            {expandedTasks.includes(task.id) && (
                              <div className="mt-3 text-sm text-gray-700 space-y-2">
                                {task.notes && (
                                  <p className="flex items-center">
                                    <FiMessageSquare className="mr-2 text-gray-500" />
                                    <span className="font-semibold">Notes:</span> {task.notes}
                                  </p>
                                )}
                                {task.documents && task.documents.length > 0 && (
                                  <div className="space-y-2">
                                    <p className="flex items-center font-semibold">
                                      <FiFileText className="mr-2 text-gray-500" /> Documents:
                                    </p>
                                    <ul className="pl-6 space-y-1">
                                      {task.documents.map((doc, docIndex) => (
                                        <li key={docIndex} className="flex items-center justify-between text-gray-600">
                                          <span>{doc}</span>
                                          <div className="flex items-center space-x-2">
                                            <button className="text-blue-500 hover:text-blue-700" title="Download">
                                              <FiDownload />
                                            </button>
                                            <button className="text-red-500 hover:text-red-700" title="Delete">
                                              <FiTrash2 />
                                            </button>
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                            <button
                              className="p-2 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
                              title="Edit Task"
                              onClick={() => addNotification('Edit functionality is under development.', 'info')}
                            >
                              <FiEdit />
                            </button>
                            <button
                              className="p-2 rounded-full text-green-500 hover:bg-green-200 transition-colors"
                              title="Mark as Complete"
                              onClick={() => openConfirmationModal('completeTask', task)}
                              disabled={task.status === 'Completed'}
                            >
                              <FiCheckCircle />
                            </button>
                            <button
                              className="p-2 rounded-full text-red-500 hover:bg-red-200 transition-colors"
                              title="Delete Task"
                              onClick={() => openConfirmationModal('deleteTask', task)}
                            >
                              <FiTrash2 />
                            </button>
                            <button
                              className="p-2 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
                              onClick={() => toggleTaskExpansion(task.id)}
                            >
                              {expandedTasks.includes(task.id) ? <FiChevronDown /> : <FiChevronRight />}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FiInfo className="mr-2 text-gray-600" /> Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
              onClick={() => addNotification('Welcome email sent!', 'success')}
            >
              <FiMail />
              <span>Send Welcome Email</span>
            </button>
            <button
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors flex items-center justify-center space-x-2"
              onClick={() => addNotification('IT setup request sent!', 'info')}
            >
              <FiTool />
              <span>Request IT Setup</span>
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
              onClick={() => addNotification('Payroll information verified!', 'success')}
            >
              <FiCreditCard />
              <span>Verify Payroll Info</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSidePanel = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 lg:w-1/3 flex flex-col min-h-full max-h-full overflow-hidden">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <FiUsers className="w-5 h-5 mr-3 text-orange-500" /> Hired Employees
      </h3>
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
                <span className="text-xs text-gray-500">{employee.timestamp.split(' ')[0]}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">ID: {employee.applicantId}</p>
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800`}>
                  Hired
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
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 lg:w-2/3 flex flex-col max-h-full overflow-hidden">
          {renderOnboardingContent()}
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

export default OnboardingJourney;
import React, { useState, useEffect } from 'react';
import {
  FiBriefcase,
  FiSave,
  FiXCircle,
  FiUser,
  FiCalendar,
  FiFileText,
  FiInfo,
} from 'react-icons/fi';

// Define the Assignment interface
interface Assignment {
  id: string;
  assignmentId: string;
  assignmentName: string;
  assignedToEmployeeId: string;
  assignedToEmployeeName: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Canceled' | 'On Hold';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  startDate: string;
  endDate: string;
  description: string;
  // Add any other relevant assignment fields here
  project?: string;
  managerNotes?: string;
  dueDate?: string;
}

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

interface ModifyAssignmentProps {
  initialAssignment?: Assignment; // Assignment data passed from parent, if any
  onSave: (assignment: Assignment) => void;
  onCancel: () => void;
}

const ModifyAssignment: React.FC<ModifyAssignmentProps> = ({ initialAssignment, onSave, onCancel }) => {
  const [assignment, setAssignment] = useState<Assignment>(
    initialAssignment || {
      id: '',
      assignmentId: '',
      assignmentName: '',
      assignedToEmployeeId: '',
      assignedToEmployeeName: '',
      status: 'Pending',
      priority: 'Medium',
      startDate: '',
      endDate: '',
      description: '',
      project: '',
      managerNotes: '',
      dueDate: '',
    }
  );

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (initialAssignment) {
      setAssignment(initialAssignment);
    }
  }, [initialAssignment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAssignment((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleSave = () => {
    if (!assignment.assignmentName || !assignment.assignedToEmployeeName || !assignment.startDate || !assignment.endDate) {
      addNotification('Please fill in all required fields (Assignment Name, Employee Name, Start Date, End Date).', 'error');
      return;
    }
    onSave(assignment);
    addNotification('Assignment details saved successfully!', 'success');
  };

  const handleCancel = () => {
    onCancel();
    addNotification('Assignment modification cancelled.', 'warning');
  };

  const getStatusBadgeColor = (status: Assignment['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Canceled':
        return 'bg-red-100 text-red-800';
      case 'On Hold':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadgeColor = (priority: Assignment['priority']) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <FiBriefcase className="w-6 h-6 mr-3 text-orange-500" />
        Modify Assignment
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Assignment ID</label>
          <input
            type="text"
            name="assignmentId"
            value={assignment.assignmentId}
            readOnly
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Name</label>
          <input
            type="text"
            name="assignmentName"
            value={assignment.assignmentName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
            placeholder="e.g., Q3 Marketing Campaign"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To (Employee Name)</label>
          <input
            type="text"
            name="assignedToEmployeeName"
            value={assignment.assignedToEmployeeName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
            placeholder="e.g., Jane Doe"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To (Employee ID)</label>
          <input
            type="text"
            name="assignedToEmployeeId"
            value={assignment.assignedToEmployeeId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100 focus:outline-none"
            readOnly // Typically, this might be selected from a user list, not typed directly
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={assignment.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Canceled">Canceled</option>
            <option value="On Hold">On Hold</option>
          </select>
          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(assignment.status)}`}>
            {assignment.status}
          </span>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            name="priority"
            value={assignment.priority}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityBadgeColor(assignment.priority)}`}>
            {assignment.priority}
          </span>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={assignment.startDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            name="endDate"
            value={assignment.endDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Due Date (Optional)</label>
          <input
            type="date"
            name="dueDate"
            value={assignment.dueDate || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project (Optional)</label>
          <input
            type="text"
            name="project"
            value={assignment.project || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
            placeholder="e.g., Internal Tools Development"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={assignment.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-24 resize-y focus:ring-orange-500 focus:border-orange-500"
            placeholder="Provide a detailed description of the assignment..."
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Manager Notes (Optional)</label>
          <textarea
            name="managerNotes"
            value={assignment.managerNotes || ''}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-20 resize-y focus:ring-orange-500 focus:border-orange-500"
            placeholder="Add any specific notes from the manager regarding this assignment..."
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          onClick={handleCancel}
          className="px-5 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center space-x-2"
        >
          <FiXCircle className="w-5 h-5" />
          <span>Cancel</span>
        </button>
        <button
          onClick={handleSave}
          className="px-5 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center space-x-2"
        >
          <FiSave className="w-5 h-5" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Notifications */}
      <div className="fixed bottom-4 right-4 z-50">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 mb-2 rounded-md shadow-lg flex items-center justify-between text-white
              ${notification.type === 'success'
                ? 'bg-green-500'
                : notification.type === 'error'
                ? 'bg-red-500'
                : notification.type === 'info'
                ? 'bg-blue-500'
                : 'bg-yellow-500 text-gray-900'
              }`}
          >
            <span>{notification.message}</span>
            <button onClick={() => removeNotification(notification.id)} className="ml-4 text-white hover:text-gray-200">
              <FiXCircle />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModifyAssignment;
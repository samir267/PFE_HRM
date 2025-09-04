import React, { useState } from 'react';
import {
  FiBriefcase,
  FiFileText,
  FiUsers,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiSave,
  FiAlertCircle,
  FiInfo,
  FiDollarSign,
  FiMapPin,
  FiLayers,
  FiPaperclip,
  FiBell,
  FiCheckSquare,
  FiChevronRight,
  FiHome,
  FiX,
} from 'react-icons/fi';

// Interface for a Staffing Request
interface StaffingRequest {
  id: string;
  requestTitle: string;
  department: string;
  position: string;
  numberOfVacancies: number;
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Temporary';
  expectedStartDate: string;
  requiredSkills: string[]; // Changed to array for multi-select
  experienceLevel: string;
  justification: string;
  hiringManager: string;
  status: 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected';
  // --- New Fields Added ---
  jobObjectives: string;
  mainResponsibilities: string;
  workLocation: string;
  remoteWorkOptions: 'No' | 'Partial' | 'Full';
  salaryRange: string;
  budget: number;
  budgetApproval: boolean;
  reportingStructure: string;
  // --- For attachments (simulated) ---
  attachedDocuments: string[];
}

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

const allSkills = [
  'React',
  'Node.js',
  'AWS',
  'Problem Solving',
  'JavaScript',
  'Python',
  'Java',
  'SQL',
  'Agile',
  'Scrum',
  'Project Management',
  'Data Analysis',
  'Machine Learning',
  'Cloud Computing',
];

const DescribeRequests: React.FC = () => {
  const [requestForm, setRequestForm] = useState<StaffingRequest>({
    id: `REQ-${Date.now()}`,
    requestTitle: '',
    department: '',
    position: '',
    numberOfVacancies: 1,
    employmentType: 'Full-time',
    expectedStartDate: '',
    requiredSkills: [], // Initialize as empty array
    experienceLevel: '',
    justification: '',
    hiringManager: '',
    status: 'Draft',
    // --- New Fields Initialized ---
    jobObjectives: '',
    mainResponsibilities: '',
    workLocation: '',
    remoteWorkOptions: 'No',
    salaryRange: '',
    budget: 0,
    budgetApproval: false,
    reportingStructure: '',
    attachedDocuments: [],
  });

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalAction, setModalAction] = useState<(() => void) | null>(null);
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false); // State for skills dropdown

  // --- FIX: Add roles and activeRole states ---
  const [roles] = useState(['HR', 'Manager', 'Admin']);
  const [activeRole, setActiveRole] = useState('HR');

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // For checkbox (budgetApproval)
    if (type === 'checkbox') {
      setRequestForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setRequestForm((prev) => ({
        ...prev,
        [name]: name === 'numberOfVacancies' || name === 'budget' ? parseFloat(value) || 0 : value,
      }));
    }
  };

  const handleSkillChange = (skill: string) => {
    setRequestForm((prev) => {
      const currentSkills = prev.requiredSkills;
      if (currentSkills.includes(skill)) {
        return {
          ...prev,
          requiredSkills: currentSkills.filter((s) => s !== skill),
        };
      } else {
        return {
          ...prev,
          requiredSkills: [...currentSkills, skill],
        };
      }
    });
  };

  const handleDocumentAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newDocuments = Array.from(files).map(file => file.name);
      setRequestForm(prev => ({
        ...prev,
        attachedDocuments: [...prev.attachedDocuments, ...newDocuments]
      }));
      addNotification(`${files.length} document(s) attached.`, 'info');
    }
  };


  const openConfirmationModal = (actionType: string) => {
    let content = '';
    let action: (() => void) | null = null;

    switch (actionType) {
      case 'submitRequest':
        content = 'Are you sure you want to submit this staffing request for approval?';
        action = handleSubmit;
        break;
      case 'saveDraft':
        content = 'Are you sure you want to save this request as a draft?';
        action = handleSaveDraft;
        break;
      case 'clearForm':
        content = 'Are you sure you want to clear all the information in the form? This action cannot be undone.';
        action = handleClearForm;
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
    addNotification('Action cancelled from modal.', 'info');
  };

  const handleSubmit = () => {
    // In a real application, you would send this data to a backend API
    console.log('Submitting Staffing Request:', requestForm);
    addNotification('Staffing Request submitted successfully!', 'success');
    setRequestForm((prev) => ({ ...prev, status: 'Pending Approval' }));
    setShowModal(false);
  };

  const handleSaveDraft = () => {
    console.log('Saving Staffing Request as Draft:', requestForm);
    addNotification('Staffing Request saved as draft!', 'info');
    setRequestForm((prev) => ({ ...prev, status: 'Draft' }));
    setShowModal(false);
  };

  const handleClearForm = () => {
    setRequestForm({
      id: `REQ-${Date.now()}`,
      requestTitle: '',
      department: '',
      position: '',
      numberOfVacancies: 1,
      employmentType: 'Full-time',
      expectedStartDate: '',
      requiredSkills: [],
      experienceLevel: '',
      justification: '',
      hiringManager: '',
      status: 'Draft',
      // --- New Fields Cleared ---
      jobObjectives: '',
      mainResponsibilities: '',
      workLocation: '',
      remoteWorkOptions: 'No',
      salaryRange: '',
      budget: 0,
      budgetApproval: false,
      reportingStructure: '',
      attachedDocuments: [],
    });
    addNotification('Form cleared.', 'warning');
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`flex items-center p-3 rounded-lg shadow-md text-white
              ${notif.type === 'success'
                ? 'bg-green-500'
                : notif.type === 'error'
                  ? 'bg-red-500'
                  : notif.type === 'warning'
                    ? 'bg-yellow-500'
                    : 'bg-blue-500'
              }`}
          >
            {notif.type === 'success' && <FiCheckSquare className="w-5 h-5 mr-2" />}
            {notif.type === 'error' && <FiAlertCircle className="w-5 h-5 mr-2" />}
            {notif.type === 'warning' && <FiAlertCircle className="w-5 h-5 mr-2" />}
            {notif.type === 'info' && <FiInfo className="w-5 h-5 mr-2" />}
            <span>{notif.message}</span>
            <button onClick={() => removeNotification(notif.id)} className="ml-4 text-white hover:text-gray-200">
              <FiX className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="bg-orange-600 text-white p-2 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-4">
          <span className="font-semibold">Welcome</span>
          <span> SLIMANI Marouen</span>
          <div className="flex space-x-2">
            {roles.map((role) => (
              <button
                key={role}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  activeRole === role ? 'bg-orange-700 shadow-inner' : 'bg-orange-500 hover:bg-orange-600'
                }`}
                onClick={() => setActiveRole(role)}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <select className="bg-white text-black px-3 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-300">
            <option>Fluxeruim - Bank</option>
          </select>
          <button className="text-white hover:text-orange-200 p-1 rounded-full hover:bg-orange-700 transition-colors">
            <FiInfo className="w-5 h-5" />
          </button>
          <button className="text-white hover:text-orange-200 p-1 rounded-full hover:bg-orange-700 transition-colors">
            <FiBell className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-800 text-white p-2 flex items-center space-x-2 text-sm shadow-inner">
        <FiHome className="w-4 h-4" />
        <span>Home</span>
        <FiChevronRight className="w-4 h-4" />
        <span>Staffing Request</span>
        <FiChevronRight className="w-4 h-4" />
        <span className="text-orange-300">Describe Staffing Request</span>
      </div>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
          <FiBriefcase className="mr-3 text-orange-500" /> Describe New Staffing Request
        </h2>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
            <FiFileText className="mr-3 text-orange-500" /> Request Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <div>
              <label htmlFor="requestTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Request Title
              </label>
              <input
                type="text"
                id="requestTitle"
                name="requestTitle"
                value={requestForm.requestTitle}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="e.g., Senior Software Engineer Hire"
              />
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={requestForm.department}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="e.g., Engineering, Marketing, HR"
              />
            </div>

            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                Position / Role
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={requestForm.position}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="e.g., Software Engineer, Project Manager"
              />
            </div>

            <div>
              <label htmlFor="numberOfVacancies" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Vacancies
              </label>
              <input
                type="number"
                id="numberOfVacancies"
                name="numberOfVacancies"
                value={requestForm.numberOfVacancies}
                onChange={handleChange}
                min="1"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700 mb-1">
                Employment Type
              </label>
              <select
                id="employmentType"
                name="employmentType"
                value={requestForm.employmentType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 bg-white"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>

            <div>
              <label htmlFor="expectedStartDate" className="block text-sm font-medium text-gray-700 mb-1">
                Expected Start Date
              </label>
              <input
                type="date"
                id="expectedStartDate"
                name="expectedStartDate"
                value={requestForm.expectedStartDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {/* New Field: Job Objectives */}
            <div className="md:col-span-3">
              <label htmlFor="jobObjectives" className="block text-sm font-medium text-gray-700 mb-1">
                Job Objectives (Finality and Goals of the Position)
              </label>
              <textarea
                id="jobObjectives"
                name="jobObjectives"
                value={requestForm.jobObjectives}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-y focus:ring-orange-500 focus:border-orange-500"
                placeholder="Describe the main purpose and objectives of this position..."
              />
            </div>

            {/* New Field: Main Responsibilities */}
            <div className="md:col-span-3">
              <label htmlFor="mainResponsibilities" className="block text-sm font-medium text-gray-700 mb-1">
                Main Responsibilities (Detailed Tasks and Missions)
              </label>
              <textarea
                id="mainResponsibilities"
                name="mainResponsibilities"
                value={requestForm.mainResponsibilities}
                onChange={handleChange}
                rows={5}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-y focus:ring-orange-500 focus:border-orange-500"
                placeholder="List the key tasks and duties associated with this role..."
              />
            </div>

            {/* Skills with Dropdown and Checkboxes */}
            <div className="relative md:col-span-2">
              <label htmlFor="requiredSkills" className="block text-sm font-medium text-gray-700 mb-1">
                Required Skills / Qualifications
              </label>
              <div
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 bg-white cursor-pointer min-h-[38px]"
                onClick={() => setShowSkillsDropdown(!showSkillsDropdown)}
              >
                {requestForm.requiredSkills.length > 0
                  ? requestForm.requiredSkills.join(', ')
                  : 'Select skills...'}
              </div>
              {showSkillsDropdown && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
                  {allSkills.map((skill) => (
                    <label key={skill} className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-orange-600 rounded"
                        checked={requestForm.requiredSkills.includes(skill)}
                        onChange={() => handleSkillChange(skill)}
                      />
                      <span className="ml-2 text-gray-700">{skill}</span>
                    </label>
                  ))}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">Select all applicable skills.</p>
            </div>


            <div>
              <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1">
                Experience Level
              </label>
              <input
                type="text"
                id="experienceLevel"
                name="experienceLevel"
                value={requestForm.experienceLevel}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="e.g., Junior, Mid, Senior, Lead"
              />
            </div>

            {/* New Field: Work Location */}
            <div>
              <label htmlFor="workLocation" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiMapPin className="mr-2 text-gray-500" /> Work Location
              </label>
              <input
                type="text"
                id="workLocation"
                name="workLocation"
                value={requestForm.workLocation}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="e.g., Paris Office, Remote, Hybrid"
              />
            </div>

            {/* New Field: Remote Work Options */}
            <div>
              <label htmlFor="remoteWorkOptions" className="block text-sm font-medium text-gray-700 mb-1">
                Remote Work Options
              </label>
              <select
                id="remoteWorkOptions"
                name="remoteWorkOptions"
                value={requestForm.remoteWorkOptions}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500 bg-white"
              >
                <option value="No">No Remote Work</option>
                <option value="Partial">Partial Remote (Hybrid)</option>
                <option value="Full">Full Remote</option>
              </select>
            </div>

            {/* New Field: Salary Range */}
            <div>
              <label htmlFor="salaryRange" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiDollarSign className="mr-2 text-gray-500" /> Salary Range
              </label>
              <input
                type="text"
                id="salaryRange"
                name="salaryRange"
                value={requestForm.salaryRange}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="e.g., 50,000 - 70,000 EUR/year"
              />
            </div>

            {/* New Field: Budget */}
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiDollarSign className="mr-2 text-gray-500" /> Allocated Budget
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={requestForm.budget}
                onChange={handleChange}
                min="0"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="e.g., 75000"
              />
            </div>

            {/* New Field: Budget Approval */}
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="budgetApproval"
                name="budgetApproval"
                checked={requestForm.budgetApproval}
                onChange={handleChange}
                className="form-checkbox h-4 w-4 text-orange-600 rounded"
              />
              <label htmlFor="budgetApproval" className="ml-2 block text-sm font-medium text-gray-700">
                Budget Approved
              </label>
            </div>

            {/* New Field: Reporting Structure */}
            <div className="md:col-span-2">
              <label htmlFor="reportingStructure" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiLayers className="mr-2 text-gray-500" /> Reporting Structure
              </label>
              <textarea
                id="reportingStructure"
                name="reportingStructure"
                value={requestForm.reportingStructure}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-y focus:ring-orange-500 focus:border-orange-500"
                placeholder="e.g., Reports to Head of Engineering, Manages 2 Junior Engineers"
              />
            </div>

            <div className="md:col-span-3">
              <label htmlFor="justification" className="block text-sm font-medium text-gray-700 mb-1">
                Justification / Business Need
              </label>
              <textarea
                id="justification"
                name="justification"
                value={requestForm.justification}
                onChange={handleChange}
                rows={5}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-y focus:ring-orange-500 focus:border-orange-500"
                placeholder="Provide a detailed explanation for this staffing request..."
              />
            </div>

            <div>
              <label htmlFor="hiringManager" className="block text-sm font-medium text-gray-700 mb-1">
                Hiring Manager
              </label>
              <input
                type="text"
                id="hiringManager"
                name="hiringManager"
                value={requestForm.hiringManager}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="e.g., Jane Doe (HR Manager)"
              />
            </div>

            {/* New Field: Attached Documents */}
            <div className="md:col-span-2">
              <label htmlFor="attachedDocuments" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiPaperclip className="mr-2 text-gray-500" /> Attach Documents
              </label>
              <input
                type="file"
                id="attachedDocuments"
                name="attachedDocuments"
                onChange={handleDocumentAttach}
                multiple
                className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              />
              {requestForm.attachedDocuments.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  <p className="font-medium">Attached Files:</p>
                  <ul className="list-disc list-inside">
                    {requestForm.attachedDocuments.map((doc, index) => (
                      <li key={index}>{doc}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Current Status
              </label>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  requestForm.status === 'Draft'
                    ? 'bg-blue-100 text-blue-800'
                    : requestForm.status === 'Pending Approval'
                      ? 'bg-yellow-100 text-yellow-800'
                      : requestForm.status === 'Approved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                }`}
              >
                {requestForm.status}
              </span>
              <p className="text-xs text-gray-500 mt-1">Status updates automatically on submission or draft save.</p>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={() => openConfirmationModal('clearForm')}
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center"
            >
              <FiXCircle className="mr-2" /> Clear Form
            </button>
            <button
              onClick={() => openConfirmationModal('saveDraft')}
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
            >
              <FiSave className="mr-2" /> Save as Draft
            </button>
            <button
              onClick={() => openConfirmationModal('submitRequest')}
              className="px-5 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center"
            >
              <FiCheckCircle className="mr-2" /> Submit Request
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="fixed bottom-4 right-4 z-50">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`flex items-center p-4 mb-3 rounded-lg shadow-md text-white ${
                notif.type === 'success'
                  ? 'bg-green-500'
                  : notif.type === 'error'
                    ? 'bg-red-500'
                    : notif.type === 'warning'
                      ? 'bg-yellow-500'
                      : 'bg-blue-500'
              }`}
            >
              {notif.type === 'success' && <FiCheckCircle className="mr-2" />}
              {notif.type === 'error' && <FiXCircle className="mr-2" />}
              {notif.type === 'warning' && <FiAlertCircle className="mr-2" />}
              {notif.type === 'info' && <FiInfo className="mr-2" />}
              <span>{notif.message}</span>
              <button onClick={() => removeNotification(notif.id)} className="ml-auto">
                <FiXCircle />
              </button>
            </div>
          ))}
        </div>

        {/* Confirmation Modal */}
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
    </div>
  );
};

export default DescribeRequests;
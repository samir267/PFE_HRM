import React, { useState, useEffect } from 'react';
import {
  FiUser,
  FiCalendar,
  FiFileText,
  FiEdit,
  FiSave,
  FiTrash2,
  FiPrinter,
  FiMail,
  FiPhone,
  FiMapPin,
  FiHome,
  FiCheckCircle,
  FiXCircle,
  FiPlus,
  FiDownload,
  FiUpload,
  FiInfo,
  FiBell,
  FiAlertCircle,
  FiX,
  FiCreditCard,
  FiDollarSign,
  FiBriefcase,
  FiActivity,
  FiClock,
} from 'react-icons/fi';

// Updated interface for a Contract
interface Contract {
  id: string;
  contractId: string;
  employeeName: string;
  contractStatus: 'Active' | 'Expired' | 'Terminated' | 'Pending Renewal' | 'Draft';
  contractType: string;
  department?: string;
  position?: string;
  email?: string;
  phone?: string;
  startDate: string;
  endDate?: string;
  terminationReason?: string;
}

// Updated interface for Contract Details
interface ContractDetails {
  contractReviewer?: string;
  workIdentifier: string;
  contractEligibilityStatus: 'Valid' | 'Invalid' | 'Under Review';
  managerNotes?: string;
  notes: string;
  lastReviewDate?: string;
  salaryDetails?: string;
  benefitsPackage?: string;
  probationEndDate?: string;
  noticePeriod?: string;
  dob?: string;
  nationality?: string;
  linkedInProfile?: string;
}

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

const UpdateContractData: React.FC = () => {
  const [selectedContract, setSelectedContract] = useState<Contract>({
    id: '2', // Assuming an existing contract is being updated
    contractId: 'CONT002',
    employeeName: 'JANE DOE',
    contractStatus: 'Pending Renewal',
    contractType: 'Full-time',
    department: 'Marketing',
    position: 'Marketing Specialist',
    email: 'jane.doe@example.com',
    phone: '+32 471 98 76 54',
    startDate: '2023-01-01',
    endDate: '2024-12-31',
    terminationReason: '',
  });

  const [contractDetails, setContractDetails] = useState<ContractDetails>({
    contractReviewer: 'HR Manager',
    workIdentifier: 'CONT002',
    contractEligibilityStatus: 'Under Review',
    managerNotes: 'Good performance, eligible for renewal.',
    notes: 'Renew contract with updated terms. Discuss promotion.',
    lastReviewDate: '2024-10-01',
    salaryDetails: 'EUR 45,000 / year',
    benefitsPackage: 'Standard benefits + health insurance',
    probationEndDate: '2023-06-30',
    noticePeriod: '1 month',
    dob: '1988-11-25',
    nationality: 'Belgian',
    linkedInProfile: 'https://linkedin.com/in/janedoe',
  });

  const [activeContractDetailTab, setActiveContractDetailTab] = useState('generalInfo');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalAction, setModalAction] = useState<(() => void) | null>(null);

  // Effect to set initial contract details based on selectedContract
  useEffect(() => {
    if (selectedContract) {
      setContractDetails({
        contractReviewer: 'HR Manager',
        workIdentifier: selectedContract.contractId,
        contractEligibilityStatus: selectedContract.contractStatus === 'Active' ? 'Valid' : selectedContract.contractStatus === 'Terminated' ? 'Invalid' : 'Under Review',
        managerNotes: selectedContract.id === '1' ? 'Excellent contributor, strong technical skills.' : selectedContract.id === '2' ? 'Good performance, eligible for renewal.' : 'No notes yet.',
        notes: selectedContract.id === '2' ? 'Renew contract with updated terms. Discuss promotion.' : 'No specific notes yet.',
        lastReviewDate: selectedContract.id === '1' ? '2024-05-15' : selectedContract.id === '2' ? '2024-10-01' : '',
        salaryDetails: selectedContract.id === '1' ? 'EUR 60,000 / year' : selectedContract.id === '2' ? 'EUR 45,000 / year' : '',
        benefitsPackage: selectedContract.id === '1' ? 'Premium benefits' : selectedContract.id === '2' ? 'Standard benefits + health insurance' : '',
        probationEndDate: selectedContract.id === '1' ? '2022-09-01' : selectedContract.id === '2' ? '2023-06-30' : '',
        noticePeriod: selectedContract.id === '1' ? '2 months' : selectedContract.id === '2' ? '1 month' : '',
        dob: selectedContract.id === '1' ? '1985-03-10' : selectedContract.id === '2' ? '1988-11-25' : '',
        nationality: selectedContract.id === '1' ? 'American' : selectedContract.id === '2' ? 'Belgian' : '',
        linkedInProfile: selectedContract.id === '1' ? 'https://linkedin.com/in/robertsmith' : selectedContract.id === '2' ? 'https://linkedin.com/in/janedoe' : '',
      });
    }
  }, [selectedContract]);


  const getStatusBadgeColor = (status: Contract['contractStatus']) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Expired':
        return 'bg-red-100 text-red-800';
      case 'Terminated':
        return 'bg-gray-100 text-gray-800';
      case 'Pending Renewal':
        return 'bg-yellow-100 text-yellow-800';
      case 'Draft':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSaveContractDetails = () => {
    console.log('Saving contract details:', selectedContract, contractDetails);
    addNotification('Contract data saved successfully!', 'success');
    setShowModal(false);
  };

  const handleCancel = () => {
    console.log('Cancelling operation');
    addNotification('Operation cancelled.', 'warning');
    setShowModal(false);
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

  const openConfirmationModal = (actionType: string) => {
    let content = '';
    let action: (() => void) | null = null;

    switch (actionType) {
      case 'activate':
        content = `Are you sure you want to activate the contract for ${selectedContract.employeeName}? This will set its status to "Active".`;
        action = handleActivateContract;
        break;
      case 'terminate':
        content = `Are you sure you want to terminate the contract for ${selectedContract.employeeName}? This will set its status to "Terminated".`;
        action = handleTerminateContract;
        break;
      case 'save':
        content = 'Are you sure you want to save the current contract details?';
        action = handleSaveContractDetails;
        break;
      case 'cancel':
        content = 'Are you sure you want to cancel the current changes? Any unsaved modifications will be lost.';
        action = handleCancel;
        break;
      case 'deleteDocument':
        content = 'Are you sure you want to delete this document? This action cannot be undone.';
        action = () => {
          addNotification('Document deleted successfully!', 'success');
          setShowModal(false);
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
    addNotification('Action cancelled from modal.', 'info');
  };

  const handleActivateContract = () => {
    setContractDetails((prev) => ({ ...prev, contractEligibilityStatus: 'Valid' }));
    setSelectedContract((prev) => ({ ...prev, contractStatus: 'Active' }));
    addNotification(`Contract for ${selectedContract.employeeName} has been successfully activated!`, 'success');
    setShowModal(false);
  };

  const handleTerminateContract = () => {
    setContractDetails((prev) => ({ ...prev, contractEligibilityStatus: 'Invalid' }));
    setSelectedContract((prev) => ({ ...prev, contractStatus: 'Terminated' }));
    addNotification(`Contract for ${selectedContract.employeeName} has been terminated.`, 'warning');
    setShowModal(false);
  };

  const renderContractDetailsContent = () => {
    if (!selectedContract) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <FiInfo className="w-12 h-12 mb-4" />
          <p className="text-lg">No contract selected for update.</p>
        </div>
      );
    }
    switch (activeContractDetailTab) {
      case 'generalInfo':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiUser className="w-5 h-5 mr-3 text-orange-500" />
              Employee Contract Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contract ID</label>
                <input
                  type="text"
                  value={selectedContract.contractId}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100 focus:outline-none"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
                <input
                  type="text"
                  value={selectedContract.employeeName}
                  onChange={(e) => setSelectedContract({ ...selectedContract, employeeName: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Contract Status</label>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(selectedContract.contractStatus)}`}>
                  {selectedContract.contractStatus}
                </span>
                <p className="text-xs text-gray-500 mt-1">Status can be changed in Contract Workflow tab.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contract Type</label>
                <input
                  type="text"
                  value={selectedContract.contractType || ''}
                  onChange={(e) => setSelectedContract({ ...selectedContract, contractType: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input
                  type="text"
                  value={selectedContract.department || ''}
                  onChange={(e) => setSelectedContract({ ...selectedContract, department: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="text"
                  value={selectedContract.position || ''}
                  onChange={(e) => setSelectedContract({ ...selectedContract, position: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contract Start Date</label>
                <input
                  type="date"
                  value={selectedContract.startDate}
                  onChange={(e) => setSelectedContract({ ...selectedContract, startDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contract End Date (Optional)</label>
                <input
                  type="date"
                  value={selectedContract.endDate || ''}
                  onChange={(e) => setSelectedContract({ ...selectedContract, endDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={selectedContract.email || ''}
                  onChange={(e) => setSelectedContract({ ...selectedContract, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={selectedContract.phone || ''}
                  onChange={(e) => setSelectedContract({ ...selectedContract, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Termination Reason (if applicable)</label>
                <textarea
                  value={selectedContract.terminationReason || ''}
                  onChange={(e) => setSelectedContract({ ...selectedContract, terminationReason: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-20 resize-y focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter reason for termination..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">General Contract Notes</label>
                <textarea
                  value={contractDetails.notes}
                  onChange={(e) => setContractDetails({ ...contractDetails, notes: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-24 resize-y focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Add notes about the contract, special clauses, etc."
                />
              </div>
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h5 className="col-span-full font-semibold text-blue-800 mb-2 flex items-center">
                  <FiInfo className="mr-2" /> Additional Employee Information
                </h5>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={contractDetails.dob || ''}
                    onChange={(e) => setContractDetails({ ...contractDetails, dob: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                  <input
                    type="text"
                    value={contractDetails.nationality || ''}
                    onChange={(e) => setContractDetails({ ...contractDetails, nationality: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
                  <input
                    type="url"
                    value={contractDetails.linkedInProfile || ''}
                    onChange={(e) => setContractDetails({ ...contractDetails, linkedInProfile: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. https://linkedin.com/in/..."
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 'contractWorkflow':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiBriefcase className="w-5 h-5 mr-3 text-orange-500" />
              Contract Workflow for <span className="text-orange-600 ml-1">{selectedContract.employeeName}</span>
            </h4>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Contract Stage</label>
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusBadgeColor(selectedContract.contractStatus)}`}>
                  {selectedContract.contractStatus}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-4">
                <button
                  onClick={() => openConfirmationModal('activate')}
                  disabled={selectedContract.contractStatus === 'Active'}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiCheckCircle className="w-5 h-5" />
                  <span>Activate Contract</span>
                </button>
                <button
                  onClick={() => openConfirmationModal('terminate')}
                  disabled={selectedContract.contractStatus === 'Terminated'}
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiXCircle className="w-5 h-5" />
                  <span>Terminate Contract</span>
                </button>
                <button
                  onClick={() => addNotification('Schedule Contract Review action triggered!', 'info')}
                  disabled={selectedContract.contractStatus === 'Terminated' || selectedContract.contractStatus === 'Expired'}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiCalendar className="w-5 h-5" />
                  <span>Schedule Contract Review</span>
                </button>
                <button
                  onClick={() => addNotification('Send Renewal Offer action triggered!', 'info')}
                  disabled={selectedContract.contractStatus !== 'Pending Renewal'}
                  className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiMail className="w-5 h-5" />
                  <span>Send Renewal Offer</span>
                </button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <FiBriefcase className="mr-2 text-gray-600" /> Contract Details Overview
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary Details</label>
                    <input
                      type="text"
                      value={contractDetails.salaryDetails || ''}
                      onChange={(e) => setContractDetails({ ...contractDetails, salaryDetails: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                      placeholder="e.g., EUR 50,000 / year"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Benefits Package</label>
                    <input
                      type="text"
                      value={contractDetails.benefitsPackage || ''}
                      onChange={(e) => setContractDetails({ ...contractDetails, benefitsPackage: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                      placeholder="e.g., Health, Dental, Vision"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Probation End Date</label>
                    <input
                      type="date"
                      value={contractDetails.probationEndDate || ''}
                      onChange={(e) => setContractDetails({ ...contractDetails, probationEndDate: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notice Period</label>
                    <input
                      type="text"
                      value={contractDetails.noticePeriod || ''}
                      onChange={(e) => setContractDetails({ ...contractDetails, noticePeriod: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                      placeholder="e.g., 1 month, 3 weeks"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <FiInfo className="mr-2 text-gray-600" /> Manager Feedback & Eligibility
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Manager Notes</label>
                    <textarea
                      value={contractDetails.managerNotes || ''}
                      onChange={(e) => setContractDetails({ ...contractDetails, managerNotes: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-20 resize-y focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Summary of manager's feedback"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contract Eligibility Status</label>
                    <select
                      value={contractDetails.contractEligibilityStatus}
                      onChange={(e) => setContractDetails({ ...contractDetails, contractEligibilityStatus: e.target.value as any })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="Valid">Valid</option>
                      <option value="Invalid">Invalid</option>
                      <option value="Under Review">Under Review</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Contract Review Date</label>
                    <input
                      type="date"
                      value={contractDetails.lastReviewDate || ''}
                      onChange={(e) => setContractDetails({ ...contractDetails, lastReviewDate: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'documents':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiFileText className="w-5 h-5 mr-3 text-orange-500" />
              Documents for <span className="text-orange-600 ml-1">{selectedContract.employeeName}'s Contract</span>
            </h4>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-md">
                <FiFileText className="w-6 h-6 mr-3 flex-shrink-0" />
                <span className="flex-1 truncate">Contract_Agreement_{selectedContract.contractId}.pdf</span>
                <button className="ml-4 text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors" title="Download Document">
                  <FiDownload className="w-5 h-5" />
                </button>
                <button
                  className="ml-2 text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors"
                  title="Delete Document"
                  onClick={() => openConfirmationModal('deleteDocument')}
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-md">
                <FiFileText className="w-6 h-6 mr-3 flex-shrink-0" />
                <span className="flex-1 truncate">Performance_Review_{selectedContract.contractId}_{contractDetails.lastReviewDate}.pdf</span>
                <button className="ml-4 text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors" title="Download Document">
                  <FiDownload className="w-5 h-5" />
                </button>
                <button
                  className="ml-2 text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors"
                  title="Delete Document"
                  onClick={() => openConfirmationModal('deleteDocument')}
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
              <button
                className="w-full flex items-center justify-center py-2 px-4 border border-dashed border-gray-400 rounded-md text-gray-600 hover:border-orange-500 hover:text-orange-600 transition-colors"
                onClick={() => addNotification('Upload document feature triggered!', 'info')}
              >
                <FiUpload className="mr-2" /> Upload New Document
              </button>
            </div>
          </div>
        );
      case 'activityLog':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiActivity className="w-5 h-5 mr-3 text-orange-500" />
              Activity Log for <span className="text-orange-600 ml-1">{selectedContract.employeeName}'s Contract</span>
            </h4>
            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex items-start">
                <FiClock className="w-4 h-4 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                <div>
                  <p>
                    <span className="font-semibold">2025-07-25 11:00 AM:</span> Contract status changed to "{selectedContract.contractStatus}".
                  </p>
                  <p className="text-gray-500 text-xs">By HR Admin</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiMail className="w-4 h-4 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                <div>
                  <p>
                    <span className="font-semibold">2025-07-24 09:30 AM:</span> Contract review scheduled.
                  </p>
                  <p className="text-gray-500 text-xs">By HR Admin</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiFileText className="w-4 h-4 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                <div>
                  <p>
                    <span className="font-semibold">2025-07-23 02:00 PM:</span> Contract terms reviewed.
                  </p>
                  <p className="text-gray-500 text-xs">By HR Admin</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiPlus className="w-4 h-4 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                <div>
                  <p>
                    <span className="font-semibold">2025-07-22 01:00 PM:</span> Contract draft created.
                  </p>
                  <p className="text-gray-500 text-xs">System generated</p>
                </div>
              </div>
              <button
                className="mt-4 w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => addNotification('Loading more activity logs...', 'info')}
              >
                Load More
              </button>
            </div>
          </div>
        );
      case 'assignTheoreticalHours':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiClock className="w-5 h-5 mr-3 text-orange-500" />
              Assign Theoretical Hours for <span className="text-orange-600 ml-1">{selectedContract.employeeName}</span>
            </h4>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-700">
              <p>This section would contain the UI and logic for assigning theoretical work hours to the employee under this contract.</p>
              <ul className="list-disc list-inside mt-3 space-y-1">
                <li>Input fields for weekly/monthly hours</li>
                <li>Option to set different hours for specific periods</li>
                <li>Save/Update actions</li>
              </ul>
              <div className="mt-4 p-3 border border-dashed border-gray-300 rounded-md text-gray-500 text-center">
                &lt;AssignTheoreticalHours employeeId={selectedContract.contractId} /&gt;
              </div>
            </div>
          </div>
        );
      case 'benefitsManagement':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiDollarSign className="w-5 h-5 mr-3 text-orange-500" />
              Benefits Management for <span className="text-orange-600 ml-1">{selectedContract.employeeName}</span>
            </h4>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-700">
              <p>This section would display and allow management of benefits associated with this employee's contract.</p>
              <ul className="list-disc list-inside mt-3 space-y-1">
                <li>List of assigned benefits (e.g., Health, Dental, Retirement)</li>
                <li>Options to add, edit, or remove benefits</li>
                <li>Benefit enrollment status</li>
              </ul>
              <div className="mt-4 p-3 border border-dashed border-gray-300 rounded-md text-gray-500 text-center">
                &lt;BenefitsManagement employeeId={selectedContract.contractId} /&gt;
              </div>
            </div>
          </div>
        );
      case 'consultPayrollRecords':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiCreditCard className="w-5 h-5 mr-3 text-orange-500" />
              Consult Payroll Records for <span className="text-orange-600 ml-1">{selectedContract.employeeName}</span>
            </h4>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-700">
              <p>This section would provide access to the employee's historical payroll records.</p>
              <ul className="list-disc list-inside mt-3 space-y-1">
                <li>List of pay stubs by date</li>
                <li>Gross/Net pay, deductions, and taxes</li>
                <li>Option to view or download individual records</li>
              </ul>
              <div className="mt-4 p-3 border border-dashed border-gray-300 rounded-md text-gray-500 text-center">
                &lt;ConsultPayrollRecords employeeId={selectedContract.contractId} /&gt;
              </div>
            </div>
          </div>
        );
      case 'modifyAssignment':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiBriefcase className="w-5 h-5 mr-3 text-orange-500" />
              Modify Assignment for <span className="text-orange-600 ml-1">{selectedContract.employeeName}</span>
            </h4>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-700">
              <p>This section would allow modifications to the employee's assignment details.</p>
              <ul className="list-disc list-inside mt-3 space-y-1">
                <li>Update job title, department, manager</li>
                <li>Change work location</li>
                <li>Adjust reporting structure</li>
              </ul>
              <div className="mt-4 p-3 border border-dashed border-gray-300 rounded-md text-gray-500 text-center">
                &lt;ModifyAssignment employeeId={selectedContract.contractId} /&gt;
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-full mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
          <FiEdit className="w-8 h-8 mr-3 text-orange-600" /> Update Contract Data
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-orange-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <FiUser className="w-6 h-6 mr-2 text-orange-500" /> Currently Updating: {selectedContract.employeeName} (ID: {selectedContract.contractId})
          </h2>
          <div className="flex space-x-4 border-b border-gray-200 mb-6">
            <button
              className={`py-2 px-4 text-sm font-medium focus:outline-none ${activeContractDetailTab === 'generalInfo' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveContractDetailTab('generalInfo')}
            >
              General Information
            </button>
            <button
              className={`py-2 px-4 text-sm font-medium focus:outline-none ${activeContractDetailTab === 'contractWorkflow' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveContractDetailTab('contractWorkflow')}
            >
              Contract Workflow
            </button>
            <button
              className={`py-2 px-4 text-sm font-medium focus:outline-none ${activeContractDetailTab === 'documents' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveContractDetailTab('documents')}
            >
              Documents
            </button>
            <button
              className={`py-2 px-4 text-sm font-medium focus:outline-none ${activeContractDetailTab === 'activityLog' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveContractDetailTab('activityLog')}
            >
              Activity Log
            </button>
            <button
              className={`py-2 px-4 text-sm font-medium focus:outline-none ${activeContractDetailTab === 'assignTheoreticalHours' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveContractDetailTab('assignTheoreticalHours')}
            >
              Theoretical Hours
            </button>
            <button
              className={`py-2 px-4 text-sm font-medium focus:outline-none ${activeContractDetailTab === 'benefitsManagement' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveContractDetailTab('benefitsManagement')}
            >
              Benefits Management
            </button>
            <button
              className={`py-2 px-4 text-sm font-medium focus:outline-none ${activeContractDetailTab === 'consultPayrollRecords' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveContractDetailTab('consultPayrollRecords')}
            >
              Payroll Records
            </button>
            <button
              className={`py-2 px-4 text-sm font-medium focus:outline-none ${activeContractDetailTab === 'modifyAssignment' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveContractDetailTab('modifyAssignment')}
            >
              Modify Assignment
            </button>
          </div>

          {renderContractDetailsContent()}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center"
              onClick={() => openConfirmationModal('cancel')}
            >
              <FiXCircle className="mr-2" /> Cancel
            </button>
            <button
              className="px-5 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center"
              onClick={() => openConfirmationModal('save')}
            >
              <FiSave className="mr-2" /> Save Changes
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="fixed bottom-6 right-6 z-50 space-y-3 w-80">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg shadow-md flex items-center justify-between text-white
                ${notification.type === 'info' ? 'bg-blue-500' :
                  notification.type === 'success' ? 'bg-green-500' :
                  notification.type === 'error' ? 'bg-red-500' :
                  'bg-yellow-500 text-gray-900'}`
              }
            >
              <span>{notification.message}</span>
              <button onClick={() => removeNotification(notification.id)} className="ml-4 text-white hover:text-gray-200">
                <FiX />
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

export default UpdateContractData;
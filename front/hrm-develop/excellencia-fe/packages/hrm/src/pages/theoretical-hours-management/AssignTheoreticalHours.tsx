import React, { useState, useEffect } from 'react';
import {
  FiSearch,
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
  FiChevronLeft,
  FiChevronRight,
  FiMoreHorizontal,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiPlus,
  FiFilter,
  FiDownload,
  FiUpload,
  FiSettings,
  FiBriefcase,
  FiInfo,
  FiBell,
  FiAlertCircle,
  FiX,
  FiCreditCard,
  FiDollarSign,
  FiMinusCircle,
  FiPlusCircle,
  FiActivity,
  FiGlobe,
  FiUsers,
  FiBarChart2,
  FiTool,
  FiClipboard,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';

// New interface for a Contract
interface Contract {
  id: string;
  contractId: string;
  employeeName: string;
  status: 'Active' | 'Inactive' | 'Pending Approval' | 'Completed'; // Contract specific statuses
  contractType?: string; // e.g., "Full-time", "Part-time", "Temporary"
  startDate: string;
  endDate?: string;
  department?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
}

// New interface for Theoretical Hours Details
interface TheoreticalHoursDetails {
  validationWitness?: string;
  contractIdentifier: string; // Contract ID
  totalHoursPerWeek: number | '';
  dailyHours: number | '';
  effectiveDate: string;
  notes: string;
  approvedBy?: string;
  reviewDate?: string;
  // Additional fields for extended details relevant to hours
  manager?: string;
  project?: string;
  location?: string;
}

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

const AssignTheoreticalHours: React.FC = () => {
  const [selectedContract, setSelectedContract] = useState<Contract>({
    id: '102',
    contractId: 'CON002',
    employeeName: 'Jane Doe',
    status: 'Pending Approval',
    contractType: 'Full-time',
    startDate: '2024-03-01',
    endDate: '2025-02-28',
    department: 'Operations',
    jobTitle: 'Project Coordinator',
    email: 'jane.doe@example.com',
    phone: '+32 471 98 76 54',
  });

  const [searchForm, setSearchForm] = useState({
    employeeName: '',
    contractId: '',
    status: '',
    department: '',
    jobTitle: '',
  });

  const [theoreticalHoursDetails, setTheoreticalHoursDetails] = useState<TheoreticalHoursDetails>({
    validationWitness: 'HR Manager',
    contractIdentifier: 'CON002',
    totalHoursPerWeek: 38,
    dailyHours: 7.6,
    effectiveDate: '2024-08-01',
    notes: 'Hours assigned as per standard full-time contract. Pending final approval.',
    approvedBy: '',
    reviewDate: '2024-07-25',
    manager: 'Robert Smith',
    project: 'Q3 Product Launch',
    location: 'Brussels Office',
  });

  const [activeMainTab, setActiveMainTab] = useState('contractHours'); // Changed default tab
  const [activeContractDetailTab, setActiveContractDetailTab] = useState('generalHoursInfo'); // Changed default sub-tab

  const [currentPage, setCurrentPage] = useState(1);
  const [contractsPerPage, setContractsPerPage] = useState(10); // Changed from employeesPerPage

  const [allContractList, setAllContractList] = useState<Contract[]>([
    {
      id: '101',
      contractId: 'CON001',
      employeeName: 'Robert Smith',
      status: 'Active',
      contractType: 'Full-time',
      startDate: '2023-01-15',
      endDate: '2025-01-14',
      department: 'Engineering',
      jobTitle: 'Software Engineer',
      email: 'robert.smith@example.com',
      phone: '+32 470 11 22 33',
    },
    {
      id: '102',
      contractId: 'CON002',
      employeeName: 'Jane Doe',
      status: 'Pending Approval',
      contractType: 'Full-time',
      startDate: '2024-03-01',
      endDate: '2025-02-28',
      department: 'Operations',
      jobTitle: 'Project Coordinator',
      email: 'jane.doe@example.com',
      phone: '+32 471 98 76 54',
    },
    {
      id: '103',
      contractId: 'CON003',
      employeeName: 'Alice Johnson',
      status: 'Inactive',
      contractType: 'Part-time',
      startDate: '2022-06-01',
      endDate: '2024-05-31',
      department: 'Sales',
      jobTitle: 'Sales Associate',
      email: 'alice.johnson@example.com',
      phone: '+32 472 33 44 55',
    },
    {
      id: '104',
      contractId: 'CON004',
      employeeName: 'Mark Brown',
      status: 'Active',
      contractType: 'Temporary',
      startDate: '2024-07-01',
      endDate: '2024-12-31',
      department: 'Finance',
      jobTitle: 'Financial Assistant',
      email: 'mark.brown@example.com',
      phone: '+32 473 66 77 88',
    },
    {
      id: '105',
      contractId: 'CON005',
      employeeName: 'Sarah Green',
      status: 'Completed',
      contractType: 'Full-time',
      startDate: '2020-09-01',
      endDate: '2023-08-31',
      department: 'HR',
      jobTitle: 'HR Specialist',
      email: 'sarah.green@example.com',
      phone: '+32 474 99 00 11',
    },
  ]);

  const [filteredContractList, setFilteredContractList] = useState<Contract[]>(allContractList);
  const [showMoreCriteria, setShowMoreCriteria] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalAction, setModalAction] = useState<(() => void) | null>(null);

  // Effect to update filtered list when searchForm changes
  useEffect(() => {
    const filterList = () => {
      let tempContracts = allContractList.filter((contract) => {
        const matchesName = searchForm.employeeName
          ? contract.employeeName.toLowerCase().includes(searchForm.employeeName.toLowerCase())
          : true;
        const matchesContractId = searchForm.contractId ? contract.contractId.includes(searchForm.contractId) : true;
        const matchesStatus = searchForm.status ? contract.status.toLowerCase().includes(searchForm.status.toLowerCase()) : true;
        const matchesDepartment = searchForm.department
          ? (contract.department || '').toLowerCase().includes(searchForm.department.toLowerCase())
          : true;
        const matchesJobTitle = searchForm.jobTitle ? (contract.jobTitle || '').toLowerCase().includes(searchForm.jobTitle.toLowerCase()) : true;

        return matchesName && matchesContractId && matchesStatus && matchesDepartment && matchesJobTitle;
      });
      setFilteredContractList(tempContracts);
      setCurrentPage(1);
    };
    filterList();
  }, [searchForm, allContractList]);

  // Effect to update theoretical hours details when selected contract changes
  useEffect(() => {
    if (selectedContract) {
      setTheoreticalHoursDetails({
        validationWitness: 'HR Manager',
        contractIdentifier: selectedContract.contractId,
        totalHoursPerWeek: selectedContract.id === '101' ? 40 : selectedContract.id === '102' ? 38 : selectedContract.id === '103' ? 20 : '',
        dailyHours: selectedContract.id === '101' ? 8 : selectedContract.id === '102' ? 7.6 : selectedContract.id === '103' ? 4 : '',
        effectiveDate: selectedContract.id === '101' ? '2023-01-15' : selectedContract.id === '102' ? '2024-08-01' : '2022-06-01',
        notes:
          selectedContract.id === '102'
            ? 'Hours pending final approval from department head.'
            : selectedContract.id === '101'
            ? 'Standard full-time hours applied.'
            : 'No specific notes yet.',
        approvedBy: selectedContract.id === '101' ? 'John Manager' : '',
        reviewDate: selectedContract.id === '101' ? '2023-01-10' : selectedContract.id === '102' ? '2024-07-25' : '',
        manager: selectedContract.id === '101' ? 'Emily White' : selectedContract.id === '102' ? 'Robert Smith' : '',
        project: selectedContract.id === '102' ? 'Q3 Product Launch' : '',
        location: selectedContract.id === '101' ? 'New York Office' : selectedContract.id === '102' ? 'Brussels Office' : '',
      });
    }
  }, [selectedContract]);

  // Pagination logic
  const indexOfLastContract = currentPage * contractsPerPage;
  const indexOfFirstContract = indexOfLastContract - contractsPerPage;
  const currentContracts = filteredContractList.slice(indexOfFirstContract, indexOfLastContract);
  const totalPages = Math.ceil(filteredContractList.length / contractsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getStatusBadgeColor = (status: Contract['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      case 'Pending Approval':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSearch = () => {
    addNotification('Search initiated!', 'info');
  };

  const handleClearFilters = () => {
    setSearchForm({
      employeeName: '',
      contractId: '',
      status: '',
      department: '',
      jobTitle: '',
    });
    setShowMoreCriteria(false);
    addNotification('Search filters cleared.', 'info');
  };

  const handleSaveTheoreticalHoursDetails = () => {
    console.log('Saving theoretical hours details:', theoreticalHoursDetails);
    setAllContractList((prevList) =>
      prevList.map((contract) =>
        contract.id === selectedContract.id
          ? {
              ...contract,
              employeeName: selectedContract.employeeName,
              department: selectedContract.department,
              jobTitle: selectedContract.jobTitle,
              status: theoreticalHoursDetails.totalHoursPerWeek ? 'Active' : 'Pending Approval', // Example logic
            }
          : contract
      )
    );
    addNotification('Theoretical hours data saved successfully!', 'success');
    setShowModal(false);
  };

  const handleCancel = () => {
    console.log('Cancelling operation');
    addNotification('Operation cancelled.', 'warning');
    setShowModal(false);
  };

  const handleContractSelect = (contract: Contract) => {
    setSelectedContract(contract);
    addNotification(`Selected contract for: ${contract.employeeName}`, 'info');
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
      case 'assignHours':
        content = `Are you sure you want to assign theoretical hours for ${selectedContract.employeeName}'s contract? This will mark the contract as "Active".`;
        action = handleAssignHours;
        break;
      case 'markInactive':
        content = `Are you sure you want to mark ${selectedContract.employeeName}'s contract as "Inactive"?`;
        action = handleMarkInactive;
        break;
      case 'save':
        content = 'Are you sure you want to save the current theoretical hours details?';
        action = handleSaveTheoreticalHoursDetails;
        break;
      case 'cancel':
        content = 'Are you sure you want to cancel the current changes? Any unsaved modifications will be lost.';
        action = handleCancel;
        break;
      case 'addNewContractRequest':
        content = 'Are you sure you want to add a new contract request for hours assignment?';
        action = handleAddNewContractRequest;
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

  const handleAssignHours = () => {
    setTheoreticalHoursDetails((prev) => ({ ...prev, totalHoursPerWeek: 38, dailyHours: 7.6 })); // Example
    setAllContractList((prevList) =>
      prevList.map((contract) => (contract.id === selectedContract.id ? { ...contract, status: 'Active' } : contract))
    );
    setSelectedContract((prev) => ({ ...prev, status: 'Active' }));
    addNotification(`Theoretical hours assigned for ${selectedContract.employeeName}'s contract!`, 'success');
    setShowModal(false);
  };

  const handleMarkInactive = () => {
    setTheoreticalHoursDetails((prev) => ({ ...prev, totalHoursPerWeek: '', dailyHours: '' }));
    setAllContractList((prevList) =>
      prevList.map((contract) => (contract.id === selectedContract.id ? { ...contract, status: 'Inactive' } : contract))
    );
    setSelectedContract((prev) => ({ ...prev, status: 'Inactive' }));
    addNotification(`${selectedContract.employeeName}'s contract has been marked as Inactive.`, 'warning');
    setShowModal(false);
  };

  const handleAddNewContractRequest = () => {
    const newId = String(allContractList.length + 101);
    const newContractId = `CON${newId.padStart(3, '0')}`;
    const newContractRequest: Contract = {
      id: newId,
      contractId: newContractId,
      employeeName: 'New Employee',
      status: 'Pending Approval',
      startDate: new Date().toISOString().split('T')[0],
      contractType: '',
      endDate: '',
      department: '',
      jobTitle: '',
      email: '',
      phone: '',
    };
    setAllContractList((prevList) => [newContractRequest, ...prevList]);
    setSelectedContract(newContractRequest);
    setTheoreticalHoursDetails({
      contractIdentifier: newContractRequest.contractId,
      totalHoursPerWeek: '',
      dailyHours: '',
      effectiveDate: '',
      notes: 'New contract added, please assign theoretical hours.',
    });
    setActiveContractDetailTab('generalHoursInfo');
    addNotification('New contract request added! Please assign theoretical hours.', 'info');
    setShowModal(false);
  };

  const renderContractDetailsContent = () => {
    if (!selectedContract) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <FiInfo className="w-12 h-12 mb-4" />
          <p className="text-lg">Select a contract from the list to view details.</p>
        </div>
      );
    }
    switch (activeContractDetailTab) {
      case 'generalHoursInfo':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiUser className="w-5 h-5 mr-3 text-orange-500" />
              Contract & Employee Information
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
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(selectedContract.status)}`}>
                  {selectedContract.status}
                </span>
                <p className="text-xs text-gray-500 mt-1">Status reflects assignment of hours.</p>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={selectedContract.startDate}
                  onChange={(e) => setSelectedContract({ ...selectedContract, startDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={selectedContract.endDate || ''}
                  onChange={(e) => setSelectedContract({ ...selectedContract, endDate: e.target.value })}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                  type="text"
                  value={selectedContract.jobTitle || ''}
                  onChange={(e) => setSelectedContract({ ...selectedContract, jobTitle: e.target.value })}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Hours Assignment Notes</label>
                <textarea
                  value={theoreticalHoursDetails.notes}
                  onChange={(e) => setTheoreticalHoursDetails({ ...theoreticalHoursDetails, notes: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-24 resize-y focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Add notes about theoretical hours assignment..."
                />
              </div>
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h5 className="col-span-full font-semibold text-blue-800 mb-2 flex items-center">
                  <FiInfo className="mr-2" /> Additional Assignment Information
                </h5>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Manager</label>
                  <input
                    type="text"
                    value={theoreticalHoursDetails.manager || ''}
                    onChange={(e) => setTheoreticalHoursDetails({ ...theoreticalHoursDetails, manager: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                  <input
                    type="text"
                    value={theoreticalHoursDetails.project || ''}
                    onChange={(e) => setTheoreticalHoursDetails({ ...theoreticalHoursDetails, project: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={theoreticalHoursDetails.location || ''}
                    onChange={(e) => setTheoreticalHoursDetails({ ...theoreticalHoursDetails, location: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Office, Remote, Hybrid"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 'hoursAssignment':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiBriefcase className="w-5 h-5 mr-3 text-orange-500" />
              Theoretical Hours Assignment for <span className="text-orange-600 ml-1">{selectedContract.employeeName}</span>
            </h4>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Contract Status</label>
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusBadgeColor(selectedContract.status)}`}>
                  {selectedContract.status}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-4">
                <button
                  onClick={() => openConfirmationModal('assignHours')}
                  disabled={selectedContract.status === 'Active'}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiCheckCircle className="w-5 h-5" />
                  <span>Assign Hours & Activate</span>
                </button>
                <button
                  onClick={() => openConfirmationModal('markInactive')}
                  disabled={selectedContract.status === 'Inactive' || selectedContract.status === 'Completed'}
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiXCircle className="w-5 h-5" />
                  <span>Mark Inactive</span>
                </button>
                <button
                  onClick={() => addNotification('Schedule Review for Hours action triggered!', 'info')}
                  disabled={selectedContract.status === 'Inactive' || selectedContract.status === 'Completed'}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiCalendar className="w-5 h-5" />
                  <span>Schedule Hours Review</span>
                </button>
                <button
                  onClick={() => addNotification('Send Notification action triggered!', 'info')}
                  disabled={selectedContract.status === 'Inactive' || selectedContract.status === 'Completed'}
                  className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiMail className="w-5 h-5" />
                  <span>Send Notification</span>
                </button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <FiClock className="mr-2 text-gray-600" /> Hours Details
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Hours Per Week</label>
                    <input
                      type="number"
                      value={theoreticalHoursDetails.totalHoursPerWeek}
                      onChange={(e) => setTheoreticalHoursDetails({ ...theoreticalHoursDetails, totalHoursPerWeek: Number(e.target.value) })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                      placeholder="e.g., 38"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Daily Hours</label>
                    <input
                      type="number"
                      step="0.1"
                      value={theoreticalHoursDetails.dailyHours}
                      onChange={(e) => setTheoreticalHoursDetails({ ...theoreticalHoursDetails, dailyHours: Number(e.target.value) })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                      placeholder="e.g., 7.6"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Effective Date</label>
                    <input
                      type="date"
                      value={theoreticalHoursDetails.effectiveDate}
                      onChange={(e) => setTheoreticalHoursDetails({ ...theoreticalHoursDetails, effectiveDate: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <FiInfo className="mr-2 text-gray-600" /> Approval & Review
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Approved By</label>
                    <input
                      type="text"
                      value={theoreticalHoursDetails.approvedBy || ''}
                      onChange={(e) => setTheoreticalHoursDetails({ ...theoreticalHoursDetails, approvedBy: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Name of approving manager/HR"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Review Date</label>
                    <input
                      type="date"
                      value={theoreticalHoursDetails.reviewDate || ''}
                      onChange={(e) => setTheoreticalHoursDetails({ ...theoreticalHoursDetails, reviewDate: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes on Assignment</label>
                    <textarea
                      value={theoreticalHoursDetails.notes}
                      onChange={(e) => setTheoreticalHoursDetails({ ...theoreticalHoursDetails, notes: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-20 resize-y focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Add any specific notes regarding this hours assignment"
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
                <span className="flex-1 truncate">Theoretical_Hours_Policy_{selectedContract.contractId}.pdf</span>
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
                    <span className="font-semibold">2025-07-25 10:00 AM:</span> Contract status changed to "{selectedContract.status}".
                  </p>
                  <p className="text-gray-500 text-xs">By HR Admin</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiCheckCircle className="w-4 h-4 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                <div>
                  <p>
                    <span className="font-semibold">2025-07-24 09:15 AM:</span> Theoretical hours of {theoreticalHoursDetails.totalHoursPerWeek} assigned.
                  </p>
                  <p className="text-gray-500 text-xs">By HR Admin</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiFileText className="w-4 h-4 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                <div>
                  <p>
                    <span className="font-semibold">2025-07-23 02:00 PM:</span> Contract documents reviewed.
                  </p>
                  <p className="text-gray-500 text-xs">By HR Admin</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiPlusCircle className="w-4 h-4 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                <div>
                  <p>
                    <span className="font-semibold">2025-07-22 01:00 PM:</span> New contract request created.
                  </p>
                  <p className="text-gray-500 text-xs">System generated</p>
                </div>
              </div>
              <button
                className="mt-4 w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => addNotification('Loading more activity logs...', 'info')}
              >
                <FiMoreHorizontal className="mr-2" /> Load More
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderHomeContent = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        <FiHome className="inline-block mr-3 text-orange-500" size={24} /> Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4">
          <div className="p-3 bg-orange-100 rounded-full">
            <FiUsers className="text-orange-600" size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Contracts</p>
            <p className="text-2xl font-semibold text-gray-900">{allContractList.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <FiClock className="text-blue-600" size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Pending Hours Assignment</p>
            <p className="text-2xl font-semibold text-gray-900">
              {allContractList.filter((c) => c.status === 'Pending Approval').length}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-full">
            <FiCheckCircle className="text-green-600" size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Active Contracts</p>
            <p className="text-2xl font-semibold text-gray-900">
              {allContractList.filter((c) => c.status === 'Active').length}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4">
          <div className="p-3 bg-yellow-100 rounded-full">
            <FiCalendar className="text-yellow-600" size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Contracts Ending Soon</p>
            <p className="text-2xl font-semibold text-gray-900">
              {allContractList.filter((c) => c.status === 'Active' && c.endDate && new Date(c.endDate).getFullYear() === new Date().getFullYear() && new Date(c.endDate).getMonth() < new Date().getMonth() + 3).length}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4">
          <div className="p-3 bg-red-100 rounded-full">
            <FiXCircle className="text-red-600" size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Inactive Contracts</p>
            <p className="text-2xl font-semibold text-gray-900">
              {allContractList.filter((c) => c.status === 'Inactive').length}
            </p>
          </div>
        </div>
        {/* You can add more contract-specific metrics here */}
      </div>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <FiBarChart2 className="inline-block mr-2 text-orange-500" /> Hours Assignment Trends (Last 6 Months)
        </h3>
        {/* Placeholder for a chart or graph */}
        <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
          Chart/Graph Placeholder for Hours Assignment
        </div>
      </div>
    </div>
  );

  const renderContractHoursManagementContent = () => (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
        <FiClipboard className="mr-3 text-orange-500" /> Theoretical Hours Management
      </h2>

      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
          <FiSearch className="mr-3 text-blue-500" /> Search Contracts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
            <input
              type="text"
              className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-orange-500 focus:border-orange-500"
              placeholder="Search by employee name..."
              value={searchForm.employeeName}
              onChange={(e) => setSearchForm({ ...searchForm, employeeName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contract ID</label>
            <input
              type="text"
              className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-orange-500 focus:border-orange-500"
              placeholder="Search by contract ID..."
              value={searchForm.contractId}
              onChange={(e) => setSearchForm({ ...searchForm, contractId: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contract Status</label>
            <select
              className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-orange-500 focus:border-orange-500"
              value={searchForm.status}
              onChange={(e) => setSearchForm({ ...searchForm, status: e.target.value })}
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending Approval">Pending Approval</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {showMoreCriteria && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input
                  type="text"
                  className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Filter by department..."
                  value={searchForm.department}
                  onChange={(e) => setSearchForm({ ...searchForm, department: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input
                  type="text"
                  className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Filter by job title..."
                  value={searchForm.jobTitle}
                  onChange={(e) => setSearchForm({ ...searchForm, jobTitle: e.target.value })}
                />
              </div>
            </>
          )}
        </div>
        <div className="flex justify-between items-center mt-6">
          <div className="flex space-x-3">
            <button
              className="px-5 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center"
              onClick={handleSearch}
            >
              <FiSearch className="mr-2" /> Search
            </button>
            <button
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center"
              onClick={handleClearFilters}
            >
              <FiXCircle className="mr-2" /> Clear Filters
            </button>
          </div>
          <button
            className="text-orange-600 hover:text-orange-800 text-sm flex items-center"
            onClick={() => setShowMoreCriteria(!showMoreCriteria)}
          >
            {showMoreCriteria ? <FiChevronUp className="mr-1" /> : <FiChevronDown className="mr-1" />}
            {showMoreCriteria ? 'Less Criteria' : 'More Criteria'}
          </button>
        </div>
      </div>

      {/* Contracts List Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <FiClipboard className="mr-3 text-orange-500" /> All Contracts for Hours Assignment
          </h3>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
            onClick={() => openConfirmationModal('addNewContractRequest')}
          >
            <FiPlus className="mr-2" /> Add New Contract for Hours
          </button>
        </div>
        {filteredContractList.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentContracts.map((contract) => (
                    <tr
                      key={contract.id}
                      className={`hover:bg-gray-100 cursor-pointer ${selectedContract?.id === contract.id ? 'bg-orange-50 border-l-4 border-orange-500' : ''}`}
                      onClick={() => handleContractSelect(contract)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contract.contractId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contract.employeeName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(contract.status)}`}>
                          {contract.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contract.contractType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contract.startDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contract.endDate || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleContractSelect(contract);
                            setActiveContractDetailTab('generalHoursInfo');
                          }}
                          className="text-orange-600 hover:text-orange-900 mr-3"
                          title="View Details"
                        >
                          <FiEdit className="inline-block" size={18} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openConfirmationModal('assignHours');
                          }}
                          className="text-green-600 hover:text-green-900 mr-3"
                          title="Assign Hours & Activate Contract"
                          disabled={contract.status === 'Active'}
                        >
                          <FiCheckCircle className="inline-block" size={18} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openConfirmationModal('markInactive');
                          }}
                          className="text-red-600 hover:text-red-900"
                          title="Mark Contract Inactive"
                          disabled={contract.status === 'Inactive' || contract.status === 'Completed'}
                        >
                          <FiXCircle className="inline-block" size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <nav className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{indexOfFirstContract + 1}</span> to <span className="font-medium">{Math.min(indexOfLastContract, filteredContractList.length)}</span> of{' '}
                    <span className="font-medium">{filteredContractList.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <span className="sr-only">Previous</span>
                      <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        aria-current={currentPage === i + 1 ? 'page' : undefined}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === i + 1 ? 'bg-orange-500 text-white' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <span className="sr-only">Next</span>
                      <FiChevronRight className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </nav>
          </>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <FiInfo className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No contract requests found</h3>
            <p className="mt-1 text-sm text-gray-500">Adjust your filters or add a new contract request for hours assignment.</p>
          </div>
        )}
      </div>

      {/* Contract Details Section */}
      {selectedContract && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <FiUser className="mr-3 text-orange-500" /> Details for {selectedContract.employeeName}'s Contract
            </h3>
            <div className="flex space-x-3">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                onClick={() => openConfirmationModal('save')}
              >
                <FiSave className="mr-2" /> Save Changes
              </button>
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center"
                onClick={() => openConfirmationModal('cancel')}
              >
                <FiX className="mr-2" /> Cancel
              </button>
            </div>
          </div>

          <div className="border-b border-gray-200 mb-4">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveContractDetailTab('generalHoursInfo')}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                  activeContractDetailTab === 'generalHoursInfo'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FiInfo className="inline-block mr-2" /> Contract & Info
              </button>
              <button
                onClick={() => setActiveContractDetailTab('hoursAssignment')}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                  activeContractDetailTab === 'hoursAssignment'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FiClock className="inline-block mr-2" /> Hours Assignment
              </button>
              <button
                onClick={() => setActiveContractDetailTab('documents')}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                  activeContractDetailTab === 'documents'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FiFileText className="inline-block mr-2" /> Documents
              </button>
              <button
                onClick={() => setActiveContractDetailTab('activityLog')}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                  activeContractDetailTab === 'activityLog'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FiActivity className="inline-block mr-2" /> Activity Log
              </button>
            </nav>
          </div>
          <div className="py-4">{renderContractDetailsContent()}</div>
        </div>
      )}
    </div>
  );

  const renderReportsContent = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        <FiBarChart2 className="inline-block mr-3 text-orange-500" size={24} /> Theoretical Hours Reports
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Contract Status Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Active Contracts</p>
            <p className="text-2xl font-bold text-green-800">{allContractList.filter(c => c.status === 'Active').length}</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-600">Pending Approval</p>
            <p className="text-2xl font-bold text-yellow-800">{allContractList.filter(c => c.status === 'Pending Approval').length}</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-gray-600">Inactive Contracts</p>
            <p className="text-2xl font-bold text-red-800">{allContractList.filter(c => c.status === 'Inactive').length}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Completed Contracts</p>
            <p className="text-2xl font-bold text-gray-800">{allContractList.filter(c => c.status === 'Completed').length}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Hours Assigned by Department</h3>
        {/* Placeholder for department breakdown chart/data */}
        <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
          Departmental Hours Assignment Breakdown Chart
        </div>
      </div>
    </div>
  );

  const renderSettingsContent = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        <FiTool className="inline-block mr-3 text-orange-500" size={24} /> Settings
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">General Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contracts per page in lists</label>
            <input
              type="number"
              value={contractsPerPage}
              onChange={(e) => setContractsPerPage(Number(e.target.value))}
              className="w-48 border-gray-300 rounded-md shadow-sm text-sm focus:ring-orange-500 focus:border-orange-500"
              min="1"
            />
          </div>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => addNotification('Settings saved!', 'success')}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar Navigation */}


      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header/Navbar for Main Content */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between z-10">
          <h1 className="text-xl font-semibold text-gray-900">
            {activeMainTab === 'home' && 'Dashboard'}
            {activeMainTab === 'contractHours' && 'Theoretical Hours Management'}
            {activeMainTab === 'reports' && 'Reports'}
            {activeMainTab === 'settings' && 'Settings'}
          </h1>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <FiBell size={20} />
            </button>
            <span className="text-gray-600">SULIMANI Mansouen</span>
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg" // Placeholder for user avatar
              alt="User Avatar"
              className="w-9 h-9 rounded-full border-2 border-orange-400"
            />
          </div>
        </header>

        {/* Content Area based on active tab */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {activeMainTab === 'home' && renderHomeContent()}
          {activeMainTab === 'contractHours' && renderContractHoursManagementContent()}
          {activeMainTab === 'reports' && renderReportsContent()}
          {activeMainTab === 'settings' && renderSettingsContent()}
        </main>
      </div>

      {/* Notifications */}
      <div className="fixed bottom-6 right-6 z-50 space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg shadow-md flex items-center justify-between text-white
            ${
              notification.type === 'success'
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
  );
};

export default AssignTheoreticalHours;

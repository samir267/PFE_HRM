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

// Updated interface for an Employee in a rehire context
interface Employee {
  id: string;
  employeeId: string; // Changed from applicantId
  name: string;
  rehireStatus: 'Eligible for Rehire' | 'Rehired' | 'Not Eligible' | 'Review Pending'; // Rehire specific statuses
  lastPosition?: string;
  lastDepartment?: string;
  email?: string;
  phone?: string;
  previousEmploymentDates: string; // e.g., "2020-01-01 to 2023-12-31"
  reasonForLeaving?: string;
}

// Updated interface for Employee Rehire Details
interface EmployeeRehireDetails {
  validationWitness?: string;
  workIdentifier: string; // Employee ID
  rehireEligibilityStatus: 'Eligible' | 'Not Eligible' | 'Conditional'; // Detailed rehire eligibility
  previousManagerFeedback?: string; // Feedback from previous manager
  notes: string;
  lastReviewDate?: string; // Date of last performance review
  rehiringPosition?: string; // Position being rehired for
  rehiringDepartment?: string; // Department being rehired into
  expectedRehireDate: string; // Date of expected rehire
  // Additional fields for extended details
  dob?: string;
  nationality?: string;
  linkedInProfile?: string;
}

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

const RehireEmploye: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>({
    id: '2',
    employeeId: 'EMP001',
    name: 'JANE DOE',
    rehireStatus: 'Review Pending',
    lastPosition: 'Marketing Specialist',
    lastDepartment: 'Marketing',
    email: 'jane.doe@example.com',
    phone: '+32 471 98 76 54',
    previousEmploymentDates: '2018-05-01 to 2022-03-15',
    reasonForLeaving: 'Relocation',
  });

  const [searchForm, setSearchForm] = useState({
    name: '',
    employeeId: '',
    rehireStatus: '',
    lastDepartment: '',
    lastPosition: '',
  });

  const [employeeRehireDetails, setEmployeeRehireDetails] = useState<EmployeeRehireDetails>({
    validationWitness: 'HR Manager',
    workIdentifier: 'EMP001',
    rehireEligibilityStatus: 'Review Pending',
    previousManagerFeedback: 'Strong performer, good team player.',
    notes: 'Consider for similar roles, left on good terms.',
    lastReviewDate: '2022-02-28',
    rehiringPosition: '',
    rehiringDepartment: '',
    expectedRehireDate: '2025-08-01',
    dob: '1988-11-25',
    nationality: 'Belgian',
    linkedInProfile: 'https://linkedin.com/in/janedoe',
  });

  const [activeMainTab, setActiveMainTab] = useState('rehireRequests'); // Changed default tab
  const [activeEmployeeDetailTab, setActiveEmployeeDetailTab] = useState('generalInfo');

  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage, setEmployeesPerPage] = useState(10); // Changed from applicantsPerPage

  const [allEmployeeList, setAllEmployeeList] = useState<Employee[]>([
    {
      id: '1',
      employeeId: 'EMP005',
      name: 'ROBERT SMITH',
      rehireStatus: 'Eligible for Rehire',
      lastDepartment: 'Engineering',
      lastPosition: 'Software Engineer',
      email: 'robert.smith@example.com',
      phone: '+32 470 11 22 33',
      previousEmploymentDates: '2015-09-01 to 2020-08-31',
      reasonForLeaving: 'Pursue higher education',
    },
    {
      id: '2',
      employeeId: 'EMP001',
      name: 'JANE DOE',
      rehireStatus: 'Review Pending',
      lastDepartment: 'Marketing',
      lastPosition: 'Marketing Specialist',
      email: 'jane.doe@example.com',
      phone: '+32 471 98 76 54',
      previousEmploymentDates: '2018-05-01 to 2022-03-15',
      reasonForLeaving: 'Relocation',
    },
    {
      id: '3',
      employeeId: 'EMP010',
      name: 'ALICE JOHNSON',
      rehireStatus: 'Not Eligible',
      lastDepartment: 'Sales',
      lastPosition: 'Sales Representative',
      email: 'alice.johnson@example.com',
      phone: '+32 472 33 44 55',
      previousEmploymentDates: '2019-03-01 to 2021-06-30',
      reasonForLeaving: 'Performance issues',
    },
    {
      id: '4',
      employeeId: 'EMP015',
      name: 'MARK BROWN',
      rehireStatus: 'Rehired',
      lastDepartment: 'Finance',
      lastPosition: 'Financial Analyst',
      email: 'mark.brown@example.com',
      phone: '+32 473 66 77 88',
      previousEmploymentDates: '2017-01-01 to 2020-12-31',
      reasonForLeaving: 'Career change',
    },
    {
      id: '5',
      employeeId: 'EMP020',
      name: 'SARAH GREEN',
      rehireStatus: 'Eligible for Rehire',
      lastDepartment: 'HR',
      lastPosition: 'HR Generalist',
      email: 'sarah.green@example.com',
      phone: '+32 474 99 00 11',
      previousEmploymentDates: '2016-07-01 to 2019-06-30',
      reasonForLeaving: 'Maternity leave, did not return',
    },
  ]);

  const [filteredEmployeeList, setFilteredEmployeeList] = useState<Employee[]>(allEmployeeList);
  const [showMoreCriteria, setShowMoreCriteria] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalAction, setModalAction] = useState<(() => void) | null>(null);

  // Effect to update filtered list when searchForm changes
  useEffect(() => {
    const filterList = () => {
      let tempEmployees = allEmployeeList.filter((employee) => {
        const matchesName = searchForm.name ? employee.name.toLowerCase().includes(searchForm.name.toLowerCase()) : true;
        const matchesEmployeeId = searchForm.employeeId ? employee.employeeId.includes(searchForm.employeeId) : true;
        const matchesRehireStatus = searchForm.rehireStatus ? employee.rehireStatus.toLowerCase().includes(searchForm.rehireStatus.toLowerCase()) : true;
        const matchesLastDepartment = searchForm.lastDepartment
          ? (employee.lastDepartment || '').toLowerCase().includes(searchForm.lastDepartment.toLowerCase())
          : true;
        const matchesLastPosition = searchForm.lastPosition ? (employee.lastPosition || '').toLowerCase().includes(searchForm.lastPosition.toLowerCase()) : true;

        return matchesName && matchesEmployeeId && matchesRehireStatus && matchesLastDepartment && matchesLastPosition;
      });
      setFilteredEmployeeList(tempEmployees);
      setCurrentPage(1);
    };
    filterList();
  }, [searchForm, allEmployeeList]);

  // Effect to update employee rehire details when selected employee changes
  useEffect(() => {
    if (selectedEmployee) {
      setEmployeeRehireDetails({
        validationWitness: 'HR Manager',
        workIdentifier: selectedEmployee.employeeId,
        rehireEligibilityStatus: selectedEmployee.rehireStatus === 'Eligible for Rehire' ? 'Eligible' : selectedEmployee.rehireStatus === 'Not Eligible' ? 'Not Eligible' : 'Review Pending',
        previousManagerFeedback: selectedEmployee.id === '1' ? 'Excellent contributor, strong technical skills.' : selectedEmployee.id === '2' ? 'Strong performer, good team player.' : 'No feedback yet.',
        notes: selectedEmployee.id === '2' ? 'Consider for similar roles, left on good terms.' : 'No specific notes yet.',
        lastReviewDate: selectedEmployee.id === '1' ? '2020-08-15' : selectedEmployee.id === '2' ? '2022-02-28' : '',
        rehiringPosition: selectedEmployee.lastPosition, // Default to last position
        rehiringDepartment: selectedEmployee.lastDepartment, // Default to last department
        expectedRehireDate: '2025-08-01', // Placeholder
        dob: selectedEmployee.id === '1' ? '1985-03-10' : selectedEmployee.id === '2' ? '1988-11-25' : '',
        nationality: selectedEmployee.id === '1' ? 'American' : selectedEmployee.id === '2' ? 'Belgian' : '',
        linkedInProfile: selectedEmployee.id === '1' ? 'https://linkedin.com/in/robertsmith' : selectedEmployee.id === '2' ? 'https://linkedin.com/in/janedoe' : '',
      });
    }
  }, [selectedEmployee]);

  // Pagination logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployeeList.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(filteredEmployeeList.length / employeesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getStatusBadgeColor = (status: Employee['rehireStatus']) => {
    switch (status) {
      case 'Rehired':
        return 'bg-green-100 text-green-800';
      case 'Not Eligible':
        return 'bg-red-100 text-red-800';
      case 'Review Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Eligible for Rehire':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSearch = () => {
    addNotification('Search initiated!', 'info');
  };

  const handleClearFilters = () => {
    setSearchForm({
      name: '',
      employeeId: '',
      rehireStatus: '',
      lastDepartment: '',
      lastPosition: '',
    });
    setShowMoreCriteria(false);
    addNotification('Search filters cleared.', 'info');
  };

  const handleSaveEmployeeRehireDetails = () => {
    console.log('Saving employee rehire details:', employeeRehireDetails);
    setAllEmployeeList((prevList) =>
      prevList.map((employee) =>
        employee.id === selectedEmployee.id
          ? {
              ...employee,
              name: selectedEmployee.name,
              lastDepartment: selectedEmployee.lastDepartment,
              lastPosition: selectedEmployee.lastPosition,
              rehireStatus: employeeRehireDetails.rehireEligibilityStatus === 'Eligible' ? 'Eligible for Rehire' :
                            employeeRehireDetails.rehireEligibilityStatus === 'Not Eligible' ? 'Not Eligible' : 'Review Pending',
            }
          : employee
      )
    );
    addNotification('Employee rehire data saved successfully!', 'success');
    setShowModal(false);
  };

  const handleCancel = () => {
    console.log('Cancelling operation');
    addNotification('Operation cancelled.', 'warning');
    setShowModal(false);
  };

  const handleEmployeeSelect = (employee: Employee) => {
    setSelectedEmployee(employee);
    addNotification(`Selected employee: ${employee.name}`, 'info');
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
      case 'rehire':
        content = `Are you sure you want to rehire ${selectedEmployee.name}? This action will update their status to "Rehired".`;
        action = handleRehireEmployee;
        break;
      case 'markNotEligible':
        content = `Are you sure you want to mark ${selectedEmployee.name} as "Not Eligible" for rehire?`;
        action = handleMarkNotEligible;
        break;
      case 'save':
        content = 'Are you sure you want to save the current employee rehire details?';
        action = handleSaveEmployeeRehireDetails;
        break;
      case 'cancel':
        content = 'Are you sure you want to cancel the current changes? Any unsaved modifications will be lost.';
        action = handleCancel;
        break;
      case 'addNewRehireRequest':
        content = 'Are you sure you want to add a new rehire request?';
        action = handleAddNewRehireRequest;
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

  const handleRehireEmployee = () => {
    setEmployeeRehireDetails((prev) => ({ ...prev, rehireEligibilityStatus: 'Eligible' }));
    setAllEmployeeList((prevList) =>
      prevList.map((employee) => (employee.id === selectedEmployee.id ? { ...employee, rehireStatus: 'Rehired' } : employee))
    );
    setSelectedEmployee((prev) => ({ ...prev, rehireStatus: 'Rehired' }));
    addNotification(`Employee ${selectedEmployee.name} has been successfully rehired!`, 'success');
    setShowModal(false);
  };

  const handleMarkNotEligible = () => {
    setEmployeeRehireDetails((prev) => ({ ...prev, rehireEligibilityStatus: 'Not Eligible' }));
    setAllEmployeeList((prevList) =>
      prevList.map((employee) => (employee.id === selectedEmployee.id ? { ...employee, rehireStatus: 'Not Eligible' } : employee))
    );
    setSelectedEmployee((prev) => ({ ...prev, rehireStatus: 'Not Eligible' }));
    addNotification(`Employee ${selectedEmployee.name} has been marked as not eligible for rehire.`, 'warning');
    setShowModal(false);
  };

  const handleAddNewRehireRequest = () => {
    const newId = String(allEmployeeList.length + 1);
    const newEmployeeId = `EMP${newId.padStart(3, '0')}`;
    const newRehireRequest: Employee = {
      id: newId,
      employeeId: newEmployeeId,
      name: 'New Rehire Request',
      rehireStatus: 'Review Pending',
      previousEmploymentDates: '',
      email: '',
      phone: '',
      lastPosition: '',
      lastDepartment: '',
      reasonForLeaving: '',
    };
    setAllEmployeeList((prevList) => [newRehireRequest, ...prevList]);
    setSelectedEmployee(newRehireRequest);
    setEmployeeRehireDetails({
      workIdentifier: newRehireRequest.employeeId,
      rehireEligibilityStatus: 'Review Pending',
      notes: 'New rehire request added, please fill in details.',
      expectedRehireDate: '',
    });
    setActiveEmployeeDetailTab('generalInfo');
    addNotification('New rehire request added! Please fill in the details.', 'info');
    setShowModal(false);
  };

  const renderEmployeeDetailsContent = () => {
    if (!selectedEmployee) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <FiInfo className="w-12 h-12 mb-4" />
          <p className="text-lg">Select an employee from the list to view details.</p>
        </div>
      );
    }
    switch (activeEmployeeDetailTab) {
      case 'generalInfo':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiUser className="w-5 h-5 mr-3 text-orange-500" />
              Employee Rehire Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                <input
                  type="text"
                  value={selectedEmployee.employeeId}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100 focus:outline-none"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
                <input
                  type="text"
                  value={selectedEmployee.name}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Rehire Status</label>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(selectedEmployee.rehireStatus)}`}>
                  {selectedEmployee.rehireStatus}
                </span>
                <p className="text-xs text-gray-500 mt-1">Status can be changed in Rehire Workflow tab.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Department</label>
                <input
                  type="text"
                  value={selectedEmployee.lastDepartment || ''}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, lastDepartment: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Position</label>
                <input
                  type="text"
                  value={selectedEmployee.lastPosition || ''}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, lastPosition: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Previous Employment Dates</label>
                <input
                  type="text"
                  value={selectedEmployee.previousEmploymentDates}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, previousEmploymentDates: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                  placeholder="e.g., 2020-01-01 to 2023-12-31"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={selectedEmployee.email || ''}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={selectedEmployee.phone || ''}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Leaving</label>
                <textarea
                  value={selectedEmployee.reasonForLeaving || ''}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, reasonForLeaving: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-20 resize-y focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter reason for leaving..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Rehire Notes</label>
                <textarea
                  value={employeeRehireDetails.notes}
                  onChange={(e) => setEmployeeRehireDetails({ ...employeeRehireDetails, notes: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-24 resize-y focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Add notes about the rehire eligibility and process..."
                />
              </div>
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h5 className="col-span-full font-semibold text-blue-800 mb-2 flex items-center">
                  <FiInfo className="mr-2" /> Additional Information
                </h5>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={employeeRehireDetails.dob || ''}
                    onChange={(e) => setEmployeeRehireDetails({ ...employeeRehireDetails, dob: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                  <input
                    type="text"
                    value={employeeRehireDetails.nationality || ''}
                    onChange={(e) => setEmployeeRehireDetails({ ...employeeRehireDetails, nationality: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
                  <input
                    type="url"
                    value={employeeRehireDetails.linkedInProfile || ''}
                    onChange={(e) => setEmployeeRehireDetails({ ...employeeRehireDetails, linkedInProfile: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. https://linkedin.com/in/..."
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 'rehireWorkflow':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiBriefcase className="w-5 h-5 mr-3 text-orange-500" />
              Rehire Workflow for <span className="text-orange-600 ml-1">{selectedEmployee.name}</span>
            </h4>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Rehire Stage</label>
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusBadgeColor(selectedEmployee.rehireStatus)}`}>
                  {selectedEmployee.rehireStatus}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-4">
                <button
                  onClick={() => openConfirmationModal('rehire')}
                  disabled={selectedEmployee.rehireStatus === 'Rehired'}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiCheckCircle className="w-5 h-5" />
                  <span>Rehire Employee</span>
                </button>
                <button
                  onClick={() => openConfirmationModal('markNotEligible')}
                  disabled={selectedEmployee.rehireStatus === 'Not Eligible'}
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiXCircle className="w-5 h-5" />
                  <span>Mark Not Eligible</span>
                </button>
                <button
                  onClick={() => addNotification('Schedule Interview for Rehire action triggered!', 'info')}
                  disabled={selectedEmployee.rehireStatus === 'Rehired' || selectedEmployee.rehireStatus === 'Not Eligible'}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiCalendar className="w-5 h-5" />
                  <span>Schedule Rehire Interview</span>
                </button>
                <button
                  onClick={() => addNotification('Extend Offer action triggered!', 'info')}
                  disabled={selectedEmployee.rehireStatus === 'Rehired' || selectedEmployee.rehireStatus === 'Not Eligible'}
                  className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiMail className="w-5 h-5" />
                  <span>Extend Rehire Offer</span>
                </button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <FiBriefcase className="mr-2 text-gray-600" /> Rehire Position Details
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rehiring Position</label>
                    <input
                      type="text"
                      value={employeeRehireDetails.rehiringPosition || ''}
                      onChange={(e) => setEmployeeRehireDetails({ ...employeeRehireDetails, rehiringPosition: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                      placeholder="e.g., Senior Software Engineer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rehiring Department</label>
                    <input
                      type="text"
                      value={employeeRehireDetails.rehiringDepartment || ''}
                      onChange={(e) => setEmployeeRehireDetails({ ...employeeRehireDetails, rehiringDepartment: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                      placeholder="e.g., Product Development"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expected Rehire Date</label>
                    <input
                      type="date"
                      value={employeeRehireDetails.expectedRehireDate}
                      onChange={(e) => setEmployeeRehireDetails({ ...employeeRehireDetails, expectedRehireDate: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <FiInfo className="mr-2 text-gray-600" /> Feedback and Eligibility
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Previous Manager Feedback</label>
                    <textarea
                      value={employeeRehireDetails.previousManagerFeedback || ''}
                      onChange={(e) => setEmployeeRehireDetails({ ...employeeRehireDetails, previousManagerFeedback: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-20 resize-y focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Summary of previous manager's feedback"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rehire Eligibility Status</label>
                    <select
                      value={employeeRehireDetails.rehireEligibilityStatus}
                      onChange={(e) => setEmployeeRehireDetails({ ...employeeRehireDetails, rehireEligibilityStatus: e.target.value as any })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="Eligible">Eligible</option>
                      <option value="Not Eligible">Not Eligible</option>
                      <option value="Conditional">Conditional</option>
                      <option value="Review Pending">Review Pending</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Performance Review Date</label>
                    <input
                      type="date"
                      value={employeeRehireDetails.lastReviewDate || ''}
                      onChange={(e) => setEmployeeRehireDetails({ ...employeeRehireDetails, lastReviewDate: e.target.value })}
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
              Documents for <span className="text-orange-600 ml-1">{selectedEmployee.name}</span>
            </h4>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-md">
                <FiFileText className="w-6 h-6 mr-3 flex-shrink-0" />
                <span className="flex-1 truncate">Previous_Contract_{selectedEmployee.employeeId}.pdf</span>
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
                <span className="flex-1 truncate">Performance_Review_{selectedEmployee.employeeId}_{employeeRehireDetails.lastReviewDate}.pdf</span>
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
              Activity Log for <span className="text-orange-600 ml-1">{selectedEmployee.name}</span>
            </h4>
            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex items-start">
                <FiClock className="w-4 h-4 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                <div>
                  <p>
                    <span className="font-semibold">2025-07-25 11:00 AM:</span> Rehire status changed to "{selectedEmployee.rehireStatus}".
                  </p>
                  <p className="text-gray-500 text-xs">By HR Admin</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiMail className="w-4 h-4 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                <div>
                  <p>
                    <span className="font-semibold">2025-07-24 09:30 AM:</span> Rehire interview scheduled.
                  </p>
                  <p className="text-gray-500 text-xs">By HR Admin</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiFileText className="w-4 h-4 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                <div>
                  <p>
                    <span className="font-semibold">2025-07-23 02:00 PM:</span> Previous employment documents reviewed.
                  </p>
                  <p className="text-gray-500 text-xs">By HR Admin</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiPlusCircle className="w-4 h-4 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                <div>
                  <p>
                    <span className="font-semibold">2025-07-22 01:00 PM:</span> Rehire request created.
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
            <p className="text-gray-500 text-sm">Total Rehire Requests</p>
            <p className="text-2xl font-semibold text-gray-900">{allEmployeeList.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <FiCalendar className="text-blue-600" size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Review Pending</p>
            <p className="text-2xl font-semibold text-gray-900">
              {allEmployeeList.filter((e) => e.rehireStatus === 'Review Pending').length}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-full">
            <FiCheckCircle className="text-green-600" size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Rehired This Month</p>
            <p className="text-2xl font-semibold text-gray-900">
              {allEmployeeList.filter((e) => e.rehireStatus === 'Rehired').length}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4">
          <div className="p-3 bg-yellow-100 rounded-full">
            <FiClock className="text-yellow-600" size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Eligible for Rehire</p>
            <p className="text-2xl font-semibold text-gray-900">
              {allEmployeeList.filter((e) => e.rehireStatus === 'Eligible for Rehire').length}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4">
          <div className="p-3 bg-red-100 rounded-full">
            <FiXCircle className="text-red-600" size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Not Eligible for Rehire</p>
            <p className="text-2xl font-semibold text-gray-900">
              {allEmployeeList.filter((e) => e.rehireStatus === 'Not Eligible').length}
            </p>
          </div>
        </div>
        {/* You can add more rehire-specific metrics here */}
      </div>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <FiBarChart2 className="inline-block mr-2 text-orange-500" /> Rehire Trends (Last 6 Months)
        </h3>
        {/* Placeholder for a chart or graph */}
        <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
          Chart/Graph Placeholder
        </div>
      </div>
    </div>
  );

  const renderRehireRequestsContent = () => (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
        <FiUsers className="mr-3 text-orange-500" /> Employee Rehire Management
      </h2>

      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
          <FiSearch className="mr-3 text-blue-500" /> Search Rehire Requests
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
            <input
              type="text"
              className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-orange-500 focus:border-orange-500"
              placeholder="Search by name..."
              value={searchForm.name}
              onChange={(e) => setSearchForm({ ...searchForm, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
            <input
              type="text"
              className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-orange-500 focus:border-orange-500"
              placeholder="Search by ID..."
              value={searchForm.employeeId}
              onChange={(e) => setSearchForm({ ...searchForm, employeeId: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rehire Status</label>
            <select
              className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-orange-500 focus:border-orange-500"
              value={searchForm.rehireStatus}
              onChange={(e) => setSearchForm({ ...searchForm, rehireStatus: e.target.value })}
            >
              <option value="">All Statuses</option>
              <option value="Eligible for Rehire">Eligible for Rehire</option>
              <option value="Rehired">Rehired</option>
              <option value="Not Eligible">Not Eligible</option>
              <option value="Review Pending">Review Pending</option>
            </select>
          </div>

          {showMoreCriteria && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Department</label>
                <input
                  type="text"
                  className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Filter by department..."
                  value={searchForm.lastDepartment}
                  onChange={(e) => setSearchForm({ ...searchForm, lastDepartment: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Position</label>
                <input
                  type="text"
                  className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Filter by position..."
                  value={searchForm.lastPosition}
                  onChange={(e) => setSearchForm({ ...searchForm, lastPosition: e.target.value })}
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

      {/* Rehire Requests List Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <FiClipboard className="mr-3 text-orange-500" /> All Rehire Requests
          </h3>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
            onClick={() => openConfirmationModal('addNewRehireRequest')}
          >
            <FiPlus className="mr-2" /> Add New Rehire Request
          </button>
        </div>
        {filteredEmployeeList.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rehire Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Position</th>
                    <th className="px-6 py-3 text-left text-xs font-500 text-gray-500 uppercase tracking-wider">Last Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Previous Employment Dates</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentEmployees.map((employee) => (
                    <tr
                      key={employee.id}
                      className={`hover:bg-gray-100 cursor-pointer ${selectedEmployee?.id === employee.id ? 'bg-orange-50 border-l-4 border-orange-500' : ''}`}
                      onClick={() => handleEmployeeSelect(employee)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.employeeId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(employee.rehireStatus)}`}>
                          {employee.rehireStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.lastPosition}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.lastDepartment}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.previousEmploymentDates}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEmployeeSelect(employee);
                            setActiveEmployeeDetailTab('generalInfo');
                          }}
                          className="text-orange-600 hover:text-orange-900 mr-3"
                          title="View Details"
                        >
                          <FiEdit className="inline-block" size={18} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openConfirmationModal('rehire');
                          }}
                          className="text-green-600 hover:text-green-900 mr-3"
                          title="Rehire Employee"
                          disabled={employee.rehireStatus === 'Rehired'}
                        >
                          <FiCheckCircle className="inline-block" size={18} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openConfirmationModal('markNotEligible');
                          }}
                          className="text-red-600 hover:text-red-900"
                          title="Mark Not Eligible"
                          disabled={employee.rehireStatus === 'Not Eligible'}
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
                    Showing <span className="font-medium">{indexOfFirstEmployee + 1}</span> to <span className="font-medium">{Math.min(indexOfLastEmployee, filteredEmployeeList.length)}</span> of{' '}
                    <span className="font-medium">{filteredEmployeeList.length}</span> results
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
            <h3 className="mt-2 text-lg font-medium text-gray-900">No rehire requests found</h3>
            <p className="mt-1 text-sm text-gray-500">Adjust your filters or add a new rehire request.</p>
          </div>
        )}
      </div>

      {/* Employee Details Section */}
      {selectedEmployee && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center">
              <FiUser className="mr-3 text-orange-500" /> Details for {selectedEmployee.name}
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
                onClick={() => setActiveEmployeeDetailTab('generalInfo')}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                  activeEmployeeDetailTab === 'generalInfo'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FiInfo className="inline-block mr-2" /> General Information
              </button>
              <button
                onClick={() => setActiveEmployeeDetailTab('rehireWorkflow')}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                  activeEmployeeDetailTab === 'rehireWorkflow'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FiBriefcase className="inline-block mr-2" /> Rehire Workflow
              </button>
              <button
                onClick={() => setActiveEmployeeDetailTab('documents')}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                  activeEmployeeDetailTab === 'documents'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FiFileText className="inline-block mr-2" /> Documents
              </button>
              <button
                onClick={() => setActiveEmployeeDetailTab('activityLog')}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                  activeEmployeeDetailTab === 'activityLog'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FiActivity className="inline-block mr-2" /> Activity Log
              </button>
            </nav>
          </div>
          <div className="py-4">{renderEmployeeDetailsContent()}</div>
        </div>
      )}
    </div>
  );

  const renderReportsContent = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        <FiBarChart2 className="inline-block mr-3 text-orange-500" size={24} /> Rehire Reports
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Rehire Status Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Eligible for Rehire</p>
            <p className="text-2xl font-bold text-blue-800">{allEmployeeList.filter(e => e.rehireStatus === 'Eligible for Rehire').length}</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-600">Review Pending</p>
            <p className="text-2xl font-bold text-yellow-800">{allEmployeeList.filter(e => e.rehireStatus === 'Review Pending').length}</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Rehired</p>
            <p className="text-2xl font-bold text-green-800">{allEmployeeList.filter(e => e.rehireStatus === 'Rehired').length}</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-gray-600">Not Eligible</p>
            <p className="text-2xl font-bold text-red-800">{allEmployeeList.filter(e => e.rehireStatus === 'Not Eligible').length}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Rehire by Department</h3>
        {/* Placeholder for department breakdown chart/data */}
        <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
          Departmental Rehire Breakdown Chart
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Items per page in lists</label>
            <input
              type="number"
              value={employeesPerPage}
              onChange={(e) => setEmployeesPerPage(Number(e.target.value))}
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


      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header/Navbar for Main Content */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between z-10">
          <h1 className="text-xl font-semibold text-gray-900">
            {activeMainTab === 'home' && 'Dashboard'}
            {activeMainTab === 'rehireRequests' && 'Rehire Requests'}
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
          {activeMainTab === 'rehireRequests' && renderRehireRequestsContent()}
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

export default RehireEmploye;
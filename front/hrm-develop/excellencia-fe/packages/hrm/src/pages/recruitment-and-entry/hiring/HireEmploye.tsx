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
  FiPlusCircle, // Added for 'Add New Employee'
  FiActivity, // For activity log
  FiGlobe, // For company/location dropdown
  FiUsers, // For Home/Dashboard - overall employees
  FiBarChart2, // For Reports
  FiTool, // For Settings general
  FiClipboard, // For Jobs
} from 'react-icons/fi';

interface EmployeeRecord {
  id: string;
  timestamp: string;
  name: string;
  applicantId: string; // Keeping applicantId as it's part of initial application
  status: 'Pending Review' | 'Interview Scheduled' | 'Offer Extended' | 'Hired' | 'Rejected';
  department?: string;
  position?: string;
  email?: string;
  phone?: string;
  address?: string;
}

interface EmployeeDetails {
  validationWitness?: string; // Made optional
  workIdentifier: string;
  origin?: string; // Made optional
  externalUserId?: string; // Made optional
  servesAsId?: string; // Made optional
  timestampApplication: string;
  reason?: string; // Made optional
  hiringStage: 'Pending Review' | 'Interview Scheduled' | 'Offer Extended' | 'Hired' | 'Rejected';
  company?: string; // Made optional
  expectedSalary?: string; // Made optional
  notes: string;
  // New fields for extended details
  dob?: string; // Date of Birth
  nationality?: string;
  linkedInProfile?: string;
}

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

const HireEmploye: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeRecord>({
    id: '2', // Default to JOHN DOE for initial display matching image
    name: 'JOHN DOE',
    applicantId: '010019',
    status: 'Interview Scheduled',
    department: 'Engineering',
    position: 'Frontend Developer',
    timestamp: '2025-06-26-14:30:00',
    email: 'john.doe@example.com',
    phone: '+32 471 23 45 67',
    address: '456 Oak Ave, Ghent, Belgium',
  });

  const [searchForm, setSearchForm] = useState({
    name: '',
    applicantId: '',
    status: '',
    department: '',
    position: '',
  });

  const [employeeDetails, setEmployeeDetails] = useState<EmployeeDetails>({
    validationWitness: 'Implicit',
    workIdentifier: '010019', // Corresponds to JOHN DOE
    origin: 'Company Website',
    externalUserId: '',
    servesAsId: 'ENG-010019',
    timestampApplication: '2025-06-26-14:30:00',
    reason: '',
    hiringStage: 'Interview Scheduled', // Corresponds to JOHN DOE
    company: 'Fluxeruim BANK',
    expectedSalary: '75000',
    notes: 'Strong experience in React and a good cultural fit.',
    dob: '1992-08-20',
    nationality: 'Belgian',
    linkedInProfile: 'https://linkedin.com/in/johndoe',
  });

  const [activeMainTab, setActiveMainTab] = useState('applicants'); // Keep 'applicants' as the initial tab for searching
  const [activeEmployeeDetailTab, setActiveEmployeeDetailTab] = useState('generalInfo');

  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage, setEmployeesPerPage] = useState(10); // Can be changed by user if needed

  const [allEmployeeList, setAllEmployeeList] = useState<EmployeeRecord[]>([
    {
      id: '1',
      timestamp: '2025-06-27-11:30:00',
      name: 'LINDA BLUE',
      applicantId: '010028',
      status: 'Pending Review',
      department: 'HR',
      position: 'Recruitment Coordinator',
      email: 'linda.blue@example.com',
      phone: '+32 480 12 34 56',
      address: '808 Holly Hts, Verviers, Belgium',
    },
    {
      id: '2',
      timestamp: '2025-06-26-14:30:00',
      name: 'JOHN DOE',
      applicantId: '010019',
      status: 'Interview Scheduled',
      department: 'Engineering',
      position: 'Frontend Developer',
      email: 'john.doe@example.com',
      phone: '+32 471 23 45 67',
      address: '456 Oak Ave, Ghent, Belgium',
    },
    {
      id: '3',
      timestamp: '2025-06-25-16:00:00',
      name: 'JAMES RED',
      applicantId: '010029',
      status: 'Interview Scheduled',
      department: 'Finance',
      position: 'Controller',
      email: 'james.red@example.com',
      phone: '+32 481 23 45 67',
      address: '909 Palm Pl, Tournai, Belgium',
    },
    {
      id: '4',
      timestamp: '2025-06-15-18:00:00',
      name: 'ANNA PINK',
      applicantId: '010030',
      status: 'Offer Extended',
      department: 'Marketing',
      position: 'SEO Specialist',
      email: 'anna.pink@example.com',
      phone: '+32 482 34 56 78',
      address: '111 Sycamore St, Mechelen, Belgium',
    },
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
      timestamp: '2025-06-23-16:45:00',
      name: 'ALICE BROWN',
      applicantId: '010022',
      status: 'Rejected',
      department: 'HR',
      position: 'HR Assistant',
      email: 'alice.brown@example.com',
      phone: '+32 474 56 78 90',
      address: '202 Birch Dr, Bruges, Belgium',
    },
    {
      id: '8',
      timestamp: '2025-06-22-08:00:00',
      name: 'ROBERT WHITE',
      applicantId: '010023',
      status: 'Pending Review',
      department: 'Engineering',
      position: 'Backend Developer',
      email: 'robert.white@example.com',
      phone: '+32 475 67 89 01',
      address: '303 Elm Ct, Charleroi, Belgium',
    },
    {
      id: '9',
      timestamp: '2025-06-21-10:30:00',
      name: 'EMILY DAVIS',
      applicantId: '010024',
      status: 'Interview Scheduled',
      department: 'Finance',
      position: 'Financial Analyst',
      email: 'emily.davis@example.com',
      phone: '+32 476 78 90 12',
      address: '404 Spruce Sq, Leuven, Belgium',
    },
    {
      id: '10',
      timestamp: '2025-06-20-13:00:00',
      name: 'MICHAEL GREEN',
      applicantId: '010025',
      status: 'Offer Extended',
      department: 'Marketing',
      position: 'Content Creator',
      email: 'michael.green@example.com',
      phone: '+32 477 89 01 23',
      address: '505 Poplar Pk, Namur, Belgium',
    },
    {
      id: '11',
      timestamp: '2025-06-19-15:00:00',
      name: 'SARAH BLACK',
      applicantId: '010026',
      status: 'Hired',
      department: 'Sales',
      position: 'Account Executive',
      email: 'sarah.black@example.com',
      phone: '+32 478 90 12 34',
      address: '606 Willow Wd, Mons, Belgium',
    },
    {
      id: '12',
      timestamp: '2025-06-18-09:00:00',
      name: 'DAVID GREY',
      applicantId: '010027',
      status: 'Rejected',
      department: 'Engineering',
      position: 'UI/UX Designer',
      email: 'david.grey@example.com',
      phone: '+32 479 01 23 45',
      address: '707 Ash Aly, Ostend, Belgium',
    },
  ]);

  const [filteredEmployeeList, setFilteredEmployeeList] = useState<EmployeeRecord[]>(allEmployeeList);
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
        const matchesApplicantId = searchForm.applicantId ? employee.applicantId.includes(searchForm.applicantId) : true;
        const matchesStatus = searchForm.status ? employee.status.toLowerCase().includes(searchForm.status.toLowerCase()) : true;
        const matchesDepartment = searchForm.department
          ? (employee.department || '').toLowerCase().includes(searchForm.department.toLowerCase())
          : true;
        const matchesPosition = searchForm.position ? (employee.position || '').toLowerCase().includes(searchForm.position.toLowerCase()) : true;

        return matchesName && matchesApplicantId && matchesStatus && matchesDepartment && matchesPosition;
      });
      setFilteredEmployeeList(tempEmployees);
      setCurrentPage(1);
    };
    filterList();
  }, [searchForm, allEmployeeList]);

  // Effect to update employee details when selected employee changes
  useEffect(() => {
    if (selectedEmployee) {
      setEmployeeDetails({
        validationWitness: 'Implicit',
        workIdentifier: selectedEmployee.applicantId,
        origin: selectedEmployee.id === '1' ? 'LinkedIn' : 'Company Website', // Example origin
        externalUserId: selectedEmployee.id === '1' ? 'linkedin/linda' : '',
        servesAsId: `HR-${selectedEmployee.applicantId}`,
        timestampApplication: selectedEmployee.timestamp,
        reason: '',
        hiringStage: selectedEmployee.status,
        company: 'Fluxeruim BANK',
        expectedSalary: selectedEmployee.id === '1' ? '60000' : selectedEmployee.id === '2' ? '75000' : '',
        notes: selectedEmployee.id === '2' ? 'Strong experience in React and a good cultural fit.' : 'No specific notes yet.',
        dob: selectedEmployee.id === '1' ? '1990-05-15' : selectedEmployee.id === '2' ? '1992-08-20' : '',
        nationality: selectedEmployee.id === '1' ? 'Belgian' : selectedEmployee.id === '2' ? 'Belgian' : '',
        linkedInProfile: selectedEmployee.id === '1' ? 'https://linkedin.com/in/lindablue' : selectedEmployee.id === '2' ? 'https://linkedin.com/in/johndoe' : '',
      });
    }
  }, [selectedEmployee]);

  // Pagination logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployeeList.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(filteredEmployeeList.length / employeesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getStatusBadgeColor = (status: EmployeeRecord['status']) => {
    switch (status) {
      case 'Hired':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Interview Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Offer Extended':
        return 'bg-purple-100 text-purple-800';
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
      applicantId: '',
      status: '',
      department: '',
      position: '',
    });
    setShowMoreCriteria(false);
    addNotification('Search filters cleared.', 'info');
  };

  const handleSaveEmployeeDetails = () => {
    console.log('Saving employee details:', employeeDetails);
    // Update the selected employee's general info in the main list as well
    setAllEmployeeList((prevList) =>
      prevList.map((employee) =>
        employee.id === selectedEmployee.id
          ? {
              ...employee,
              name: selectedEmployee.name,
              department: selectedEmployee.department,
              position: selectedEmployee.position,
              status: employeeDetails.hiringStage, // Reflect status changes from details
            }
          : employee
      )
    );
    addNotification('Employee data saved successfully!', 'success');
    setShowModal(false);
  };

  const handleCancel = () => {
    console.log('Cancelling operation');
    // Revert changes if needed (e.g., fetch original data for selectedEmployee)
    // For this example, we'll just close the modal and notify
    addNotification('Operation cancelled.', 'warning');
    setShowModal(false);
  };

  const handleEmployeeSelect = (employee: EmployeeRecord) => {
    setSelectedEmployee(employee);
    // The useEffect for selectedEmployee will handle updating employeeDetails
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
      case 'hire':
        content = `Are you sure you want to hire ${selectedEmployee.name}? This action will update their status to "Hired".`;
        action = handleHireEmployee;
        break;
      case 'reject':
        content = `Are you sure you want to reject ${selectedEmployee.name}? This action will update their status to "Rejected".`;
        action = handleRejectEmployee;
        break;
      case 'save':
        content = 'Are you sure you want to save the current employee details?';
        action = handleSaveEmployeeDetails;
        break;
      case 'cancel':
        content = 'Are you sure you want to cancel the current changes? Any unsaved modifications will be lost.';
        action = handleCancel;
        break;
      case 'addEmployee':
        content = 'Are you sure you want to add a new employee?';
        action = handleAddNewEmployee;
        break;
      case 'deleteDocument':
        content = 'Are you sure you want to delete this document? This action cannot be undone.';
        action = () => {
          addNotification('Document deleted successfully!', 'success');
          setShowModal(false);
        }; // Placeholder action
        break;
      default:
        content = 'Are you sure you want to proceed with this action?';
        action = null;
    }

    setModalContent(content);
    setModalAction(() => action); // Use a functional update to set the action
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

  const handleHireEmployee = () => {
    setEmployeeDetails((prev) => ({ ...prev, hiringStage: 'Hired' }));
    setAllEmployeeList((prevList) =>
      prevList.map((employee) => (employee.id === selectedEmployee.id ? { ...employee, status: 'Hired' } : employee))
    );
    setSelectedEmployee((prev) => ({ ...prev, status: 'Hired' }));
    addNotification(`Employee ${selectedEmployee.name} has been successfully hired!`, 'success');
    setShowModal(false);
  };

  const handleRejectEmployee = () => {
    setEmployeeDetails((prev) => ({ ...prev, hiringStage: 'Rejected' }));
    setAllEmployeeList((prevList) =>
      prevList.map((employee) => (employee.id === selectedEmployee.id ? { ...employee, status: 'Rejected' } : employee))
    );
    setSelectedEmployee((prev) => ({ ...prev, status: 'Rejected' }));
    addNotification(`Employee ${selectedEmployee.name} has been rejected.`, 'warning');
    setShowModal(false);
  };

  const handleAddNewEmployee = () => {
    const newId = String(allEmployeeList.length + 1);
    const newApplicantId = `0100${newId.padStart(2, '0')}`;
    const newEmployee: EmployeeRecord = {
      id: newId,
      timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
      name: 'New Employee', // Changed from New Applicant
      applicantId: newApplicantId,
      status: 'Pending Review',
      department: '',
      position: '',
      email: '',
      phone: '',
      address: '',
    };
    setAllEmployeeList((prevList) => [newEmployee, ...prevList]); // Add to top of list
    setSelectedEmployee(newEmployee);
    setEmployeeDetails({
      workIdentifier: newEmployee.applicantId,
      timestampApplication: newEmployee.timestamp,
      hiringStage: 'Pending Review',
      notes: 'New employee added, please fill in details.', // Changed from New applicant
    });
    setActiveEmployeeDetailTab('generalInfo');
    addNotification('New employee added! Please fill in the details.', 'info'); // Changed from New applicant
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
              Employee General Information {/* Changed from Applicant */}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label> {/* Changed from Applicant */}
                <input
                  type="text"
                  value={selectedEmployee.applicantId}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100 focus:outline-none"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label> {/* Changed from Applicant */}
                <input
                  type="text"
                  value={selectedEmployee.name}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Status</label>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(selectedEmployee.status)}`}>
                  {selectedEmployee.status}
                </span>
                <p className="text-xs text-gray-500 mt-1">Status can be changed in Hiring Workflow tab.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input
                  type="text"
                  value={selectedEmployee.department || ''}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, department: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position Applied For</label>
                <input
                  type="text"
                  value={selectedEmployee.position || ''}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, position: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Application Timestamp</label>
                <input
                  type="text"
                  value={employeeDetails.timestampApplication}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100 focus:outline-none"
                  readOnly
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={selectedEmployee.address || ''}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, address: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Quick Notes</label>
                <textarea
                  value={employeeDetails.notes}
                  onChange={(e) => setEmployeeDetails({ ...employeeDetails, notes: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-24 resize-y focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Add quick notes about the employee..."
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
                    value={employeeDetails.dob || ''}
                    onChange={(e) => setEmployeeDetails({ ...employeeDetails, dob: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                  <input
                    type="text"
                    value={employeeDetails.nationality || ''}
                    onChange={(e) => setEmployeeDetails({ ...employeeDetails, nationality: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
                  <input
                    type="url"
                    value={employeeDetails.linkedInProfile || ''}
                    onChange={(e) => setEmployeeDetails({ ...employeeDetails, linkedInProfile: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. https://linkedin.com/in/..."
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 'hiringWorkflow':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiBriefcase className="w-5 h-5 mr-3 text-orange-500" />
              Hiring Workflow for <span className="text-orange-600 ml-1">{selectedEmployee.name}</span>
            </h4>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Hiring Stage</label>
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusBadgeColor(employeeDetails.hiringStage)}`}>
                  {employeeDetails.hiringStage}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-4">
                <button
                  onClick={() => openConfirmationModal('hire')}
                  disabled={employeeDetails.hiringStage === 'Hired'}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiCheckCircle className="w-5 h-5" />
                  <span>Hire Employee</span> {/* Changed from Applicant */}
                </button>
                <button
                  onClick={() => openConfirmationModal('reject')}
                  disabled={employeeDetails.hiringStage === 'Rejected'}
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiXCircle className="w-5 h-5" />
                  <span>Reject Employee</span> {/* Changed from Applicant */}
                </button>
                <button
                  onClick={() => addNotification('Interview Scheduled action triggered!', 'info')}
                  disabled={employeeDetails.hiringStage === 'Interview Scheduled' || employeeDetails.hiringStage === 'Hired' || employeeDetails.hiringStage === 'Rejected'}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiCalendar className="w-5 h-5" />
                  <span>Schedule Interview</span>
                </button>
                <button
                  onClick={() => addNotification('Offer Extended action triggered!', 'info')}
                  disabled={employeeDetails.hiringStage === 'Offer Extended' || employeeDetails.hiringStage === 'Hired' || employeeDetails.hiringStage === 'Rejected'}
                  className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiMail className="w-5 h-5" />
                  <span>Extend Offer</span>
                </button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <FiDollarSign className="mr-2 text-gray-600" /> Expected Salary
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <input
                      type="number"
                      placeholder="e.g., 60000"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                      value={employeeDetails.expectedSalary || ''}
                      onChange={(e) => setEmployeeDetails({ ...employeeDetails, expectedSalary: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <select
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                      value="EUR" // Assuming EUR as default for Belgium
                      onChange={(e) => addNotification(`Currency changed to ${e.target.value}`, 'info')}
                    >
                      <option>USD</option>
                      <option>EUR</option>
                      <option>TND</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <FiInfo className="mr-2 text-gray-600" /> Application Source
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
                    <input
                      type="text"
                      value={employeeDetails.origin || ''}
                      onChange={(e) => setEmployeeDetails({ ...employeeDetails, origin: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                      placeholder="e.g., LinkedIn, Referral, Company Website"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">External User ID (Optional)</label>
                    <input
                      type="text"
                      value={employeeDetails.externalUserId || ''}
                      onChange={(e) => setEmployeeDetails({ ...employeeDetails, externalUserId: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                      placeholder="e.g., LinkedIn Profile ID"
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
              Documents for <span className="text-orange-600 ml-1">{selectedEmployee.name}</span> {/* Changed from Applicant */}
            </h4>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-md">
                <FiFileText className="w-6 h-6 mr-3 flex-shrink-0" />
                <span className="flex-1 truncate">Resume_{selectedEmployee.name.replace(/\s/g, '_')}.pdf</span>
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
                <span className="flex-1 truncate">CoverLetter_{selectedEmployee.name.replace(/\s/g, '_')}.pdf</span>
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
              Activity Log for <span className="text-orange-600 ml-1">{selectedEmployee.name}</span> {/* Changed from Applicant */}
            </h4>
            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex items-start">
                <FiClock className="w-4 h-4 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                <div>
                  <p>
                    <span className="font-semibold">2025-07-17 10:30 AM:</span> Status changed to "{selectedEmployee.status}".
                  </p>
                  <p className="text-gray-500 text-xs">By SULIMANI Mansouen</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiMail className="w-4 h-4 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                <div>
                  <p>
                    <span className="font-semibold">2025-07-16 09:00 AM:</span> Interview invitation sent.
                  </p>
                  <p className="text-gray-500 text-xs">By SULIMANI Mansouen</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiFileText className="w-4 h-4 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                <div>
                  <p>
                    <span className="font-semibold">2025-07-15 02:15 PM:</span> Resume and Cover Letter uploaded.
                  </p>
                  <p className="text-gray-500 text-xs">By {selectedEmployee.name}</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiPlusCircle className="w-4 h-4 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                <div>
                  <p>
                    <span className="font-semibold">2025-07-14 01:00 PM:</span> Employee created. {/* Changed from Applicant */}
                  </p>
                  <p className="text-gray-500 text-xs">System generated</p>
                </div>
              </div>
              {/* Add more activity log entries here */}
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
            <p className="text-gray-500 text-sm">Total Employees</p> {/* Changed from Applicants */}
            <p className="text-2xl font-semibold text-gray-900">{allEmployeeList.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <FiCalendar className="text-blue-600" size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Interviews Scheduled</p>
            <p className="text-2xl font-semibold text-gray-900">
              {allEmployeeList.filter((a) => a.status === 'Interview Scheduled').length}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4">
          <div className="p-3 bg-green-100 rounded-full">
            <FiCheckCircle className="text-green-600" size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Hired This Month</p>
            <p className="text-2xl font-semibold text-gray-900">
              {allEmployeeList.filter((a) => a.status === 'Hired' && a.timestamp.startsWith('2025-07')).length}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4">
          <div className="p-3 bg-yellow-100 rounded-full">
            <FiClock className="text-yellow-600" size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Pending Review</p>
            <p className="text-2xl font-semibold text-gray-900">
              {allEmployeeList.filter((a) => a.status === 'Pending Review').length}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <FiMail className="text-purple-600" size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Offers Extended</p>
            <p className="text-2xl font-semibold text-gray-900">
              {allEmployeeList.filter((a) => a.status === 'Offer Extended').length}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4">
          <div className="p-3 bg-red-100 rounded-full">
            <FiXCircle className="text-red-600" size={28} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Rejected Employees</p> {/* Changed from Applicants */}
            <p className="text-2xl font-semibold text-gray-900">
              {allEmployeeList.filter((a) => a.status === 'Rejected').length}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <FiBarChart2 className="inline-block mr-2 text-orange-500" /> Application Trends (Last 6 Months)
        </h3>
        {/* Placeholder for a chart or graph */}
        <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
          Chart/Graph Placeholder
        </div>
      </div>
    </div>
  );

  const renderJobsContent = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        <FiClipboard className="inline-block mr-3 text-orange-500" size={24} /> Job Listings Management
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Active Job Openings (3)</h3>
          <button
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center space-x-2"
            onClick={() => addNotification('Add New Job opening feature triggered!', 'info')}
          >
            <FiPlus />
            <span>Add New Job</span>
          </button>
        </div>
        <ul className="divide-y divide-gray-200">
          <li className="py-4 flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-900">Senior Frontend Developer</p>
              <p className="text-sm text-gray-500">Engineering Department - Full-time</p>
              <p className="text-sm text-gray-500">Posted: 2025-06-01 - Employees: 15</p> {/* Changed from Applicants */}
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 transition-colors"
                title="View/Edit Job"
                onClick={() => addNotification('Viewing Senior Frontend Developer job details', 'info')}
              >
                <FiEdit className="w-5 h-5" />
              </button>
              <button
                className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition-colors"
                title="Close Job"
                onClick={() => addNotification('Closing Senior Frontend Developer job', 'warning')}
              >
                <FiXCircle className="w-5 h-5" />
              </button>
            </div>
          </li>
          <li className="py-4 flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-900">Marketing Specialist</p>
              <p className="text-sm text-gray-500">Marketing Department - Full-time</p>
              <p className="text-sm text-gray-500">Posted: 2025-06-10 - Employees: 8</p> {/* Changed from Applicants */}
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 transition-colors"
                title="View/Edit Job"
                onClick={() => addNotification('Viewing Marketing Specialist job details', 'info')}
              >
                <FiEdit className="w-5 h-5" />
              </button>
              <button
                className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition-colors"
                title="Close Job"
                onClick={() => addNotification('Closing Marketing Specialist job', 'warning')}
              >
                <FiXCircle className="w-5 h-5" />
              </button>
            </div>
          </li>
          <li className="py-4 flex items-center justify-between">
            <div>
              <p className="text-lg font-medium text-gray-900">HR Assistant</p>
              <p className="text-sm text-gray-500">HR Department - Part-time</p>
              <p className="text-sm text-gray-500">Posted: 2025-06-20 - Employees: 5</p> {/* Changed from Applicants */}
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 transition-colors"
                title="View/Edit Job"
                onClick={() => addNotification('Viewing HR Assistant job details', 'info')}
              >
                <FiEdit className="w-5 h-5" />
              </button>
              <button
                className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition-colors"
                title="Close Job"
                onClick={() => addNotification('Closing HR Assistant job', 'warning')}
              >
                <FiXCircle className="w-5 h-5" />
              </button>
            </div>
          </li>
        </ul>
        <div className="mt-6 text-center text-gray-600">
          <p>Manage your open job positions and track employees efficiently.</p> {/* Changed from applications */}
        </div>
      </div>
    </div>
  );

  const renderReportsContent = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        <FiBarChart2 className="inline-block mr-3 text-orange-500" size={24} /> Recruitment Reports
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FiUsers className="mr-2 text-gray-600" /> Employee Status Breakdown {/* Changed from Applicant */}
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              Pending Review: <span className="font-medium text-yellow-800">{allEmployeeList.filter((a) => a.status === 'Pending Review').length}</span>
            </li>
            <li>
              Interview Scheduled: <span className="font-medium text-blue-800">{allEmployeeList.filter((a) => a.status === 'Interview Scheduled').length}</span>
            </li>
            <li>
              Offer Extended: <span className="font-medium text-purple-800">{allEmployeeList.filter((a) => a.status === 'Offer Extended').length}</span>
            </li>
            <li>
              Hired: <span className="font-medium text-green-800">{allEmployeeList.filter((a) => a.status === 'Hired').length}</span>
            </li>
            <li>
              Rejected: <span className="font-medium text-red-800">{allEmployeeList.filter((a) => a.status === 'Rejected').length}</span>
            </li>
          </ul>
          <button
            className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center"
            onClick={() => addNotification('Generating detailed status report...', 'info')}
          >
            <FiDownload className="mr-2" /> Download Report
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FiDollarSign className="mr-2 text-gray-600" /> Hiring Cost Analysis (Monthly)
          </h3>
          <p className="text-gray-700 mb-2">
            Average Cost per Hire: <span className="font-semibold text-green-700">€ 2,500</span>
          </p>
          <p className="text-gray-700 mb-2">
            Total Recruitment Spend (July): <span className="font-semibold text-orange-700">€ 12,000</span>
          </p>
          <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center text-gray-500 mt-4">
            Cost Trend Chart Placeholder
          </div>
          <button
            className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center"
            onClick={() => addNotification('Generating hiring cost report...', 'info')}
          >
            <FiDownload className="mr-2" /> Download Cost Report
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 md:col-span-2">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FiGlobe className="mr-2 text-gray-600" /> Source of Employees {/* Changed from Applications */}
          </h3>
          <ul className="list-disc pl-5 text-gray-700">
            <li>LinkedIn: 45%</li>
            <li>Company Website: 30%</li>
            <li>Referrals: 15%</li>
            <li>Job Boards: 10%</li>
          </ul>
          <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center text-gray-500 mt-4">
            Source Distribution Chart Placeholder
          </div>
          <button
            className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center"
            onClick={() => addNotification('Generating source report...', 'info')}
          >
            <FiDownload className="mr-2" /> Download Source Report
          </button>
        </div>
      </div>
    </div>
  );

  const renderSettingsContent = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        <FiSettings className="inline-block mr-3 text-orange-500" size={24} /> Application Settings
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
            <FiUser className="mr-2 text-gray-600" /> User Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input type="text" value="SULIMANI Mansouen" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value="sulimani.m@hrflow.com" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <input type="text" value="HR Expert" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100" readOnly />
            </div>
          </div>
          <button
            className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center space-x-2"
            onClick={() => addNotification('Profile settings saved!', 'success')}
          >
            <FiSave />
            <span>Save Profile</span>
          </button>
        </div>

        <hr className="my-6 border-gray-200" />

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
            <FiBriefcase className="mr-2 text-gray-600" /> Company Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input type="text" value="Fluxerium Bank" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
              <input type="text" value="Finance" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Address</label>
              <input type="text" value="123 Financial Tower, Brussels, Belgium" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
          </div>
          <button
            className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center space-x-2"
            onClick={() => addNotification('Company information updated!', 'success')}
          >
            <FiSave />
            <span>Save Company Info</span>
          </button>
        </div>

        <hr className="my-6 border-gray-200" />

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
            <FiBell className="mr-2 text-gray-600" /> Notification Preferences
          </h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input type="checkbox" id="emailNotifications" className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded" defaultChecked />
              <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-900">
                Receive email notifications for new employees {/* Changed from applicants */}
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="statusChangeAlerts" className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded" defaultChecked />
              <label htmlFor="statusChangeAlerts" className="ml-2 block text-sm text-gray-900">
                Alerts for status changes (Hired/Rejected)
              </label>
            </div>
          </div>
          <button
            className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center space-x-2"
            onClick={() => addNotification('Notification preferences saved!', 'success')}
          >
            <FiSave />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Top Navigation Bar */}
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
          <button className="flex items-center space-x-2 text-sm font-medium hover:text-orange-200 transition-colors" onClick={() => setActiveMainTab('applicants')}>
            <FiUsers />
            <span>Employees</span> {/* Changed from Applicants */}
          </button>
          <button className="flex items-center space-x-2 text-sm font-medium hover:text-orange-200 transition-colors" onClick={() => setActiveMainTab('jobs')}>
            <FiClipboard />
            <span>Jobs</span>
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

      {/* Main Content Area */}
      {activeMainTab === 'home' && renderHomeContent()}
      {activeMainTab === 'jobs' && renderJobsContent()}
      {activeMainTab === 'reports' && renderReportsContent()}
      {activeMainTab === 'settings' && renderSettingsContent()}

      {activeMainTab === 'applicants' && ( // Keep this tab as 'applicants' for the search/list view
        <div className="flex flex-col lg:flex-row p-6 space-y-6 lg:space-y-0 lg:space-x-6 h-[calc(100vh-80px)]">
          {/* Left Panel: Find Applicants */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 lg:w-1/3 flex flex-col min-h-full max-h-full overflow-hidden">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiSearch className="w-5 h-5 mr-3 text-orange-500" /> Find Employees {/* Changed from Applicants */}
            </h3>
            <div className="space-y-3 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label> {/* Changed from Applicant */}
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter name"
                  value={searchForm.name}
                  onChange={(e) => setSearchForm({ ...searchForm, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label> {/* Changed from Applicant */}
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter ID"
                  value={searchForm.applicantId}
                  onChange={(e) => setSearchForm({ ...searchForm, applicantId: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">All Statuses</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                  value={searchForm.status}
                  onChange={(e) => setSearchForm({ ...searchForm, status: e.target.value })}
                >
                  <option value="">All Statuses</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Offer Extended">Offer Extended</option>
                  <option value="Hired">Hired</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              {showMoreCriteria && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                      placeholder="e.g., Engineering"
                      value={searchForm.department}
                      onChange={(e) => setSearchForm({ ...searchForm, department: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                      placeholder="e.g., Frontend Developer"
                      value={searchForm.position}
                      onChange={(e) => setSearchForm({ ...searchForm, position: e.target.value })}
                    />
                  </div>
                </>
              )}

              <div className="flex items-center justify-between mt-4">
                <button
                  className="text-orange-600 hover:text-orange-800 text-sm flex items-center"
                  onClick={() => setShowMoreCriteria(!showMoreCriteria)}
                >
                  {showMoreCriteria ? <FiMinusCircle className="mr-1" /> : <FiPlusCircle className="mr-1" />}
                  More Criteria
                </button>
                <div className="flex space-x-2">
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center text-sm"
                    onClick={handleClearFilters}
                  >
                    <FiX className="mr-1" /> Clear
                  </button>
                  <button
                    className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center text-sm"
                    onClick={handleSearch}
                  >
                    <FiSearch className="mr-1" /> Search
                  </button>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiUsers className="w-5 h-5 mr-3 text-orange-500" /> All Employees ({filteredEmployeeList.length}) {/* Changed from Applicants */}
              <button
                className="ml-auto px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center text-sm"
                onClick={() => openConfirmationModal('addEmployee')} 
              >
                <FiPlus className="mr-1" /> Add New
              </button>
            </h3>

            <div className="overflow-y-auto flex-1 pr-2 -mr-2">
              <ul className="space-y-3">
                {currentEmployees.length > 0 ? (
                  currentEmployees.map((employee) => (
                    <li
                      key={employee.id}
                      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ease-in-out ${
                        selectedEmployee?.id === employee.id ? 'bg-orange-100 border-orange-500 shadow-md' : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                      } border`}
                      onClick={() => handleEmployeeSelect(employee)}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-semibold text-gray-900 text-base">{employee.name}</p>
                        <span className="text-xs text-gray-500">{employee.timestamp.split(' ')[0]}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">ID: {employee.applicantId}</p>
                      <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(employee.status)}`}>
                          {employee.status}
                        </span>
                        <FiChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </li>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-10">No employees found matching your criteria.</div> 
                )}
              </ul>
            </div>

            {/* Pagination */}
            {filteredEmployeeList.length > employeesPerPage && (
              <div className="mt-6 flex justify-center items-center space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronLeft />
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      currentPage === index + 1 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiChevronRight />
                </button>
              </div>
            )}
          </div>

          {/* Right Panel: Employee Details */}
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 lg:w-2/3 flex flex-col max-h-full overflow-hidden">
            {/* Employee Details Navigation Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                className={`py-3 px-6 text-sm font-medium ${
                  activeEmployeeDetailTab === 'generalInfo' ? 'border-b-3 border-orange-600 text-orange-600' : 'text-gray-500 hover:text-gray-700'
                } focus:outline-none transition-colors duration-200 flex items-center space-x-2`}
                onClick={() => setActiveEmployeeDetailTab('generalInfo')}
              >
                <FiInfo /> <span>General Info</span>
              </button>
              <button
                className={`py-3 px-6 text-sm font-medium ${
                  activeEmployeeDetailTab === 'hiringWorkflow' ? 'border-b-3 border-orange-600 text-orange-600' : 'text-gray-500 hover:text-gray-700'
                } focus:outline-none transition-colors duration-200 flex items-center space-x-2`}
                onClick={() => setActiveEmployeeDetailTab('hiringWorkflow')}
              >
                <FiBriefcase /> <span>Hiring Workflow</span>
              </button>
              <button
                className={`py-3 px-6 text-sm font-medium ${
                  activeEmployeeDetailTab === 'documents' ? 'border-b-3 border-orange-600 text-orange-600' : 'text-gray-500 hover:text-gray-700'
                } focus:outline-none transition-colors duration-200 flex items-center space-x-2`}
                onClick={() => setActiveEmployeeDetailTab('documents')}
              >
                <FiFileText /> <span>Documents</span>
              </button>
              <button
                className={`py-3 px-6 text-sm font-medium ${
                  activeEmployeeDetailTab === 'activityLog' ? 'border-b-3 border-orange-600 text-orange-600' : 'text-gray-500 hover:text-gray-700'
                } focus:outline-none transition-colors duration-200 flex items-center space-x-2`}
                onClick={() => setActiveEmployeeDetailTab('activityLog')}
              >
                <FiActivity /> <span>Activity Log</span>
              </button>
            </div>

            {/* Employee Details Content */}
            <div className="flex-1 p-6 overflow-y-auto">{renderEmployeeDetailsContent()}</div>

            {/* Save/Cancel Buttons at the bottom */}
            {selectedEmployee && (
              <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors flex items-center space-x-2"
                  onClick={() => openConfirmationModal('cancel')}
                >
                  <FiX /> <span>Cancel</span>
                </button>
                <button
                  className="px-5 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center space-x-2"
                  onClick={() => openConfirmationModal('save')}
                >
                  <FiSave /> <span>Save Details</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notifications Bar */}
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

export default HireEmploye;
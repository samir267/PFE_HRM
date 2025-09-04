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
  FiRefreshCcw, // Added for Undo Hiring
} from 'react-icons/fi';

interface Employee {
  id: string;
  employeeId: string;
  name: string;
  status: 'Active' | 'Terminated' | 'Pending Rehire' | 'Hired'; // Unified status
  hiringDate: string; // Original hiring date
  oldHiringDate?: string; // For correction
  newHiringDate?: string; // For correction
  terminationDate?: string;
  terminationReason?: string;
  lastPosition?: string;
  lastDepartment?: string;
  email?: string;
  phone?: string;
  mostRecentHireDate?: string; // For Undo Hiring
  rehireStatus?: 'Eligible for Rehire' | 'Rehired' | 'Not Eligible' | 'Review Pending' | 'RECE XT'; // For Undo Hiring
  rehireReason?: string; // For Undo Hiring
  category?: string; // e.g., "External recruit"
  company?: string; // Added for search criteria
}

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

const CorrectEntry: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchForm, setSearchForm] = useState({
    name: '',
    employeeId: '',
    company: '', // Added company for search
  });
  const [employeeDetails, setEmployeeDetails] = useState<Employee | null>(null);
  const [activeMainTab, setActiveMainTab] = useState('correction'); // Default to correction tab
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);

  const [allEmployeeList, setAllEmployeeList] = useState<Employee[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      name: 'JOHN DOE',
      status: 'Active',
      hiringDate: '2020-01-15',
      lastPosition: 'Software Engineer',
      lastDepartment: 'Engineering',
      email: 'john.doe@example.com',
      phone: '+32 471 23 45 67',
      company: 'Fluxeruim BANK',
    },
    {
      id: '2',
      employeeId: 'EMP002',
      name: 'JANE SMITH',
      status: 'Terminated',
      hiringDate: '2018-03-10',
      terminationDate: '2024-06-20',
      terminationReason: 'Resignation',
      lastPosition: 'Marketing Specialist',
      lastDepartment: 'Marketing',
      email: 'jane.smith@example.com',
      phone: '+32 472 34 56 78',
      mostRecentHireDate: '2018-03-10',
      category: 'Internal Transfer',
      company: 'Fluxeruim BANK',
    },
    {
      id: '3',
      employeeId: 'EMP003',
      name: 'ALICE JOHNSON',
      status: 'Pending Rehire',
      hiringDate: '2019-07-01',
      terminationDate: '2023-11-01',
      terminationReason: 'Performance Issues',
      lastPosition: 'Sales Representative',
      lastDepartment: 'Sales',
      email: 'alice.johnson@example.com',
      phone: '+32 473 45 67 89',
      mostRecentHireDate: '2019-07-01',
      rehireStatus: 'RECE XT',
      rehireReason: 'HCAMPA',
      category: 'External recruit',
      company: 'Fluxeruim BANK',
    },
    {
      id: '4',
      employeeId: 'EMP004',
      name: 'ROBERT BROWN',
      status: 'Active',
      hiringDate: '2021-09-01',
      lastPosition: 'Financial Analyst',
      lastDepartment: 'Finance',
      email: 'robert.brown@example.com',
      phone: '+32 474 56 78 90',
      company: 'Fluxeruim BANK',
    },
    {
      id: '5',
      employeeId: 'EMP005',
      name: 'EMILY DAVIS',
      status: 'Hired', // Example of a newly hired employee for undo scenario
      hiringDate: '2025-07-20',
      lastPosition: 'HR Generalist',
      lastDepartment: 'HR',
      email: 'emily.davis@example.com',
      phone: '+32 475 67 89 01',
      mostRecentHireDate: '2025-07-20',
      rehireStatus: 'Rehired', // Simulating a fresh hire status for undo
      company: 'Fluxeruim BANK',
    },
  ]);

  const [filteredEmployeeList, setFilteredEmployeeList] = useState<Employee[]>(allEmployeeList);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalAction, setModalAction] = useState<(() => void) | null>(null);

  useEffect(() => {
    const filterList = () => {
      let tempEmployees = allEmployeeList.filter((employee) => {
        const matchesName = searchForm.name ? employee.name.toLowerCase().includes(searchForm.name.toLowerCase()) : true;
        const matchesEmployeeId = searchForm.employeeId ? employee.employeeId.toLowerCase().includes(searchForm.employeeId.toLowerCase()) : true;
        const matchesCompany = searchForm.company ? (employee.company || '').toLowerCase().includes(searchForm.company.toLowerCase()) : true;
        return matchesName && matchesEmployeeId && matchesCompany;
      });
      setFilteredEmployeeList(tempEmployees);
      setCurrentPage(1);
    };
    filterList();
  }, [searchForm, allEmployeeList]);

  useEffect(() => {
    if (selectedEmployee) {
      setEmployeeDetails({ ...selectedEmployee });
    } else {
      setEmployeeDetails(null);
    }
  }, [selectedEmployee]);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployeeList.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(filteredEmployeeList.length / employeesPerPage);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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

  const openConfirmationModal = (actionType: string, employeeName: string, action: () => void) => {
    let content = '';
    switch (actionType) {
      case 'correctHiringDate':
        content = `Are you sure you want to change the hiring date for ${employeeName}?`;
        break;
      case 'terminateEmployee':
        content = `Are you sure you want to terminate ${employeeName}? This action will update their status to "Terminated".`;
        break;
      case 'undoHiring':
        content = `Are you sure you want to undo the hiring of ${employeeName}? This will revert their status.`;
        break;
      default:
        content = 'Are you sure you want to proceed with this action?';
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

  const handleSearch = () => {
    addNotification('Search initiated!', 'info');
  };

  const handleClearFilters = () => {
    setSearchForm({ name: '', employeeId: '', company: '' });
    addNotification('Search filters cleared.', 'info');
  };

  const handleEmployeeSelect = (employee: Employee) => {
    setSelectedEmployee({ ...employee, oldHiringDate: employee.hiringDate, newHiringDate: employee.hiringDate });
    addNotification(`Selected employee: ${employee.name}`, 'info');
  };

  // --- Correction des entrées (Change Hiring Date) ---
  const handleHiringDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (employeeDetails) {
      setEmployeeDetails({ ...employeeDetails, newHiringDate: e.target.value });
    }
  };

  const saveNewHiringDate = () => {
    if (employeeDetails && employeeDetails.newHiringDate) {
      setAllEmployeeList((prevList) =>
        prevList.map((emp) =>
          emp.id === employeeDetails.id ? { ...emp, hiringDate: employeeDetails.newHiringDate!, oldHiringDate: emp.hiringDate } : emp
        )
      );
      setSelectedEmployee((prev) =>
        prev ? { ...prev, hiringDate: employeeDetails.newHiringDate!, oldHiringDate: prev.hiringDate } : null
      );
      addNotification(`Hiring date for ${employeeDetails.name} updated successfully!`, 'success');
      setShowModal(false);
    }
  };

  // --- Suppression d'un enregistrement d'employé (Terminate Employee) ---
  const handleTerminateEmployee = () => {
    if (selectedEmployee) {
      setAllEmployeeList((prevList) =>
        prevList.map((emp) =>
          emp.id === selectedEmployee.id
            ? { ...emp, status: 'Terminated', terminationDate: new Date().toISOString().slice(0, 10), terminationReason: 'User initiated termination' }
            : emp
        )
      );
      setSelectedEmployee((prev) =>
        prev ? { ...prev, status: 'Terminated', terminationDate: new Date().toISOString().slice(0, 10), terminationReason: 'User initiated termination' } : null
      );
      addNotification(`Employee ${selectedEmployee.name} has been terminated.`, 'warning');
      setShowModal(false);
    }
  };

  // --- Annulation de la embauche (Undo Hiring) ---
  const handleUndoHiring = () => {
    if (selectedEmployee) {
      setAllEmployeeList((prevList) =>
        prevList.map((emp) =>
          emp.id === selectedEmployee.id
            ? { ...emp, status: 'Pending Rehire', rehireStatus: 'RECE XT', rehireReason: 'Undo action' } // Revert to a pending state or previous state
            : emp
        )
      );
      setSelectedEmployee((prev) =>
        prev ? { ...prev, status: 'Pending Rehire', rehireStatus: 'RECE XT', rehireReason: 'Undo action' } : null
      );
      addNotification(`Hiring of ${selectedEmployee.name} has been undone.`, 'info');
      setShowModal(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="bg-white shadow-sm p-6 rounded-lg mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Employee Entry Management</h1>
        <div className="relative">
          <FiBell className="w-6 h-6 text-gray-600 cursor-pointer" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {notifications.length}
            </span>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel: Search and Employee List */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5 flex items-center">
            <FiSearch className="w-6 h-6 mr-3 text-orange-500" /> Search Employees
          </h2>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="Employee Name"
                value={searchForm.name}
                onChange={(e) => setSearchForm({ ...searchForm, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="Employee ID"
                value={searchForm.employeeId}
                onChange={(e) => setSearchForm({ ...searchForm, employeeId: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="Company Name"
                value={searchForm.company}
                onChange={(e) => setSearchForm({ ...searchForm, company: e.target.value })}
              />
            </div>
            <div className="flex space-x-3">
              <button
                className="flex-1 bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors flex items-center justify-center"
                onClick={handleSearch}
              >
                <FiSearch className="mr-2" /> Search
              </button>
              <button
                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors flex items-center justify-center"
                onClick={handleClearFilters}
              >
                <FiXCircle className="mr-2" /> Clear
              </button>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FiUsers className="w-5 h-5 mr-2 text-orange-500" /> Employee List
          </h3>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 min-h-[300px] max-h-[500px] overflow-y-auto">
            {filteredEmployeeList.length === 0 ? (
              <p className="text-gray-500 text-center py-10">No employees found matching your criteria.</p>
            ) : (
              <ul className="space-y-2">
                {currentEmployees.map((employee) => (
                  <li
                    key={employee.id}
                    className={`p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-orange-50 transition-colors ${selectedEmployee?.id === employee.id ? 'bg-orange-100 border-orange-500' : 'bg-white'}`}
                    onClick={() => handleEmployeeSelect(employee)}
                  >
                    <p className="font-semibold text-gray-900">{employee.name}</p>
                    <p className="text-sm text-gray-600">ID: {employee.employeeId}</p>
                    <p className="text-sm text-gray-600">Status: {employee.status}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Pagination */}
          {filteredEmployeeList.length > employeesPerPage && (
            <div className="flex justify-center items-center space-x-2 mt-4">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              >
                <FiChevronLeft />
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              >
                <FiChevronRight />
              </button>
            </div>
          )}
        </div>

        {/* Right Panel: Employee Details and Actions */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <div className="flex border-b border-gray-200 mb-5">
            <button
              className={`py-3 px-6 text-lg font-medium ${activeMainTab === 'correction' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveMainTab('correction')}
            >
              <FiEdit className="inline-block mr-2" /> Correction
            </button>
            <button
              className={`py-3 px-6 text-lg font-medium ${activeMainTab === 'termination' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveMainTab('termination')}
            >
              <FiTrash2 className="inline-block mr-2" /> Termination
            </button>
            <button
              className={`py-3 px-6 text-lg font-medium ${activeMainTab === 'undoHiring' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveMainTab('undoHiring')}
            >
              <FiRefreshCcw className="inline-block mr-2" /> Undo Hiring
            </button>
          </div>

          {!selectedEmployee ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 py-20">
              <FiInfo className="w-12 h-12 mb-4" />
              <p className="text-lg">Select an employee from the list to manage their entries.</p>
            </div>
          ) : (
            <div>
              {activeMainTab === 'correction' && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FiCalendar className="w-5 h-5 mr-3 text-orange-500" /> Correct Hiring Date
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
                      <input
                        type="text"
                        value={employeeDetails?.name || ''}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                      <input
                        type="text"
                        value={employeeDetails?.employeeId || ''}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Old Hiring Date</label>
                      <input
                        type="text"
                        value={employeeDetails?.oldHiringDate || employeeDetails?.hiringDate || ''}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
                        readOnly
                      />
                    </div>
                    <div>
                      <label htmlFor="newHiringDate" className="block text-sm font-medium text-gray-700 mb-1">New Hiring Date</label>
                      <input
                        type="date"
                        id="newHiringDate"
                        value={employeeDetails?.newHiringDate || ''}
                        onChange={handleHiringDateChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      className="px-5 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center"
                      onClick={() => openConfirmationModal('correctHiringDate', selectedEmployee.name, saveNewHiringDate)}
                      disabled={!employeeDetails?.newHiringDate || employeeDetails.newHiringDate === employeeDetails.oldHiringDate}
                    >
                      <FiSave className="mr-2" /> Save New Date
                    </button>
                  </div>
                </div>
              )}

              {activeMainTab === 'termination' && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FiTrash2 className="w-5 h-5 mr-3 text-orange-500" /> Terminate Employee Record
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
                      <input type="text" value={employeeDetails?.name || ''} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100" readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                      <input type="text" value={employeeDetails?.employeeId || ''} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100" readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Status</label>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${employeeDetails?.status === 'Terminated' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {employeeDetails?.status}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Original Hiring Date</label>
                      <input type="text" value={employeeDetails?.hiringDate || ''} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100" readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Termination Date</label>
                      <input type="text" value={employeeDetails?.terminationDate || 'N/A'} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100" readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Termination Reason</label>
                      <input type="text" value={employeeDetails?.terminationReason || 'N/A'} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100" readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <input type="text" value={employeeDetails?.category || 'N/A'} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100" readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <input type="text" value={employeeDetails?.lastDepartment || 'N/A'} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100" readOnly />
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center"
                      onClick={() => openConfirmationModal('terminateEmployee', selectedEmployee.name, handleTerminateEmployee)}
                      disabled={selectedEmployee.status === 'Terminated'}
                    >
                      <FiTrash2 className="mr-2" /> Terminate Employee
                    </button>
                  </div>
                </div>
              )}

              {activeMainTab === 'undoHiring' && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FiRefreshCcw className="w-5 h-5 mr-3 text-orange-500" /> Undo Hiring
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
                      <input type="text" value={employeeDetails?.name || ''} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100" readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                      <input type="text" value={employeeDetails?.employeeId || ''} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100" readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Most Recent Hire Date</label>
                      <input type="text" value={employeeDetails?.mostRecentHireDate || employeeDetails?.hiringDate || 'N/A'} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100" readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rehire Status</label>
                      <input type="text" value={employeeDetails?.rehireStatus || 'N/A'} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100" readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rehire Reason</label>
                      <input type="text" value={employeeDetails?.rehireReason || 'N/A'} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100" readOnly />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <input type="text" value={employeeDetails?.category || 'N/A'} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100" readOnly />
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                      onClick={() => openConfirmationModal('undoHiring', selectedEmployee.name, handleUndoHiring)}
                      disabled={selectedEmployee.status !== 'Hired' && selectedEmployee.status !== 'Rehired'} // Only allow undo for 'Hired' or 'Rehired' employees
                    >
                      <FiRefreshCcw className="mr-2" /> Undo Hiring
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Notifications */}
      <div className="fixed bottom-6 right-6 z-50">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 mb-3 rounded-lg shadow-md flex items-center justify-between transition-opacity duration-300 ${
              notification.type === 'success'
                ? 'bg-green-500 text-white'
                : notification.type === 'error'
                ? 'bg-red-500 text-white'
                : notification.type === 'info'
                ? 'bg-blue-500 text-white'
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

export default CorrectEntry;
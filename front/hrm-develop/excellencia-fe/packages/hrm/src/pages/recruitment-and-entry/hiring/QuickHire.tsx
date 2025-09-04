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
  FiInfo, // For the right info bar
  FiBell, // For notifications
  FiAlertCircle, // For error notifications
  FiCheckCircle as FiSuccessCircle, // For success notifications
  FiX,
  FiCreditCard,
  FiDollarSign,
  FiMinusCircle
} from 'react-icons/fi';

const QuickHire = () => {
  const [selectedApplicant, setSelectedApplicant] = useState({
    name: 'NOELLE CAROLE BONDJA',
    applicantId: '010018',
    status: 'Pending Review',
    department: 'HR',
    position: 'Software Engineer'
  });

  const [searchForm, setSearchForm] = useState({
    name: '',
    applicantId: '',
    status: '',
    department: '',
    position: ''
  });

  const [applicantDetails, setApplicantDetails] = useState({
    validationWitness: 'Implicit',
    workIdentifier: '88550',
    origin: '',
    externalUserId: '',
    servesAsId: '',
    timestampApplication: '2025-06-28-10.00.00',
    reason: '',
    hiringStage: 'Application Received',
    company: 'Fluxeruim BANK',
    expectedSalary: '',
    notes: ''
  });

  const [activeMainTab, setActiveMainTab] = useState('applicantDetails'); // Controls top tabs
  const [activeSideTab, setActiveSideTab] = useState('allApplicants'); // Controls left sidebar tabs
  const [activeApplicantDetailTab, setActiveApplicantDetailTab] = useState('generalInfo'); // Controls applicant detail tabs

  const [currentPage, setCurrentPage] = useState(1);
  const [applicantsPerPage] = useState(10); // Number of applicants per page

  // Sample data for enhanced filter and dynamic list
  const [allApplicantList, setAllApplicantList] = useState([
    { id: '1', timestamp: '2025-06-27-12.00.00', name: 'NOELLE CAROLE BONDJA', applicantId: '010018', status: 'Pending Review' },
    { id: '2', timestamp: '2025-06-26-14.30.00', name: 'JOHN DOE', applicantId: '010019', status: 'Interview Scheduled' },
    { id: '3', timestamp: '2025-06-25-09.15.00', name: 'JANE SMITH', applicantId: '010020', status: 'Offer Extended' },
    { id: '4', timestamp: '2025-06-24-11.00.00', name: 'PETER JONES', applicantId: '010021', status: 'Hired' },
    { id: '5', timestamp: '2025-06-23-16.45.00', name: 'ALICE BROWN', applicantId: '010022', status: 'Rejected' },
    { id: '6', timestamp: '2025-06-22-08.00.00', name: 'ROBERT WHITE', applicantId: '010023', status: 'Pending Review' },
    { id: '7', timestamp: '2025-06-21-10.30.00', name: 'EMILY DAVIS', applicantId: '010024', status: 'Interview Scheduled' },
    { id: '8', timestamp: '2025-06-20-13.00.00', name: 'MICHAEL GREEN', applicantId: '010025', status: 'Offer Extended' },
    { id: '9', timestamp: '2025-06-19-15.00.00', name: 'SARAH BLACK', applicantId: '010026', status: 'Hired' },
    { id: '10', timestamp: '2025-06-18-09.00.00', name: 'DAVID GREY', applicantId: '010027', status: 'Rejected' },
    { id: '11', timestamp: '2025-06-17-11.30.00', name: 'LINDA BLUE', applicantId: '010028', status: 'Pending Review' },
    { id: '12', timestamp: '2025-06-16-14.00.00', name: 'JAMES RED', applicantId: '010029', status: 'Interview Scheduled' },
    { id: '13', timestamp: '2025-06-15-16.00.00', name: 'ANNA PINK', applicantId: '010030', status: 'Offer Extended' },
    { id: '14', timestamp: '2025-06-14-08.30.00', name: 'CHRIS YELLOW', applicantId: '010031', status: 'Hired' },
  ]);
  const [filteredApplicantList, setFilteredApplicantList] = useState(allApplicantList);
  const [showMoreCriteria, setShowMoreCriteria] = useState(false);
  const [showInfoBar, setShowInfoBar] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  // Effect to update filtered list when searchForm changes
  useEffect(() => {
    const filterList = () => {
      let tempApplicants = allApplicantList.filter(applicant => {
        const matchesName = searchForm.name ? applicant.name.toLowerCase().includes(searchForm.name.toLowerCase()) : true;
        const matchesApplicantId = searchForm.applicantId ? applicant.applicantId.includes(searchForm.applicantId) : true;
        const matchesStatus = searchForm.status ? applicant.status.toLowerCase().includes(searchForm.status.toLowerCase()) : true;
        const matchesDepartment = searchForm.department ? applicant.department.toLowerCase().includes(searchForm.department.toLowerCase()) : true;
        const matchesPosition = searchForm.position ? applicant.position.toLowerCase().includes(searchForm.position.toLowerCase()) : true;

        return matchesName && matchesApplicantId && matchesStatus && matchesDepartment && matchesPosition;
      });
      setFilteredApplicantList(tempApplicants);
      setCurrentPage(1); // Reset to first page on new filter
    };
    filterList();
  }, [searchForm, allApplicantList]);

  // Pagination logic
  const indexOfLastApplicant = currentPage * applicantsPerPage;
  const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;
  const currentApplicants = filteredApplicantList.slice(indexOfFirstApplicant, indexOfLastApplicant);
  const totalPages = Math.ceil(filteredApplicantList.length / applicantsPerPage);

  const paginate = (pageNumber: React.SetStateAction<number>) => setCurrentPage(pageNumber);

  const handleSearch = () => {
    addNotification('Search initiated!', 'info');
  };

  const handleSaveApplicantDetails = () => {
    console.log('Saving applicant details:', applicantDetails);
    addNotification('Applicant data saved successfully!', 'success');
    setShowModal(false);
  };

  const handleCancel = () => {
    console.log('Cancelling operation');
    addNotification('Operation cancelled.', 'warning');
    setShowModal(false);
  };

  const handleApplicantSelect = (applicant: { id?: string; timestamp: any; name: any; applicantId: any; status: any; department?: any; position?: any; }) => {
    setSelectedApplicant({
      name: applicant.name,
      applicantId: applicant.applicantId,
      status: applicant.status,
      department: applicant.department,
      position: applicant.position
    });
    setApplicantDetails(prevData => ({
      ...prevData,
      workIdentifier: applicant.applicantId,
      hiringStage: applicant.status,
      timestampApplication: applicant.timestamp
    }));
    addNotification(`Selected applicant: ${applicant.name}`, 'info');
  };

  const addNotification = (message: string, type = 'info') => {
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
    setModalContent(`Are you sure you want to ${actionType} this applicant?`);
    setShowModal(true);
  };

  const handleHireApplicant = () => {
    setApplicantDetails(prev => ({ ...prev, hiringStage: 'Hired' }));
    addNotification('Applicant has been successfully hired!', 'success');
    openConfirmationModal('hire'); // Open modal for confirmation
  };

  const handleRejectApplicant = () => {
    setApplicantDetails(prev => ({ ...prev, hiringStage: 'Rejected' }));
    addNotification('Applicant has been rejected.', 'warning');
    openConfirmationModal('reject'); // Open modal for confirmation
  };

  const renderApplicantDetailsContent = () => {
    switch (activeApplicantDetailTab) {
      case 'generalInfo':
        return (
          <>
            <div className="bg-blue-50 p-4 rounded border">
              <h4 className="font-medium text-blue-800 mb-3 flex items-center">
                <FiUser className="w-4 h-4 mr-2" />
                Applicant General Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Applicant ID</label>
                  <input
                    type="text"
                    value={selectedApplicant.applicantId}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Applicant Name</label>
                  <input
                    type="text"
                    value={selectedApplicant.name}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Current Status</label>
                  <input
                    type="text"
                    value={selectedApplicant.status}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Department</label>
                  <input
                    type="text"
                    value={selectedApplicant.department}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    onChange={(e) => setSelectedApplicant({...selectedApplicant, department: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Position Applied For</label>
                  <input
                    type="text"
                    value={selectedApplicant.position}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    onChange={(e) => setSelectedApplicant({...selectedApplicant, position: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Application Timestamp</label>
                  <input
                    type="text"
                    value={applicantDetails.timestampApplication}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50"
                    readOnly
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Quick Notes</label>
                  <textarea
                    value={applicantDetails.notes}
                    onChange={(e) => setApplicantDetails({...applicantDetails, notes: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm h-20"
                    placeholder="Add quick notes about the applicant..."
                  />
                </div>
              </div>
            </div>
          </>
        );
      case 'hiringWorkflow':
        return (
          <div className="bg-white p-4 rounded shadow-sm">
            <h3 className="text-lg font-medium mb-4">Hiring Workflow</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Current Hiring Stage</label>
                <input
                  type="text"
                  value={applicantDetails.hiringStage}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50"
                  readOnly
                />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => openConfirmationModal('hire')}
                  className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center space-x-2"
                >
                  <FiCheckCircle className="w-4 h-4" />
                  <span>Hire Applicant</span>
                </button>
                <button
                  onClick={() => openConfirmationModal('reject')}
                  className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center space-x-2"
                >
                  <FiXCircle className="w-4 h-4" />
                  <span>Reject Applicant</span>
                </button>
              </div>
              <div className="bg-blue-50 p-4 rounded border border-blue-200">
                <h4 className="font-semibold text-blue-700 mb-2 flex items-center"><FiDollarSign className="mr-2" /> Expected Salary</h4>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Amount</label>
                  <input
                    type="number"
                    placeholder="e.g., 60000"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    value={applicantDetails.expectedSalary}
                    onChange={(e) => setApplicantDetails({...applicantDetails, expectedSalary: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Currency</label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                    <option>USD</option>
                    <option>EUR</option>
                    <option>TND</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      case 'documents':
        return (
          <div className="bg-white p-4 rounded shadow-sm">
            <h3 className="text-lg font-medium mb-4">Applicant Documents</h3>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
                <FiFileText className="w-5 h-5 mr-3" />
                <span>Resume_NOELLE_BONDJA.pdf</span>
                <button className="ml-auto text-blue-600 hover:text-blue-800"><FiDownload /></button>
              </div>
              <div className="flex items-center p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded">
                <FiFileText className="w-5 h-5 mr-3" />
                <span>CoverLetter_NOELLE_BONDJA.pdf</span>
                <button className="ml-auto text-blue-600 hover:text-blue-800"><FiDownload /></button>
              </div>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 flex items-center space-x-2">
                <FiUpload className="w-4 h-4" />
                <span>Upload New Document</span>
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderMainTabContent = () => {
    switch (activeMainTab) {
      case 'applicantDetails':
        return (
          <div className="flex h-full">
            {/* Left Sidebar */}
            <div className="w-64 bg-gray-50 border-r">
              <div className="p-2 border-b bg-orange-100">
                <select className="w-full border border-gray-300 rounded px-2 py-1 text-sm">
                  <option>All Applicants</option>
                  <option>Pending Review</option>
                  <option>Interview Scheduled</option>
                  <option>Offer Extended</option>
                  <option>Hired</option>
                  <option>Rejected</option>
                </select>
              </div>
              <div className="flex border-b">
                <button
                  onClick={() => setActiveSideTab('allApplicants')}
                  className={`flex-1 px-3 py-2 text-sm ${
                    activeSideTab === 'allApplicants'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Applicants
                </button>
              </div>

              {/* Applicant List */}
              <div className="p-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600">{filteredApplicantList.length} Applicants</span>
                  <select
                    className="text-xs border rounded px-1"
                    onChange={(e) => {
                      setApplicantsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    value={applicantsPerPage}
                  >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                </div>
                <div className="space-y-1 max-h-96 overflow-y-auto">
                  {currentApplicants.map((applicant) => (
                    <div
                      key={applicant.id}
                      onClick={() => handleApplicantSelect(applicant)}
                      className={`text-xs p-2 cursor-pointer rounded ${
                        selectedApplicant.applicantId === applicant.applicantId ? 'bg-orange-500 text-white' : 'hover:bg-gray-200'
                      }`}
                    >
                      {applicant.timestamp} - {applicant.name} ({applicant.status})
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center space-x-2 mt-4 text-xs">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-1 hover:bg-gray-200 rounded disabled:opacity-50"
                  >
                    <FiChevronLeft className="w-3 h-3" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => paginate(page)}
                      className={`px-2 py-1 rounded ${
                        page === currentPage ? 'bg-orange-500 text-white' : 'hover:bg-gray-200'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-1 hover:bg-gray-200 rounded disabled:opacity-50"
                  >
                    <FiChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-4">
              {/* Content Tabs */}
              <div className="border-b mb-4">
                <div className="flex space-x-6">
                  <button
                    onClick={() => setActiveApplicantDetailTab('generalInfo')}
                    className={`px-4 py-2 border-b-2 ${
                      activeApplicantDetailTab === 'generalInfo'
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-600 hover:text-orange-600'
                    } text-sm font-medium`}
                  >
                    General Info
                  </button>
                  <button
                    onClick={() => setActiveApplicantDetailTab('hiringWorkflow')}
                    className={`px-4 py-2 border-b-2 ${
                      activeApplicantDetailTab === 'hiringWorkflow'
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-600 hover:text-orange-600'
                    } text-sm`}
                  >
                    Hiring Workflow
                  </button>
                  <button
                    onClick={() => setActiveApplicantDetailTab('documents')}
                    className={`px-4 py-2 border-b-2 ${
                      activeApplicantDetailTab === 'documents'
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-600 hover:text-orange-600'
                    } text-sm`}
                  >
                    Documents
                  </button>
                </div>
              </div>

              {/* Applicant Form Content based on activeApplicantDetailTab */}
              <div className="space-y-6">
                {renderApplicantDetailsContent()}
                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-4 border-t">
                  <button
                    onClick={() => openConfirmationModal('cancel')}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <FiXCircle className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={() => openConfirmationModal('save')}
                    className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 flex items-center space-x-2"
                  >
                    <FiSave className="w-4 h-4" />
                    <span>Save Details</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="bg-white p-6 shadow-sm min-h-[400px]">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Hiring Reports & Analytics</h3>
            <p className="text-gray-600 mb-6">
              Generate reports on hiring metrics, applicant sources, and time-to-hire.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded border border-blue-200">
                <h4 className="font-semibold text-blue-700 mb-2 flex items-center"><FiDownload className="mr-2" /> Hiring Summary Report</h4>
                <p className="text-sm text-gray-600 mb-3">Download a summary of all hiring activities for a selected period.</p>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Select Period</label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                    <option>Q2 2025</option>
                    <option>Q1 2025</option>
                    <option>2024 Annual</option>
                  </select>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 flex items-center">
                  <FiDownload className="mr-2" /> Generate & Download
                </button>
              </div>
              <div className="bg-green-50 p-4 rounded border border-green-200">
                <h4 className="font-semibold text-green-700 mb-2 flex items-center"><FiPrinter className="mr-2" /> Applicant Source Analysis</h4>
                <p className="text-sm text-gray-600 mb-3">Analyze which sources are most effective for applicant acquisition.</p>
                <button className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 flex items-center">
                  <FiPlus className="mr-2" /> View Analytics Dashboard
                </button>
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-3">
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 flex items-center space-x-2">
                <FiPrinter className="w-4 h-4" />
                <span>Print All Reports</span>
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`flex items-center p-3 rounded-lg shadow-md text-white ${
              notif.type === 'success'
                ? 'bg-green-500'
                : notif.type === 'error'
                ? 'bg-red-500'
                : notif.type === 'warning'
                ? 'bg-yellow-500'
                : 'bg-blue-500'
            }`}
          >
            {notif.type === 'success' && <FiSuccessCircle className="w-5 h-5 mr-2" />}
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
            <button className="bg-orange-700 px-3 py-1 rounded text-sm hover:bg-orange-800 transition-colors">Employee</button>
            <button className="bg-orange-500 px-3 py-1 rounded text-sm hover:bg-orange-600 transition-colors">HR Expert</button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <select className="bg-white text-black px-3 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-orange-300">
            <option>Fluxeruim - Bank</option>
          </select>
          <button onClick={() => setShowInfoBar(!showInfoBar)} className="text-white hover:text-orange-200 p-1 rounded-full hover:bg-orange-700 transition-colors">
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
        <span>Hiring</span>
        <FiChevronRight className="w-4 h-4" />
        <span className="text-orange-300">QuickHire</span>
      </div>

      {/* Main Content Area with Right Info Bar */}
      <div className="flex flex-1  ">
        <div className="p-4 flex-1 ">
          {/* Main Tabs */}
      
              <button
                onClick={() => setActiveMainTab('applicantDetails')}
                className={`px-4 py-2 border-b-2 ${
                  activeMainTab === 'applicantDetails'
                    ? 'border-orange-500 text-orange-600 font-medium'
                    : 'border-transparent text-gray-600 hover:text-orange-600'
                } transition-colors`}
              >
                Applicant Details
              </button>
              <button
                onClick={() => setActiveMainTab('reports')}
                className={`px-4 py-2 border-b-2 ${
                  activeMainTab === 'reports'
                    ? 'border-orange-500 text-orange-600 font-medium'
                    : 'border-transparent text-gray-600 hover:text-orange-600'
                } transition-colors`}
              >
                Reports
              </button>
      

          <div className="bg-white p-6 shadow-sm rounded-b-lg">
            {/* Search Section - Always visible */}
            <div className="mb-6 border-b pb-4 ">
              <h3 className="text-lg font-medium mb-4 flex items-center"><FiFilter className="mr-2" /> 1. Powerful Search Filter</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={searchForm.name}
                    onChange={(e) => setSearchForm({...searchForm, name: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Applicant ID</label>
                  <input
                    type="text"
                    value={searchForm.applicantId}
                    onChange={(e) => setSearchForm({...searchForm, applicantId: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                    placeholder="Enter applicant ID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={searchForm.status}
                    onChange={(e) => setSearchForm({...searchForm, status: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                  >
                    <option value="">All</option>
                    <option>Pending Review</option>
                    <option>Interview Scheduled</option>
                    <option>Offer Extended</option>
                    <option>Hired</option>
                    <option>Rejected</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleSearch}
                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 flex items-center space-x-2"
                  >
                    <FiSearch className="w-4 h-4" />
                    <span>Search</span>
                  </button>
                </div>
              </div>

              {showMoreCriteria && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Department</label>
                    <input
                      type="text"
                      value={searchForm.department}
                      onChange={(e) => setSearchForm({...searchForm, department: e.target.value})}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                      placeholder="Enter department"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Position</label>
                    <input
                      type="text"
                      value={searchForm.position}
                      onChange={(e) => setSearchForm({...searchForm, position: e.target.value})}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                      placeholder="Enter position"
                    />
                  </div>
                </div>
              )}
              <button
                onClick={() => setShowMoreCriteria(!showMoreCriteria)}
                className="text-orange-600 text-sm mt-2 hover:underline"
              >
                {showMoreCriteria ? 'Show Less Criteria' : 'Show More Criteria'}
              </button>
            </div>

            {/* Render Main Tab Content */}
            {renderMainTabContent()}
          </div>
        </div>

        {/* Right Info Bar */}
        {showInfoBar && (
          <div className="w-80 bg-white p-4 shadow-lg border-l z-40">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Information</h3>
              <button onClick={() => setShowInfoBar(false)} className="text-gray-500 hover:text-gray-700">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700">Selected Applicant</h4>
                <p className="text-sm text-gray-600">Name: {selectedApplicant.name}</p>
                <p className="text-sm text-gray-600">ID: {selectedApplicant.applicantId}</p>
                <p className="text-sm text-gray-600">Status: {selectedApplicant.status}</p>
              </div>
              <hr />
              <div>
                <h4 className="font-semibold text-gray-700">Contact HR</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center space-x-2">
                    <FiMail /> <span>hr@fluxerium.com</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FiPhone /> <span>+1 234 567 890</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FiClock /> <span>Mon-Fri, 9 AM - 5 PM</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal for confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Confirmation</h3>
            <p className="text-gray-700 mb-6">{modalContent}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  addNotification('Action aborted by user.', 'info');
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={
                  modalContent.includes('hire') ? handleHireApplicant :
                  modalContent.includes('reject') ? handleRejectApplicant :
                  handleSaveApplicantDetails
                }
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
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

export default QuickHire;

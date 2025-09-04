import React, { useState, useEffect } from 'react';
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
  FiSearch,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiMail,
  FiPhone,
  FiClock,
  FiChevronLeft,
  FiChevronRight,
  FiMoreHorizontal,
  FiClipboard,
  FiUserCheck,
  FiUserMinus,
  FiSend,
  FiChevronDown,
  FiUserPlus,
  FiBell, // For notification bar toggle
} from 'react-icons/fi';
import { ApiResponse } from '../../../services/api';
import staffingRequestService from '../../../services/staffingRequest.service';

// Interface for a Staffing Request (from DescribeRequests.tsx)
interface StaffingRequest {
  id: string;
  requestTitle: string;
  department: string;
  position: string;
  numberOfVacancies: number;
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Temporary';
  expectedStartDate: string;
  requiredSkills: [];
  experienceLevel: string;
  justification: string;
  hiringManager: string;
  status: 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected' | 'Open' | 'Closed';
  activityLog?: { timestamp: string; status: StaffingRequest['status']; notes?: string; }[]; // Added for timeline
}

// Interface for a Candidate (new, inspired by Contract structure)
interface Candidate {
  id: string;
  requestId: string; // Link to StaffingRequest
  name: string;
  email: string;
  phone?: string;
  status: 'Applied' | 'Screening' | 'Interviewing' | 'Offer Extended' | 'Offer Accepted' | 'Offer Rejected' | 'Hired' | 'Rejected';
  lastActivityDate: string;
  notes?: string;
  resumeUrl?: string;
}

// Interface for Notifications (from both files)
interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}



const RecruitmentProcess: React.FC = () => {
   const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [staffingRequests, setStaffingRequests] = useState<StaffingRequest[]>([]);

  useEffect(() => {
 const fetchRequests = async () => {
  setLoading(true);
  try {
    const response: any = await staffingRequestService.getAllRequests();
    console.log('API response:', response);

    // si c'est directement un tableau
    if (Array.isArray(response)) {
      setStaffingRequests(response);
    } 
    // sinon, si c'est au format ApiResponse
    else if (response.success && response.data) {
      setStaffingRequests(response.data);
    } else {
      console.error("Failed to fetch staffing requests", response);
      setError(response.message || response.error || "Unknown API error");
    }
  } catch (err: any) {
    console.error("Error fetching staffing requests:", err);
    setError(err instanceof Error ? err.message : "Unknown error");
  } finally {
    setLoading(false);
  }
};


    fetchRequests();
  }, []);
  // const [staffingRequests, setStaffingRequests] = useState<StaffingRequest[]>([
  //   {
  //     id: 'REQ-001',
  //     requestTitle: 'Senior Software Engineer',
  //     department: 'Engineering',
  //     position: 'Senior Software Engineer',
  //     numberOfVacancies: 2,
  //     employmentType: 'Full-time',
  //     expectedStartDate: '2025-09-01',
  //     requiredSkills: 'React, Node.js, AWS',
  //     experienceLevel: '5+ years',
  //     justification: 'New project expansion',
  //     hiringManager: 'Alice Wonderland',
  //     status: 'Approved',
  //     activityLog: [
  //       { timestamp: '2025-07-01', status: 'Draft', notes: 'Initial creation' },
  //       { timestamp: '2025-07-05', status: 'Pending Approval', notes: 'Submitted for review' },
  //       { timestamp: '2025-07-10', status: 'Approved', notes: 'Approved by VP of Engineering' },
  //     ]
  //   },
  // //   {
  // //     id: 'REQ-002',
  // //     requestTitle: 'Marketing Specialist',
  // //     department: 'Marketing',
  // //     position: 'Marketing Specialist',
  // //     numberOfVacancies: 1,
  // //     employmentType: 'Full-time',
  // //     expectedStartDate: '2025-08-15',
  // //     requiredSkills: 'SEO, SEM, Content Marketing',
  // //     experienceLevel: '3+ years',
  // //     justification: 'Replacement for Jane Doe',
  // //     hiringManager: 'Bob The Builder',
  // //     status: 'Open',
  // //     activityLog: [
  // //       { timestamp: '2025-07-03', status: 'Draft', notes: 'Initial creation' },
  // //       { timestamp: '2025-07-07', status: 'Pending Approval', notes: 'Submitted for review' },
  // //       { timestamp: '2025-07-12', status: 'Approved', notes: 'Approved by Marketing Director' },
  // //       { timestamp: '2025-07-13', status: 'Open', notes: 'Position opened for applications' },
  // //     ]
  // //   },
  // //   {
  // //     id: 'REQ-003',
  // //     requestTitle: 'HR Assistant',
  // //     department: 'Human Resources',
  // //     position: 'HR Assistant',
  // //     numberOfVacancies: 1,
  // //     employmentType: 'Part-time',
  // //     expectedStartDate: '2025-10-01',
  // //     requiredSkills: 'HR Policies, Communication',
  // //     experienceLevel: '1+ year',
  // //     justification: 'Support HR team',
  // //     hiringManager: 'Charlie Chaplin',
  // //     status: 'Pending Approval',
  // //     activityLog: [
  // //       { timestamp: '2025-07-20', status: 'Draft', notes: 'Initial creation' },
  // //       { timestamp: '2025-07-22', status: 'Pending Approval', notes: 'Submitted for HR Director approval' },
  // //     ]
  // //   },
  // //   {
  // //       id: 'REQ-004',
  // //       requestTitle: 'UX Designer',
  // //       department: 'Product',
  // //       position: 'UX Designer',
  // //       numberOfVacancies: 1,
  // //       employmentType: 'Full-time',
  // //       expectedStartDate: '2025-11-01',
  // //       requiredSkills: 'Figma, User Research, Prototyping',
  // //       experienceLevel: '2+ years',
  // //       justification: 'Growing product team',
  // //       hiringManager: 'Diana Prince',
  // //       status: 'Rejected',
  // //       activityLog: [
  // //           { timestamp: '2025-07-15', status: 'Draft', notes: 'Initial creation' },
  // //           { timestamp: '2025-07-18', status: 'Pending Approval', notes: 'Submitted for Product Lead review' },
  // //           { timestamp: '2025-07-25', status: 'Rejected', notes: 'Rejected due to budget constraints' },
  // //         ]
  // //     },
  // // ]);

  // // const [candidates, setCandidates] = useState<Candidate[]>([
  // //   {
  // //     id: 'CAND-001',
  // //     requestId: 'REQ-001',
  // //     name: 'John Doe',
  // //     email: 'john.doe@example.com',
  // //     phone: '+1234567890',
  // //     status: 'Interviewing',
  // //     lastActivityDate: '2025-07-28',
  // //     notes: 'Strong React skills, good cultural fit.',
  // //     resumeUrl: '#',
  // //   },
  // //   {
  // //     id: 'CAND-002',
  // //     requestId: 'REQ-001',
  // //     name: 'Jane Smith',
  // //     email: 'jane.smith@example.com',
  // //     phone: '+0987654321',
  // //     status: 'Offer Extended',
  // //     lastActivityDate: '2025-07-27',
  // //     notes: 'Excellent Node.js experience, negotiating salary.',
  // //     resumeUrl: '#',
  // //   },
  // //   {
  // //     id: 'CAND-003',
  // //     requestId: 'REQ-002',
  // //     name: 'Peter Jones',
  // //     email: 'peter.jones@example.com',
  // //     phone: '+1122334455',
  // //     status: 'Applied',
  // //     lastActivityDate: '2025-07-29',
  // //     notes: 'Entry-level, but enthusiastic.',
  // //     resumeUrl: '#',
  // //   },
  // ]);

  const [selectedRequest, setSelectedRequest] = useState<StaffingRequest | null>(null);
  const [requestForm, setRequestForm] = useState<StaffingRequest>({
    id: `REQ-${Date.now()}`,
    requestTitle: '',
    department: '',
    position: '',
    numberOfVacancies: 1,
    employmentType: 'Full-time',
    expectedStartDate: '',
    requiredSkills: '',
    experienceLevel: '',
    justification: '',
    hiringManager: '',
    status: 'Draft',
    activityLog: [], // Initialize activity log for new requests
  });
  const [candidateForm, setCandidateForm] = useState<Candidate>({
    id: '',
    requestId: '',
    name: '',
    email: '',
    status: 'Applied',
    lastActivityDate: '',
  });

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalAction, setModalAction] = useState<(() => void) | null>(null);
  const [isNotificationBarOpen, setIsNotificationBarOpen] = useState(false); // New state for notification bar

  const [activeMainTab, setActiveMainTab] = useState('staffingRequests'); // 'staffingRequests' | 'candidateManagement' | 'createRequest'
  const [activeRequestDetailTab, setActiveRequestDetailTab] = useState('overview'); // 'overview' | 'candidates' | 'activityLog'

  const [searchRequestForm, setSearchRequestForm] = useState({
    title: '',
    department: '',
    status: '',
  });

  const [searchCandidateForm, setSearchCandidateForm] = useState({
    name: '',
    status: '',
  });

  // Notification logic
  const addNotification = (message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setIsNotificationBarOpen(true); // Open the notification bar when a new notification arrives
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    // Optionally close the bar if no notifications are left after a delay
    setTimeout(() => {
      if (notifications.length === 1) { // If this was the last notification
        setIsNotificationBarOpen(false);
      }
    }, 500);
  };

 const updateStatus = async (id: string, status: string) => {
    try {
      const response = await staffingRequestService.updateStatus(id, status);
      addNotification(`Request status updated to ${status}.`, 'success');

      console.log("Status updated:", response.data);
      // tu peux aussi rafraîchir ton state ici
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut", error);
    }
  };

  const deleteStatus=async(id:string)=>{
    try{
      const response =await staffingRequestService.deleteRequest(id);
      addNotification(`Request status Deleted `, 'warning');

    }catch(error){
      console.error("Erreur lors de la suppression", error);
    }
  }


  // Modal logic
  const openConfirmationModal = (actionType: string, payload?: any) => {
    let content = '';
    let action: (() => void) | null = null;

    switch (actionType) {
      case 'deleteRequest':
        content = `Are you sure you want to delete the staffing request "${payload.requestTitle}"? This action cannot be undone.`;
        action = () => deleteStatus(payload.id);
        break;
      case 'saveRequest':
        content = 'Are you sure you want to save this staffing request?';
        action = handleSaveRequest;
        break;
      case 'approveRequest':
        content = `Are you sure you want to approve the request "${payload.requestTitle}"?`;
        // action = () => handleUpdateRequestStatus(payload.id, 'Approved');
        action=()=>updateStatus(payload.id, 'Approved')
        break;
      case 'rejectRequest':
        content = `Are you sure you want to reject the request "${payload.requestTitle}"?`;
        action = () => updateStatus(payload.id, 'Rejected');
        break;
      case 'addCandidate':
        content = 'Are you sure you want to add this candidate?';
        action = handleAddCandidate;
        break;
      case 'updateCandidateStatus':
        content = `Are you sure you want to change the status of ${payload.name} to "${payload.status}"?`;
        action = () => handleUpdateCandidateStatus(payload.candidateId, payload.newStatus);
        break;
      case 'deleteCandidate':
        content = `Are you sure you want to remove candidate ${payload.name}?`;
        action = () => handleDeleteCandidate(payload.candidateId);
        break;
      case 'closeRequest':
        content = `Are you sure you want to close the request "${payload.requestTitle}"? No new candidates can be added.`;
        action = () => updateStatus(payload.id, 'Closed');
        break;
      case 'openRequest':
        content = `Are you sure you want to re-open the request "${payload.requestTitle}"?`;
        action = () => updateStatus(payload.id, 'Open');
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
      window.location.reload()
    }
    setShowModal(false);
  };

  const handleModalCancel = () => {
    setShowModal(false);
    setModalContent('');
    setModalAction(null);
    addNotification('Action cancelled from modal.', 'info');
  };

  // Staffing Request Handlers
  const handleCreateNewRequest = () => {
    setRequestForm({
      id: `REQ-${Date.now()}`,
      requestTitle: '',
      department: '',
      position: '',
      numberOfVacancies: 1,
      employmentType: 'Full-time',
      expectedStartDate: '',
      requiredSkills: '',
      experienceLevel: '',
      justification: '',
      hiringManager: '',
      status: 'Draft',
      activityLog: [{ timestamp: new Date().toISOString().split('T')[0], status: 'Draft', notes: 'Request created' }],
    });
    setSelectedRequest(null);
    setActiveMainTab('createRequest');
  };

  const handleEditRequest = (request: StaffingRequest) => {
    setRequestForm(request);
    setSelectedRequest(request);
    setActiveMainTab('createRequest');
  };

  const handleSaveRequest = () => {
    if (requestForm.id && staffingRequests.some((req) => req.id === requestForm.id)) {
        // Update existing request
        setStaffingRequests((prev) =>
            prev.map((req) =>
                req.id === requestForm.id
                    ? {
                          ...requestForm,
                          activityLog: [ // Add a log for update if status changed, or just general update
                              ...(req.activityLog || []),
                              ...(req.status !== requestForm.status ? [{ timestamp: new Date().toISOString().split('T')[0], status: requestForm.status, notes: `Status changed to ${requestForm.status}` }] : []),
                              { timestamp: new Date().toISOString().split('T')[0], status: requestForm.status, notes: 'Request details updated' } // General update log
                          ],
                      }
                    : req
            )
        );
        addNotification('Staffing request updated successfully!', 'success');
    } else {
        // Create new request
        const newRequest = {
            ...requestForm,
            id: `REQ-${Date.now()}`,
            activityLog: [{ timestamp: new Date().toISOString().split('T')[0], status: 'Draft', notes: 'Request created' }],
        };
        setStaffingRequests((prev) => [newRequest, ...prev]);
        addNotification('New staffing request created successfully!', 'success');
    }
    setActiveMainTab('staffingRequests');
    setSelectedRequest(null); // Clear selected request after saving/creating
};


  const handleDeleteRequest = (id: string) => {
    setStaffingRequests((prev) => prev.filter((req) => req.id !== id));
    setCandidates((prev) => prev.filter((cand) => cand.requestId !== id)); // Also delete associated candidates
    addNotification('Staffing request deleted successfully!', 'success');
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest(null);
      setActiveRequestDetailTab('overview');
    }
  };

  const handleUpdateRequestStatus = (id: string, newStatus: StaffingRequest['status']) => {
    setStaffingRequests((prev) =>
      prev.map((req) => {
        if (req.id === id) {
          const updatedLog = [...(req.activityLog || []), { timestamp: new Date().toISOString().split('T')[0], status: newStatus, notes: `Status changed to ${newStatus}` }];
          return { ...req, status: newStatus, activityLog: updatedLog };
        }
        return req;
      })
    );
    if (selectedRequest && selectedRequest.id === id) {
        setSelectedRequest((prev) => prev ? {
            ...prev,
            status: newStatus,
            activityLog: [...(prev.activityLog || []), { timestamp: new Date().toISOString().split('T')[0], status: newStatus, notes: `Status changed to ${newStatus}` }]
        } : null);
    }
    addNotification(`Request status updated to ${newStatus}.`, 'success');
  };

  const filteredRequests = staffingRequests.filter((req) => {
    const matchesTitle = searchRequestForm.title
      ? req.requestTitle.toLowerCase().includes(searchRequestForm.title.toLowerCase())
      : true;
    const matchesDepartment = searchRequestForm.department
      ? req.department.toLowerCase().includes(searchRequestForm.department.toLowerCase())
      : true;
    const matchesStatus = searchRequestForm.status
      ? req.status === searchRequestForm.status
      : true;
    return matchesTitle && matchesDepartment && matchesStatus;
  });

  // Candidate Handlers
  const handleSelectRequest = (request: StaffingRequest) => {
    setSelectedRequest(request);
    setActiveMainTab('candidateManagement');
    setActiveRequestDetailTab('overview'); // Default to overview tab when selecting a request
    addNotification(`Viewing details for: ${request.requestTitle}`, 'info');
  };

  const handleAddCandidate = () => {
    if (!selectedRequest) {
      addNotification('Please select a staffing request first.', 'error');
      return;
    }
    const newCandidate = { ...candidateForm, id: `CAND-${Date.now()}`, requestId: selectedRequest.id, lastActivityDate: new Date().toISOString().split('T')[0] };
    setCandidates((prev) => [...prev, newCandidate]);
    addNotification(`Candidate ${newCandidate.name} added successfully!`, 'success');
    setCandidateForm({ // Reset form
      id: '',
      requestId: '',
      name: '',
      email: '',
      status: 'Applied',
      lastActivityDate: '',
    });
  };

  const handleUpdateCandidateStatus = (candidateId: string, newStatus: Candidate['status']) => {
    setCandidates((prev) =>
      prev.map((cand) => (cand.id === candidateId ? { ...cand, status: newStatus, lastActivityDate: new Date().toISOString().split('T')[0] } : cand))
    );
    addNotification('Candidate status updated.', 'success');
  };

  const handleDeleteCandidate = (candidateId: string) => {
    setCandidates((prev) => prev.filter((cand) => cand.id !== candidateId));
    addNotification('Candidate removed.', 'success');
  };

  const getStatusBadgeColor = (status: StaffingRequest['status'] | Candidate['status']) => {
    switch (status) {
      case 'Approved':
      case 'Open':
      case 'Hired':
      case 'Offer Accepted':
        return 'bg-green-100 text-green-800';
      case 'Pending Approval':
      case 'Screening':
      case 'Interviewing':
      case 'Offer Extended':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
      case 'Offer Rejected':
        return 'bg-red-100 text-red-800';
      case 'Draft':
      case 'Applied':
        return 'bg-blue-100 text-blue-800';
      case 'Closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStaffingRequestsList = () => (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
        <FiBriefcase className="mr-3 text-orange-500" /> Staffing Requests
      </h2>

      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <FiSearch className="mr-2 text-orange-500" /> Filter Requests
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Request Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
              placeholder="e.g., Software Engineer"
              value={searchRequestForm.title}
              onChange={(e) => setSearchRequestForm({ ...searchRequestForm, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <input
              type="text"
              id="departmentSearch"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
              placeholder="e.g., Engineering"
              value={searchRequestForm.department}
              onChange={(e) => setSearchRequestForm({ ...searchRequestForm, department: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="statusSearch" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="statusSearch"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
              value={searchRequestForm.status}
              onChange={(e) => setSearchRequestForm({ ...searchRequestForm, status: e.target.value })}
            >
              <option value="">All Statuses</option>
              <option value="Draft">Draft</option>
              <option value="Pending Approval">Pending Approval</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            onClick={() => setSearchRequestForm({ title: '', department: '', status: '' })}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Staffing Requests Table */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <FiFileText className="mr-3 text-orange-500" /> All Requests
          </h3>
          <button
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center"
            onClick={handleCreateNewRequest}
          >
            <FiPlus className="mr-2" /> New Request
          </button>
        </div>
        {filteredRequests.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <FiInfo className="mx-auto w-12 h-12 mb-4" />
            <p className="text-lg">No staffing requests found matching your criteria.</p>
            <p className="mt-1 text-sm">Try adjusting your filters or create a new request.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vacancies
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {request.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {request.requestTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {request.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {request.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {request.numberOfVacancies}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        {/* <button
                          onClick={() => handleSelectRequest(request)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details & Candidates"
                        >
                          <FiInfo className="w-5 h-5" />
                        </button> */}
                        <button
                          onClick={() => handleEditRequest(request)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="Edit Request"
                        >
                          <FiEdit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => openConfirmationModal('deleteRequest', request)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete Request"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                        {request.status === 'Pending Approval' && (
                            <>
                                <button
                                    onClick={() => openConfirmationModal('approveRequest', request)}
                                    className="text-green-600 hover:text-green-900"
                                    title="Approve Request"
                                >
                                    <FiCheckCircle className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => openConfirmationModal('rejectRequest', request)}
                                    // onClick={() => updateStatus(request, 'Rejected')}
                                    className="text-red-600 hover:text-red-900"
                                    title="Reject Request"
                                >
                                    <FiXCircle className="w-5 h-5" />
                                </button>
                            </>
                        )}
                        {request.status === 'Approved' || request.status === 'Open' ? (
                             <button
                             onClick={() => openConfirmationModal('closeRequest', request)}
                             className="text-gray-600 hover:text-gray-900"
                             title="Close Request"
                         >
                             <FiXCircle className="w-5 h-5" />
                         </button>
                        ) : request.status === 'Closed' && (
                             <button
                             onClick={() => openConfirmationModal('openRequest', request)}
                             className="text-purple-600 hover:text-purple-900"
                             title="Re-open Request"
                         >
                             <FiPlus className="w-5 h-5" />
                         </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const renderCreateEditRequestForm = () => (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
        <FiPlus className="mr-3 text-orange-500" /> {selectedRequest ? 'Edit' : 'Create New'} Staffing Request
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <form onSubmit={(e) => { e.preventDefault(); openConfirmationModal('saveRequest'); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label htmlFor="requestTitle" className="block text-sm font-medium text-gray-700 mb-1">Request Title</label>
              <input
                type="text"
                id="requestTitle"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                value={requestForm.requestTitle}
                onChange={(e) => setRequestForm({ ...requestForm, requestTitle: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input
                type="text"
                id="department"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                value={requestForm.department}
                onChange={(e) => setRequestForm({ ...requestForm, department: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <input
                type="text"
                id="position"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                value={requestForm.position}
                onChange={(e) => setRequestForm({ ...requestForm, position: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="numberOfVacancies" className="block text-sm font-medium text-gray-700 mb-1">Number of Vacancies</label>
              <input
                type="number"
                id="numberOfVacancies"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                value={requestForm.numberOfVacancies}
                onChange={(e) => setRequestForm({ ...requestForm, numberOfVacancies: parseInt(e.target.value) || 1 })}
                min="1"
                required
              />
            </div>
            <div>
              <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
              <select
                id="employmentType"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                value={requestForm.employmentType}
                onChange={(e) => setRequestForm({ ...requestForm, employmentType: e.target.value as StaffingRequest['employmentType'] })}
                required
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
            <div>
              <label htmlFor="expectedStartDate" className="block text-sm font-medium text-gray-700 mb-1">Expected Start Date</label>
              <input
                type="date"
                id="expectedStartDate"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                value={requestForm.expectedStartDate}
                onChange={(e) => setRequestForm({ ...requestForm, expectedStartDate: e.target.value })}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="requiredSkills" className="block text-sm font-medium text-gray-700 mb-1">Required Skills (comma-separated)</label>
              <textarea
                id="requiredSkills"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-20 resize-y focus:ring-orange-500 focus:border-orange-500"
                value={requestForm.requiredSkills}
 onChange={(e) =>
    setRequestForm({
      ...requestForm,
      requiredSkills: e.target.value.split(',').map(s => s.trim()) // Stocke en tableau
    })
  }                placeholder="e.g., JavaScript, React, Problem Solving"
                required
              />
            </div>
            <div>
              <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
              <input
                type="text"
                id="experienceLevel"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                value={requestForm.experienceLevel}
                onChange={(e) => setRequestForm({ ...requestForm, experienceLevel: e.target.value })}
                placeholder="e.g., Mid-level, 3-5 years"
                required
              />
            </div>
            <div>
              <label htmlFor="hiringManager" className="block text-sm font-medium text-gray-700 mb-1">Hiring Manager</label>
              <input
                type="text"
                id="hiringManager"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                value={requestForm.hiringManager}
                onChange={(e) => setRequestForm({ ...requestForm, hiringManager: e.target.value })}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="justification" className="block text-sm font-medium text-gray-700 mb-1">Justification</label>
              <textarea
                id="justification"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-24 resize-y focus:ring-orange-500 focus:border-orange-500"
                value={requestForm.justification}
                onChange={(e) => setRequestForm({ ...requestForm, justification: e.target.value })}
                placeholder="Provide a detailed justification for this request."
                required
              />
            </div>
             {selectedRequest && (
                 <div>
                 <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Current Status</label>
                 <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(requestForm.status)}`}>
                    {requestForm.status}
                 </span>
                 </div>
            )}
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              onClick={() => setActiveMainTab('staffingRequests')}
            >
              Cancel
            </button>
            <button
            onClick={()=>handleUpdate(requestForm)}
              type="submit"
              className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center"
            >
              <FiSave className="mr-2" /> Save Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
const handleUpdate = async (formData: StaffingRequest) => {
  try {
    console.log("Données envoyées :", formData.id);
    // Appel API via ton service
    const response = await staffingRequestService.updateRequest(
      formData.id,       // 👈 assure-toi que l'id est présent dans ton formData
      formData    // 👈 idem pour le statut
    );

    console.log("Réponse API :", response);

    // Optionnel : afficher une notification de succès
    alert("Statut mis à jour avec succès ✅");

  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    alert("❌ Erreur lors de la mise à jour");
  }
};

  const renderRequestOverview = () => {
    if (!selectedRequest) return null;
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FiInfo className="mr-2 text-orange-500" /> Request Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-700">
                <p><strong>Request ID:</strong> {selectedRequest.id}</p>
                <p><strong>Request Title:</strong> {selectedRequest.requestTitle}</p>
                <p><strong>Department:</strong> {selectedRequest.department}</p>
                <p><strong>Position:</strong> {selectedRequest.position}</p>
                <p><strong>Vacancies:</strong> {selectedRequest.numberOfVacancies}</p>
                <p><strong>Employment Type:</strong> {selectedRequest.employmentType}</p>
                <p><strong>Expected Start Date:</strong> {selectedRequest.expectedStartDate}</p>
                <p><strong>Experience Level:</strong> {selectedRequest.experienceLevel}</p>
                <p className="md:col-span-2"><strong>Required Skills:</strong> {selectedRequest.requiredSkills}</p>
                <p><strong>Hiring Manager:</strong> {selectedRequest.hiringManager}</p>
                <p><strong>Current Status:</strong> <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(selectedRequest.status)}`}>{selectedRequest.status}</span></p>
                <p className="md:col-span-2"><strong>Justification:</strong> {selectedRequest.justification}</p>
            </div>
        </div>
    );
};

const renderActivityLog = () => {
    if (!selectedRequest || !selectedRequest.activityLog || selectedRequest.activityLog.length === 0) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6 text-center text-gray-500">
                <FiClock className="mx-auto w-10 h-10 mb-3" />
                <p>No activity log available for this request.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FiClock className="mr-2 text-orange-500" /> Activity Log / Timeline
            </h4>
            <div className="relative pl-4">
                <div className="absolute left-0 top-0 h-full w-0.5 bg-gray-300"></div> {/* Vertical line */}
                {selectedRequest.activityLog
                    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                    .map((activity, index) => (
                    <div key={index} className="mb-6 flex items-start">
                        <div className="absolute left-0 -ml-1.5 mt-2 w-3 h-3 rounded-full bg-orange-500 border border-white"></div>
                        <div className="pl-6 flex-grow">
                            <p className="text-xs text-gray-500">{activity.timestamp}</p>
                            <p className="font-medium text-gray-900">Status changed to: <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(activity.status)}`}>{activity.status}</span></p>
                            {activity.notes && <p className="text-sm text-gray-700 mt-1">{activity.notes}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


  const renderCandidateManagement = () => {
    const candidatesForSelectedRequest = candidates.filter(cand => cand.requestId === selectedRequest?.id);

    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
          <FiUsers className="mr-3 text-orange-500" /> Candidate Management
        </h2>

        {selectedRequest ? (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <FiClipboard className="mr-3 text-orange-500" /> Candidates for: <span className="text-blue-600 ml-1">{selectedRequest.requestTitle} ({selectedRequest.id})</span>
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveMainTab('staffingRequests')}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center"
                >
                  <FiChevronLeft className="mr-2" /> Back to Requests
                </button>
              </div>
            </div>

            {/* Tabs for Request Details */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button
                        onClick={() => setActiveRequestDetailTab('overview')}
                        className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                            activeRequestDetailTab === 'overview'
                                ? 'border-orange-500 text-orange-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        <FiInfo className="inline-block mr-2" /> Overview
                    </button>
                    <button
                        onClick={() => setActiveRequestDetailTab('candidates')}
                        className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                            activeRequestDetailTab === 'candidates'
                                ? 'border-orange-500 text-orange-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        <FiUsers className="inline-block mr-2" /> Candidates
                    </button>
                    <button
                        onClick={() => setActiveRequestDetailTab('activityLog')}
                        className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                            activeRequestDetailTab === 'activityLog'
                                ? 'border-orange-500 text-orange-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        <FiClock className="inline-block mr-2" /> Activity Log
                    </button>
                </nav>
            </div>

            {/* Tab Content */}
            {activeRequestDetailTab === 'overview' && renderRequestOverview()}
            {activeRequestDetailTab === 'activityLog' && renderActivityLog()}
            {activeRequestDetailTab === 'candidates' && (
                <>
                    {/* Candidate Search and Filter */}
                    <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center"><FiSearch className="mr-2"/> Filter Candidates</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Candidate Name</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="e.g., John Doe"
                                    value={searchCandidateForm.name}
                                    onChange={(e) => setSearchCandidateForm({ ...searchCandidateForm, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="candidateStatusSearch" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    id="candidateStatusSearch"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                                    value={searchCandidateForm.status}
                                    onChange={(e) => setSearchCandidateForm({ ...searchCandidateForm, status: e.target.value })}
                                >
                                    <option value="">All Statuses</option>
                                    <option value="Applied">Applied</option>
                                    <option value="Screening">Screening</option>
                                    <option value="Interviewing">Interviewing</option>
                                    <option value="Offer Extended">Offer Extended</option>
                                    <option value="Offer Accepted">Offer Accepted</option>
                                    <option value="Offer Rejected">Offer Rejected</option>
                                    <option value="Hired">Hired</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Add New Candidate Form */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                        <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <FiUserPlus className="mr-2 text-orange-500" /> Add New Candidate
                        </h4>
                        <form onSubmit={(e) => { e.preventDefault(); openConfirmationModal('addCandidate'); }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                <div>
                                    <label htmlFor="candidateName" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        id="candidateName"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                                        value={candidateForm.name}
                                        onChange={(e) => setCandidateForm({ ...candidateForm, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="candidateEmail" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="candidateEmail"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                                        value={candidateForm.email}
                                        onChange={(e) => setCandidateForm({ ...candidateForm, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="candidatePhone" className="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
                                    <input
                                        type="tel"
                                        id="candidatePhone"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                                        value={candidateForm.phone || ''}
                                        onChange={(e) => setCandidateForm({ ...candidateForm, phone: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="candidateStatus" className="block text-sm font-medium text-gray-700 mb-1">Initial Status</label>
                                    <select
                                        id="candidateStatus"
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                                        value={candidateForm.status}
                                        onChange={(e) => setCandidateForm({ ...candidateForm, status: e.target.value as Candidate['status'] })}
                                        required
                                    >
                                        <option value="Applied">Applied</option>
                                        <option value="Screening">Screening</option>
                                        {/* Only allow initial statuses */}
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                                >
                                    <FiPlus className="mr-2" /> Add Candidate
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Candidates Table */}
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FiUsers className="mr-3 text-orange-500" /> Current Candidates
                    </h3>
                    {candidatesForSelectedRequest.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            <FiInfo className="mx-auto w-12 h-12 mb-4" />
                            <p className="text-lg">No candidates for this staffing request yet.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Current Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Last Activity
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {candidatesForSelectedRequest
                                        .filter(cand =>
                                            (searchCandidateForm.name ? cand.name.toLowerCase().includes(searchCandidateForm.name.toLowerCase()) : true) &&
                                            (searchCandidateForm.status ? cand.status === searchCandidateForm.status : true)
                                        )
                                        .map((candidate) => (
                                        <tr key={candidate.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {candidate.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {candidate.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(candidate.status)}`}>
                                                    {candidate.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {candidate.lastActivityDate}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end space-x-2">
                                                    {/* Example actions: View Resume, Update Status, Delete */}
                                                    {candidate.resumeUrl && (
                                                        <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900" title="View Resume">
                                                            <FiFileText className="w-5 h-5" />
                                                        </a>
                                                    )}
                                                    <div className="relative group">
                                                        <button className="text-gray-600 hover:text-gray-900 flex items-center" title="Change Status">
                                                            <FiEdit className="w-5 h-5" />
                                                            <FiChevronDown className="ml-1" />
                                                        </button>
                                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-200 invisible">
                                                            {['Screening', 'Interviewing', 'Offer Extended', 'Offer Accepted', 'Offer Rejected', 'Hired', 'Rejected'].map(status => (
                                                                <button
                                                                    key={status}
                                                                    onClick={() => openConfirmationModal('updateCandidateStatus', { candidateId: candidate.id, name: candidate.name, newStatus: status })}
                                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                                    disabled={candidate.status === status}
                                                                >
                                                                    Set to {status}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => openConfirmationModal('deleteCandidate', { candidateId: candidate.id, name: candidate.name })}
                                                        className="text-red-600 hover:text-red-900"
                                                        title="Remove Candidate"
                                                    >
                                                        <FiUserMinus className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <FiInfo className="mx-auto w-16 h-16 mb-4" />
            <p className="text-xl font-semibold">Please select a staffing request to manage candidates or view its details.</p>
            <button
                onClick={() => setActiveMainTab('staffingRequests')}
                className="mt-6 px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center mx-auto"
            >
                <FiChevronLeft className="mr-2" /> View All Requests
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeMainTab) {
      case 'staffingRequests':
        return renderStaffingRequestsList();
      case 'createRequest':
        return renderCreateEditRequestForm();
      case 'candidateManagement':
        return renderCandidateManagement();
      default:
        return renderStaffingRequestsList();
    }
  };

  return (
    <div className="font-sans antialiased text-gray-900 bg-gray-100">
      {/* Notifications - Right Bar */}
      <div className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transition-transform duration-300 ${isNotificationBarOpen ? 'translate-x-0' : 'translate-x-full'} w-80 flex flex-col`}>
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800 flex items-center">
            <FiBell className="mr-2 text-orange-500" /> Notifications
          </h3>
          <button onClick={() => setIsNotificationBarOpen(false)} className="text-gray-500 hover:text-gray-700">
            <FiXCircle className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <p className="text-gray-500 text-sm">No new notifications.</p>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3 rounded-lg shadow-sm flex items-start text-sm ${
                  notif.type === 'info' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                  notif.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
                  notif.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' :
                  notif.type === 'warning' ? 'bg-orange-50 text-orange-800 border border-orange-200' : 'bg-gray-50 text-gray-800 border border-gray-200'
                }`}
              >
                {notif.type === 'success' && <FiCheckCircle className="mr-2 mt-0.5 flex-shrink-0" />}
                {notif.type === 'error' && <FiXCircle className="mr-2 mt-0.5 flex-shrink-0" />}
                {notif.type === 'warning' && <FiAlertCircle className="mr-2 mt-0.5 flex-shrink-0" />}
                {notif.type === 'info' && <FiInfo className="mr-2 mt-0.5 flex-shrink-0" />}
                <span className="flex-grow">{notif.message}</span>
                <button onClick={() => removeNotification(notif.id)} className="ml-2 text-gray-500 hover:text-gray-700 flex-shrink-0">
                  <FiXCircle className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
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

      {/* Top Navigation */}
      <nav className="bg-white shadow-sm p-4 top-0 z-40 border-b border-gray-200">
        <div className="max-w-full mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-orange-600 flex items-center">
              <FiBriefcase className="mr-2" /> Recruitment Portal
            </h1>
            <div className="hidden md:flex space-x-2 lg:space-x-4 ml-6">
              <button
                onClick={() => { setActiveMainTab('staffingRequests'); setSelectedRequest(null); setActiveRequestDetailTab('overview'); }}
                className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeMainTab === 'staffingRequests' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FiBriefcase className="inline-block mr-2" /> Staffing Requests
              </button>
              {/* <button
                onClick={() => { setActiveMainTab('candidateManagement'); }}
                className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeMainTab === 'candidateManagement' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FiUsers className="inline-block mr-2" /> Candidate Management
              </button> */}
              <button
                onClick={handleCreateNewRequest}
                className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeMainTab === 'createRequest' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <FiPlus className="inline-block mr-2" /> Edit Request
              </button>
            </div>
          </div>
          <button
            onClick={() => setIsNotificationBarOpen(!isNotificationBarOpen)}
            className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-orange-600 transition-colors relative"
            title="Toggle Notifications"
          >
            <FiBell className="w-6 h-6" />
            {notifications.length > 0 && (
                <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500"></span>
            )}
          </button>
        </div>
      </nav>

      <main className="max-w-full mx-auto py-6 sm:px-6 lg:px-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default RecruitmentProcess;
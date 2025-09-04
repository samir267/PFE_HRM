// import React, { useState, useEffect } from 'react';
// import {
//   FiBriefcase,
//   FiFileText,
//   FiUsers,
//   FiCalendar,
//   FiCheckCircle,
//   FiXCircle,
//   FiSave,
//   FiAlertCircle,
//   FiInfo,
//   FiSearch,
//   FiPlus,
//   FiEdit,
//   FiTrash2,
//   FiMail,
//   FiPhone,
//   FiClock,
//   FiChevronLeft,
//   FiChevronRight,
//   FiMoreHorizontal,
//   FiClipboard,
//   FiUserCheck,
//   FiUserMinus,
//   FiSend,
//   FiChevronDown,
//   FiUserPlus,
// } from 'react-icons/fi';

// // Interface for a Staffing Request
// interface StaffingRequest {
//   id: string;
//   requestTitle: string;
//   department: string;
//   position: string;
//   numberOfVacancies: number;
//   employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Temporary';
//   expectedStartDate: string;
//   requiredSkills: string;
//   experienceLevel: string;
//   justification: string;
//   hiringManager: string;
//   status: 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected' | 'Open' | 'Closed';
// }

// // Interface for a Candidate
// interface Candidate {
//   id: string;
//   requestId: string; // Link to StaffingRequest
//   name: string;
//   email: string;
//   phone?: string;
//   status: 'Applied' | 'Screening' | 'Interviewing' | 'Offer Extended' | 'Offer Accepted' | 'Offer Rejected' | 'Hired' | 'Rejected';
//   lastActivityDate: string;
//   notes?: string;
//   resumeUrl?: string;
// }

// // Interface for Notifications
// interface Notification {
//   id: number;
//   message: string;
//   type: 'info' | 'success' | 'error' | 'warning';
// }

// // Interface for Process Status
// interface ProcessStatus {
//   id: string;
//   name: string;
//   category: 'Request' | 'Candidate';
//   description?: string;
//   isDefault: boolean;
//   color: string; // Hex code or Tailwind class for color
// }

// const ManageStatuses: React.FC = () => {
//   const [staffingRequests, setStaffingRequests] = useState<StaffingRequest[]>([
//     {
//       id: 'REQ-001',
//       requestTitle: 'Senior Software Engineer',
//       department: 'Engineering',
//       position: 'Senior Software Engineer',
//       numberOfVacancies: 2,
//       employmentType: 'Full-time',
//       expectedStartDate: '2025-09-01',
//       requiredSkills: 'React, Node.js, AWS',
//       experienceLevel: '5+ years',
//       justification: 'New project expansion',
//       hiringManager: 'Alice Wonderland',
//       status: 'Approved',
//     },
//     {
//       id: 'REQ-002',
//       requestTitle: 'Marketing Specialist',
//       department: 'Marketing',
//       position: 'Marketing Specialist',
//       numberOfVacancies: 1,
//       employmentType: 'Full-time',
//       expectedStartDate: '2025-08-15',
//       requiredSkills: 'SEO, SEM, Content Marketing',
//       experienceLevel: '3+ years',
//       justification: 'Replacement for Jane Doe',
//       hiringManager: 'Bob The Builder',
//       status: 'Open',
//     },
//     {
//       id: 'REQ-003',
//       requestTitle: 'HR Assistant',
//       department: 'Human Resources',
//       position: 'HR Assistant',
//       numberOfVacancies: 1,
//       employmentType: 'Part-time',
//       expectedStartDate: '2025-10-01',
//       requiredSkills: 'HR Policies, Communication',
//       experienceLevel: '1+ year',
//       justification: 'Support HR team',
//       hiringManager: 'Charlie Chaplin',
//       status: 'Pending Approval',
//     },
//     {
//       id: 'REQ-004',
//       requestTitle: 'UX Designer',
//       department: 'Product',
//       position: 'UX Designer',
//       numberOfVacancies: 1,
//       employmentType: 'Full-time',
//       expectedStartDate: '2025-11-01',
//       requiredSkills: 'Figma, User Research, Prototyping',
//       experienceLevel: '2+ years',
//       justification: 'Growing product team',
//       hiringManager: 'Diana Prince',
//       status: 'Rejected',
//     },
//   ]);

//   const [candidates, setCandidates] = useState<Candidate[]>([
//     {
//       id: 'CAND-001',
//       requestId: 'REQ-001',
//       name: 'John Doe',
//       email: 'john.doe@example.com',
//       phone: '+1234567890',
//       status: 'Interviewing',
//       lastActivityDate: '2025-07-28',
//       notes: 'Strong React skills, good cultural fit.',
//       resumeUrl: '#',
//     },
//     {
//       id: 'CAND-002',
//       requestId: 'REQ-001',
//       name: 'Jane Smith',
//       email: 'jane.smith@example.com',
//       phone: '+0987654321',
//       status: 'Offer Extended',
//       lastActivityDate: '2025-07-27',
//       notes: 'Excellent Node.js experience, negotiating salary.',
//       resumeUrl: '#',
//     },
//     {
//       id: 'CAND-003',
//       requestId: 'REQ-002',
//       name: 'Peter Jones',
//       email: 'peter.jones@example.com',
//       phone: '+1122334455',
//       status: 'Applied',
//       lastActivityDate: '2025-07-29',
//       notes: 'Entry-level, but enthusiastic.',
//       resumeUrl: '#',
//     },
//   ]);

//   const [processStatuses, setProcessStatuses] = useState<ProcessStatus[]>([
//     // Default Request Statuses
//     { id: 'RS-DRAFT', name: 'Draft', category: 'Request', description: 'Request is being drafted.', isDefault: true, color: 'bg-blue-100 text-blue-800' },
//     { id: 'RS-PENDING', name: 'Pending Approval', category: 'Request', description: 'Request awaiting approval.', isDefault: true, color: 'bg-yellow-100 text-yellow-800' },
//     { id: 'RS-APPROVED', name: 'Approved', category: 'Request', description: 'Request has been approved.', isDefault: true, color: 'bg-green-100 text-green-800' },
//     { id: 'RS-REJECTED', name: 'Rejected', category: 'Request', description: 'Request has been rejected.', isDefault: true, color: 'bg-red-100 text-red-800' },
//     { id: 'RS-OPEN', name: 'Open', category: 'Request', description: 'Request is open for applications.', isDefault: true, color: 'bg-purple-100 text-purple-800' },
//     { id: 'RS-CLOSED', name: 'Closed', category: 'Request', description: 'Request is closed.', isDefault: true, color: 'bg-gray-100 text-gray-800' },

//     // Default Candidate Statuses
//     { id: 'CS-APPLIED', name: 'Applied', category: 'Candidate', description: 'Candidate has applied.', isDefault: true, color: 'bg-indigo-100 text-indigo-800' },
//     { id: 'CS-SCREENING', name: 'Screening', category: 'Candidate', description: 'Candidate is in screening phase.', isDefault: true, color: 'bg-teal-100 text-teal-800' },
//     { id: 'CS-INTERVIEW', name: 'Interviewing', category: 'Candidate', description: 'Candidate is being interviewed.', isDefault: true, color: 'bg-orange-100 text-orange-800' },
//     { id: 'CS-OFFERED', name: 'Offer Extended', category: 'Candidate', description: 'Offer has been extended to candidate.', isDefault: true, color: 'bg-yellow-100 text-yellow-800' },
//     { id: 'CS-ACCEPTED', name: 'Offer Accepted', category: 'Candidate', description: 'Candidate accepted the offer.', isDefault: true, color: 'bg-green-100 text-green-800' },
//     { id: 'CS-REJECTED', name: 'Offer Rejected', category: 'Candidate', description: 'Candidate rejected the offer.', isDefault: true, color: 'bg-red-100 text-red-800' },
//     { id: 'CS-HIRED', name: 'Hired', category: 'Candidate', description: 'Candidate has been hired.', isDefault: true, color: 'bg-green-200 text-green-900' },
//     { id: 'CS-NOTHIRED', name: 'Rejected', category: 'Candidate', description: 'Candidate was not hired.', isDefault: true, color: 'bg-red-100 text-red-800' },
//   ]);

//   const [selectedRequest, setSelectedRequest] = useState<StaffingRequest | null>(null);
//   const [requestForm, setRequestForm] = useState<StaffingRequest>({
//     id: `REQ-${Date.now()}`,
//     requestTitle: '',
//     department: '',
//     position: '',
//     numberOfVacancies: 1,
//     employmentType: 'Full-time',
//     expectedStartDate: '',
//     requiredSkills: '',
//     experienceLevel: '',
//     justification: '',
//     hiringManager: '',
//     status: 'Draft',
//   });
//   const [candidateForm, setCandidateForm] = useState<Candidate>({
//     id: '',
//     requestId: '',
//     name: '',
//     email: '',
//     status: 'Applied',
//     lastActivityDate: '',
//   });

//   const [statusForm, setStatusForm] = useState<ProcessStatus>({
//     id: '',
//     name: '',
//     category: 'Request',
//     description: '',
//     isDefault: false,
//     color: '#000000',
//   });
//   const [editingStatus, setEditingStatus] = useState<ProcessStatus | null>(null);

//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   const [modalContent, setModalContent] = useState('');
//   const [modalAction, setModalAction] = useState<(() => void) | null>(null);

//   const [activeMainTab, setActiveMainTab] = useState('manageStatuses'); // 'staffingRequests' | 'candidateManagement' | 'createRequest' | 'manageStatuses'
//   const [activeRequestDetailTab, setActiveRequestDetailTab] = useState('overview'); // 'overview' | 'candidates' | 'activityLog'

//   const [searchRequestForm, setSearchRequestForm] = useState({
//     title: '',
//     department: '',
//     status: '',
//   });

//   const [searchCandidateForm, setSearchCandidateForm] = useState({
//     name: '',
//     status: '',
//   });

//   // Notification logic
//   const addNotification = (message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
//     const id = Date.now();
//     setNotifications((prev) => [...prev, { id, message, type }]);
//     setTimeout(() => {
//       removeNotification(id);
//     }, 5000);
//   };

//   const removeNotification = (id: number) => {
//     setNotifications((prev) => prev.filter((notif) => notif.id !== id));
//   };

//   // Modal logic
//   const openConfirmationModal = (actionType: string, payload?: any) => {
//     let content = '';
//     let action: (() => void) | null = null;

//     switch (actionType) {
//       case 'deleteRequest':
//         content = `Are you sure you want to delete the staffing request "${payload.requestTitle}"? This action cannot be undone.`;
//         action = () => handleDeleteRequest(payload.id);
//         break;
//       case 'saveRequest':
//         content = 'Are you sure you want to save this staffing request?';
//         action = handleSaveRequest;
//         break;
//       case 'approveRequest':
//         content = `Are you sure you want to approve the request "${payload.requestTitle}"?`;
//         action = () => handleUpdateRequestStatus(payload.id, 'Approved');
//         break;
//       case 'rejectRequest':
//         content = `Are you sure you want to reject the request "${payload.requestTitle}"?`;
//         action = () => handleUpdateRequestStatus(payload.id, 'Rejected');
//         break;
//       case 'addCandidate':
//         content = 'Are you sure you want to add this candidate?';
//         action = handleAddCandidate;
//         break;
//       case 'updateCandidateStatus':
//         content = `Are you sure you want to change the status of ${payload.name} to "${payload.status}"?`;
//         action = () => handleUpdateCandidateStatus(payload.candidateId, payload.newStatus);
//         break;
//       case 'deleteCandidate':
//         content = `Are you sure you want to remove candidate ${payload.name}?`;
//         action = () => handleDeleteCandidate(payload.candidateId);
//         break;
//       case 'deleteStatus':
//         content = `Are you sure you want to delete the status "${payload.name}"? This will also update any requests/candidates using this status to a default.`;
//         action = () => handleDeleteStatus(payload.id);
//         break;
//       case 'saveStatus':
//         content = 'Are you sure you want to save this status?';
//         action = handleSaveStatus;
//         break;
//       default:
//         content = 'Are you sure you want to proceed with this action?';
//         action = null;
//     }

//     setModalContent(content);
//     setModalAction(() => action);
//     setShowModal(true);
//   };

//   const handleModalConfirm = () => {
//     if (modalAction) {
//       modalAction();
//     }
//     setShowModal(false);
//   };

//   const handleModalCancel = () => {
//     setShowModal(false);
//     setModalContent('');
//     setModalAction(null);
//     addNotification('Action cancelled from modal.', 'info');
//   };

//   // Staffing Request Handlers (kept for context, but not the focus of this file)
//   const handleCreateNewRequest = () => {
//     setRequestForm({
//       id: `REQ-${Date.now()}`,
//       requestTitle: '',
//       department: '',
//       position: '',
//       numberOfVacancies: 1,
//       employmentType: 'Full-time',
//       expectedStartDate: '',
//       requiredSkills: '',
//       experienceLevel: '',
//       justification: '',
//       hiringManager: '',
//       status: 'Draft',
//     });
//     setSelectedRequest(null);
//     setActiveMainTab('createRequest');
//   };

//   const handleEditRequest = (request: StaffingRequest) => {
//     setRequestForm(request);
//     setSelectedRequest(request);
//     setActiveMainTab('createRequest');
//   };

//   const handleSaveRequest = () => {
//     if (requestForm.id && staffingRequests.some((req) => req.id === requestForm.id)) {
//       setStaffingRequests((prev) =>
//         prev.map((req) => (req.id === requestForm.id ? { ...requestForm } : req))
//       );
//       addNotification('Staffing request updated successfully!', 'success');
//     } else {
//       setStaffingRequests((prev) => [{ ...requestForm, id: `REQ-${Date.now()}` }, ...prev]);
//       addNotification('New staffing request created successfully!', 'success');
//     }
//     setActiveMainTab('staffingRequests');
//     setSelectedRequest(null); // Clear selected request after saving/creating
//   };

//   const handleDeleteRequest = (id: string) => {
//     setStaffingRequests((prev) => prev.filter((req) => req.id !== id));
//     setCandidates((prev) => prev.filter((cand) => cand.requestId !== id)); // Also delete associated candidates
//     addNotification('Staffing request deleted successfully!', 'success');
//     if (selectedRequest && selectedRequest.id === id) {
//       setSelectedRequest(null);
//       setActiveRequestDetailTab('overview');
//     }
//   };

//   const handleUpdateRequestStatus = (id: string, newStatus: StaffingRequest['status']) => {
//     setStaffingRequests((prev) =>
//       prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
//     );
//     if (selectedRequest && selectedRequest.id === id) {
//       setSelectedRequest((prev) => prev ? { ...prev, status: newStatus } : null);
//     }
//     addNotification(`Request status updated to ${newStatus}.`, 'success');
//   };

//   const filteredRequests = staffingRequests.filter((req) => {
//     const matchesTitle = searchRequestForm.title
//       ? req.requestTitle.toLowerCase().includes(searchRequestForm.title.toLowerCase())
//       : true;
//     const matchesDepartment = searchRequestForm.department
//       ? req.department.toLowerCase().includes(searchRequestForm.department.toLowerCase())
//       : true;
//     const matchesStatus = searchRequestForm.status
//       ? req.status === searchRequestForm.status
//       : true;
//     return matchesTitle && matchesDepartment && matchesStatus;
//   });

//   // Candidate Handlers (kept for context, but not the focus of this file)
//   const handleSelectRequest = (request: StaffingRequest) => {
//     setSelectedRequest(request);
//     setActiveMainTab('candidateManagement');
//     setActiveRequestDetailTab('candidates'); // Default to candidates tab when selecting a request
//     addNotification(`Viewing candidates for: ${request.requestTitle}`, 'info');
//   };

//   const handleAddCandidate = () => {
//     if (!selectedRequest) {
//       addNotification('Please select a staffing request first.', 'error');
//       return;
//     }
//     const newCandidate = { ...candidateForm, id: `CAND-${Date.now()}`, requestId: selectedRequest.id, lastActivityDate: new Date().toISOString().split('T')[0] };
//     setCandidates((prev) => [...prev, newCandidate]);
//     addNotification(`Candidate ${newCandidate.name} added successfully!`, 'success');
//     setCandidateForm({ // Reset form
//       id: '',
//       requestId: '',
//       name: '',
//       email: '',
//       status: 'Applied',
//       lastActivityDate: '',
//     });
//   };

//   const handleUpdateCandidateStatus = (candidateId: string, newStatus: Candidate['status']) => {
//     setCandidates((prev) =>
//       prev.map((cand) => (cand.id === candidateId ? { ...cand, status: newStatus, lastActivityDate: new Date().toISOString().split('T')[0] } : cand))
//     );
//     addNotification('Candidate status updated.', 'success');
//   };

//   const handleDeleteCandidate = (candidateId: string) => {
//     setCandidates((prev) => prev.filter((cand) => cand.id !== candidateId));
//     addNotification('Candidate removed.', 'success');
//   };

//   // Status Management Handlers
//   const handleCreateNewStatus = () => {
//     setEditingStatus(null);
//     setStatusForm({
//       id: `STATUS-${Date.now()}`,
//       name: '',
//       category: 'Request',
//       description: '',
//       isDefault: false,
//       color: '#000000',
//     });
//   };

//   const handleEditStatus = (status: ProcessStatus) => {
//     setEditingStatus(status);
//     setStatusForm(status);
//   };

//   const handleSaveStatus = () => {
//     if (!statusForm.name || !statusForm.category) {
//       addNotification('Status name and category are required.', 'error');
//       return;
//     }

//     if (editingStatus) {
//       // Update existing status
//       setProcessStatuses((prev) =>
//         prev.map((s) => (s.id === statusForm.id ? { ...statusForm } : s))
//       );
//       addNotification(`Status "${statusForm.name}" updated successfully!`, 'success');
//       setEditingStatus(null);
//     } else {
//       // Add new status
//       setProcessStatuses((prev) => [...prev, { ...statusForm, id: `STATUS-${Date.now()}` }]);
//       addNotification(`New status "${statusForm.name}" created successfully!`, 'success');
//     }
//     setStatusForm({
//       id: '',
//       name: '',
//       category: 'Request',
//       description: '',
//       isDefault: false,
//       color: '#000000',
//     }); // Reset form
//   };

//   const handleDeleteStatus = (id: string) => {
//     const statusToDelete = processStatuses.find(s => s.id === id);
//     if (!statusToDelete) return;

//     // Find a default status of the same category to reassign
//     const defaultStatus = processStatuses.find(
//       (s) => s.category === statusToDelete.category && s.isDefault && s.id !== id
//     );

//     if (!defaultStatus) {
//       addNotification('Cannot delete the only non-default status in its category. Please ensure there is at least one default status for each category.', 'error');
//       return;
//     }

//     // Reassign existing items using the deleted status to a default status
//     if (statusToDelete.category === 'Request') {
//       setStaffingRequests((prev) =>
//         prev.map((req) =>
//           req.status === statusToDelete.name // Compare by name since request status is string literal
//             ? { ...req, status: defaultStatus.name as StaffingRequest['status'] }
//             : req
//         )
//       );
//     } else if (statusToDelete.category === 'Candidate') {
//       setCandidates((prev) =>
//         prev.map((cand) =>
//           cand.status === statusToDelete.name // Compare by name
//             ? { ...cand, status: defaultStatus.name as Candidate['status'] }
//             : cand
//         )
//       );
//     }

//     setProcessStatuses((prev) => prev.filter((s) => s.id !== id));
//     addNotification(`Status "${statusToDelete.name}" deleted and associated items updated.`, 'success');
//     setEditingStatus(null);
//   };


//   const getStatusBadgeColor = (statusName: string) => {
//     const statusObj = processStatuses.find(s => s.name === statusName);
//     return statusObj ? statusObj.color : 'bg-gray-100 text-gray-800'; // Default if not found
//   };

//   const renderStatusManagement = () => {
//     const requestStatuses = processStatuses.filter(s => s.category === 'Request');
//     const candidateStatuses = processStatuses.filter(s => s.category === 'Candidate');

//     return (
//       <div className="p-6 bg-gray-50 min-h-screen">
//         <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
//           <FiClipboard className="mr-3 text-orange-500" /> Manage Process Statuses
//         </h2>

//         {/* Add/Edit Status Form */}
//         <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
//             {editingStatus ? <FiEdit className="mr-2 text-orange-500" /> : <FiPlus className="mr-2 text-orange-500" />} {editingStatus ? 'Edit Status' : 'Create New Status'}
//           </h3>
//           <form onSubmit={(e) => { e.preventDefault(); openConfirmationModal('saveStatus'); }}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//               <div>
//                 <label htmlFor="statusName" className="block text-sm font-medium text-gray-700 mb-1">Status Name</label>
//                 <input
//                   type="text"
//                   id="statusName"
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
//                   value={statusForm.name}
//                   onChange={(e) => setStatusForm({ ...statusForm, name: e.target.value })}
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="statusCategory" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//                 <select
//                   id="statusCategory"
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
//                   value={statusForm.category}
//                   onChange={(e) => setStatusForm({ ...statusForm, category: e.target.value as 'Request' | 'Candidate' })}
//                   required
//                 >
//                   <option value="Request">Staffing Request</option>
//                   <option value="Candidate">Candidate</option>
//                 </select>
//               </div>
//               <div className="md:col-span-2">
//                 <label htmlFor="statusDescription" className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
//                 <textarea
//                   id="statusDescription"
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-20 resize-y focus:ring-orange-500 focus:border-orange-500"
//                   value={statusForm.description || ''}
//                   onChange={(e) => setStatusForm({ ...statusForm, description: e.target.value })}
//                   placeholder="A brief description of this status"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="statusColor" className="block text-sm font-medium text-gray-700 mb-1">Badge Color (Tailwind CSS Class)</label>
//                 <input
//                   type="text"
//                   id="statusColor"
//                   className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
//                   value={statusForm.color}
//                   onChange={(e) => setStatusForm({ ...statusForm, color: e.target.value })}
//                   placeholder="e.g., bg-green-100 text-green-800"
//                   required
//                 />
//                 <p className="mt-1 text-xs text-gray-500">
//                   Use Tailwind CSS background and text color classes (e.g., <code className="font-mono">bg-blue-100 text-blue-800</code>).
//                 </p>
//               </div>
//               <div className="flex items-center mt-6">
//                 <input
//                   type="checkbox"
//                   id="isDefaultStatus"
//                   className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
//                   checked={statusForm.isDefault}
//                   onChange={(e) => setStatusForm({ ...statusForm, isDefault: e.target.checked })}
//                 />
//                 <label htmlFor="isDefaultStatus" className="ml-2 block text-sm text-gray-900">
//                   Set as Default Status (e.g., for new items or reassignments)
//                 </label>
//               </div>
//             </div>
//             <div className="mt-6 flex justify-end space-x-3">
//               {editingStatus && (
//                 <button
//                   type="button"
//                   className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center"
//                   onClick={handleCreateNewStatus} // Cancel editing
//                 >
//                   <FiXCircle className="mr-2" /> Cancel Edit
//                 </button>
//               )}
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center"
//               >
//                 <FiSave className="mr-2" /> {editingStatus ? 'Update Status' : 'Add Status'}
//               </button>
//             </div >
//           </form >
//         </div >

//         {/* Request Statuses Table */}
//         < div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8" >
//           <h3 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
//             <FiFileText className="mr-3 text-orange-500" /> Staffing Request Statuses
//           </h3>
//           {requestStatuses.length === 0 ? (
//             <div className="text-center py-10 text-gray-500">
//               <FiInfo className="mx-auto w-12 h-12 mb-4" />
//               <p className="text-lg">No request statuses defined.</p>
//               <p className="mt-1 text-sm">Create a new status above and set its category to "Staffing Request".</p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Name
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Description
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Default
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Badge
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {requestStatuses.map((status) => (
//                     <tr key={status.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {status.name}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                         {status.description || '-'}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                         {status.isDefault ? <FiCheckCircle className="text-green-500 w-5 h-5" /> : <FiXCircle className="text-red-500 w-5 h-5" />}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>
//                           {status.name}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <div className="flex justify-end space-x-2">
//                           <button
//                             onClick={() => handleEditStatus(status)}
//                             className="text-indigo-600 hover:text-indigo-900"
//                             title="Edit Status"
//                           >
//                             <FiEdit className="w-5 h-5" />
//                           </button>
//                           {!status.isDefault && ( // Prevent deleting default statuses directly to avoid breaking assignments
//                             <button
//                               onClick={() => openConfirmationModal('deleteStatus', status)}
//                               className="text-red-600 hover:text-red-900"
//                               title="Delete Status"
//                             >
//                               <FiTrash2 className="w-5 h-5" />
//                             </button>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div >

//         {/* Candidate Statuses Table */}
//         < div className="bg-white p-6 rounded-lg shadow-md border border-gray-200" >
//           <h3 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
//             <FiUsers className="mr-3 text-orange-500" /> Candidate Statuses
//           </h3>
//           {candidateStatuses.length === 0 ? (
//             <div className="text-center py-10 text-gray-500">
//               <FiInfo className="mx-auto w-12 h-12 mb-4" />
//               <p className="text-lg">No candidate statuses defined.</p>
//               <p className="mt-1 text-sm">Create a new status above and set its category to "Candidate".</p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Name
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Description
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Default
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Badge
//                     </th>
//                     <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {candidateStatuses.map((status) => (
//                     <tr key={status.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                         {status.name}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                         {status.description || '-'}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                         {status.isDefault ? <FiCheckCircle className="text-green-500 w-5 h-5" /> : <FiXCircle className="text-red-500 w-5 h-5" />}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm">
//                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>
//                           {status.name}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                         <div className="flex justify-end space-x-2">
//                           <button
//                             onClick={() => handleEditStatus(status)}
//                             className="text-indigo-600 hover:text-indigo-900"
//                             title="Edit Status"
//                           >
//                             <FiEdit className="w-5 h-5" />
//                           </button>
//                           {!status.isDefault && (
//                             <button
//                               onClick={() => openConfirmationModal('deleteStatus', status)}
//                               className="text-red-600 hover:text-red-900"
//                               title="Delete Status"
//                             >
//                               <FiTrash2 className="w-5 h-5" />
//                             </button>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div >
//       </div >
//     );
//   };

//   // The rest of the render functions for other tabs (staffingRequests, createRequest, candidateManagement)
//   // are omitted for brevity as the request was specifically for ManageStatuses.tsx.
//   // You can refer to the original commented-out code for those implementations.

//   return (
//     <div className="flex min-h-screen bg-gray-100">


//       {/* Main Content Area */}
//       <main className="flex-1 overflow-y-auto">
//         {/* Notifications */}
//         <div className="fixed top-4 right-4 z-50">
//           {notifications.map((notif) => (
//             <div
//               key={notif.id}
//               className={`p-4 mb-3 rounded-md shadow-lg text-white flex items-center justify-between animate-fade-in-down
//                 ${notif.type === 'success' ? 'bg-green-500' : ''}
//                 ${notif.type === 'error' ? 'bg-red-500' : ''}
//                 ${notif.type === 'info' ? 'bg-blue-500' : ''}
//                 ${notif.type === 'warning' ? 'bg-yellow-500' : ''}
//               `}
//               role="alert"
//             >
//               <span>{notif.message}</span>
//               <button onClick={() => removeNotification(notif.id)} className="ml-4 text-white hover:text-gray-200">
//                 <FiXCircle className="w-5 h-5" />
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Confirmation Modal */}
//         {showModal && (
//           <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
//             <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
//               <div className="text-center mb-6">
//                 <FiAlertCircle className="mx-auto text-yellow-500 w-16 h-16 mb-4" />
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">Confirm Action</h3>
//                 <p className="text-gray-600">{modalContent}</p>
//               </div>
//               <div className="flex justify-center space-x-4">
//                 <button
//                   onClick={handleModalConfirm}
//                   className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center"
//                 >
//                   <FiCheckCircle className="mr-2" /> Confirm
//                 </button>
//                 <button
//                   onClick={handleModalCancel}
//                   className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors flex items-center"
//                 >
//                   <FiXCircle className="mr-2" /> Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Content based on activeMainTab */}
//         {activeMainTab === 'manageStatuses' && renderStatusManagement()}
//         {/* {activeMainTab === 'staffingRequests' && renderStaffingRequestsList()}
//         {activeMainTab === 'createRequest' && renderCreateEditRequestForm()}
//         {activeMainTab === 'candidateManagement' && renderCandidateManagement()} */}
//       </main>
//     </div>
//   );
// };

// export default ManageStatuses;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
} from 'react-icons/fi';

// Interface for a Process Status (adjusted to match backend schema if needed)
interface ProcessStatus {
  id: string;
  name: string;
  category: 'Request' | 'Candidate';
  description?: string;
  isDefault: boolean;
  color: string; // Hex code or Tailwind class for color
}

// Interface for Notifications
interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

const ManageStatuses: React.FC = () => {
  const [processStatuses, setProcessStatuses] = useState<ProcessStatus[]>([]);
  const [statusForm, setStatusForm] = useState<ProcessStatus>({
    id: '',
    name: '',
    category: 'Request',
    description: '',
    isDefault: false,
    color: '#000000',
  });
  const [editingStatus, setEditingStatus] = useState<ProcessStatus | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalAction, setModalAction] = useState<(() => void) | null>(null);

  // Base URL for API (adjust to your backend URL)
  const API_URL = 'http://localhost:4000/api/v1'; // Replace with your backend URL

  // Fetch statuses from backend on component mount
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await axios.get(`${API_URL}/statuses`);
        setProcessStatuses(response.data);
        addNotification('Statuses loaded successfully!', 'success');
      } catch (error) {
        console.error('Error fetching statuses:', error);
        addNotification('Failed to load statuses from server.', 'error');
      }
    };
    fetchStatuses();
  }, []);

  // Notification logic
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

  // Modal logic
  const openConfirmationModal = (actionType: string, payload?: any) => {
    let content = '';
    let action: (() => void) | null = null;

    switch (actionType) {
      case 'deleteStatus':
        content = `Are you sure you want to delete the status "${payload.name}"? This will also update any requests/candidates using this status to a default.`;
        action = () => handleDeleteStatus(payload.id);
        break;
      case 'saveStatus':
        content = 'Are you sure you want to save this status?';
        action = handleSaveStatus;
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

  // Status Management Handlers
  const handleCreateNewStatus = () => {
    setEditingStatus(null);
    setStatusForm({
      id: '',
      name: '',
      category: 'Request',
      description: '',
      isDefault: false,
      color: '#000000',
    });
  };

  const handleEditStatus = (status: ProcessStatus) => {
    setEditingStatus(status);
    setStatusForm(status);
  };

  const handleSaveStatus = async () => {
    if (!statusForm.name || !statusForm.category) {
      addNotification('Status name and category are required.', 'error');
      return;
    }

    try {
      if (editingStatus) {
        // Update existing status
        const response = await axios.put(`${API_URL}/statuses/${statusForm.id}`, statusForm);
        setProcessStatuses((prev) =>
          prev.map((s) => (s.id === statusForm.id ? response.data : s))
        );
        addNotification(`Status "${statusForm.name}" updated successfully!`, 'success');
        setEditingStatus(null);
      } else {
        // Add new status
        const response = await axios.post(`${API_URL}/statuses`, {
          ...statusForm,
          id: undefined, // Let backend generate ID if needed
        });
        setProcessStatuses((prev) => [...prev, response.data]);
        addNotification(`New status "${statusForm.name}" created successfully!`, 'success');
      }
      setStatusForm({
        id: '',
        name: '',
        category: 'Request',
        description: '',
        isDefault: false,
        color: '#000000',
      }); // Reset form
    } catch (error) {
      console.error('Error saving status:', error);
      addNotification('Failed to save status.', 'error');
    }
  };

  const handleDeleteStatus = async (id: string) => {
    const statusToDelete = processStatuses.find(s => s.id === id);
    if (!statusToDelete) return;

    // Find a default status of the same category to reassign
    const defaultStatus = processStatuses.find(
      (s) => s.category === statusToDelete.category && s.isDefault && s.id !== id
    );

    if (!defaultStatus) {
      addNotification('Cannot delete the only non-default status in its category. Please ensure there is at least one default status for each category.', 'error');
      return;
    }

    try {
      // Delete status from backend
      await axios.delete(`${API_URL}/statuses/${id}`);
      
      // Update frontend state
      setProcessStatuses((prev) => prev.filter((s) => s.id !== id));
      addNotification(`Status "${statusToDelete.name}" deleted successfully.`, 'success');
      setEditingStatus(null);

      // Note: Reassigning requests/candidates to default status should ideally be handled by the backend
      // to ensure data consistency. You may need to add an API endpoint to handle this or update
      // staffingRequests and candidates via additional API calls if the backend doesn't manage it.
    } catch (error) {
      console.error('Error deleting status:', error);
      addNotification('Failed to delete status.', 'error');
    }
  };

  const getStatusBadgeColor = (statusName: string) => {
    const statusObj = processStatuses.find(s => s.name === statusName);
    return statusObj ? statusObj.color : 'bg-gray-100 text-gray-800'; // Default if not found
  };

  const renderStatusManagement = () => {
    const requestStatuses = processStatuses.filter(s => s.category === 'Request');
    const candidateStatuses = processStatuses.filter(s => s.category === 'Candidate');

    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
          <FiClipboard className="mr-3 text-orange-500" /> Manage Process Statuses
        </h2>

        {/* Add/Edit Status Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            {editingStatus ? <FiEdit className="mr-2 text-orange-500" /> : <FiPlus className="mr-2 text-orange-500" />}
            {editingStatus ? 'Edit Status' : 'Create New Status'}
          </h3>
          <form onSubmit={(e) => { e.preventDefault(); openConfirmationModal('saveStatus'); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label htmlFor="statusName" className="block text-sm font-medium text-gray-700 mb-1">Status Name</label>
                <input
                  type="text"
                  id="statusName"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                  value={statusForm.name}
                  onChange={(e) => setStatusForm({ ...statusForm, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="statusCategory" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  id="statusCategory"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                  value={statusForm.category}
                  onChange={(e) => setStatusForm({ ...statusForm, category: e.target.value as 'Request' | 'Candidate' })}
                  required
                >
                  <option value="Request">Staffing Request</option>
                  <option value="Candidate">Candidate</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="statusDescription" className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                <textarea
                  id="statusDescription"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-20 resize-y focus:ring-orange-500 focus:border-orange-500"
                  value={statusForm.description || ''}
                  onChange={(e) => setStatusForm({ ...statusForm, description: e.target.value })}
                  placeholder="A brief description of this status"
                />
              </div>
              <div>
                <label htmlFor="statusColor" className="block text-sm font-medium text-gray-700 mb-1">Badge Color (Tailwind CSS Class)</label>
                <input
                  type="text"
                  id="statusColor"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                  value={statusForm.color}
                  onChange={(e) => setStatusForm({ ...statusForm, color: e.target.value })}
                  placeholder="e.g., bg-green-100 text-green-800"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Use Tailwind CSS background and text color classes (e.g., <code className="font-mono">bg-blue-100 text-blue-800</code>).
                </p>
              </div>
              <div className="flex items-center mt-6">
                <input
                  type="checkbox"
                  id="isDefaultStatus"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  checked={statusForm.isDefault}
                  onChange={(e) => setStatusForm({ ...statusForm, isDefault: e.target.checked })}
                />
                <label htmlFor="isDefaultStatus" className="ml-2 block text-sm text-gray-900">
                  Set as Default Status (e.g., for new items or reassignments)
                </label>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              {editingStatus && (
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center"
                  onClick={handleCreateNewStatus}
                >
                  <FiXCircle className="mr-2" /> Cancel Edit
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center"
              >
                <FiSave className="mr-2" /> {editingStatus ? 'Update Status' : 'Add Status'}
              </button>
            </div>
          </form>
        </div>

        {/* Request Statuses Table */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
            <FiFileText className="mr-3 text-orange-500" /> Staffing Request Statuses
          </h3>
          {requestStatuses.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <FiInfo className="mx-auto w-12 h-12 mb-4" />
              <p className="text-lg">No request statuses defined.</p>
              <p className="mt-1 text-sm">Create a new status above and set its category to "Staffing Request".</p>
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
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Default
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Badge
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requestStatuses.map((status) => (
                    <tr key={status.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {status.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {status.description || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {status.isDefault ? <FiCheckCircle className="text-green-500 w-5 h-5" /> : <FiXCircle className="text-red-500 w-5 h-5" />}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>
                          {status.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEditStatus(status)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Edit Status"
                          >
                            <FiEdit className="w-5 h-5" />
                          </button>
                          {!status.isDefault && (
                            <button
                              onClick={() => openConfirmationModal('deleteStatus', status)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete Status"
                            >
                              <FiTrash2 className="w-5 h-5" />
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

        {/* Candidate Statuses Table */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
            <FiUsers className="mr-3 text-orange-500" /> Candidate Statuses
          </h3>
          {candidateStatuses.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <FiInfo className="mx-auto w-12 h-12 mb-4" />
              <p className="text-lg">No candidate statuses defined.</p>
              <p className="mt-1 text-sm">Create a new status above and set its category to "Candidate".</p>
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
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Default
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Badge
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {candidateStatuses.map((status) => (
                    <tr key={status.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {status.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {status.description || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {status.isDefault ? <FiCheckCircle className="text-green-500 w-5 h-5" /> : <FiXCircle className="text-red-500 w-5 h-5" />}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>
                          {status.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEditStatus(status)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Edit Status"
                          >
                            <FiEdit className="w-5 h-5" />
                          </button>
                          {!status.isDefault && (
                            <button
                              onClick={() => openConfirmationModal('deleteStatus', status)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete Status"
                            >
                              <FiTrash2 className="w-5 h-5" />
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
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {/* Notifications */}
        <div className="fixed top-4 right-4 z-50">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 mb-3 rounded-md shadow-lg text-white flex items-center justify-between animate-fade-in-down
                ${notif.type === 'success' ? 'bg-green-500' : ''}
                ${notif.type === 'error' ? 'bg-red-500' : ''}
                ${notif.type === 'info' ? 'bg-blue-500' : ''}
                ${notif.type === 'warning' ? 'bg-yellow-500' : ''}
              `}
              role="alert"
            >
              <span>{notif.message}</span>
              <button onClick={() => removeNotification(notif.id)} className="ml-4 text-white hover:text-gray-200">
                <FiXCircle className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
              <div className="text-center mb-6">
                <FiAlertCircle className="mx-auto text-yellow-500 w-16 h-16 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Confirm Action</h3>
                <p className="text-gray-600">{modalContent}</p>
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleModalConfirm}
                  className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center"
                >
                  <FiCheckCircle className="mr-2" /> Confirm
                </button>
                <button
                  onClick={handleModalCancel}
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors flex items-center"
                >
                  <FiXCircle className="mr-2" /> Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {renderStatusManagement()}
      </main>
    </div>
  );
};

export default ManageStatuses;
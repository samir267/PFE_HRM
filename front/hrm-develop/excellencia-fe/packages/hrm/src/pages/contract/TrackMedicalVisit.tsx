import React, { useState, useEffect, useRef } from 'react';
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
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiPlus,
  FiFilter,
  FiDownload,
  FiUpload,
  FiInfo,
  FiAlertCircle,
  FiX,
  FiHeart,

  FiClipboard,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiChevronUp,
  FiMoreHorizontal,
  FiActivity,
  FiHome,
  FiGlobe,
  FiUsers,
  FiBarChart2,
  FiList,
} from 'react-icons/fi';

// Interface for a Medical Visit
interface MedicalVisit {
  id: string;
  patientId: string;
  patientName: string;
  visitId: string;
  visitDate: string;
  reasonForVisit: string;
  visitStatus: 'Scheduled' | 'Completed' | 'Cancelled' | 'Follow-up';
  doctorName: string;
  notes?: string;
}

// Interface for Medical Visit Details
interface MedicalVisitDetails {
  visitType?: string; // e.g., "General check-up", "Specialist consultation"
  chiefComplaint: string;
  diagnosis?: string;
  treatmentPlan?: string;
  prescriptions?: string;
  billingStatus: 'Paid' | 'Unpaid' | 'Pending';
  lastModifiedDate?: string;
  doctorNotes?: string;
  nextAppointmentDate?: string;
}

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

const MedicalVisitPrintTemplate: React.FC<{ medicalVisit: MedicalVisit; details: MedicalVisitDetails }> = ({ medicalVisit, details }) => (
  <div className="p-8 font-sans text-gray-800">
    <h1 className="text-3xl font-bold text-center mb-6 flex items-center justify-center">
      <FiUser className="mr-2 text-blue-600" /> Medical Visit Summary
    </h1>
    <div className="mb-6 border-b pb-4">
      <h2 className="text-xl font-semibold mb-2">Patient & Visit Information</h2>
      <p><strong>Patient Name:</strong> {medicalVisit.patientName}</p>
      <p><strong>Patient ID:</strong> {medicalVisit.patientId}</p>
      <p><strong>Visit ID:</strong> {medicalVisit.visitId}</p>
      <p><strong>Visit Date:</strong> {medicalVisit.visitDate}</p>
      <p><strong>Doctor:</strong> {medicalVisit.doctorName}</p>
      <p><strong>Reason for Visit:</strong> {medicalVisit.reasonForVisit}</p>
    </div>
    <div className="mb-6 border-b pb-4">
      <h2 className="text-xl font-semibold mb-2">Clinical Details</h2>
      <p><strong>Chief Complaint:</strong> {details.chiefComplaint}</p>
      <p><strong>Diagnosis:</strong> {details.diagnosis || 'N/A'}</p>
      <p><strong>Treatment Plan:</strong> {details.treatmentPlan || 'N/A'}</p>
      <p><strong>Prescriptions:</strong> {details.prescriptions || 'N/A'}</p>
    </div>
    <div className="mb-6 border-b pb-4">
      <h2 className="text-xl font-semibold mb-2">Administrative Information</h2>
      <p><strong>Visit Status:</strong> {medicalVisit.visitStatus}</p>
      <p><strong>Billing Status:</strong> {details.billingStatus}</p>
      <p><strong>Next Appointment:</strong> {details.nextAppointmentDate || 'N/A'}</p>
      <p><strong>Doctor's Notes:</strong> {details.doctorNotes || 'No notes'}</p>
    </div>
  </div>
);

const TrackMedicalVisit: React.FC = () => {
  const [selectedVisit, setSelectedVisit] = useState<MedicalVisit | null>(null);
  const [searchForm, setSearchForm] = useState({
    patientName: '',
    visitId: '',
    doctorName: '',
    visitStatus: '',
  });

  const [visitDetails, setVisitDetails] = useState<MedicalVisitDetails>({
    chiefComplaint: 'Headache',
    diagnosis: 'Migraine',
    treatmentPlan: 'Medication and rest.',
    prescriptions: 'Ibuprofen',
    billingStatus: 'Paid',
    doctorNotes: 'Patient responded well to initial treatment.',
    lastModifiedDate: '2025-08-16',
    nextAppointmentDate: '2025-09-16',
  });

  const [activeMainTab, setActiveMainTab] = useState('listVisits');
  const [activeDetailTab, setActiveDetailTab] = useState('visitDetails');

  const [currentPage, setCurrentPage] = useState(1);
  const [visitsPerPage, setVisitsPerPage] = useState(10);
  const printRef = useRef<HTMLDivElement>(null);

  const [allMedicalVisits, setAllMedicalVisits] = useState<MedicalVisit[]>([
    {
      id: '1',
      patientId: 'P001',
      patientName: 'John Smith',
      visitId: 'V2025-001',
      visitDate: '2025-08-15',
      reasonForVisit: 'Routine Check-up',
      visitStatus: 'Completed',
      doctorName: 'Dr. Emily White',
    },
    {
      id: '2',
      patientId: 'P002',
      patientName: 'Jane Doe',
      visitId: 'V2025-002',
      visitDate: '2025-08-16',
      reasonForVisit: 'Sprained Ankle',
      visitStatus: 'Follow-up',
      doctorName: 'Dr. Alex Brown',
    },
    {
      id: '3',
      patientId: 'P003',
      patientName: 'Peter Jones',
      visitId: 'V2025-003',
      visitDate: '2025-08-17',
      reasonForVisit: 'Fever and Cough',
      visitStatus: 'Scheduled',
      doctorName: 'Dr. Emily White',
    },
    {
      id: '4',
      patientId: 'P004',
      patientName: 'Mary Williams',
      visitId: 'V2025-004',
      visitDate: '2025-08-10',
      reasonForVisit: 'Allergy flare-up',
      visitStatus: 'Completed',
      doctorName: 'Dr. Alex Brown',
    },
    {
      id: '5',
      patientId: 'P005',
      patientName: 'David Clark',
      visitId: 'V2025-005',
      visitDate: '2025-08-12',
      reasonForVisit: 'Consultation',
      visitStatus: 'Cancelled',
      doctorName: 'Dr. Sarah Lee',
    },
  ]);

  const [filteredVisits, setFilteredVisits] = useState<MedicalVisit[]>(allMedicalVisits);
  const [showMoreCriteria, setShowMoreCriteria] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalAction, setModalAction] = useState<(() => void) | null>(null);

  useEffect(() => {
    const filterList = () => {
      const tempVisits = allMedicalVisits.filter((visit) => {
        const matchesName = searchForm.patientName ? visit.patientName.toLowerCase().includes(searchForm.patientName.toLowerCase()) : true;
        const matchesVisitId = searchForm.visitId ? visit.visitId.includes(searchForm.visitId) : true;
        const matchesDoctor = searchForm.doctorName ? visit.doctorName.toLowerCase().includes(searchForm.doctorName.toLowerCase()) : true;
        const matchesStatus = searchForm.visitStatus ? visit.visitStatus.toLowerCase().includes(searchForm.visitStatus.toLowerCase()) : true;
        return matchesName && matchesVisitId && matchesDoctor && matchesStatus;
      });
      setFilteredVisits(tempVisits);
      setCurrentPage(1);
    };
    filterList();
  }, [searchForm, allMedicalVisits]);

  useEffect(() => {
    if (selectedVisit) {
      setVisitDetails({
        chiefComplaint: selectedVisit.id === '1' ? 'General tiredness and headache' : selectedVisit.id === '2' ? 'Pain in left ankle' : 'Fever',
        diagnosis: selectedVisit.id === '1' ? 'Viral infection' : selectedVisit.id === '2' ? 'Ankle sprain' : 'Common cold',
        treatmentPlan: selectedVisit.id === '1' ? 'Rest, hydration, and fever reducers.' : selectedVisit.id === '2' ? 'R.I.C.E. therapy and pain medication.' : 'Rest and fluids',
        prescriptions: selectedVisit.id === '1' ? 'Acetaminophen' : selectedVisit.id === '2' ? 'Ibuprofen' : 'Cough syrup',
        billingStatus: selectedVisit.id === '1' ? 'Paid' : selectedVisit.id === '2' ? 'Unpaid' : 'Pending',
        lastModifiedDate: '2025-08-16',
        doctorNotes: selectedVisit.id === '1' ? 'Patient is advised to get more rest.' : selectedVisit.id === '2' ? 'Patient needs a follow-up visit in 2 weeks.' : 'Monitoring patient response to treatment.',
        nextAppointmentDate: selectedVisit.id === '2' ? '2025-08-30' : '',
      });
    }
  }, [selectedVisit]);

  const indexOfLastVisit = currentPage * visitsPerPage;
  const indexOfFirstVisit = indexOfLastVisit - visitsPerPage;
  const currentVisits = filteredVisits.slice(indexOfFirstVisit, indexOfLastVisit);
  const totalPages = Math.ceil(filteredVisits.length / visitsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getStatusBadgeColor = (status: MedicalVisit['visitStatus']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Follow-up':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
      case 'save':
        content = 'Are you sure you want to save the current medical visit details?';
        action = handleSaveVisitDetails;
        break;
      case 'cancel':
        content = 'Are you sure you want to cancel the current changes? Any unsaved modifications will be lost.';
        action = handleCancel;
        break;
      case 'addNewVisit':
        content = 'Are you sure you want to add a new medical visit record?';
        action = handleAddNewVisit;
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

  const handleSaveVisitDetails = () => {
    setAllMedicalVisits((prevList) =>
      prevList.map((visit) =>
        visit.id === selectedVisit?.id
          ? {
              ...visit,
              patientName: selectedVisit.patientName,
              visitDate: selectedVisit.visitDate,
              reasonForVisit: selectedVisit.reasonForVisit,
              doctorName: selectedVisit.doctorName,
            }
          : visit
      )
    );
    addNotification('Medical visit data saved successfully!', 'success');
    setShowModal(false);
  };

  const handleCancel = () => {
    addNotification('Operation cancelled.', 'warning');
    setShowModal(false);
  };

  const handleAddNewVisit = () => {
    const newId = String(allMedicalVisits.length + 1);
    const newVisitId = `V${newId.padStart(4, '0')}`;
    const newVisit: MedicalVisit = {
      id: newId,
      patientId: `P${newId.padStart(3, '0')}`,
      patientName: 'New Patient',
      visitId: newVisitId,
      visitDate: new Date().toISOString().slice(0, 10),
      reasonForVisit: 'New Visit',
      visitStatus: 'Scheduled',
      doctorName: '',
      notes: '',
    };
    setAllMedicalVisits((prevList) => [newVisit, ...prevList]);
    setSelectedVisit(newVisit);
    setVisitDetails({
      chiefComplaint: '',
      billingStatus: 'Pending',
      lastModifiedDate: '',
    });
    addNotification('New medical visit record added!', 'info');
    setShowModal(false);
  };

  const handlePrintVisit = () => {
    if (!selectedVisit) {
      addNotification('Please select a medical visit to print.', 'warning');
      return;
    }
    const printContent = printRef.current?.innerHTML;
    if (printContent) {
      const printWindow = window.open('', '', 'height=800,width=1200');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Print Medical Visit</title>');
        printWindow.document.write('<script src="https://cdn.tailwindcss.com"></script>');
        printWindow.document.write('<style>@media print { body { -webkit-print-color-adjust: exact; } }</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(printContent);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
      } else {
        addNotification('Could not open print window. Please allow pop-ups for this site.', 'error');
      }
    } else {
      addNotification('No content to print for the selected visit.', 'error');
    }
  };

  const renderVisitDetailsContent = () => {
    if (!selectedVisit) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <FiUser className="w-12 h-12 mb-4 text-blue-400" />
          <p className="text-lg">Select a medical visit from the list to view details.</p>
        </div>
      );
    }
    switch (activeDetailTab) {
      case 'visitDetails':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiUser className="w-5 h-5 mr-3 text-blue-500" />
              Patient & Visit Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                <input
                  type="text"
                  value={selectedVisit.patientName}
                  onChange={(e) => setSelectedVisit({ ...selectedVisit, patientName: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Visit Date</label>
                <input
                  type="date"
                  value={selectedVisit.visitDate}
                  onChange={(e) => setSelectedVisit({ ...selectedVisit, visitDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
                <input
                  type="text"
                  value={selectedVisit.reasonForVisit}
                  onChange={(e) => setSelectedVisit({ ...selectedVisit, reasonForVisit: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Name</label>
                <input
                  type="text"
                  value={selectedVisit.doctorName}
                  onChange={(e) => setSelectedVisit({ ...selectedVisit, doctorName: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Chief Complaint</label>
                <textarea
                  value={visitDetails.chiefComplaint}
                  onChange={(e) => setVisitDetails({ ...visitDetails, chiefComplaint: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-20 resize-y focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter chief complaint..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Doctor's Notes</label>
                <textarea
                  value={visitDetails.doctorNotes || ''}
                  onChange={(e) => setVisitDetails({ ...visitDetails, doctorNotes: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-24 resize-y focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add doctor's notes, observations, etc."
                />
              </div>
            </div>
          </div>
        );
      case 'clinicalInfo':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiHeart className="w-5 h-5 mr-3 text-red-500" />
              Clinical Information for <span className="text-red-600 ml-1">{selectedVisit.patientName}</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
                <input
                  type="text"
                  value={visitDetails.diagnosis || ''}
                  onChange={(e) => setVisitDetails({ ...visitDetails, diagnosis: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-red-500 focus:border-red-500"
                  placeholder="e.g., Migraine, Common Cold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Treatment Plan</label>
                <input
                  type="text"
                  value={visitDetails.treatmentPlan || ''}
                  onChange={(e) => setVisitDetails({ ...visitDetails, treatmentPlan: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-red-500 focus:border-red-500"
                  placeholder="e.g., Medication, rest, therapy"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Prescriptions</label>
                <textarea
                  value={visitDetails.prescriptions || ''}
                  onChange={(e) => setVisitDetails({ ...visitDetails, prescriptions: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-20 resize-y focus:ring-red-500 focus:border-red-500"
                  placeholder="List of prescribed medications and dosages"
                />
              </div>
            </div>
          </div>
        );
      case 'billingAndAdmin':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiClipboard className="w-5 h-5 mr-3 text-orange-500" />
              Billing & Administrative Info
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Visit Status</label>
                <select
                  value={selectedVisit.visitStatus}
                  onChange={(e) => setSelectedVisit({ ...selectedVisit, visitStatus: e.target.value as any })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Follow-up">Follow-up</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Billing Status</label>
                <select
                  value={visitDetails.billingStatus}
                  onChange={(e) => setVisitDetails({ ...visitDetails, billingStatus: e.target.value as any })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Next Appointment Date (Optional)</label>
                <input
                  type="date"
                  value={visitDetails.nextAppointmentDate || ''}
                  onChange={(e) => setVisitDetails({ ...visitDetails, nextAppointmentDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
          </div>
        );
      case 'activityLog':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiActivity className="w-5 h-5 mr-3 text-orange-500" />
              Activity Log for <span className="text-orange-600 ml-1">{selectedVisit.patientName}'s Visit</span>
            </h4>
            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex items-start">
                <FiClock className="w-4 h-4 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                <div>
                  <p>
                    <span className="font-semibold">2025-08-16 10:00 AM:</span> Visit status changed to "{selectedVisit.visitStatus}".
                  </p>
                  <p className="text-gray-500 text-xs">By Dr. {selectedVisit.doctorName}</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiFileText className="w-4 h-4 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                <div>
                  <p>
                    <span className="font-semibold">2025-08-16 09:30 AM:</span> Diagnosis and treatment plan recorded.
                  </p>
                  <p className="text-gray-500 text-xs">By Dr. {selectedVisit.doctorName}</p>
                </div>
              </div>
              <button className="mt-4 w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => addNotification('Loading more activity logs...', 'info')} >
                <FiMoreHorizontal className="mr-2" /> Load More
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleClearFilters = () => {
    setSearchForm({
      patientName: '',
      visitId: '',
      doctorName: '',
      visitStatus: '',
    });
    addNotification('Search filters cleared.', 'info');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Medical Visit Tracker</h1>
            <p className="text-gray-600">Manage and track patient medical visits and records.</p>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
            <button
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm"
              onClick={() => openConfirmationModal('addNewVisit')}
            >
              <FiPlus className="mr-2" /> Add New Visit
            </button>
            <button
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors text-sm"
              onClick={handlePrintVisit}
            >
              <FiPrinter className="mr-2" /> Print Summary
            </button>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center mb-4">
                <FiSearch className="w-6 h-6 mr-3 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">Search & Filter Medical Visits</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">Patient Name</label>
                  <input
                    type="text"
                    id="patientName"
                    value={searchForm.patientName}
                    onChange={(e) => setSearchForm({ ...searchForm, patientName: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Search by name..."
                  />
                </div>
                <div>
                  <label htmlFor="visitId" className="block text-sm font-medium text-gray-700">Visit ID</label>
                  <input
                    type="text"
                    id="visitId"
                    value={searchForm.visitId}
                    onChange={(e) => setSearchForm({ ...searchForm, visitId: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Search by visit ID..."
                  />
                </div>
                <div>
                  <label htmlFor="doctorName" className="block text-sm font-medium text-gray-700">Doctor Name</label>
                  <input
                    type="text"
                    id="doctorName"
                    value={searchForm.doctorName}
                    onChange={(e) => setSearchForm({ ...searchForm, doctorName: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Search by doctor's name..."
                  />
                </div>
                <div>
                  <label htmlFor="visitStatus" className="block text-sm font-medium text-gray-700">Visit Status</label>
                  <select
                    id="visitStatus"
                    value={searchForm.visitStatus}
                    onChange={(e) => setSearchForm({ ...searchForm, visitStatus: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="">All</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Follow-up">Follow-up</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={handleClearFilters}
                  className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                  <FiX className="inline-block mr-2" /> Clear Filters
                </button>
              </div>
            </section>

            <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <FiList className="w-6 h-6 mr-3 text-blue-600" />
                  <h2 className="text-2xl font-semibold text-gray-900">Medical Visits List</h2>
                </div>
                <div className="text-gray-500 text-sm">
                  {filteredVisits.length} visits found
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visit ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="relative px-6 py-3"><span className="sr-only">Select</span></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentVisits.map((visit) => (
                      <tr key={visit.id} className={`cursor-pointer hover:bg-gray-100 ${selectedVisit?.id === visit.id ? 'bg-blue-50' : ''}`} onClick={() => setSelectedVisit(visit)}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{visit.patientName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visit.visitId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visit.visitDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visit.doctorName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(visit.visitStatus)}`}>
                            {visit.visitStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => setSelectedVisit(visit)} className="text-blue-600 hover:text-blue-900">
                            <FiMoreHorizontal className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-700">
                  Showing {indexOfFirstVisit + 1} to {Math.min(indexOfLastVisit, filteredVisits.length)} of {filteredVisits.length} results
                </div>
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiChevronLeft />
                  </button>
                  <span className="text-sm text-gray-700">Page {currentPage} of {totalPages}</span>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiChevronRight />
                  </button>
                </nav>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-4 border-b pb-4">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
                  <FiInfo className="mr-2 text-blue-600" />
                  Visit Details
                </h2>
                {selectedVisit && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openConfirmationModal('save')}
                      className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                      title="Save Details"
                    >
                      <FiSave />
                    </button>
                    <button
                      onClick={() => openConfirmationModal('cancel')}
                      className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                      title="Cancel Changes"
                    >
                      <FiX />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex flex-col space-y-2 mb-4">
                <button
                  onClick={() => setActiveDetailTab('visitDetails')}
                  className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${activeDetailTab === 'visitDetails' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  General Info
                </button>
                <button
                  onClick={() => setActiveDetailTab('clinicalInfo')}
                  className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${activeDetailTab === 'clinicalInfo' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  Clinical Info
                </button>
                <button
                  onClick={() => setActiveDetailTab('billingAndAdmin')}
                  className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${activeDetailTab === 'billingAndAdmin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  Billing & Admin
                </button>
                <button
                  onClick={() => setActiveDetailTab('activityLog')}
                  className={`px-4 py-2 rounded-md transition-colors text-sm font-medium ${activeDetailTab === 'activityLog' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  Activity Log
                </button>
              </div>
              <div className="min-h-[400px]">
                {renderVisitDetailsContent()}
              </div>
            </section>
          </aside>
        </main>

        {/* Notification area */}
        <div className="fixed bottom-6 right-6 z-50 space-y-3 w-full max-w-sm">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-lg shadow-lg flex items-center justify-between ${
                notif.type === 'info' ? 'bg-blue-50 border-blue-200 text-blue-800' :
                notif.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
                notif.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
                'bg-red-50 border-red-200 text-red-800'
              } border`}
              role="alert"
            >
              <div className="flex items-center">
                {notif.type === 'success' ? <FiCheckCircle className="w-5 h-5 mr-3" /> :
                 notif.type === 'error' ? <FiXCircle className="w-5 h-5 mr-3" /> :
                 notif.type === 'warning' ? <FiAlertCircle className="w-5 h-5 mr-3" /> :
                 <FiInfo className="w-5 h-5 mr-3" />}
                <p className="text-sm font-medium">{notif.message}</p>
              </div>
              <button onClick={() => removeNotification(notif.id)} className="ml-4 text-current opacity-75 hover:opacity-100">
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
                <FiAlertCircle className="mr-2 text-blue-500" /> Confirmation
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  onClick={handleModalConfirm}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Component for printing - only visible during PDF generation */}
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', zIndex: -1 }}>
          <div ref={printRef}>
            {selectedVisit && <MedicalVisitPrintTemplate medicalVisit={selectedVisit} details={visitDetails} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackMedicalVisit;
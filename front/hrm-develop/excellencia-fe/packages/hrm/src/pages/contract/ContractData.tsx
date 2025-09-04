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
  FiList, // Added for list view
  FiGrid, // Added for card view
  FiArchive, // Added for archived contracts
  FiLayout, // For card view icon
  FiCheckSquare, // For success notification icon
} from 'react-icons/fi';
import hiringEmployeeService, { employmentContractService } from '../../services/hiringEmployee.service';
import { contractService } from '../../services/contract.service';

// Updated interface for a Contract
interface Contract {
  id: string;
  contractId: string;
  employeeName: string; // Changed from 'name' to be more specific
  contractStatus: 'Active' | 'Expired' | 'Terminated' | 'Pending Renewal' | 'Draft' | 'Archived'; // Contract specific statuses
  contractType: string; // e.g., "Full-time", "Part-time", "Freelance"
  department?: string;
  position?: string;
  email?: string;
  phone?: string;
  startDate: string; // Contract start date
  endDate?: string; // Contract end date (optional for indefinite contracts)
  terminationReason?: string; // Reason for termination if applicable
}

// Updated interface for Contract Details
interface ContractDetails {
  contractReviewer?: string; // e.g., HR Manager
  workIdentifier: string; // Contract ID / Employee ID associated with contract
  contractEligibilityStatus: 'Valid' | 'Invalid' | 'Under Review'; // Detailed contract status
  managerNotes?: string; // Notes from manager
  notes: string; // General notes about the contract
  lastReviewDate?: string; // Date of last contract review
  salaryDetails?: string; // Placeholder for more detailed salary info
  benefitsPackage?: string; // Placeholder for benefits summary
  probationEndDate?: string;
  noticePeriod?: string; // e.g., "1 month", "3 weeks"
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

// ContractPrintTemplate component (for PDF generation)
const ContractPrintTemplate: React.FC<{ contract: Contract; contractDetails: ContractDetails }> = ({ contract, contractDetails }) => (
  <div className="p-8 font-sans text-gray-800">
    <h1 className="text-3xl font-bold text-center mb-6">Contract Details</h1>
    <div className="mb-6 border-b pb-4">
      <h2 className="text-xl font-semibold mb-2">Employee Information</h2>
      <p><strong>Name:</strong> {contract.employeeName}</p>
      <p><strong>Position:</strong> {contract.position}</p>
      <p><strong>Department:</strong> {contract.department}</p>
      <p><strong>Email:</strong> {contract.email}</p>
      <p><strong>Phone:</strong> {contract.phone}</p>
    </div>
    <div className="mb-6 border-b pb-4">
      <h2 className="text-xl font-semibold mb-2">Contract Details</h2>
      <p><strong>Contract ID:</strong> {contract.contractId}</p>
      <p><strong>Status:</strong> {contract.contractStatus}</p>
      <p><strong>Type:</strong> {contract.contractType}</p>
      <p><strong>Start Date:</strong> {contract.startDate}</p>
      <p><strong>End Date:</strong> {contract.endDate || 'N/A'}</p>
      {contract.terminationReason && <p><strong>Termination Reason:</strong> {contract.terminationReason}</p>}
    </div>
    <div className="mb-6 border-b pb-4">
      <h2 className="text-xl font-semibold mb-2">Additional Details</h2>
      <p><strong>Reviewer:</strong> {contractDetails.contractReviewer}</p>
      <p><strong>Eligibility Status:</strong> {contractDetails.contractEligibilityStatus}</p>
      <p><strong>Salary:</strong> {contractDetails.salaryDetails}</p>
      <p><strong>Benefits:</strong> {contractDetails.benefitsPackage}</p>
      <p><strong>Notice Period:</strong> {contractDetails.noticePeriod}</p>
      <p><strong>Last Review:</strong> {contractDetails.lastReviewDate}</p>
      <p><strong>Manager Notes:</strong> {contractDetails.managerNotes}</p>
      <p><strong>General Notes:</strong> {contractDetails.notes}</p>
    </div>
  </div>
);


const ContractData: React.FC = () => {
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

  const [searchForm, setSearchForm] = useState({
    employeeName: '',
    contractId: '',
    contractStatus: '',
    contractType: '',
    department: '',
    position: '',
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

  const [activeMainTab, setActiveMainTab] = useState('listContracts'); // Changed default tab
  const [activeContractDetailTab, setActiveContractDetailTab] = useState('generalInfo');

  const [currentPage, setCurrentPage] = useState(1);
  const [contractsPerPage, setContractsPerPage] = useState(10);
const [allContractList, setAllContractList] = useState<Contract[]>([]);

useEffect(() => {
  const fetchContracts = async () => {
    const response = await contractService.getAllContracts(); // ou getEmployeeContracts()
    
    console.log("salem", response); // inspecte la réponse

    if (response.success) {
      const mappedContracts: Contract[] = response.data!.map((c: any) => ({
        id: c._id || c.id,
        contractId: c.contractId || "",
        employeeName: c.employeeName || "",
        contractStatus: c.contractStatus || "",
        contractType: c.contractType || "",
        department: c.department || "",
        position: c.position || "",
        email: c.email || "",
        phone: c.phone || "",
        startDate: c.startDate
          ? new Date(c.startDate).toISOString().split("T")[0]
          : "",
        endDate: c.endDate
          ? new Date(c.endDate).toISOString().split("T")[0]
          : "",
        terminationReason: c.terminationReason || "",
        dob: c.contractDetails?.dob
          ? new Date(c.contractDetails.dob).toISOString().split("T")[0]
          : "",
        lastReviewDate: c.contractDetails?.lastReviewDate
          ? new Date(c.contractDetails.lastReviewDate).toISOString().split("T")[0]
          : "",
        probationEndDate: c.contractDetails?.probationEndDate
          ? new Date(c.contractDetails.probationEndDate).toISOString().split("T")[0]
          : "",
        benefitsPackage: c.contractDetails?.benefitsPackage || "",
        contractEligibilityStatus: c.contractDetails?.contractEligibilityStatus || "",
        contractReviewer: c.contractDetails?.contractReviewer || "",
        managerNotes: c.contractDetails?.managerNotes || "",
        nationality: c.contractDetails?.nationality || "",
        notes: c.contractDetails?.notes || "",
        noticePeriod: c.contractDetails?.noticePeriod || "",
        salaryDetails: c.contractDetails?.salaryDetails || "",
        workIdentifier: c.contractDetails?.workIdentifier || "",
        linkedInProfile: c.contractDetails?.linkedInProfile || "",
      }));

      setAllContractList(mappedContracts);
    }
  };

  fetchContracts();
}, []);

  // const [allContractList, setAllContractList] = useState<Contract[]>([
  //   {
  //     id: '1',
  //     contractId: 'CONT001',
  //     employeeName: 'ROBERT SMITH',
  //     contractStatus: 'Active',
  //     contractType: 'Full-time',
  //     department: 'Engineering',
  //     position: 'Software Engineer',
  //     email: 'robert.smith@example.com',
  //     phone: '+32 470 11 22 33',
  //     startDate: '2022-03-01',
  //     endDate: '2025-02-28',
  //     terminationReason: '',
  //   },
  //   {
  //     id: '2',
  //     contractId: 'CONT002',
  //     employeeName: 'JANE DOE',
  //     contractStatus: 'Pending Renewal',
  //     contractType: 'Full-time',
  //     department: 'Marketing',
  //     position: 'Marketing Specialist',
  //     email: 'jane.doe@example.com',
  //     phone: '+32 471 98 76 54',
  //     startDate: '2023-01-01',
  //     endDate: '2024-12-31',
  //     terminationReason: '',
  //   },
  //   {
  //     id: '3',
  //     contractId: 'CONT003',
  //     employeeName: 'ALICE JOHNSON',
  //     contractStatus: 'Terminated',
  //     contractType: 'Part-time',
  //     department: 'Sales',
  //     position: 'Sales Representative',
  //     email: 'alice.johnson@example.com',
  //     phone: '+32 472 33 44 55',
  //     startDate: '2021-06-01',
  //     endDate: '2023-05-31',
  //     terminationReason: 'Mutual agreement',
  //   },
  //   {
  //     id: '4',
  //     contractId: 'CONT004',
  //     employeeName: 'MARK BROWN',
  //     contractStatus: 'Expired',
  //     contractType: 'Freelance',
  //     department: 'Finance',
  //     position: 'Financial Analyst',
  //     email: 'mark.brown@example.com',
  //     phone: '+32 473 66 77 88',
  //     startDate: '2022-07-01',
  //     endDate: '2023-12-31',
  //     terminationReason: '',
  //   },
  //   {
  //     id: '5',
  //     contractId: 'CONT005',
  //     employeeName: 'SARAH GREEN',
  //     contractStatus: 'Active',
  //     contractType: 'Full-time',
  //     department: 'HR',
  //     position: 'HR Generalist',
  //     email: 'sarah.green@example.com',
  //     phone: '+32 474 99 00 11',
  //     startDate: '2024-02-01',
  //     endDate: '', // Indefinite contract
  //     terminationReason: '',
  //   },
  //   {
  //     id: '6',
  //     contractId: 'CONT006',
  //     employeeName: 'DAVID LEE',
  //     contractStatus: 'Archived',
  //     contractType: 'Part-time',
  //     department: 'IT',
  //     position: 'IT Support',
  //     email: 'david.lee@example.com',
  //     phone: '+32 475 22 33 44',
  //     startDate: '2021-01-15',
  //     endDate: '2023-01-14',
  //     terminationReason: 'Contract completed',
  //   },
  // ]);










  const [filteredContractList, setFilteredContractList] = useState<Contract[]>(allContractList);
  const [showMoreCriteria, setShowMoreCriteria] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalAction, setModalAction] = useState<(() => void) | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list'); // New state for view mode
  const printRef = useRef<HTMLDivElement>(null); // Ref for the printable content

  const [activeRole, setActiveRole] = useState('Employee'); // State for active role

  const roles = ['Employee', 'HR Expert', 'Admin', 'Manager'];


  // Effect to update filtered list when searchForm changes
  useEffect(() => {
    const filterList = () => {
      let tempContracts = allContractList.filter((contract) => {
        const matchesName = searchForm.employeeName ? contract.employeeName.toLowerCase().includes(searchForm.employeeName.toLowerCase()) : true;
        const matchesContractId = searchForm.contractId ? contract.contractId.includes(searchForm.contractId) : true;
        const matchesContractStatus = searchForm.contractStatus ? contract.contractStatus.toLowerCase().includes(searchForm.contractStatus.toLowerCase()) : true;
        const matchesContractType = searchForm.contractType ? contract.contractType.toLowerCase().includes(searchForm.contractType.toLowerCase()) : true;
        const matchesDepartment = searchForm.department
          ? (contract.department || '').toLowerCase().includes(searchForm.department.toLowerCase())
          : true;
        const matchesPosition = searchForm.position ? (contract.position || '').toLowerCase().includes(searchForm.position.toLowerCase()) : true;

        // Filter based on activeMainTab for 'archivedContracts'
        if (activeMainTab === 'archivedContracts') {
          return contract.contractStatus === 'Archived' && matchesName && matchesContractId && matchesContractType && matchesDepartment && matchesPosition;
        } else {
          // For other tabs, exclude 'Archived' contracts unless explicitly searched for
          return contract.contractStatus !== 'Archived' && matchesName && matchesContractId && matchesContractStatus && matchesContractType && matchesDepartment && matchesPosition;
        }
      });
      setFilteredContractList(tempContracts);
      setCurrentPage(1);
    };
    filterList();
  }, [searchForm, allContractList, activeMainTab]);

  // Effect to update contract details when selected contract changes
  // useEffect(() => {
  //   if (selectedContract) {
  //     // console.log("selectedContract:", selectedContract);
  //     setContractDetails({
  //       contractReviewer: 'HR Manager',
  //       workIdentifier: selectedContract.contractId,
  //       contractEligibilityStatus: selectedContract.contractStatus === 'Active' ? 'Valid' : selectedContract.contractStatus === 'Terminated' ? 'Invalid' : 'Under Review',
  //       managerNotes: selectedContract.id === '1' ? 'Excellent contributor, strong technical skills.' : selectedContract.id === '2' ? 'Good performance, eligible for renewal.' : 'No notes yet.',
  //       notes: selectedContract.id === '2' ? 'Renew contract with updated terms. Discuss promotion.' : 'No specific notes yet.',
  //       lastReviewDate: selectedContract.id === '1' ? '2024-05-15' : selectedContract.id === '2' ? '2024-10-01' : '',
  //       salaryDetails: selectedContract.id === '1' ? 'EUR 60,000 / year' : selectedContract.id === '2' ? 'EUR 45,000 / year' : '',
  //       benefitsPackage: selectedContract.id === '1' ? 'Premium benefits' : selectedContract.id === '2' ? 'Standard benefits + health insurance' : '',
  //       probationEndDate: selectedContract.id === '1' ? '2022-09-01' : selectedContract.id === '2' ? '2023-06-30' : '',
  //       noticePeriod: selectedContract.id === '1' ? '2 months' : selectedContract.id === '2' ? '1 month' : '',
  //       dob: selectedContract.id === '1' ? '1985-03-10' : selectedContract.id === '2' ? '1988-11-25' : '',
  //       nationality: selectedContract.id === '1' ? 'American' : selectedContract.id === '2' ? 'Belgian' : '',
  //       linkedInProfile: selectedContract.id === '1' ? 'https://linkedin.com/in/robertsmith' : selectedContract.id === '2' ? 'https://linkedin.com/in/janedoe' : '',
  //     });
  //   }
  // }, [selectedContract]);

  // Pagination logic
  const indexOfLastContract = currentPage * contractsPerPage;
  const indexOfFirstContract = indexOfLastContract - contractsPerPage;
  const currentContracts = filteredContractList.slice(indexOfFirstContract, indexOfLastContract);
  const totalPages = Math.ceil(filteredContractList.length / contractsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
      case 'Archived':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSearch = () => {
    addNotification('Search initiated!', 'info');
  };
const formatDate = (isoDate?: string) => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // mois de 0 à 11
  const year = date.getFullYear();
  return `${day} / ${month} / ${year}`;
};
  const handleClearFilters = () => {
    setSearchForm({
      employeeName: '',
      contractId: '',
      contractStatus: '',
      contractType: '',
      department: '',
      position: '',
    });
    setShowMoreCriteria(false);
    addNotification('Search filters cleared.', 'info');
  };

  const handleSaveContractDetails = () => {
    console.log('Saving contract details:', contractDetails);
    setAllContractList((prevList) =>
      prevList.map((contract) =>
        contract.id === selectedContract?.id
          ? {
              ...contract,
              employeeName: selectedContract.employeeName,
              department: selectedContract.department,
              position: selectedContract.position,
              contractStatus: contractDetails.contractEligibilityStatus === 'Valid' ? 'Active' :
                              contractDetails.contractEligibilityStatus === 'Invalid' ? 'Terminated' : 'Under Review',
            }
          : contract
      )
    );
    addNotification('Contract data saved successfully!', 'success');
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

  const openConfirmationModal = (actionType: string, contract?: Contract) => {
    let content = '';
    let action: (() => void) | null = null;

    switch (actionType) {
      case 'activate':
        content = `Are you sure you want to activate the contract for ${selectedContract?.employeeName}? This will set its status to "Active".`;
        action = handleActivateContract;
        break;
      case 'terminate':
        content = `Are you sure you want to terminate the contract for ${selectedContract?.employeeName}? This will set its status to "Terminated".`;
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
      case 'addNewContract':
        content = 'Are you sure you want to add a new contract?';
        action = handleAddNewContract;
        break;
      case 'deleteDocument':
        content = 'Are you sure you want to delete this document? This action cannot be undone.';
        action = () => {
          addNotification('Document deleted successfully!', 'success');
          setShowModal(false);
        };
        break;
      case 'archive':
        content = `Are you sure you want to archive the contract for ${contract?.employeeName}? It will be moved to archived contracts.`;
        action = () => handleArchiveContract(contract?.id || '');
        break;
      case 'unarchive':
        content = `Are you sure you want to unarchive the contract for ${contract?.employeeName}? It will be moved back to active contracts.`;
        action = () => handleUnarchiveContract(contract?.id || '');
        break;
      case 'deleteContract':
        content = `Are you sure you want to permanently delete the contract for ${contract?.employeeName}? This action cannot be undone.`;
        action = () => handleDeleteContract(contract?.id || '');
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
    if (!selectedContract) return;
    setContractDetails((prev) => ({ ...prev, contractEligibilityStatus: 'Valid' }));
    setAllContractList((prevList) =>
      prevList.map((contract) => (contract.id === selectedContract.id ? { ...contract, contractStatus: 'Active' } : contract))
    );
    setSelectedContract((prev) => prev ? { ...prev, contractStatus: 'Active' } : null);
    addNotification(`Contract for ${selectedContract.employeeName} has been successfully activated!`, 'success');
    setShowModal(false);
  };

  const handleTerminateContract = () => {
    if (!selectedContract) return;
    setContractDetails((prev) => ({ ...prev, contractEligibilityStatus: 'Invalid' }));
    setAllContractList((prevList) =>
      prevList.map((contract) => (contract.id === selectedContract.id ? { ...contract, contractStatus: 'Terminated' } : contract))
    );
    setSelectedContract((prev) => prev ? { ...prev, contractStatus: 'Terminated' } : null);
    addNotification(`Contract for ${selectedContract.employeeName} has been terminated.`, 'warning');
    setShowModal(false);
  };

  const handleAddNewContract = () => {
    const newId = String(allContractList.length + 1);
    const newContractId = `CONT${newId.padStart(3, '0')}`;
    const newContractRequest: Contract = {
      id: newId,
      contractId: newContractId,
      employeeName: 'New Contract Draft',
      contractStatus: 'Draft',
      contractType: '',
      startDate: '',
      endDate: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      terminationReason: '',
    };
    setAllContractList((prevList) => [newContractRequest, ...prevList]);
    setSelectedContract(newContractRequest);
    setContractDetails({
      contractReviewer: 'HR Manager',
      workIdentifier: newContractRequest.contractId,
      contractEligibilityStatus: 'Under Review',
      notes: 'New contract draft added, please fill in details.',
      lastReviewDate: '',
      salaryDetails: '',
      benefitsPackage: '',
      probationEndDate: '',
      noticePeriod: '',
      managerNotes: '',
      dob: '',
      nationality: '',
      linkedInProfile: '',
    });
    setActiveContractDetailTab('generalInfo');
    addNotification('New contract draft added! Please fill in the details.', 'info');
    setShowModal(false);
  };

  const handleArchiveContract = (id: string) => {
    setAllContractList((prevList) =>
      prevList.map((contract) =>
        contract.id === id ? { ...contract, contractStatus: 'Archived', terminationReason: 'Archived by user' } : contract
      )
    );
    addNotification('Contract archived successfully!', 'success');
    setSelectedContract(null); // Deselect the contract after archiving
    setShowModal(false);
  };

  const handleUnarchiveContract = (id: string) => {
    setAllContractList((prevList) =>
      prevList.map((contract) =>
        contract.id === id ? { ...contract, contractStatus: 'Active', terminationReason: '' } : contract
      )
    );
    addNotification('Contract unarchived successfully!', 'success');
    setSelectedContract(null); // Deselect the contract after unarchiving
    setShowModal(false);
  };

  const handleDeleteContract = (id: string) => {
    setAllContractList((prevList) => prevList.filter((contract) => contract.id !== id));
    addNotification('Contract deleted permanently!', 'success');
    setSelectedContract(null); // Deselect the contract after deleting
    setShowModal(false);
  };


  const handleExportContracts = (type: 'currentView' | 'all' | 'selected') => {
    let dataToExport: Contract[] = [];
    let fileName = 'contracts';

    if (type === 'currentView') {
      dataToExport = currentContracts;
      fileName = 'current_view_contracts';
    } else if (type === 'all') {
      dataToExport = allContractList;
      fileName = 'all_contracts';
    } else if (type === 'selected' && selectedContract) {
      dataToExport = [selectedContract];
      fileName = `selected_contract_${selectedContract.contractId}`;
    } else {
      addNotification('No data to export or no contract selected.', 'warning');
      return;
    }

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        Object.keys(dataToExport[0]).join(','),
        ...dataToExport.map((item) => Object.values(item).map(value => `"${value}"`).join(',')),
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${fileName}.csv`);
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link); // Clean up
    addNotification(`Exported ${type} contracts to CSV!`, 'success');
  };

  const handlePrintContract = () => {
    if (!selectedContract) {
      addNotification('Please select a contract to print.', 'warning');
      return;
    }
    const printContent = printRef.current?.innerHTML;
    if (printContent) {
      const printWindow = window.open('', '', 'height=800,width=1200');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Print Contract</title>');
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
      addNotification('No content to print for the selected contract.', 'error');
    }
  };
const handleContractAction = async (action: 'activate' | 'terminate') => {
  try {
    console.log("nekhdem")
    const response = await employmentContractService.performAction(selectedContract!.id, action);
    
    if (response.success) {
      addNotification(
        action === 'activate' ? 'Contract activated successfully!' : 'Contract terminated successfully!',
        'success'
      );
      
    } else {
      addNotification(response.message || 'Action failed', 'error');
    }
  } catch (error) {
    console.error(error);
    addNotification('Internal server error', 'error');
  }
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
                  value={selectedContract.id}
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
                  value={selectedContract.notes}
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
  type="text"
  value={formatDate(selectedContract.dob || '01-01-2000')}
  readOnly
  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
/>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                  <input
                    type="text"
                    value={selectedContract.nationality || ''}
                    onChange={(e) => setContractDetails({ ...contractDetails, nationality: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
                  <input
                    type="url"
                    value={selectedContract.linkedInProfile || ''}
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
                  // onClick={() => openConfirmationModal('activate')}
                  onClick={() => handleContractAction('activate')}
                  disabled={selectedContract.contractStatus === 'Active'}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiCheckCircle className="w-5 h-5" />
                  <span>Activate Contract</span>
                </button>
                <button
                  // onClick={() => openConfirmationModal('terminate')}
                  onClick={() => handleContractAction('terminate')}
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
                      value={selectedContract.notes || ''}
                      onChange={(e) => setContractDetails({ ...contractDetails, managerNotes: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-20 resize-y focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Summary of manager's feedback"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contract Eligibility Status</label>
                    <select
                      value={selectedContract.contractEligibilityStatus}
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
                      value={selectedContract.lastReviewDate || ''}
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
                <FiPlusCircle className="w-4 h-4 mr-3 mt-1 text-gray-500 flex-shrink-0" />
                <div>
                  <p>
                    <span className="font-semibold">2025-07-22 01:00 PM:</span> Contract draft created.
                  </p>
                  <p className="text-gray-500 text-xs">System generated</p>
                </div>
              </div>
              <button className="mt-4 w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors" onClick={() => addNotification('Loading more activity logs...', 'info')} >
                <FiMoreHorizontal className="mr-2" /> Load More
              </button>
            </div>
          </div>
        );
      case 'assignTheoreticalHours':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiClock className="w-5 h-5 mr-3 text-orange-500" /> Assign Theoretical Hours for <span className="text-orange-600 ml-1">{selectedContract.employeeName}</span>
            </h4>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-700">
              {/* Placeholder for AssignTheoreticalHours.tsx content */}
              <p>This section would contain the UI and logic for assigning theoretical work hours to the employee under this contract.</p>
              <ul className="list-disc list-inside mt-3 space-y-1">
                <li>Input fields for weekly/monthly hours</li>
                <li>Option to set different hours for specific periods</li>
                <li>Save/Update actions</li>
              </ul>
              {/* You would integrate AssignTheoreticalHours.tsx component here */}
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
              <FiDollarSign className="w-5 h-5 mr-3 text-orange-500" /> Benefits Management for <span className="text-orange-600 ml-1">{selectedContract.employeeName}</span>
            </h4>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-700">
              {/* Placeholder for BenefitsManagement.tsx content */}
              <p>This section would display and allow management of benefits associated with this employee's contract.</p>
              <ul className="list-disc list-inside mt-3 space-y-1">
                <li>List of assigned benefits (e.g., Health, Dental, Retirement)</li>
                <li>Options to add, edit, or remove benefits</li>
                <li>Benefit enrollment status</li>
              </ul>
              {/* You would integrate BenefitsManagement.tsx component here */}
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
              <FiCreditCard className="w-5 h-5 mr-3 text-orange-500" /> Consult Payroll Records for <span className="text-orange-600 ml-1">{selectedContract.employeeName}</span>
            </h4>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-700">
              {/* Placeholder for ConsultPayrollRecords.tsx content */}
              <p>This section would provide access to the employee's historical payroll records.</p>
              <ul className="list-disc list-inside mt-3 space-y-1">
                <li>List of pay stubs by date</li>
                <li>Gross/Net pay, deductions, and taxes</li>
                <li>Option to view or download individual records</li>
              </ul>
              {/* You would integrate ConsultPayrollRecords.tsx component here */}
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
              <FiBriefcase className="w-5 h-5 mr-3 text-orange-500" /> Modify Assignment for <span className="text-orange-600 ml-1">{selectedContract.employeeName}</span>
            </h4>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-700">
              {/* Placeholder for ModifyAssignment.tsx content */}
              <p>This section would allow modifications to the employee's current assignment details (e.g., role, project, team).</p>
              <ul className="list-disc list-inside mt-3 space-y-1">
                <li>Fields for new position, department, reporting manager</li>
                <li>Effective date of change</li>
                <li>Reason for modification</li>
              </ul>
              {/* You would integrate ModifyAssignment.tsx component here */}
              <div className="mt-4 p-3 border border-dashed border-gray-300 rounded-md text-gray-500 text-center">
                &lt;ModifyAssignment employeeId={selectedContract.contractId} /&gt;
              </div>
            </div>
          </div>
        );
      case 'remunerationDetails':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiDollarSign className="w-5 h-5 mr-3 text-orange-500" /> Remuneration Details for <span className="text-orange-600 ml-1">{selectedContract.employeeName}</span>
            </h4>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-700">
              {/* Placeholder for RemunerationDetails.tsx content */}
              <p>This section would provide a detailed breakdown of the employee's remuneration package.</p>
              <ul className="list-disc list-inside mt-3 space-y-1">
                <li>Base salary, bonuses, allowances</li>
                <li>Payment frequency</li>
                <li>History of salary changes</li>
              </ul>
              {/* You would integrate RemunerationDetails.tsx component here */}
              <div className="mt-4 p-3 border border-dashed border-gray-300 rounded-md text-gray-500 text-center">
                &lt;RemunerationDetails employeeId={selectedContract.contractId} /&gt;
              </div>
            </div>
          </div>
        );
      case 'sanctions':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiAlertCircle className="w-5 h-5 mr-3 text-orange-500" /> Sanctions/Disciplinary Actions for <span className="text-orange-600 ml-1">{selectedContract.employeeName}</span>
            </h4>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-700">
              {/* Placeholder for Sanctions.tsx content */}
              <p>This section would record and manage any disciplinary actions or sanctions against the employee.</p>
              <ul className="list-disc list-inside mt-3 space-y-1">
                <li>Date of sanction, type, reason</li>
                <li>Issuing authority</li>
                <li>Resolution or status</li>
              </ul>
              {/* You would integrate Sanctions.tsx component here */}
              <div className="mt-4 p-3 border border-dashed border-gray-300 rounded-md text-gray-500 text-center">
                &lt;Sanctions employeeId={selectedContract.contractId} /&gt;
              </div>
            </div>
          </div>
        );
      case 'trackMedicalVisit':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiPlusCircle className="w-5 h-5 mr-3 text-orange-500" /> Track Medical Visits for <span className="text-orange-600 ml-1">{selectedContract.employeeName}</span>
            </h4>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-700">
              {/* Placeholder for TrackMedicalVisit.tsx content */}
              <p>This section would allow tracking of employee medical visits and related health information.</p>
              <ul className="list-disc list-inside mt-3 space-y-1">
                <li>Date of visit, reason, outcome</li>
                <li>Doctor's notes (if permissible and relevant)</li>
                <li>Attachments for medical certificates</li>
              </ul>
              {/* You would integrate TrackMedicalVisit.tsx component here */}
              <div className="mt-4 p-3 border border-dashed border-gray-300 rounded-md text-gray-500 text-center">
                &lt;TrackMedicalVisit employeeId={selectedContract.contractId} /&gt;
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderMainContent = () => {
    switch (activeMainTab) {
      case 'createContract':
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <FiPlus className="w-6 h-6 mr-3 text-orange-600" /> Create New Contract
            </h2>
            <p className="text-gray-700 mb-4">Click the button below to generate a new draft contract. You can then fill in the details in the Contract Details section.</p>
            <button
              onClick={() => openConfirmationModal('addNewContract')}
              className="px-6 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center space-x-2 text-lg"
            >
              <FiPlus className="w-6 h-6" /> <span>Generate New Contract Draft</span>
            </button>
            {selectedContract && (
              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-blue-800 font-medium">New Contract Draft Created:</p>
                <p className="text-blue-700">ID: {selectedContract.contractId}, Employee: {selectedContract.employeeName}</p>
                <p className="text-blue-700">Status: {selectedContract.contractStatus}</p>
                <button
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                  onClick={() => setActiveMainTab('contractDetails')}
                >
                  Go to Contract Details
                </button>
              </div>
            )}
          </div>
        );
      case 'listContracts':
      case 'cardViewContracts':
      case 'archivedContracts':
        return (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <FiSearch className="w-6 h-6 mr-3 text-orange-600" /> Contract Search & Filters
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Search by name"
                    value={searchForm.employeeName}
                    onChange={(e) => setSearchForm({ ...searchForm, employeeName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contract ID</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Search by Contract ID"
                    value={searchForm.contractId}
                    onChange={(e) => setSearchForm({ ...searchForm, contractId: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                    value={searchForm.contractStatus}
                    onChange={(e) => setSearchForm({ ...searchForm, contractStatus: e.target.value })}
                  >
                    <option value="">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Pending Renewal">Pending Renewal</option>
                    <option value="Expired">Expired</option>
                    <option value="Terminated">Terminated</option>
                    <option value="Draft">Draft</option>
                    {activeMainTab === 'archivedContracts' && <option value="Archived">Archived</option>}
                  </select>
                </div>
                {showMoreCriteria && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contract Type</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                        placeholder="e.g., Full-time"
                        value={searchForm.contractType}
                        onChange={(e) => setSearchForm({ ...searchForm, contractType: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                        placeholder="e.g., Marketing"
                        value={searchForm.department}
                        onChange={(e) => setSearchForm({ ...searchForm, department: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                        placeholder="e.g., Analyst"
                        value={searchForm.position}
                        onChange={(e) => setSearchForm({ ...searchForm, position: e.target.value })}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={() => setShowMoreCriteria(!showMoreCriteria)}
                  className="text-orange-600 hover:text-orange-800 text-sm flex items-center"
                >
                  <FiFilter className="mr-2" /> {showMoreCriteria ? 'Less Filters' : 'More Filters'}
                </button>
                <div className="space-x-3">
                  <button
                    onClick={handleClearFilters}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center"
                  >
                    <FiX className="mr-2" /> Clear
                  </button>
                  <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center"
                  >
                    <FiSearch className="mr-2" /> Search
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                {activeMainTab === 'archivedContracts' ? <FiArchive className="w-6 h-6 mr-3 text-purple-600" /> : <FiFileText className="w-6 h-6 mr-3 text-orange-600" />}
                {activeMainTab === 'archivedContracts' ? 'Archived Contracts' : 'All Contracts'} ({filteredContractList.length})
              </h2>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-orange-400 hover:text-white transition-colors`}
                  title="List View"
                >
                  <FiClipboard className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('card')}
                  className={`p-2 rounded-md ${viewMode === 'card' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-orange-400 hover:text-white transition-colors`}
                  title="Card View"
                >
                  <FiLayout className="w-5 h-5" />
                </button>
                <div className="relative group">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <FiDownload className="w-5 h-5" /> <span>Export</span> <FiChevronDown className="ml-2" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-200 invisible">
                    <button onClick={() => handleExportContracts('currentView')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      Export Current View (CSV)
                    </button>
                    <button onClick={() => handleExportContracts('all')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      Export All (CSV)
                    </button>
                    {selectedContract && (
                      <button onClick={() => handleExportContracts('selected')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                        Export Selected (CSV)
                      </button>
                    )}
                    <button onClick={handlePrintContract} disabled={!selectedContract} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left disabled:opacity-50 disabled:cursor-not-allowed">
                      Print Selected Contract (PDF)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {filteredContractList.length > 0 ? (
              <>
                {viewMode === 'list' ? (
                  <div className="overflow-x-auto bg-white rounded-lg shadow-md mb-6">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contract ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Employee Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Department
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Start Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentContracts.map((contract) => (
                          <tr
                            key={contract.id}
                            className={`hover:bg-gray-50 cursor-pointer ${selectedContract?.id === contract.id ? 'bg-orange-50' : ''}`}
                            onClick={() => handleContractSelect(contract)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {contract.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {contract.employeeName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(contract.contractStatus)}`} >
                                {contract.contractStatus}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {contract.contractType}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {contract.department || 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {contract.startDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={(e) => { e.stopPropagation(); handleContractSelect(contract); setActiveMainTab('contractDetails'); }}
                                className="text-orange-600 hover:text-orange-900 mr-4"
                                title="Edit Contract"
                              >
                                <FiEdit className="inline-block w-5 h-5" />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); openConfirmationModal('archive', contract); }}
                                className="text-purple-600 hover:text-purple-900 mr-4"
                                title="Archive Contract"
                                disabled={contract.contractStatus === 'Archived'}
                              >
                                <FiArchive className="inline-block w-5 h-5" />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); openConfirmationModal('deleteContract', contract); }}
                                className="text-red-600 hover:text-red-900"
                                title="Delete Contract"
                              >
                                <FiTrash2 className="inline-block w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {currentContracts.map((contract) => (
                      <div
                        key={contract.id}
                        className={`bg-white rounded-lg shadow-md p-6 border ${selectedContract?.id === contract.id ? 'border-orange-500 ring-1 ring-orange-500' : 'border-gray-200'} hover:shadow-lg transition-shadow duration-200 cursor-pointer flex flex-col`}
                        onClick={() => handleContractSelect(contract)}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">{contract.employeeName}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(contract.contractStatus)}`} >
                            {contract.contractStatus}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2"><strong>ID:</strong> {contract.contractId}</p>
                        <p className="text-gray-700 mb-2"><strong>Type:</strong> {contract.contractType}</p>
                        <p className="text-gray-700 mb-2"><strong>Department:</strong> {contract.department || 'N/A'}</p>
                        <p className="text-gray-700 mb-2"><strong>Position:</strong> {contract.position || 'N/A'}</p>
                        <p className="text-gray-700 mb-4"><strong>Dates:</strong> {contract.startDate} - {contract.endDate || 'Indefinite'}</p>
                        <div className="flex-grow"></div> {/* Pushes buttons to the bottom */}
                        <div className="flex justify-end space-x-2 mt-4">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleContractSelect(contract); setActiveMainTab('contractDetails'); }}
                            className="p-2 text-orange-600 hover:bg-orange-100 rounded-full"
                            title="View/Edit Details"
                          >
                            <FiEdit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); openConfirmationModal('archive', contract); }}
                            className="p-2 text-purple-600 hover:bg-purple-100 rounded-full"
                            title="Archive Contract"
                            disabled={contract.contractStatus === 'Archived'}
                          >
                            <FiArchive className="w-5 h-5" />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); openConfirmationModal('deleteContract', contract); }}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                            title="Delete Contract"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex justify-between items-center mt-6">
                  <div className="text-sm text-gray-700">
                    Showing {indexOfFirstContract + 1} - {Math.min(indexOfLastContract, filteredContractList.length)} of {filteredContractList.length} contracts
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiChevronLeft className="w-5 h-5" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="text-sm text-gray-700">
                    Contracts per page:
                    <select
                      value={contractsPerPage}
                      onChange={(e) => setContractsPerPage(Number(e.target.value))}
                      className="ml-2 border border-gray-300 rounded-md py-1 px-2 text-sm"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                    </select>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
                <p>No contracts found matching your criteria.</p>
              </div>
            )}
          </>
        );
      case 'contractDetails':
        return renderContractDetailsContent();
      default:
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to Contract Management</h2>
            <p className="text-gray-700">Use the navigation to manage your contracts.</p>
          </div>
        );
    }
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
        <span>Contract</span>
        <FiChevronRight className="w-4 h-4" />
        <span className="text-orange-300">Contract Data</span>
      </div>

      <div className="w-full p-4 mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <FiFileText className="w-8 h-8 mr-3 text-orange-600" /> Contract Management Dashboard
        </h1>

        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex space-x-4 overflow-x-auto">
          <button
            onClick={() => setActiveMainTab('createContract')}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${activeMainTab === 'createContract' ? 'bg-orange-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
          >
            <FiPlus className="mr-2" /> Create Contract
          </button>
          <button
            onClick={() => { setActiveMainTab('listContracts'); setSelectedContract(null); }}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${activeMainTab === 'listContracts' || activeMainTab === 'cardViewContracts' ? 'bg-orange-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
          >
            <FiClipboard className="mr-2" /> View Contracts
          </button>
          <button
            onClick={() => { setActiveMainTab('archivedContracts'); setSelectedContract(null); }}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${activeMainTab === 'archivedContracts' ? 'bg-orange-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
          >
            <FiArchive className="mr-2" /> Archived Contracts
          </button>
          {selectedContract && (
            <button
              onClick={() => setActiveMainTab('contractDetails')}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${activeMainTab === 'contractDetails' ? 'bg-orange-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
            >
              <FiEdit className="mr-2" /> Edit Selected Contract
            </button>
          )}
        </div>

        {/* Conditional rendering for main content */}
        <div className="grid grid-cols-1 gap-6">
          {activeMainTab === 'contractDetails' && selectedContract ? (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Contract Details Navigation */}
              <div className="lg:w-1/4 bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contract Sections</h3>
                <nav>
                  <ul>
                    <li>
                      <button
                        onClick={() => setActiveContractDetailTab('generalInfo')}
                        className={`w-full text-left px-4 py-2 rounded-md flex items-center mb-2 transition-colors ${activeContractDetailTab === 'generalInfo' ? 'bg-orange-100 text-orange-800' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <FiInfo className="mr-2" /> General Information
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveContractDetailTab('contractWorkflow')}
                        className={`w-full text-left px-4 py-2 rounded-md flex items-center mb-2 transition-colors ${activeContractDetailTab === 'contractWorkflow' ? 'bg-orange-100 text-orange-800' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <FiBriefcase className="mr-2" /> Contract Workflow
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveContractDetailTab('documents')}
                        className={`w-full text-left px-4 py-2 rounded-md flex items-center mb-2 transition-colors ${activeContractDetailTab === 'documents' ? 'bg-orange-100 text-orange-800' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <FiFileText className="mr-2" /> Documents
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveContractDetailTab('activityLog')}
                        className={`w-full text-left px-4 py-2 rounded-md flex items-center mb-2 transition-colors ${activeContractDetailTab === 'activityLog' ? 'bg-orange-100 text-orange-800' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <FiActivity className="mr-2" /> Activity Log
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveContractDetailTab('assignTheoreticalHours')}
                        className={`w-full text-left px-4 py-2 rounded-md flex items-center mb-2 transition-colors ${activeContractDetailTab === 'assignTheoreticalHours' ? 'bg-orange-100 text-orange-800' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <FiClock className="mr-2" /> Theoretical Hours
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveContractDetailTab('benefitsManagement')}
                        className={`w-full text-left px-4 py-2 rounded-md flex items-center mb-2 transition-colors ${activeContractDetailTab === 'benefitsManagement' ? 'bg-orange-100 text-orange-800' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <FiDollarSign className="mr-2" /> Benefits Management
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveContractDetailTab('consultPayrollRecords')}
                        className={`w-full text-left px-4 py-2 rounded-md flex items-center mb-2 transition-colors ${activeContractDetailTab === 'consultPayrollRecords' ? 'bg-orange-100 text-orange-800' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <FiCreditCard className="mr-2" /> Payroll Records
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveContractDetailTab('modifyAssignment')}
                        className={`w-full text-left px-4 py-2 rounded-md flex items-center mb-2 transition-colors ${activeContractDetailTab === 'modifyAssignment' ? 'bg-orange-100 text-orange-800' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <FiBriefcase className="mr-2" /> Modify Assignment
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveContractDetailTab('remunerationDetails')}
                        className={`w-full text-left px-4 py-2 rounded-md flex items-center mb-2 transition-colors ${activeContractDetailTab === 'remunerationDetails' ? 'bg-orange-100 text-orange-800' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <FiDollarSign className="mr-2" /> Remuneration Details
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveContractDetailTab('sanctions')}
                        className={`w-full text-left px-4 py-2 rounded-md flex items-center mb-2 transition-colors ${activeContractDetailTab === 'sanctions' ? 'bg-orange-100 text-orange-800' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <FiAlertCircle className="mr-2" /> Sanctions
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveContractDetailTab('trackMedicalVisit')}
                        className={`w-full text-left px-4 py-2 rounded-md flex items-center mb-2 transition-colors ${activeContractDetailTab === 'trackMedicalVisit' ? 'bg-orange-100 text-orange-800' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        <FiPlusCircle className="mr-2" /> Medical Visits
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
              {/* Contract Details Content */}
              <div className="lg:w-3/4">
                {renderContractDetailsContent()}
              </div>
            </div>
          ) : ( // Other main tab content
            renderMainContent()
          )}
        </div>
      </div>

      {/* Hidden component for printing - only visible during PDF generation */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', zIndex: -1 }}>
        <div ref={printRef}>
          {selectedContract && <ContractPrintTemplate contract={selectedContract} contractDetails={contractDetails} />}
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
    </div>
  );
};

export default ContractData;

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
  FiEye,
  FiCheckSquare,
} from 'react-icons/fi';
import employmentContractService from '../../services/hiringEmployee.service';
import { contractService } from '../../services/contract.service';
import axios from 'axios';

// Interface for an Employee
interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  registrationNumber: string;
  email?: string;
  phone?: string;
}

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
  personalEmail?: string;
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

// Combined contract with details for storage
interface StoredContract extends Contract {
  contractDetails: ContractDetails;
  createdAt: string;
}

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

interface MultiSelectDropdownProps {
  label: string;
  options: { value: string; label: string }[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  disabled?: boolean;
  singleSelect?: boolean;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ label, options, selectedValues, onChange, disabled = false, singleSelect = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCheckboxChange = (value: string) => {
    if (disabled) return;
    if (singleSelect) {
      onChange([value]);
      setIsOpen(false);
    } else {
      if (selectedValues.includes(value)) {
        onChange(selectedValues.filter((item) => item !== value));
      } else {
        onChange([...selectedValues, value]);
      }
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <button
        type="button"
        className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-left flex items-center justify-between focus:ring-orange-500 focus:border-orange-500 ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span>
          {selectedValues.length === 0
            ? `Select ${label.toLowerCase()}`
            : selectedValues.map((value) => options.find((opt) => opt.value === value)?.label || value).join(', ')}
        </span>
        {isOpen ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <label key={option.value} className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer">
              <input
                type={singleSelect ? 'radio' : 'checkbox'}
                name={label}
                value={option.value}
                checked={selectedValues.includes(option.value)}
                onChange={() => handleCheckboxChange(option.value)}
                className="form-checkbox h-4 w-4 text-orange-600 transition duration-150 ease-in-out"
                disabled={disabled}
              />
              <span className="ml-2 text-gray-800 text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const CreateContract: React.FC = () => {
  const [newContract, setNewContract] = useState<Contract>({
    id: '',
    contractId: '',
    employeeName: '',
    contractStatus: 'Draft',
    contractType: '',
    department: '',
    position: '',
    email: '',
    personalEmail: '',
    phone: '',
    startDate: '',
    endDate: '',
    terminationReason: '',
  });

  const [newContractDetails, setNewContractDetails] = useState<ContractDetails>({
    contractReviewer: 'HR Manager',
    workIdentifier: '',
    contractEligibilityStatus: 'Under Review',
    managerNotes: '',
    notes: '',
    lastReviewDate: '',
    salaryDetails: '',
    benefitsPackage: '',
    probationEndDate: '',
    noticePeriod: '',
    dob: '',
    nationality: '',
    linkedInProfile: '',
  });

  // NEW: State for employees and selected employee
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');

  const [createdContracts, setCreatedContracts] = useState<StoredContract[]>([]);
  const [selectedContractForPreview, setSelectedContractForPreview] = useState<StoredContract | null>(null);

  const [activeTab, setActiveTab] = useState<'create' | 'preview'>('create');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalAction, setModalAction] = useState<(() => void) | null>(null);

  const [selectedSalaryDetails, setSelectedSalaryDetails] = useState<string[]>([]);
  const [selectedBenefitsPackage, setSelectedBenefitsPackage] = useState<string[]>([]);
  const [selectedNoticePeriod, setSelectedNoticePeriod] = useState<string[]>([]);
  const [selectedManagerNotes, setSelectedManagerNotes] = useState<string[]>([]);
  const [selectedContractEligibilityStatus, setSelectedContractEligibilityStatus] = useState<string[]>(['Under Review']);

  const [roles, setRoles] = useState(['Admin', 'HR Manager', 'Employee']);
  const [activeRole, setActiveRole] = useState('HR Manager');
  const [layoutMode, setLayoutMode] = useState<'existing' | 'onboarding'>('existing');
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // NEW: Fetch employees on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response =await axios.get("http://localhost:4000/api/v1/kafka/getemployees");
        console.log('Response:', response);
        let employees: Employee[] = [];
        if (Array.isArray(response)) {
          employees = response;
        } else if (response?.data && Array.isArray(response.data)) {
          employees = response.data;
        } else if (response?.employees && Array.isArray(response.employees)) {
          employees = response.employees;
        } else if (response?.result && Array.isArray(response.result)) {
          employees = response.result;
        }
        const formattedEmployees: Employee[] = employees.map((emp: any, index: number) => ({
          id: emp._id ?? emp.id ?? `emp_${index}`,
          firstName: emp.firstName ?? '',
          lastName: emp.lastName ?? '',
          registrationNumber: emp.registrationNumber ?? `PD-${index + 1}`,
          email: emp.personalEmail ?? '',
          phone: emp.mobilePhone ?? '',
        }));
        setAllEmployees(formattedEmployees);
      } catch (error) {
        console.error('Erreur lors du chargement des employés:', error);
        addNotification('Erreur lors du chargement des employés', 'error');
      }
    };
    fetchEmployees();
  }, []);

  // NEW: Fetch employee details when selectedEmployeeId changes
  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      if (!selectedEmployeeId) {
        // Reset fields if no employee is selected
        setNewContract((prev) => ({
          ...prev,
          employeeName: '',
          email: '',
          phone: '',
        }));
        return;
      }
      try {
        const employee = allEmployees.find((emp) => emp.id === selectedEmployeeId);
        if (employee) {
          setNewContract((prev) => ({
            ...prev,
            employeeName: `${employee.firstName} ${employee.lastName}`.trim(),
            email: employee.email || '',
            phone: employee.phone || '',
          }));
        } else {
          // Optional: Fetch from API if not found in allEmployees
          const response = await employmentContractService.getEmployeeDetails(selectedEmployeeId);
          const empData = response?.data || response;
          setNewContract((prev) => ({
            ...prev,
            employeeName: `${empData.firstName || ''} ${empData.lastName || ''}`.trim() || 'Unknown Employee',
            email: empData.email || '',
            phone: empData.phone || '',
          }));
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'employé:', error);
        addNotification('Erreur lors de la récupération des détails de l\'employé', 'error');
      }
    };
    fetchEmployeeDetails();
  }, [selectedEmployeeId, allEmployees]);

  // Effect to update newContractDetails workIdentifier
  useEffect(() => {
    setNewContractDetails((prev) => ({ ...prev, workIdentifier: newContract.contractId }));
  }, [newContract.contractId]);

  // Effect to set preview
  useEffect(() => {
    if (!selectedContractForPreview) {
      const tempContract: StoredContract = {
        ...newContract,
        id: newContract.id || 'temp',
        contractDetails: {
          ...newContractDetails,
          salaryDetails: selectedSalaryDetails.join(', '),
          benefitsPackage: selectedBenefitsPackage.join(', '),
          noticePeriod: selectedNoticePeriod.join(', '),
          managerNotes: selectedManagerNotes.join(', '),
          contractEligibilityStatus: selectedContractEligibilityStatus[0] as 'Valid' | 'Invalid' | 'Under Review',
        },
        createdAt: new Date().toISOString(),
      };
      setSelectedContractForPreview(tempContract);
    }
  }, [newContract, newContractDetails, selectedSalaryDetails, selectedBenefitsPackage, selectedNoticePeriod, selectedManagerNotes, selectedContractEligibilityStatus, selectedContractForPreview]);

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

  const openConfirmationModal = (actionType: string, action: (() => void) | null) => {
    let content = '';
    switch (actionType) {
      case 'create':
        content = 'Are you sure you want to create this new contract?';
        break;
      case 'clear':
        content = 'Are you sure you want to clear all the form data? This action cannot be undone.';
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

  const handleCreateContract = async () => {
    try {
      if (!selectedEmployeeId) {
        addNotification('Veuillez sélectionner un employé.', 'error');
        return;
      }
      const contractToSave: StoredContract = {
        ...newContract,
        id: Date.now().toString(),
        contractDetails: {
          ...newContractDetails,
          salaryDetails: selectedSalaryDetails.join(', '),
          benefitsPackage: selectedBenefitsPackage.join(', '),
          noticePeriod: selectedNoticePeriod.join(', '),
          managerNotes: selectedManagerNotes.join(', '),
          contractEligibilityStatus: selectedContractEligibilityStatus[0] as 'Valid' | 'Invalid' | 'Under Review',
        },
        createdAt: new Date().toISOString(),
      };

      console.log("Contrat local avant envoi:", contractToSave);

      setCreatedContracts((prev) => [...prev, contractToSave]);
      setSelectedContractForPreview(contractToSave);

      const contractToSend = {
        contractId: contractToSave.contractId,
        contractType: contractToSave.contractType,
        contractStatus: contractToSave.contractStatus,
        employeeName: contractToSave.employeeName,
        department: contractToSave.department,
        email: contractToSave.email,
        phone: contractToSave.phone,
        position: contractToSave.position,
        startDate: contractToSave.startDate ? new Date(contractToSave.startDate).toISOString() : undefined,
        endDate: contractToSave.endDate ? new Date(contractToSave.endDate).toISOString() : undefined,
        terminationReason: contractToSave.terminationReason,
        contractDetails: {
          benefitsPackage: contractToSave.contractDetails.benefitsPackage,
          contractEligibilityStatus: contractToSave.contractDetails.contractEligibilityStatus,
          contractReviewer: contractToSave.contractDetails.contractReviewer,
          dob: contractToSave.contractDetails.dob ? new Date(contractToSave.contractDetails.dob).toISOString() : undefined,
          lastReviewDate: contractToSave.contractDetails.lastReviewDate ? new Date(contractToSave.contractDetails.lastReviewDate).toISOString() : undefined,
          linkedInProfile: contractToSave.contractDetails.linkedInProfile,
          managerNotes: contractToSave.contractDetails.managerNotes,
          nationality: contractToSave.contractDetails.nationality,
          notes: contractToSave.contractDetails.notes,
          noticePeriod: contractToSave.contractDetails.noticePeriod,
          probationEndDate: contractToSave.contractDetails.probationEndDate ? new Date(contractToSave.contractDetails.probationEndDate).toISOString() : undefined,
          salaryDetails: contractToSave.contractDetails.salaryDetails,
          workIdentifier: contractToSave.contractDetails.workIdentifier,
        },
      };

      console.log("Contrat local après envoi:", contractToSend);

      const response = await contractService.createContract(contractToSend);

      if (!response.success) {
        throw new Error(response.error || 'Erreur lors de la création du contrat');
      }

      addNotification('New contract created successfully!', 'success');
      setShowModal(false);
    } catch (err: any) {
      console.error("Error creating contract:", err);
      if (err instanceof Error) {
        console.error("Error message:", err.message);
        console.error("Error stack:", err.stack);
      }
      if (err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
        console.error("Error response headers:", err.response.headers);
      }
      addNotification('Erreur lors de la création du contrat', 'error');
    }
  };

  const handleClearForm = () => {
    setNewContract({
      id: '',
      contractId: '',
      employeeName: '',
      contractStatus: 'Draft',
      contractType: '',
      department: '',
      position: '',
      email: '',
      phone: '',
      startDate: '',
      endDate: '',
      terminationReason: '',
    });
    setNewContractDetails({
      contractReviewer: 'HR Manager',
      workIdentifier: '',
      contractEligibilityStatus: 'Under Review',
      managerNotes: '',
      notes: '',
      lastReviewDate: '',
      salaryDetails: '',
      benefitsPackage: '',
      probationEndDate: '',
      noticePeriod: '',
      dob: '',
      nationality: '',
      linkedInProfile: '',
    });
    setSelectedSalaryDetails([]);
    setSelectedBenefitsPackage([]);
    setSelectedNoticePeriod([]);
    setSelectedManagerNotes([]);
    setSelectedContractEligibilityStatus(['Under Review']);
    setSelectedEmployeeId(''); // Reset selected employee
    setCurrentStep(1);
    setSelectedContractForPreview(null);
    addNotification('Form cleared.', 'info');
  };

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

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!selectedEmployeeId || !newContract.contractId || !newContract.contractType || !newContract.startDate) {
        addNotification('Please fill in all required fields in this step: Employee, Contract ID, Contract Type, and Start Date.', 'error');
        return;
      }
    }
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderCreateContractForm = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <FiUser className="w-5 h-5 mr-3 text-orange-500" />
        New Employee Contract Information
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contract ID <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={newContract.contractId}
            onChange={(e) => setNewContract({ ...newContract, contractId: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
            placeholder="e.g., CONT006"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Employee <span className="text-red-500">*</span></label>
          <select
            value={selectedEmployeeId}
            onChange={(e) => setSelectedEmployeeId(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">Select an employee</option>
            {allEmployees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.firstName} {employee.lastName} ({employee.registrationNumber})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
          <input
            type="text"
            value={newContract.employeeName}
            readOnly
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
            placeholder="Employee name will be set automatically"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contract Status</label>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(newContract.contractStatus)}`}>
            {newContract.contractStatus}
          </span>
          <p className="text-xs text-gray-500 mt-1">Default status for new contracts is 'Draft'.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contract Type <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={newContract.contractType}
            onChange={(e) => setNewContract({ ...newContract, contractType: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
            placeholder="e.g., Full-time, Part-time"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <input
            type="text"
            value={newContract.department || ''}
            onChange={(e) => setNewContract({ ...newContract, department: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
            placeholder="e.g., Engineering"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
          <input
            type="text"
            value={newContract.position || ''}
            onChange={(e) => setNewContract({ ...newContract, position: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
            placeholder="e.g., Software Engineer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contract Start Date <span className="text-red-500">*</span></label>
          <input
            type="date"
            value={newContract.startDate}
            onChange={(e) => setNewContract({ ...newContract, startDate: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contract End Date (Optional)</label>
          <input
            type="date"
            value={newContract.endDate || ''}
            onChange={(e) => setNewContract({ ...newContract, endDate: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={newContract.email || ''}
            readOnly
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
            placeholder="Email will be set automatically"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            value={newContract.phone || ''}
            readOnly
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
            placeholder="Phone will be set automatically"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Termination Reason (if applicable)</label>
          <textarea
            value={newContract.terminationReason || ''}
            onChange={(e) => setNewContract({ ...newContract, terminationReason: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-20 resize-y focus:ring-orange-500 focus:border-orange-500"
            placeholder="Enter reason for termination..."
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">General Contract Notes</label>
          <textarea
            value={newContractDetails.notes}
            onChange={(e) => setNewContractDetails({ ...newContractDetails, notes: e.target.value })}
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
              value={newContractDetails.dob || ''}
              onChange={(e) => setNewContractDetails({ ...newContractDetails, dob: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
            <input
              type="text"
              value={newContractDetails.nationality || ''}
              onChange={(e) => setNewContractDetails({ ...newContractDetails, nationality: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
            <input
              type="url"
              value={newContractDetails.linkedInProfile || ''}
              onChange={(e) => setNewContractDetails({ ...newContractDetails, linkedInProfile: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. https://linkedin.com/in/..."
            />
          </div>
        </div>
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h5 className="col-span-full font-semibold text-gray-800 mb-2 flex items-center">
            <FiBriefcase className="mr-2" /> Contract Details Overview
          </h5>
          <MultiSelectDropdown
            label="Salary Details"
            options={[
              { value: 'EUR 45,000 / year', label: 'EUR 45,000 / year' },
              { value: 'EUR 50,000 / year', label: 'EUR 50,000 / year' },
              { value: 'EUR 60,000 / year', label: 'EUR 60,000 / year' },
              { value: 'USD 55,000 / year', label: 'USD 55,000 / year' },
            ]}
            selectedValues={selectedSalaryDetails}
            onChange={setSelectedSalaryDetails}
          />
          <MultiSelectDropdown
            label="Benefits Package"
            options={[
              { value: 'Standard benefits', label: 'Standard benefits' },
              { value: 'Health insurance', label: 'Health insurance' },
              { value: 'Dental insurance', label: 'Dental insurance' },
              { value: 'Vision insurance', label: 'Vision insurance' },
              { value: 'Retirement plan', label: 'Retirement plan' },
              { value: 'Paid Time Off', label: 'Paid Time Off' },
              { value: 'Flexible Work Hours', label: 'Flexible Work Hours' },
            ]}
            selectedValues={selectedBenefitsPackage}
            onChange={setSelectedBenefitsPackage}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Probation End Date</label>
            <input
              type="date"
              value={newContractDetails.probationEndDate || ''}
              onChange={(e) => setNewContractDetails({ ...newContractDetails, probationEndDate: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <MultiSelectDropdown
            label="Notice Period"
            options={[
              { value: '1 week', label: '1 week' },
              { value: '2 weeks', label: '2 weeks' },
              { value: '1 month', label: '1 month' },
              { value: '2 months', label: '2 months' },
              { value: '3 months', label: '3 months' },
            ]}
            selectedValues={selectedNoticePeriod}
            onChange={setSelectedNoticePeriod}
          />
        </div>
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h5 className="col-span-full font-semibold text-gray-800 mb-2 flex items-center">
            <FiInfo className="mr-2" /> Manager Feedback & Eligibility
          </h5>
          <MultiSelectDropdown
            label="Manager Notes"
            options={[
              { value: 'Good performance, eligible for renewal.', label: 'Good performance, eligible for renewal.' },
              { value: 'Excellent contributor, strong technical skills.', label: 'Excellent contributor, strong technical skills.' },
              { value: 'Needs improvement in time management.', label: 'Needs improvement in time management.' },
              { value: 'Discuss promotion opportunities.', label: 'Discuss promotion opportunities.' },
            ]}
            selectedValues={selectedManagerNotes}
            onChange={setSelectedManagerNotes}
          />
          <MultiSelectDropdown
            label="Contract Eligibility Status"
            options={[
              { value: 'Valid', label: 'Valid' },
              { value: 'Invalid', label: 'Invalid' },
              { value: 'Under Review', label: 'Under Review' },
            ]}
            selectedValues={selectedContractEligibilityStatus}
            onChange={setSelectedContractEligibilityStatus}
            singleSelect={true}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Contract Review Date</label>
            <input
              type="date"
              value={newContractDetails.lastReviewDate || ''}
              onChange={(e) => setNewContractDetails({ ...newContractDetails, lastReviewDate: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderOnboardingForm = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          {[1, 2, 3, 4].map((stepNum) => (
            <React.Fragment key={stepNum}>
              <div className="flex-1 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg
                  ${currentStep >= stepNum ? 'bg-orange-500' : 'bg-gray-300'}`}>
                  {currentStep > stepNum ? <FiCheckCircle className="w-6 h-6" /> : stepNum}
                </div>
                <div className={`mt-2 text-sm font-medium ${currentStep >= stepNum ? 'text-orange-600' : 'text-gray-500'}`}>
                  {stepNum === 1 && 'Employee & Contract Basics'}
                  {stepNum === 2 && 'Additional Details'}
                  {stepNum === 3 && 'Compensation & Terms'}
                  {stepNum === 4 && 'Review & Notes'}
                </div>
              </div>
              {stepNum < totalSteps && (
                <div className={`flex-1 h-1 bg-gray-300 mx-2 ${currentStep > stepNum ? 'bg-orange-500' : ''}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {currentStep === 1 && (
          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiUser className="w-5 h-5 mr-3 text-orange-500" />
              Step 1: Employee & Contract Basics
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contract ID <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={newContract.contractId}
                  onChange={(e) => setNewContract({ ...newContract, contractId: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                  placeholder="e.g., CONT006"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee <span className="text-red-500">*</span></label>
                <select
                  value={selectedEmployeeId}
                  onChange={(e) => setSelectedEmployeeId(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select an employee</option>
                  {allEmployees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.firstName} {employee.lastName} ({employee.registrationNumber})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
                <input
                  type="text"
                  value={newContract.employeeName}
                  readOnly
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
                  placeholder="Employee name will be set automatically"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contract Status</label>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(newContract.contractStatus)}`}>
                  {newContract.contractStatus}
                </span>
                <p className="text-xs text-gray-500 mt-1">Default status for new contracts is 'Draft'.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contract Type <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={newContract.contractType}
                  onChange={(e) => setNewContract({ ...newContract, contractType: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                  placeholder="e.g., Full-time, Part-time"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input
                  type="text"
                  value={newContract.department || ''}
                  onChange={(e) => setNewContract({ ...newContract, department: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                  placeholder="e.g., Engineering"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="text"
                  value={newContract.position || ''}
                  onChange={(e) => setNewContract({ ...newContract, position: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                  placeholder="e.g., Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contract Start Date <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  value={newContract.startDate}
                  onChange={(e) => setNewContract({ ...newContract, startDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contract End Date (Optional)</label>
                <input
                  type="date"
                  value={newContract.endDate || ''}
                  onChange={(e) => setNewContract({ ...newContract, endDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newContract.email || ''}
                  readOnly
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
                  placeholder="Email will be set automatically"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={newContract.phone || ''}
                  readOnly
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100"
                  placeholder="Phone will be set automatically"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiInfo className="w-5 h-5 mr-3 text-orange-500" />
              Step 2: Additional Employee Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={newContractDetails.dob || ''}
                  onChange={(e) => setNewContractDetails({ ...newContractDetails, dob: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                <input
                  type="text"
                  value={newContractDetails.nationality || ''}
                  onChange={(e) => setNewContractDetails({ ...newContractDetails, nationality: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
                <input
                  type="url"
                  value={newContractDetails.linkedInProfile || ''}
                  onChange={(e) => setNewContractDetails({ ...newContractDetails, linkedInProfile: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. https://linkedin.com/in/..."
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiBriefcase className="w-5 h-5 mr-3 text-orange-500" />
              Step 3: Compensation & Terms
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <MultiSelectDropdown
                label="Salary Details"
                options={[
                  { value: 'EUR 45,000 / year', label: 'EUR 45,000 / year' },
                  { value: 'EUR 50,000 / year', label: 'EUR 50,000 / year' },
                  { value: 'EUR 60,000 / year', label: 'EUR 60,000 / year' },
                  { value: 'USD 55,000 / year', label: 'USD 55,000 / year' },
                ]}
                selectedValues={selectedSalaryDetails}
                onChange={setSelectedSalaryDetails}
              />
              <MultiSelectDropdown
                label="Benefits Package"
                options={[
                  { value: 'Standard benefits', label: 'Standard benefits' },
                  { value: 'Health insurance', label: 'Health insurance' },
                  { value: 'Dental insurance', label: 'Dental insurance' },
                  { value: 'Vision insurance', label: 'Vision insurance' },
                  { value: 'Retirement plan', label: 'Retirement plan' },
                  { value: 'Paid Time Off', label: 'Paid Time Off' },
                  { value: 'Flexible Work Hours', label: 'Flexible Work Hours' },
                ]}
                selectedValues={selectedBenefitsPackage}
                onChange={setSelectedBenefitsPackage}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Probation End Date</label>
                <input
                  type="date"
                  value={newContractDetails.probationEndDate || ''}
                  onChange={(e) => setNewContractDetails({ ...newContractDetails, probationEndDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <MultiSelectDropdown
                label="Notice Period"
                options={[
                  { value: '1 week', label: '1 week' },
                  { value: '2 weeks', label: '2 weeks' },
                  { value: '1 month', label: '1 month' },
                  { value: '2 months', label: '2 months' },
                  { value: '3 months', label: '3 months' },
                ]}
                selectedValues={selectedNoticePeriod}
                onChange={setSelectedNoticePeriod}
              />
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FiClipboard className="w-5 h-5 mr-3 text-orange-500" />
              Step 4: Review & Notes
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <MultiSelectDropdown
                label="Manager Notes"
                options={[
                  { value: 'Good performance, eligible for renewal.', label: 'Good performance, eligible for renewal.' },
                  { value: 'Excellent contributor, strong technical skills.', label: 'Excellent contributor, strong technical skills.' },
                  { value: 'Needs improvement in time management.', label: 'Needs improvement in time management.' },
                  { value: 'Discuss promotion opportunities.', label: 'Discuss promotion opportunities.' },
                ]}
                selectedValues={selectedManagerNotes}
                onChange={setSelectedManagerNotes}
              />
              <MultiSelectDropdown
                label="Contract Eligibility Status"
                options={[
                  { value: 'Valid', label: 'Valid' },
                  { value: 'Invalid', label: 'Invalid' },
                  { value: 'Under Review', label: 'Under Review' },
                ]}
                selectedValues={selectedContractEligibilityStatus}
                onChange={setSelectedContractEligibilityStatus}
                singleSelect={true}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Contract Review Date</label>
                <input
                  type="date"
                  value={newContractDetails.lastReviewDate || ''}
                  onChange={(e) => setNewContractDetails({ ...newContractDetails, lastReviewDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">General Contract Notes</label>
                <textarea
                  value={newContractDetails.notes}
                  onChange={(e) => setNewContractDetails({ ...newContractDetails, notes: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-24 resize-y focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Add notes about the contract, special clauses, etc."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Termination Reason (if applicable)</label>
                <textarea
                  value={newContract.terminationReason || ''}
                  onChange={(e) => setNewContract({ ...newContract, terminationReason: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-20 resize-y focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter reason for termination..."
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={handlePreviousStep}
          disabled={currentStep === 1}
          className="px-5 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiChevronLeft className="mr-2" /> Previous
        </button>
        {currentStep < totalSteps ? (
          <button
            onClick={handleNextStep}
            className="px-5 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center"
          >
            Next <FiChevronRight className="ml-2" />
          </button>
        ) : (
          <button
            onClick={() => openConfirmationModal('create', handleCreateContract)}
            className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
          >
            <FiSave className="mr-2" /> Create Contract
          </button>
        )}
      </div>
    </div>
  );

  const renderPreviewContract = () => {
    const contractToPreview = selectedContractForPreview || {
      ...newContract,
      id: 'preview',
      contractDetails: {
        ...newContractDetails,
        salaryDetails: selectedSalaryDetails.join(', '),
        benefitsPackage: selectedBenefitsPackage.join(', '),
        noticePeriod: selectedNoticePeriod.join(', '),
        managerNotes: selectedManagerNotes.join(', '),
        contractEligibilityStatus: selectedContractEligibilityStatus[0] as 'Valid' | 'Invalid' | 'Under Review',
      },
      createdAt: new Date().toISOString(),
    };

    return (
      <div className="space-y-6">
        {createdContracts.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <FiClipboard className="w-5 h-5 mr-2 text-orange-500" />
              Select Contract to Preview
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedContractForPreview(null)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  !selectedContractForPreview 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Current Form (Draft)
              </button>
              {createdContracts.map((contract) => (
                <button
                  key={contract.id}
                  onClick={() => setSelectedContractForPreview(contract)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedContractForPreview?.id === contract.id
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {contract.employeeName || 'Unnamed'} ({contract.contractId})
                </button>
              ))}
            </div>
            {selectedContractForPreview && (
              <p className="text-xs text-gray-500 mt-2">
                Created: {new Date(selectedContractForPreview.createdAt).toLocaleString()}
              </p>
            )}
          </div>
        )}

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 max-w-4xl mx-auto my-8">
          <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200">
            <h4 className="text-3xl font-extrabold text-gray-900 flex items-center">
              <FiFileText className="w-8 h-8 mr-4 text-orange-600" />
              Contract Preview: <span className="text-orange-700 ml-2">{contractToPreview.employeeName || 'New Employee'}</span>
            </h4>
            <div className="flex items-center space-x-2">
              <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getStatusBadgeColor(contractToPreview.contractStatus)} shadow-md`}>
                {contractToPreview.contractStatus}
              </span>
              {!selectedContractForPreview && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  DRAFT
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-700">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 shadow-sm">
              <h5 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                <FiUser className="mr-3 text-blue-600" /> Employee & Contract Basics
              </h5>
              <div className="space-y-3">
                <p><strong className="font-semibold text-gray-800">Contract ID:</strong> <span className="text-blue-700">{contractToPreview.contractId || 'N/A'}</span></p>
                <p><strong className="font-semibold text-gray-800">Employee Name:</strong> {contractToPreview.employeeName || 'N/A'}</p>
                <p><strong className="font-semibold text-gray-800">Contract Type:</strong> {contractToPreview.contractType || 'N/A'}</p>
                <p><strong className="font-semibold text-gray-800">Department:</strong> {contractToPreview.department || 'N/A'}</p>
                <p><strong className="font-semibold text-gray-800">Position:</strong> {contractToPreview.position || 'N/A'}</p>
                <p><strong className="font-semibold text-gray-800">Start Date:</strong> {contractToPreview.startDate || 'N/A'}</p>
                <p><strong className="font-semibold text-gray-800">End Date:</strong> {contractToPreview.endDate || 'N/A'}</p>
                <p><strong className="font-semibold text-gray-800">Email:</strong> {contractToPreview.email || 'N/A'}</p>
                <p><strong className="font-semibold text-gray-800">Phone:</strong> {contractToPreview.phone || 'N/A'}</p>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200 shadow-sm">
              <h5 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                <FiInfo className="mr-3 text-purple-600" /> Additional Employee Information
              </h5>
              <div className="space-y-3">
                <p><strong className="font-semibold text-gray-800">Date of Birth:</strong> {contractToPreview.contractDetails?.dob || 'N/A'}</p>
                <p><strong className="font-semibold text-gray-800">Nationality:</strong> {contractToPreview.contractDetails?.nationality || 'N/A'}</p>
                <p><strong className="font-semibold text-gray-800">LinkedIn Profile:</strong> {contractToPreview.contractDetails?.linkedInProfile ? <a href={contractToPreview.contractDetails.linkedInProfile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{contractToPreview.contractDetails.linkedInProfile}</a> : 'N/A'}</p>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200 shadow-sm">
              <h5 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                <FiDollarSign className="mr-3 text-green-600" /> Compensation & Terms
              </h5>
              <div className="space-y-3">
                <p><strong className="font-semibold text-gray-800">Salary Details:</strong> {contractToPreview.contractDetails?.salaryDetails || 'N/A'}</p>
                <p><strong className="font-semibold text-gray-800">Benefits Package:</strong> {contractToPreview.contractDetails?.benefitsPackage || 'N/A'}</p>
                <p><strong className="font-semibold text-gray-800">Probation End Date:</strong> {contractToPreview.contractDetails?.probationEndDate || 'N/A'}</p>
                <p><strong className="font-semibold text-gray-800">Notice Period:</strong> {contractToPreview.contractDetails?.noticePeriod || 'N/A'}</p>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 shadow-sm">
              <h5 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                <FiCheckCircle className="mr-3 text-yellow-600" /> Manager Feedback & Eligibility
              </h5>
              <div className="space-y-3">
                <p><strong className="font-semibold text-gray-800">Manager Notes:</strong> {contractToPreview.contractDetails?.managerNotes || 'N/A'}</p>
                <p><strong className="font-semibold text-gray-800">Eligibility Status:</strong> <span className="font-medium text-yellow-800">{contractToPreview.contractDetails?.contractEligibilityStatus || 'N/A'}</span></p>
                <p><strong className="font-semibold text-gray-800">Last Review Date:</strong> {contractToPreview.contractDetails?.lastReviewDate || 'N/A'}</p>
                <p><strong className="font-semibold text-gray-800">General Notes:</strong> {contractToPreview.contractDetails?.notes || 'N/A'}</p>
                <p><strong className="font-semibold text-gray-800">Termination Reason:</strong> {contractToPreview.terminationReason || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
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

      <div className="bg-gray-800 text-white p-2 flex items-center space-x-2 text-sm shadow-inner">
        <FiHome className="w-4 h-4" />
        <span>Home</span>
        <FiChevronRight className="w-4 h-4" />
        <span>Contract</span>
        <FiChevronRight className="w-4 h-4" />
        <span className="text-orange-300">Create Contract</span>
      </div>
      
      <div className="max-w-full mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <FiPlus className="w-8 h-8 mr-3 text-orange-600" /> Create New Contract
        </h1>

        <div className="mb-6 flex space-x-4">
          <button
            onClick={() => setLayoutMode('existing')}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center
              ${layoutMode === 'existing' ? 'bg-orange-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            <FiFileText className="mr-2" /> Existing Layout
          </button>
          <button
            onClick={() => { setLayoutMode('onboarding'); setCurrentStep(1); }}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-colors flex items-center
              ${layoutMode === 'onboarding' ? 'bg-orange-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            <FiClipboard className="mr-2" /> Onboarding Layout
          </button>
        </div>

        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('create')}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors flex items-center
                ${activeTab === 'create' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              <FiEdit className="mr-2" /> Create Contract
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors flex items-center
                ${activeTab === 'preview' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              <FiEye className="mr-2" /> Preview Contract
              {createdContracts.length > 0 && (
                <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {createdContracts.length}
                </span>
              )}
            </button>
          </nav>
        </div>

        {activeTab === 'create' && (
          <div className="space-y-6">
            {layoutMode === 'existing' ? renderCreateContractForm() : renderOnboardingForm()}
            {layoutMode === 'existing' && (
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => openConfirmationModal('clear', handleClearForm)}
                  className="px-5 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center"
                >
                  <FiXCircle className="mr-2" /> Clear Form
                </button>
                <button
                  onClick={() => openConfirmationModal('create', handleCreateContract)}
                  className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
                >
                  <FiSave className="mr-2" /> Create Contract
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="space-y-6">
            {renderPreviewContract()}
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setActiveTab('create')}
                className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
              >
                <FiEdit className="mr-2" /> Back to Edit
              </button>
              {selectedContractForPreview && (
                <button
                  onClick={() => {
                    setNewContract({
                      id: selectedContractForPreview.id,
                      contractId: selectedContractForPreview.contractId,
                      employeeName: selectedContractForPreview.employeeName,
                      contractStatus: selectedContractForPreview.contractStatus,
                      contractType: selectedContractForPreview.contractType,
                      department: selectedContractForPreview.department || '',
                      position: selectedContractForPreview.position || '',
                      email: selectedContractForPreview.email || '',
                      phone: selectedContractForPreview.phone || '',
                      startDate: selectedContractForPreview.startDate,
                      endDate: selectedContractForPreview.endDate || '',
                      terminationReason: selectedContractForPreview.terminationReason || '',
                    });
                    setNewContractDetails(selectedContractForPreview.contractDetails);
                    setSelectedSalaryDetails(selectedContractForPreview.contractDetails.salaryDetails?.split(', ').filter(Boolean) || []);
                    setSelectedBenefitsPackage(selectedContractForPreview.contractDetails.benefitsPackage?.split(', ').filter(Boolean) || []);
                    setSelectedNoticePeriod(selectedContractForPreview.contractDetails.noticePeriod?.split(', ').filter(Boolean) || []);
                    setSelectedManagerNotes(selectedContractForPreview.contractDetails.managerNotes?.split(', ').filter(Boolean) || []);
                    setSelectedContractEligibilityStatus([selectedContractForPreview.contractDetails.contractEligibilityStatus]);
                    const employee = allEmployees.find((emp) => emp.id === selectedContractForPreview.id);
                    setSelectedEmployeeId(employee ? employee.id : '');
                    setActiveTab('create');
                    addNotification('Contract loaded into form for editing.', 'info');
                  }}
                  className="px-5 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors flex items-center"
                >
                  <FiEdit className="mr-2" /> Edit This Contract
                </button>
              )}
            </div>
          </div>
        )}
      </div>

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

export default CreateContract;
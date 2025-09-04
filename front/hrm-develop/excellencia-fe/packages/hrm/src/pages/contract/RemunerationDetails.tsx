import React, { useState, useEffect } from 'react';
import {
  FiSearch,
  FiUser,
  FiFileText,
  FiFilter,
  FiInfo,
  FiBell,
  FiX,
  FiCreditCard,
  FiDollarSign,
  FiChevronLeft,
  FiChevronRight,
  FiMoreHorizontal,
  FiBarChart2, // For remuneration specific icons
} from 'react-icons/fi';

// Updated interface for a Contract (from ContractData.tsx)
interface Contract {
  id: string;
  contractId: string;
  employeeName: string;
  contractStatus: 'Active' | 'Expired' | 'Terminated' | 'Pending Renewal' | 'Draft';
  contractType: string;
  department?: string;
  position?: string;
  email?: string;
  phone?: string;
  startDate: string;
  endDate?: string;
  terminationReason?: string;
}

// Updated interface for Contract Details (from ContractData.tsx, extended for remuneration)
interface ContractDetails {
  contractReviewer?: string;
  workIdentifier: string;
  contractEligibilityStatus: 'Valid' | 'Invalid' | 'Under Review';
  managerNotes?: string;
  notes: string;
  lastReviewDate?: string;
  salaryDetails?: string; // e.g., "EUR 60,000 / year"
  benefitsPackage?: string; // e.g., "Health, Dental, Vision"
  probationEndDate?: string;
  noticePeriod?: string;
  dob?: string;
  nationality?: string;
  linkedInProfile?: string;
  // New fields for more detailed remuneration info
  baseSalaryAmount?: number;
  currency?: string;
  paymentFrequency?: 'Monthly' | 'Bi-Weekly' | 'Annually';
  bonusPotential?: string; // e.g., "10% of annual salary"
  commissionStructure?: string; // e.g., "5% on sales exceeding target"
  equityCompensation?: string; // e.g., "1000 stock options"
  retirementPlan?: string; // e.g., "401K with 3% match"
  healthInsuranceProvider?: string;
  lifeInsuranceCoverage?: string;
}

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

const RemunerationDetails: React.FC = () => {
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
    workIdentifier: '',
    contractEligibilityStatus: 'Under Review',
    notes: 'No specific notes yet.',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [contractsPerPage, setContractsPerPage] = useState(10);

  // Mock data for contracts, expanded with more remuneration details
  const [allContractList, setAllContractList] = useState<Contract[]>([
    {
      id: '1',
      contractId: 'CONT001',
      employeeName: 'ROBERT SMITH',
      contractStatus: 'Active',
      contractType: 'Full-time',
      department: 'Engineering',
      position: 'Software Engineer',
      email: 'robert.smith@example.com',
      phone: '+32 470 11 22 33',
      startDate: '2022-03-01',
      endDate: '2025-02-28',
      terminationReason: '',
    },
    {
      id: '2',
      contractId: 'CONT002',
      employeeName: 'JANE DOE',
      contractStatus: 'Pending Renewal',
      contractType: 'Full-time',
      department: 'Marketing',
      position: 'Marketing Specialist',
      email: 'jane.doe@example.com',
      phone: '+32 471 98 76 54',
      startDate: '2023-01-01',
      endDate: '2024-12-31',
      terminationReason: '',
    },
    {
      id: '3',
      contractId: 'CONT003',
      employeeName: 'ALICE JOHNSON',
      contractStatus: 'Terminated',
      contractType: 'Part-time',
      department: 'Sales',
      position: 'Sales Representative',
      email: 'alice.johnson@example.com',
      phone: '+32 472 33 44 55',
      startDate: '2021-06-01',
      endDate: '2023-05-31',
      terminationReason: 'Mutual agreement',
    },
    {
      id: '4',
      contractId: 'CONT004',
      employeeName: 'MARK BROWN',
      contractStatus: 'Expired',
      contractType: 'Freelance',
      department: 'Finance',
      position: 'Financial Analyst',
      email: 'mark.brown@example.com',
      phone: '+32 473 66 77 88',
      startDate: '2022-07-01',
      endDate: '2023-12-31',
      terminationReason: '',
    },
    {
      id: '5',
      contractId: 'CONT005',
      employeeName: 'SARAH GREEN',
      contractStatus: 'Active',
      contractType: 'Full-time',
      department: 'HR',
      position: 'HR Generalist',
      email: 'sarah.green@example.com',
      phone: '+32 474 99 00 11',
      startDate: '2024-02-01',
      endDate: '', // Indefinite contract
      terminationReason: '',
    },
  ]);

  // Mock data for remuneration details, mapping to contract IDs
  const allRemunerationDetails: Record<string, ContractDetails> = {
    'CONT001': {
      workIdentifier: 'CONT001',
      contractEligibilityStatus: 'Valid',
      notes: 'Standard remuneration package for senior engineers.',
      salaryDetails: 'EUR 60,000 / year',
      benefitsPackage: 'Premium Health, Dental, Vision, 401K (5% match), Life Insurance (2x salary)',
      baseSalaryAmount: 60000,
      currency: 'EUR',
      paymentFrequency: 'Annually',
      bonusPotential: '15% target bonus',
      equityCompensation: '2000 stock options granted annually',
      retirementPlan: '401K with 5% company match',
      healthInsuranceProvider: 'Blue Cross Blue Shield',
      lifeInsuranceCoverage: '2x annual salary',
    },
    'CONT002': {
      workIdentifier: 'CONT002',
      contractEligibilityStatus: 'Under Review',
      notes: 'Due for salary review and potential bonus discussion.',
      salaryDetails: 'EUR 45,000 / year',
      benefitsPackage: 'Standard Health, Dental, Vision, Basic Life Insurance',
      baseSalaryAmount: 45000,
      currency: 'EUR',
      paymentFrequency: 'Annually',
      bonusPotential: '10% target bonus based on performance',
      commissionStructure: 'N/A',
      equityCompensation: 'N/A',
      retirementPlan: 'Standard company pension plan',
      healthInsuranceProvider: 'Cigna',
      lifeInsuranceCoverage: '1x annual salary',
    },
    'CONT003': {
      workIdentifier: 'CONT003',
      contractEligibilityStatus: 'Invalid',
      notes: 'Contract terminated, final payout processed.',
      salaryDetails: 'N/A',
      benefitsPackage: 'Prorated final benefits',
      baseSalaryAmount: 0,
      currency: 'EUR',
      paymentFrequency: 'N/A',
      bonusPotential: 'N/A',
      commissionStructure: 'N/A',
      equityCompensation: 'N/A',
      retirementPlan: 'N/A',
      healthInsuranceProvider: 'N/A',
      lifeInsuranceCoverage: 'N/A',
    },
    'CONT004': {
      workIdentifier: 'CONT004',
      contractEligibilityStatus: 'Invalid',
      notes: 'Freelance contract expired, final payment completed.',
      salaryDetails: 'Project-based compensation',
      benefitsPackage: 'None',
      baseSalaryAmount: 0,
      currency: 'EUR',
      paymentFrequency: 'N/A',
      bonusPotential: 'N/A',
      commissionStructure: 'N/A',
      equityCompensation: 'N/A',
      retirementPlan: 'N/A',
      healthInsuranceProvider: 'N/A',
      lifeInsuranceCoverage: 'N/A',
    },
    'CONT005': {
      workIdentifier: 'CONT005',
      contractEligibilityStatus: 'Valid',
      notes: 'New employee, standard HR remuneration package.',
      salaryDetails: 'EUR 50,000 / year',
      benefitsPackage: 'Standard Health, Dental, Vision, Retirement Plan',
      baseSalaryAmount: 50000,
      currency: 'EUR',
      paymentFrequency: 'Annually',
      bonusPotential: '5% target bonus after first year',
      commissionStructure: 'N/A',
      equityCompensation: 'N/A',
      retirementPlan: 'Company pension contribution',
      healthInsuranceProvider: 'Aetna',
      lifeInsuranceCoverage: '1x annual salary',
    },
  };

  const [filteredContractList, setFilteredContractList] = useState<Contract[]>(allContractList);
  const [notifications, setNotifications] = useState<Notification[]>([]);

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

        return matchesName && matchesContractId && matchesContractStatus && matchesContractType && matchesDepartment && matchesPosition;
      });
      setFilteredContractList(tempContracts);
      setCurrentPage(1);
    };
    filterList();
  }, [searchForm, allContractList]);

  // Effect to update contract details when selected contract changes
  useEffect(() => {
    if (selectedContract) {
      // Fetch remuneration details based on selected contract ID
      const remunerationInfo = allRemunerationDetails[selectedContract.contractId];
      setContractDetails(remunerationInfo || {
        workIdentifier: selectedContract.contractId,
        contractEligibilityStatus: selectedContract.contractStatus === 'Active' ? 'Valid' : selectedContract.contractStatus === 'Terminated' ? 'Invalid' : 'Under Review',
        notes: 'No specific remuneration notes available for this contract.',
      });
    } else {
      setContractDetails({
        workIdentifier: '',
        contractEligibilityStatus: 'Under Review',
        notes: 'No specific remuneration notes available for this contract.',
      });
    }
  }, [selectedContract]);

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
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSearch = () => {
    addNotification('Search initiated!', 'info');
    // The useEffect already handles filtering based on searchForm changes.
    // This function can be used to explicitly trigger a search if needed, e.g., on button click.
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
    addNotification('Search filters cleared.', 'info');
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

  const renderRemunerationDetailsContent = () => {
    if (!selectedContract) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <FiInfo className="w-12 h-12 mb-4" />
          <p className="text-lg">Select a contract from the list to view remuneration details.</p>
        </div>
      );
    }

    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <FiDollarSign className="w-7 h-7 mr-3 text-orange-500" />
          Remuneration Details for <span className="text-orange-600 ml-2">{selectedContract.employeeName}</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contract ID</label>
            <p className="text-gray-900 text-base font-semibold">{selectedContract.contractId}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
            <p className="text-gray-900 text-base">{selectedContract.employeeName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contract Type</label>
            <p className="text-gray-900 text-base">{selectedContract.contractType}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Contract Status</label>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(selectedContract.contractStatus)}`}>
              {selectedContract.contractStatus}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {/* Salary Information Section */}
          <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
            <h5 className="font-semibold text-blue-800 mb-4 flex items-center text-lg">
              <FiCreditCard className="mr-3 text-blue-600" /> Salary Information
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Base Salary</label>
                <p className="text-gray-900 text-base">{contractDetails.salaryDetails || 'N/A'}</p>
              </div>
              {contractDetails.baseSalaryAmount && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Annual Base Salary Amount</label>
                  <p className="text-gray-900 text-base">{contractDetails.baseSalaryAmount?.toLocaleString()} {contractDetails.currency || ''}</p>
                </div>
              )}
              {contractDetails.paymentFrequency && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Frequency</label>
                  <p className="text-gray-900 text-base">{contractDetails.paymentFrequency}</p>
                </div>
              )}
              {contractDetails.bonusPotential && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bonus Potential</label>
                  <p className="text-gray-900 text-base">{contractDetails.bonusPotential}</p>
                </div>
              )}
              {contractDetails.commissionStructure && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Commission Structure</label>
                  <p className="text-gray-900 text-base">{contractDetails.commissionStructure}</p>
                </div>
              )}
              {contractDetails.equityCompensation && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Equity Compensation</label>
                  <p className="text-gray-900 text-base">{contractDetails.equityCompensation}</p>
                </div>
              )}
            </div>
          </div>

          {/* Benefits Information Section */}
          <div className="bg-green-50 p-5 rounded-lg border border-green-200">
            <h5 className="font-semibold text-green-800 mb-4 flex items-center text-lg">
              <FiBarChart2 className="mr-3 text-green-600" /> Benefits Package
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Overview</label>
                <p className="text-gray-900 text-base">{contractDetails.benefitsPackage || 'N/A'}</p>
              </div>
              {contractDetails.healthInsuranceProvider && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Health Insurance Provider</label>
                  <p className="text-gray-900 text-base">{contractDetails.healthInsuranceProvider}</p>
                </div>
              )}
              {contractDetails.retirementPlan && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Retirement Plan</label>
                  <p className="text-gray-900 text-base">{contractDetails.retirementPlan}</p>
                </div>
              )}
              {contractDetails.lifeInsuranceCoverage && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Life Insurance Coverage</label>
                  <p className="text-gray-900 text-base">{contractDetails.lifeInsuranceCoverage}</p>
                </div>
              )}
            </div>
          </div>

          {/* General Notes on Remuneration */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <h5 className="font-semibold text-gray-800 mb-4 flex items-center text-lg">
              <FiFileText className="mr-3 text-gray-600" /> Notes
            </h5>
            <p className="text-gray-900 text-base">{contractDetails.notes || 'No general notes available.'}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Notifications */}
      <div className="fixed top-4 right- z-50 flex flex-col space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 rounded-md shadow-md text-white flex items-center justify-between
              ${notification.type === 'info'
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

      <header className="bg-white shadow-sm p-4 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Remuneration Details</h1>
        </div>
      </header>

      <div className="container mx-auto p-6 flex-1 flex flex-col lg:flex-row gap-6">
        {/* Left Panel: Employee/Contract List and Filters */}
        <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FiUser className="mr-2 text-orange-500" /> Contract List & Filters
          </h3>

          {/* Search/Filter Form */}
          <div className="mb-6 space-y-3">
            <div>
              <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700">Employee Name</label>
              <input
                type="text"
                id="employeeName"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                value={searchForm.employeeName}
                onChange={(e) => setSearchForm({ ...searchForm, employeeName: e.target.value })}
                placeholder="Search by name"
              />
            </div>
            <div>
              <label htmlFor="contractId" className="block text-sm font-medium text-gray-700">Contract ID</label>
              <input
                type="text"
                id="contractId"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                value={searchForm.contractId}
                onChange={(e) => setSearchForm({ ...searchForm, contractId: e.target.value })}
                placeholder="Search by contract ID"
              />
            </div>
            <div>
              <label htmlFor="contractStatus" className="block text-sm font-medium text-gray-700">Status</label>
              <select
                id="contractStatus"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                value={searchForm.contractStatus}
                onChange={(e) => setSearchForm({ ...searchForm, contractStatus: e.target.value })}
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Pending Renewal">Pending Renewal</option>
                <option value="Expired">Expired</option>
                <option value="Terminated">Terminated</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
              <input
                type="text"
                id="department"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                value={searchForm.department}
                onChange={(e) => setSearchForm({ ...searchForm, department: e.target.value })}
                placeholder="Search by department"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleSearch}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <FiSearch className="mr-2" /> Search
              </button>
              <button
                onClick={handleClearFilters}
                className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FiFilter className="mr-2" /> Clear Filters
              </button>
            </div>
          </div>

          {/* Contract List */}
          <div className="flex-1 overflow-y-auto pr-2 -mr-2"> {/* Custom scrollbar area */}
            <ul className="space-y-3">
              {currentContracts.length > 0 ? (
                currentContracts.map((contract) => (
                  <li
                    key={contract.id}
                    className={`p-4 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200
                      ${selectedContract?.id === contract.id ? 'bg-orange-50 border-orange-500 shadow-md' : 'bg-white hover:bg-gray-50'}`}
                    onClick={() => handleContractSelect(contract)}
                  >
                    <p className="text-sm font-semibold text-gray-900">{contract.employeeName}</p>
                    <p className="text-xs text-gray-600">Contract ID: {contract.contractId}</p>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className={`px-2.5 py-0.5 rounded-full font-medium ${getStatusBadgeColor(contract.contractStatus)}`}>
                        {contract.contractStatus}
                      </span>
                      <span className="text-gray-500">{contract.contractType}</span>
                    </div>
                  </li>
                ))
              ) : (
                <li className="p-4 text-center text-gray-500">No contracts found matching your criteria.</li>
              )}
            </ul>
          </div>

          {/* Pagination */}
          {filteredContractList.length > contractsPerPage && (
            <div className="flex justify-center items-center space-x-2 mt-6">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 rounded-md font-semibold text-sm
                    ${number === currentPage ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Right Panel: Remuneration Details View */}
        <div className="lg:w-2/3 flex-1 flex flex-col">
          {renderRemunerationDetailsContent()}
        </div>
      </div>
    </div>
  );
};

export default RemunerationDetails;
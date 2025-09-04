import React, { useState, useEffect, useRef } from 'react';
import {
  FiSearch,
  FiUser,
  FiCalendar,
  FiFileText,
  FiEdit,
  FiDownload,
  FiUpload,
  FiPrinter,
  FiDollarSign,
  FiInfo,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiList,
  FiGrid,
  FiPlus,
  FiX,
  FiAlertCircle,
  FiCreditCard,
  FiTool,
  FiBriefcase,
  FiActivity,
  FiClipboard,
} from 'react-icons/fi';

// Derived from ContractData.tsx to link records to employees
interface Contract {
  id: string;
  contractId: string;
  employeeName: string;
  department?: string;
  position?: string;
}

// New interface for a Payroll Record
interface PayrollRecord {
  id: string;
  payrollId: string;
  employeeName: string;
  contractId: string;
  payPeriod: string; // e.g., '2024-07-01 to 2024-07-31'
  grossPay: number;
  netPay: number;
  deductions: number;
  bonuses: number;
  status: 'Paid' | 'Pending' | 'On Hold' | 'Error';
  paymentDate: string; // YYYY-MM-DD
}

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

const ConsultPayrollRecords: React.FC = () => {
  const [selectedRecord, setSelectedRecord] = useState<PayrollRecord | null>(null);
  const [searchForm, setSearchForm] = useState({
    employeeName: '',
    payrollId: '',
    payPeriod: '',
    status: '',
    department: '', // Added from Contract for filtering
  });

  // Mock data derived from ContractData.tsx
  const allContractList: Contract[] = [
    { id: '1', contractId: 'CONT001', employeeName: 'ROBERT SMITH', department: 'Engineering', position: 'Software Engineer' },
    { id: '2', contractId: 'CONT002', employeeName: 'JANE DOE', department: 'Marketing', position: 'Marketing Specialist' },
    { id: '3', contractId: 'CONT003', employeeName: 'ALICE JOHNSON', department: 'Sales', position: 'Sales Representative' },
    { id: '4', contractId: 'CONT004', employeeName: 'MARK BROWN', department: 'Finance', position: 'Financial Analyst' },
    { id: '5', contractId: 'CONT005', employeeName: 'SARAH GREEN', department: 'HR', position: 'HR Generalist' },
    { id: '6', contractId: 'CONT006', employeeName: 'DAVID LEE', department: 'IT', position: 'IT Support' },
  ];

  const allPayrollRecordsList: PayrollRecord[] = [
    {
      id: '1',
      payrollId: 'PAY001-2024-07',
      employeeName: 'ROBERT SMITH',
      contractId: 'CONT001',
      payPeriod: '2024-07-01 to 2024-07-31',
      grossPay: 5000,
      netPay: 4000,
      deductions: 1000,
      bonuses: 200,
      status: 'Paid',
      paymentDate: '2024-08-05',
    },
    {
      id: '2',
      payrollId: 'PAY002-2024-07',
      employeeName: 'JANE DOE',
      contractId: 'CONT002',
      payPeriod: '2024-07-01 to 2024-07-31',
      grossPay: 3750,
      netPay: 3000,
      deductions: 750,
      bonuses: 0,
      status: 'Paid',
      paymentDate: '2024-08-05',
    },
    {
      id: '3',
      payrollId: 'PAY003-2024-07',
      employeeName: 'ALICE JOHNSON',
      contractId: 'CONT003',
      payPeriod: '2024-07-01 to 2024-07-31',
      grossPay: 2500,
      netPay: 2100,
      deductions: 400,
      bonuses: 100,
      status: 'Paid',
      paymentDate: '2024-08-05',
    },
    {
      id: '4',
      payrollId: 'PAY004-2024-07',
      employeeName: 'MARK BROWN',
      contractId: 'CONT004',
      payPeriod: '2024-07-01 to 2024-07-31',
      grossPay: 4200,
      netPay: 3500,
      deductions: 700,
      bonuses: 50,
      status: 'Pending',
      paymentDate: '2024-08-10',
    },
    {
      id: '5',
      payrollId: 'PAY005-2024-07',
      employeeName: 'SARAH GREEN',
      contractId: 'CONT005',
      payPeriod: '2024-07-01 to 2024-07-31',
      grossPay: 3800,
      netPay: 3200,
      deductions: 600,
      bonuses: 0,
      status: 'Paid',
      paymentDate: '2024-08-05',
    },
    {
      id: '6',
      payrollId: 'PAY006-2024-07',
      employeeName: 'DAVID LEE',
      contractId: 'CONT006',
      payPeriod: '2024-07-01 to 2024-07-31',
      grossPay: 3000,
      netPay: 2600,
      deductions: 400,
      bonuses: 0,
      status: 'Error',
      paymentDate: '2024-08-05',
    },
  ];

  const [filteredRecords, setFilteredRecords] = useState<PayrollRecord[]>(allPayrollRecordsList);
  const [showMoreCriteria, setShowMoreCriteria] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const printRef = useRef<HTMLDivElement>(null);

  // Use a map for quick access to contract data by employee name
  const contractsByName = new Map(allContractList.map(c => [c.employeeName, c]));

  useEffect(() => {
    const filterList = () => {
      let tempRecords = allPayrollRecordsList.filter((record) => {
        const matchesName = searchForm.employeeName ? record.employeeName.toLowerCase().includes(searchForm.employeeName.toLowerCase()) : true;
        const matchesPayrollId = searchForm.payrollId ? record.payrollId.toLowerCase().includes(searchForm.payrollId.toLowerCase()) : true;
        const matchesPayPeriod = searchForm.payPeriod ? record.payPeriod.toLowerCase().includes(searchForm.payPeriod.toLowerCase()) : true;
        const matchesStatus = searchForm.status ? record.status.toLowerCase() === searchForm.status.toLowerCase() : true;
        
        // Match department from the linked contract
        const employeeContract = contractsByName.get(record.employeeName);
        const matchesDepartment = searchForm.department ? (employeeContract?.department || '').toLowerCase().includes(searchForm.department.toLowerCase()) : true;
        
        return matchesName && matchesPayrollId && matchesPayPeriod && matchesStatus && matchesDepartment;
      });
      setFilteredRecords(tempRecords);
      setCurrentPage(1);
    };
    filterList();
  }, [searchForm, allPayrollRecordsList]);

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
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

  const getStatusBadgeColor = (status: PayrollRecord['status']) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'On Hold':
        return 'bg-gray-100 text-gray-800';
      case 'Error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleClearFilters = () => {
    setSearchForm({
      employeeName: '',
      payrollId: '',
      payPeriod: '',
      status: '',
      department: '',
    });
    setShowMoreCriteria(false);
    addNotification('Search filters cleared.', 'info');
  };

  const renderPayrollDetailsContent = () => {
    if (!selectedRecord) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <FiInfo className="w-12 h-12 mb-4" />
          <p className="text-lg">Select a payroll record from the list to view details.</p>
        </div>
      );
    }
    const employeeContract = contractsByName.get(selectedRecord.employeeName);
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-semibold text-gray-800 flex items-center">
            <FiDollarSign className="w-5 h-5 mr-3 text-green-600" />
            Payroll Details for <span className="text-green-600 ml-1">{selectedRecord.employeeName}</span>
          </h4>
          <span className={`inline-flex items-center px-4 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(selectedRecord.status)}`}>
            {selectedRecord.status}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payroll ID</label>
            <input type="text" value={selectedRecord.payrollId} readOnly className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pay Period</label>
            <input type="text" value={selectedRecord.payPeriod} readOnly className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
            <input type="date" value={selectedRecord.paymentDate} readOnly className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gross Pay</label>
            <input type="text" value={`$${selectedRecord.grossPay.toFixed(2)}`} readOnly className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Net Pay</label>
            <input type="text" value={`$${selectedRecord.netPay.toFixed(2)}`} readOnly className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deductions</label>
            <input type="text" value={`$${selectedRecord.deductions.toFixed(2)}`} readOnly className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bonuses</label>
            <input type="text" value={`$${selectedRecord.bonuses.toFixed(2)}`} readOnly className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-100" />
          </div>
          <div className="md:col-span-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h5 className="font-semibold text-gray-800 mb-2 flex items-center">
              <FiBriefcase className="mr-2 text-gray-600" /> Associated Contract Information
            </h5>
            <p className="text-sm text-gray-700"><strong>Contract ID:</strong> {employeeContract?.contractId || 'N/A'}</p>
            <p className="text-sm text-gray-700"><strong>Department:</strong> {employeeContract?.department || 'N/A'}</p>
            <p className="text-sm text-gray-700"><strong>Position:</strong> {employeeContract?.position || 'N/A'}</p>
          </div>
        </div>
      </div>
    );
  };

  const handlePrintPayrollRecord = () => {
    if (!selectedRecord) {
      addNotification('Please select a payroll record to print.', 'warning');
      return;
    }
    const printContent = printRef.current?.innerHTML;
    if (printContent) {
      const printWindow = window.open('', '', 'height=800,width=1200');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Print Payroll Record</title>');
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
      addNotification('No content to print for the selected record.', 'error');
    }
  };

  const renderPayrollTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payroll ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pay Period</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Pay</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Pay</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentRecords.map((record) => (
            <tr key={record.id} className={`${selectedRecord?.id === record.id ? 'bg-orange-50' : 'hover:bg-gray-50'} cursor-pointer`}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" onClick={() => setSelectedRecord(record)}>{record.employeeName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" onClick={() => setSelectedRecord(record)}>{record.payrollId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" onClick={() => setSelectedRecord(record)}>{record.payPeriod}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" onClick={() => setSelectedRecord(record)}>${record.grossPay.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" onClick={() => setSelectedRecord(record)}>${record.netPay.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(record.status)}`}>
                  {record.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  className="text-orange-600 hover:text-orange-900 transition-colors p-1"
                  title="View Details"
                  onClick={() => setSelectedRecord(record)}
                >
                  <FiInfo className="w-5 h-5" />
                </button>
                <button
                  className="text-blue-600 hover:text-blue-900 ml-2 transition-colors p-1"
                  title="Download Record"
                  onClick={() => addNotification(`Downloading record ${record.payrollId}...`, 'info')}
                >
                  <FiDownload className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderPayrollCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {currentRecords.map((record) => (
        <div
          key={record.id}
          className={`bg-white rounded-lg shadow-sm border ${selectedRecord?.id === record.id ? 'border-orange-500 ring-1 ring-orange-500' : 'border-gray-200'} hover:shadow-md transition-all cursor-pointer p-6 space-y-3`}
          onClick={() => setSelectedRecord(record)}
        >
          <div className="flex items-start justify-between">
            <h5 className="text-lg font-semibold text-gray-900">{record.employeeName}</h5>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(record.status)}`}>
              {record.status}
            </span>
          </div>
          <p className="text-sm text-gray-500 flex items-center">
            <FiCreditCard className="mr-2 text-gray-400" />
            <span className="font-medium text-gray-700">{record.payrollId}</span>
          </p>
          <p className="text-sm text-gray-500 flex items-center">
            <FiCalendar className="mr-2 text-gray-400" />
            {record.payPeriod}
          </p>
          <div className="pt-2 border-t border-dashed border-gray-200 flex justify-between items-center text-sm font-medium text-gray-700">
            <div>
              <p>Gross Pay:</p>
              <p className="text-green-600">${record.grossPay.toFixed(2)}</p>
            </div>
            <div>
              <p>Net Pay:</p>
              <p className="text-blue-600">${record.netPay.toFixed(2)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Main Content Area */}
        <main className="lg:w-2/3 flex-1">
          <header className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <FiDollarSign className="mr-3 text-green-600" /> Consult Payroll Records
            </h1>
            <div className="flex items-center space-x-2">
              <button
                className="p-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-200 transition-colors shadow-sm"
                title="Print Selected Record"
                onClick={handlePrintPayrollRecord}
              >
                <FiPrinter className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode(viewMode === 'list' ? 'card' : 'list')}
                className="p-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-200 transition-colors shadow-sm"
                title={`Switch to ${viewMode === 'list' ? 'Card' : 'List'} View`}
              >
                {viewMode === 'list' ? <FiGrid className="w-5 h-5" /> : <FiList className="w-5 h-5" />}
              </button>
            </div>
          </header>

          <section className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FiFilter className="mr-2 text-gray-600" /> Search & Filter Payroll
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
                <input
                  type="text"
                  value={searchForm.employeeName}
                  onChange={(e) => setSearchForm({ ...searchForm, employeeName: e.target.value })}
                  className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., Jane Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payroll ID</label>
                <input
                  type="text"
                  value={searchForm.payrollId}
                  onChange={(e) => setSearchForm({ ...searchForm, payrollId: e.target.value })}
                  className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-green-500 focus:border-green-500"
                  placeholder="e.g., PAY001-2024-07"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={searchForm.status}
                  onChange={(e) => setSearchForm({ ...searchForm, status: e.target.value })}
                  className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">All</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Error">Error</option>
                </select>
              </div>
            </div>

            {showMoreCriteria && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 mt-4 p-4 bg-gray-50 rounded-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pay Period</label>
                  <input
                    type="text"
                    value={searchForm.payPeriod}
                    onChange={(e) => setSearchForm({ ...searchForm, payPeriod: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., 2024-07"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={searchForm.department}
                    onChange={(e) => setSearchForm({ ...searchForm, department: e.target.value })}
                    className="w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-green-500 focus:border-green-500"
                    placeholder="e.g., Engineering"
                  />
                </div>
              </div>
            )}
            <div className="flex items-center justify-between">
              <button
                className="flex items-center text-sm font-medium text-green-600 hover:text-green-800 transition-colors"
                onClick={() => setShowMoreCriteria(!showMoreCriteria)}
              >
                <FiPlus className={`mr-1 transform transition-transform ${showMoreCriteria ? 'rotate-45' : 'rotate-0'}`} />
                {showMoreCriteria ? 'Less Filters' : 'More Filters'}
              </button>
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
              >
                Clear Filters
              </button>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                <FiClipboard className="mr-2 text-green-600" /> Payroll Records ({filteredRecords.length})
              </h3>
              <div className="flex items-center space-x-2">
                <select
                  value={recordsPerPage}
                  onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                  className="px-2 py-1 text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={20}>20 per page</option>
                </select>
                <button
                  onClick={() => addNotification('Downloading all records as CSV...', 'info')}
                  className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium flex items-center"
                >
                  <FiDownload className="mr-2" />
                  Export
                </button>
              </div>
            </div>
            {viewMode === 'list' ? renderPayrollTable() : renderPayrollCards()}
            <div className="flex justify-between items-center mt-6">
              <p className="text-sm text-gray-600">
                Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredRecords.length)} of {filteredRecords.length} records.
              </p>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <FiChevronLeft className="h-5 w-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${currentPage === i + 1 ? 'z-10 bg-green-50 border-green-500 text-green-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <FiChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </section>
        </main>

        {/* Details Sidebar */}
        <aside className="lg:w-1/3 mt-6 lg:mt-0">
          <div className="sticky top-4 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FiInfo className="mr-2 text-gray-600" /> Record Details
            </h2>
            {renderPayrollDetailsContent()}
          </div>
        </aside>
      </div>

      {/* Notifications */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2 w-full max-w-sm">
        {notifications.map((notif) => (
          <div key={notif.id} className={`flex items-center p-4 rounded-lg shadow-md text-white ${
            notif.type === 'info' ? 'bg-blue-500' :
            notif.type === 'success' ? 'bg-green-500' :
            notif.type === 'warning' ? 'bg-yellow-500' :
            'bg-red-500'
          }`}>
            <span className="flex-1">{notif.message}</span>
            <button onClick={() => removeNotification(notif.id)} className="ml-4">
              <FiX className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Hidden component for printing - only visible during PDF generation */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', zIndex: -1 }}>
        <div ref={printRef}>
          {selectedRecord && (
            <div className="p-8 font-sans text-gray-800">
              <h1 className="text-3xl font-bold text-center mb-6">Payroll Record Details</h1>
              <div className="mb-6 border-b pb-4">
                <h2 className="text-xl font-semibold mb-2">Employee & Period Information</h2>
                <p><strong>Employee Name:</strong> {selectedRecord.employeeName}</p>
                <p><strong>Payroll ID:</strong> {selectedRecord.payrollId}</p>
                <p><strong>Pay Period:</strong> {selectedRecord.payPeriod}</p>
                <p><strong>Payment Date:</strong> {selectedRecord.paymentDate}</p>
              </div>
              <div className="mb-6 border-b pb-4">
                <h2 className="text-xl font-semibold mb-2">Financial Breakdown</h2>
                <p><strong>Gross Pay:</strong> ${selectedRecord.grossPay.toFixed(2)}</p>
                <p><strong>Net Pay:</strong> ${selectedRecord.netPay.toFixed(2)}</p>
                <p><strong>Deductions:</strong> ${selectedRecord.deductions.toFixed(2)}</p>
                <p><strong>Bonuses:</strong> ${selectedRecord.bonuses.toFixed(2)}</p>
                <p><strong>Status:</strong> {selectedRecord.status}</p>
              </div>
              <div className="mb-6 border-b pb-4">
                <h2 className="text-xl font-semibold mb-2">Associated Contract</h2>
                <p><strong>Contract ID:</strong> {contractsByName.get(selectedRecord.employeeName)?.contractId || 'N/A'}</p>
                <p><strong>Department:</strong> {contractsByName.get(selectedRecord.employeeName)?.department || 'N/A'}</p>
                <p><strong>Position:</strong> {contractsByName.get(selectedRecord.employeeName)?.position || 'N/A'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultPayrollRecords;
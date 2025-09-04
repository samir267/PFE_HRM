import React, { useState, useMemo } from 'react';
import { FiFileText, FiDownload, FiSearch, FiUsers } from 'react-icons/fi';
import { initialEmployees, Employee } from '../../../components/shared/individualfile';

// New Interface for Employee Documents
interface EmployeeDocument {
  id: string;
  name: string;
  type: 'Contract' | 'ID' | 'Certificate' | 'Resume' | 'Other';
  dateUploaded: string;
  url: string;
}

// Mock Data for Employee Documents
const mockDocuments: { [key: string]: EmployeeDocument[] } = {
  'emp1': [
    { id: 'doc1', name: 'Employment Contract', type: 'Contract', dateUploaded: '2020-01-01', url: '/documents/contract_john_doe.pdf' },
    { id: 'doc2', name: 'Passport Scan', type: 'ID', dateUploaded: '2020-01-05', url: '/documents/passport_john_doe.pdf' },
  ],
  'emp2': [
    { id: 'doc3', name: 'Product Management Certificate', type: 'Certificate', dateUploaded: '2022-03-10', url: '/documents/certificate_jane_smith.pdf' },
  ],
};

const EmployeeDocuments: React.FC = () => {
  const [employees] = useState<Employee[]>(initialEmployees);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('emp1');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const selectedEmployee = useMemo(
    () => employees.find((emp) => emp.id === selectedEmployeeId),
    [employees, selectedEmployeeId]
  );
  const documents = mockDocuments[selectedEmployeeId] || [];

  const filteredEmployees = useMemo(() => {
    if (!searchTerm) return employees;
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return employees.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(lowercasedSearchTerm) ||
        employee.lastName.toLowerCase().includes(lowercasedSearchTerm) ||
        employee.id.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [employees, searchTerm]);

  if (!selectedEmployee) {
    return <div className="flex justify-center items-center h-screen bg-gray-50"><p className="text-gray-500 text-lg">Employee not found.</p></div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="md:w-1/4 bg-white rounded-xl shadow-md p-4 mb-4 md:mb-0 md:mr-4 sticky top-4 self-start">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center"><FiUsers className="mr-2" /> Employees</h3>
        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search by name, ID..." className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <ul className="space-y-2 max-h-[70vh] overflow-y-auto">
          {filteredEmployees.map((emp) => (
            <li key={emp.id} onClick={() => setSelectedEmployeeId(emp.id)} className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedEmployeeId === emp.id ? 'bg-orange-100 text-orange-700 font-semibold' : 'hover:bg-gray-50'}`}>
              <div className="flex items-center">
                <img src={emp.profilePhoto || 'https://i.pravatar.cc/150?img=70'} alt={emp.firstName} className="w-8 h-8 rounded-full mr-3" />
                <div className="flex flex-col"><span className="text-sm">{emp.firstName} {emp.lastName}</span><span className="text-xs text-gray-500">{emp.jobTitle}</span></div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="md:w-3/4">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center text-orange-600 mb-4">
            <FiFileText size={24} />
            <h2 className="text-xl font-semibold ml-2 text-gray-800">Documents for {selectedEmployee.firstName} {selectedEmployee.lastName}</h2>
          </div>
          {documents.length > 0 ? (
            <ul className="space-y-4">
              {documents.map(doc => (
                <li key={doc.id} className="border-b border-gray-200 pb-2 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">{doc.name}</p>
                    <p className="text-sm text-gray-500">Type: {doc.type} | Uploaded: {doc.dateUploaded}</p>
                  </div>
                  <a href={doc.url} download className="text-orange-600 hover:text-orange-800 transition-colors">
                    <FiDownload size={20} />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No documents found for this employee.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDocuments;
import React, { useState, useMemo } from 'react';
import { FiMapPin, FiUsers, FiSearch, FiHome } from 'react-icons/fi';
import { initialEmployees, Employee, renderSection, renderField } from '../../../components/shared/individualfile';

const IndividualDataHRProfessional: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('emp1');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const selectedEmployee = useMemo(
    () => employees.find((emp) => emp.id === selectedEmployeeId),
    [employees, selectedEmployeeId]
  );

  const filteredEmployees = useMemo(() => {
    if (!searchTerm) return employees;
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return employees.filter(
      (employee) =>
        employee.addresses.some(address => address.city.toLowerCase().includes(lowercasedSearchTerm)) ||
        employee.addresses.some(address => address.country.toLowerCase().includes(lowercasedSearchTerm))
    );
  }, [employees, searchTerm]);

  if (!selectedEmployee) {
    return <div className="flex justify-center items-center h-screen bg-gray-50"><p className="text-gray-500 text-lg">Employee not found.</p></div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8 flex flex-col md:flex-row">
      {/* Sidebar for Employee List and Filter by Location */}
      <div className="md:w-1/4 bg-white rounded-xl shadow-md p-4 mb-4 md:mb-0 md:mr-4 sticky top-4 self-start">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center"><FiMapPin className="mr-2" /> Employees by Location</h3>
        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search by city, country..." className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <ul className="space-y-2 max-h-[70vh] overflow-y-auto">
          {filteredEmployees.map((emp) => (
            <li key={emp.id} onClick={() => setSelectedEmployeeId(emp.id)} className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedEmployeeId === emp.id ? 'bg-orange-100 text-orange-700 font-semibold' : 'hover:bg-gray-50'}`}>
              <div className="flex items-center">
                <img src={emp.profilePhoto || 'https://i.pravatar.cc/150?img=70'} alt={emp.firstName} className="w-8 h-8 rounded-full mr-3" />
                <div className="flex flex-col"><span className="text-sm">{emp.firstName} {emp.lastName}</span><span className="text-xs text-gray-500">{emp.addresses.find(a => a.isPrimary)?.city || 'N/A'}</span></div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="md:w-3/4">
        {renderSection('Address Information', <FiHome />,
          selectedEmployee.addresses.map((address, index) => (
            <div key={index} className="col-span-1 sm:col-span-3">
              <p className="text-gray-500 text-sm font-medium mb-1">{address.addressType} Address {address.isPrimary && '(Primary)'}</p>
              <div className="space-y-2">
                {renderField('Street 1', address.street1, `addresses[${index}].street1`, 'address')}
                {renderField('Street 2', address.street2, `addresses[${index}].street2`, 'address')}
                {renderField('City', address.city, `addresses[${index}].city`, 'address')}
                {renderField('Postal Code', address.postalCode, `addresses[${index}].postalCode`, 'address')}
                {renderField('Country', address.country, `addresses[${index}].country`, 'address')}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default IndividualDataHRProfessional;
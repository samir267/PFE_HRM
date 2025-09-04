
import React, { useState, useMemo } from 'react';
import { FiUser, FiPhone, FiHome, FiCreditCard, FiSearch, FiUsers } from 'react-icons/fi';
import { initialEmployees, Employee, renderSection, renderField } from '../../../components/shared/individualfile';

const IndividualDataPayrollManager: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('emp1');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const selectedEmployee = useMemo(
    () => employees.find((emp) => emp.id === selectedEmployeeId),
    [employees, selectedEmployeeId]
  );

  const handleUpdate = (field: string, value: any) => {
    if (!selectedEmployee) return;
    const updatedEmployees = employees.map((emp) =>
      emp.id === selectedEmployeeId ? { ...emp, [field]: value } : emp
    );
    setEmployees(updatedEmployees);
  };

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
      {/* Sidebar for Employee List and Filter */}
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
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center mb-4 sm:mb-0">
            <img src={selectedEmployee.profilePhoto || 'https://i.pravatar.cc/150?img=68'} alt={`${selectedEmployee.firstName} ${selectedEmployee.lastName}`} className="w-20 h-20 rounded-full object-cover mr-4" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedEmployee.firstName} {selectedEmployee.lastName}</h1>
              <p className="text-gray-500">{selectedEmployee.jobTitle} - {selectedEmployee.department}</p>
            </div>
          </div>
          <button onClick={() => setIsEditing(!isEditing)} className={`px-6 py-2 rounded-lg transition-colors ${isEditing ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-orange-600 text-white hover:bg-orange-700'}`}>
            {isEditing ? 'Cancel Edit' : 'Edit Information'}
          </button>
        </header>

        <div className="space-y-6">
          {renderSection(
            'Personal Information',
            <FiUser />,
            <>
              {renderField('Title', selectedEmployee.title, 'title', 'personal')}
              {renderField('First Name', selectedEmployee.firstName, 'firstName', 'personal')}
              {renderField('Last Name', selectedEmployee.lastName, 'lastName', 'personal')}
              {renderField('Preferred Name', selectedEmployee.preferredName, 'preferredName', 'personal')}
              {renderField('Gender', selectedEmployee.gender, 'gender', 'personal')}
              {renderField('Birth Date', selectedEmployee.birthDate, 'birthDate', 'personal', 'date')}
              {renderField('Marital Status', selectedEmployee.maritalStatusHistory[0]?.status, 'maritalStatus', 'personal')}
              {renderField('Primary Citizenship', selectedEmployee.citizenships.find(c => c.primaryNationality)?.countryCode, 'primaryCitizenship', 'personal')}
            </>
          )}
          {renderSection(
            'Contact Information',
            <FiPhone />,
            <>
              {selectedEmployee.phones.map((phone, index) => (
                <div key={index}>
                  <p className="text-gray-500 text-sm font-medium">{phone.type} Phone</p>
                  {renderField('', phone.number, `phones[${index}].number`, 'contact')}
                </div>
              ))}
              {selectedEmployee.emails.map((email, index) => (
                <div key={index}>
                  <p className="text-gray-500 text-sm font-medium">{email.type} Email</p>
                  {renderField('', email.email, `emails[${index}].email`, 'contact')}
                </div>
              ))}
              {selectedEmployee.emergencyContacts.map((contact, index) => (
                <div key={index}>
                  <p className="text-gray-500 text-sm font-medium">Emergency Contact ({contact.priority})</p>
                  <p className="text-gray-900">{contact.firstName} {contact.lastName}</p>
                  <p className="text-gray-900">{contact.phone}</p>
                </div>
              ))}
            </>
          )}
          {renderSection(
            'Address Information',
            <FiHome />,
            <>
              {selectedEmployee.addresses.map((address, index) => (
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
              ))}
            </>
          )}
          {renderSection(
            'Bank Details',
            <FiCreditCard />,
            <>
              {selectedEmployee.bankDetails.map((bank, index) => (
                <div key={index} className="col-span-1 sm:col-span-3">
                  <p className="text-gray-500 text-sm font-medium mb-1">{bank.paymentMethod} {bank.isPrimary && '(Primary)'}</p>
                  <div className="space-y-2">
                    {renderField('IBAN', bank.iban, `bankDetails[${index}].iban`, 'bank')}
                    {renderField('BIC', bank.bic, `bankDetails[${index}].bic`, 'bank')}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndividualDataPayrollManager;
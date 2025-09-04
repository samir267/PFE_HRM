import React, { useState } from 'react';
import { FiBriefcase, FiPlus, FiEdit, FiTrash2, FiSearch } from 'react-icons/fi'; // Using FiBriefcase for department icon

// Assuming these interfaces are defined globally or imported
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
}

interface Department {
  id: string;
  name: string;
  description: string;
  headUserId: string;
}

// Dummy data for user selection for department head
const dummyUsers: User[] = [
  { id: 'u1', firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', role: 'Standard user', department: 'Sales' },
  { id: 'u2', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', role: 'Director', department: 'Marketing' },
  { id: 'u3', firstName: 'Alice', lastName: 'Johnson', email: 'alice.j@example.com', role: 'Administrator', department: 'IT' },
];

const DepartmentsManagement = ({ darkMode }: { darkMode: boolean }) => {
  const [departments, setDepartments] = useState<Department[]>([
    { id: 'd1', name: 'Sales', description: 'Responsible for all sales activities', headUserId: 'u1' },
    { id: 'd2', name: 'Marketing', description: 'Handles marketing strategies and campaigns', headUserId: 'u2' },
    { id: 'd3', name: 'IT', description: 'Manages technology infrastructure and support', headUserId: 'u3' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDepartmentModal, setShowAddDepartmentModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);

  const filteredDepartments = departments.filter(department =>
    department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    department.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (dummyUsers.find(u => u.id === department.headUserId)?.firstName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDepartment = (newDepartment: Department) => {
    setDepartments(prev => [...prev, { ...newDepartment, id: Date.now().toString() }]);
    setShowAddDepartmentModal(false);
  };

  const handleUpdateDepartment = (updatedDepartment: Department) => {
    setDepartments(prev => prev.map(department => (department.id === updatedDepartment.id ? updatedDepartment : department)));
    setEditingDepartment(null);
  };

  const handleDeleteDepartment = (id: string) => {
    setDepartments(prev => prev.filter(department => department.id !== id));
  };

  // Helper to get user full name
  const getUserFullName = (userId: string) => {
    const user = dummyUsers.find(u => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'N/A';
  };

  const DepartmentForm = ({ initialData, onSubmit, onClose }: { initialData?: Department | null, onSubmit: (department: Department) => void, onClose: () => void }) => {
    const [formData, setFormData] = useState<Department>(initialData || {
      id: '', name: '', description: '', headUserId: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}>
        <div className={`p-6 rounded-lg shadow-lg w-full max-w-md ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
          <h2 className="text-xl font-semibold mb-4">{initialData ? 'Edit Department' : 'Add New Department'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Department Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
            </div>
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={3}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
            </div>
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Department Head</label>
              <select name="headUserId" value={formData.headUserId} onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}>
                <option value="">Select Head (Optional)</option>
                {dummyUsers.map(user => (
                  <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={onClose}
                className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-600 hover:bg-gray-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}>
                Cancel
              </button>
              <button type="submit"
                className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
                {initialData ? 'Update Department' : 'Add Department'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className={`p-6 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
      <h1 className="text-3xl font-bold mb-6">Departments Management</h1>

      <div className={`mb-6 p-4 rounded-lg flex items-center ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <FiSearch className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
        <input
          type="text"
          placeholder="Search departments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
        />
        <button
          onClick={() => setShowAddDepartmentModal(true)}
          className={`ml-4 px-4 py-2 rounded-lg flex items-center gap-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        >
          <FiPlus size={18} /> Add Department
        </button>
      </div>

      <div className={`overflow-x-auto rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <table className="w-full text-left">
          <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <tr>
              <th className={`py-3 px-4 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Department Name</th>
              <th className={`py-3 px-4 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</th>
              <th className={`py-3 px-4 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Department Head</th>
              <th className={`py-3 px-4 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDepartments.map(department => (
              <tr key={department.id} className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} hover:${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <td className="py-3 px-4">{department.name}</td>
                <td className="py-3 px-4">{department.description}</td>
                <td className="py-3 px-4">{getUserFullName(department.headUserId)}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button
                    onClick={() => setEditingDepartment(department)}
                    className={`p-2 rounded-full ${darkMode ? 'text-blue-400 hover:bg-blue-900' : 'text-blue-600 hover:bg-blue-100'}`}
                    title="Edit Department"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteDepartment(department.id)}
                    className={`p-2 rounded-full ${darkMode ? 'text-red-400 hover:bg-red-900' : 'text-red-600 hover:bg-red-100'}`}
                    title="Delete Department"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddDepartmentModal && (
        <DepartmentForm onSubmit={handleAddDepartment} onClose={() => setShowAddDepartmentModal(false)} />
      )}

      {editingDepartment && (
        <DepartmentForm initialData={editingDepartment} onSubmit={handleUpdateDepartment} onClose={() => setEditingDepartment(null)} />
      )}
    </div>
  );
};

export default DepartmentsManagement;
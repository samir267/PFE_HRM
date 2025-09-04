
// import React, { useState, useMemo, useRef, useEffect } from 'react';
// import {
//   FiPlus,
//   FiTrash2,
//   FiEdit,
//   FiX,
//   FiSearch,
//   FiChevronLeft,
//   FiChevronRight,
//   FiChevronsLeft,
//   FiChevronsRight,
//   FiFilter,
//   FiUsers,
//   FiUser,
//   FiTool,
//   FiBookOpen,
//   FiArrowUp,
//   FiArrowDown,
//   FiMenu,
//   FiCheckCircle,
//   FiAlertCircle,
//   FiSliders,
//   FiEye
// } from 'react-icons/fi';
// import {
//   useReactTable,
//   getCoreRowModel,
//   flexRender,
//   ColumnDef,
//   getPaginationRowModel,
//   getFilteredRowModel,
//   getSortedRowModel,
//   SortingState,
//   ColumnFiltersState,
//   getFacetedRowModel,
//   getFacetedUniqueValues,
//   RowSelectionState,
// } from '@tanstack/react-table';

// // --- Data Model Interfaces ---

// // Simplified Employee Model
// export interface Employee {
//   id: string;
//   name: string;
//   department: string;
// }

// // Vehicle Model
// export interface Vehicle {
//   id: string;
//   make: string;
//   model: string;
//   year: number;
//   type: string;
//   color: string;
//   serialNumber: string;
//   licensePlate: string;
//   status: 'In service' | 'In maintenance' | 'Out of service';
//   assignment: {
//     employeeId: string | null;
//     employeeName?: string;
//     history: {
//       employeeId: string;
//       assignmentDate: string;
//       releaseDate?: string;
//     }[];
//   };
//   maintenanceHistory: {
//     date: string;
//     description: string;
//     cost: number;
//   }[];
// }

// // --- Base Data and Configurations (Fictitious Data) ---
// const initialEmployees: Employee[] = [
//   { id: 'emp-1', name: 'Jean Dupont', department: 'Sales' },
//   { id: 'emp-2', name: 'Marie Curie', department: 'R&D' },
//   { id: 'emp-3', name: 'Pierre Durand', department: 'Logistics' },
//   { id: 'emp-4', name: 'Sophie Bernard', department: 'Sales' },
//   { id: 'emp-5', name: 'Luc Martin', department: 'Marketing' },
//   { id: 'emp-6', name: 'Julie Dubois', department: 'Production' },
//   { id: 'emp-7', name: 'Marc Lefevre', department: 'Support' },
//   { id: 'emp-8', name: 'Anais Girard', department: 'Finance' },
//   { id: 'emp-9', name: 'Thomas Petit', department: 'Sales' },
//   { id: 'emp-10', name: 'Camille Leroux', department: 'R&D' },
//   { id: 'emp-11', name: 'Eric Moreau', department: 'Logistics' },
//   { id: 'emp-12', name: 'Laura Bonnet', department: 'Marketing' },
//   { id: 'emp-13', name: 'David Rousseau', department: 'Production' },
//   { id: 'emp-14', name: 'Chloe Lambert', department: 'Support' },
//   { id: 'emp-15', name: 'Antoine Fournier', department: 'Finance' },
//   { id: 'emp-16', name: 'Manon Gauthier', department: 'Sales' },
//   { id: 'emp-17', name: 'Hugo Richard', department: 'R&D' },
//   { id: 'emp-18', name: 'Emma Lemoine', department: 'Logistics' },
//   { id: 'emp-19', name: 'Paul Vincent', department: 'Marketing' },
//   { id: 'emp-20', name: 'Léa Leroy', department: 'Production' },
// ];

// const initialVehicles: Vehicle[] = [
//   {
//     id: 'v-1',
//     make: 'Toyota',
//     model: 'Corolla',
//     year: 2022,
//     type: 'Sedan',
//     color: 'Black',
//     serialNumber: 'VIN1234567890',
//     licensePlate: 'ABC-123',
//     status: 'In service',
//     assignment: {
//       employeeId: 'emp-1',
//       employeeName: 'Jean Dupont',
//       history: [{ employeeId: 'emp-1', assignmentDate: '2023-01-15' }],
//     },
//     maintenanceHistory: [
//       { date: '2024-05-20', description: 'Oil change', cost: 75.50 },
//     ],
//   },
//   {
//     id: 'v-2',
//     make: 'Ford',
//     model: 'Transit',
//     year: 2020,
//     type: 'Van',
//     color: 'White',
//     serialNumber: 'VIN9876543210',
//     licensePlate: 'DEF-456',
//     status: 'In maintenance',
//     assignment: {
//       employeeId: null,
//       history: [{ employeeId: 'emp-3', assignmentDate: '2022-03-10', releaseDate: '2023-06-20' }],
//     },
//     maintenanceHistory: [
//       { date: '2024-06-10', description: 'Transmission repair', cost: 1200.00 },
//     ],
//   },
//   {
//     id: 'v-3',
//     make: 'Honda',
//     model: 'CRV',
//     year: 2021,
//     type: 'SUV',
//     color: 'Grey',
//     serialNumber: 'VIN1122334455',
//     licensePlate: 'GHI-789',
//     status: 'Out of service',
//     assignment: {
//       employeeId: null,
//       history: [],
//     },
//     maintenanceHistory: [],
//   },
//   {
//     id: 'v-4',
//     make: 'Toyota',
//     model: 'RAV4',
//     year: 2023,
//     type: 'SUV',
//     color: 'Blue',
//     serialNumber: 'VIN5566778899',
//     licensePlate: 'JKL-101',
//     status: 'In service',
//     assignment: {
//       employeeId: 'emp-2',
//       employeeName: 'Marie Curie',
//       history: [{ employeeId: 'emp-2', assignmentDate: '2023-11-01' }],
//     },
//     maintenanceHistory: [],
//   },
//   {
//     id: 'v-5',
//     make: 'Nissan',
//     model: 'Altima',
//     year: 2020,
//     type: 'Sedan',
//     color: 'Silver',
//     serialNumber: 'VIN0987654321',
//     licensePlate: 'MNO-202',
//     status: 'In service',
//     assignment: {
//       employeeId: 'emp-4',
//       employeeName: 'Sophie Bernard',
//       history: [{ employeeId: 'emp-4', assignmentDate: '2024-02-28' }],
//     },
//     maintenanceHistory: [],
//   },
//   {
//     id: 'v-6',
//     make: 'BMW',
//     model: 'X5',
//     year: 2024,
//     type: 'SUV',
//     color: 'Black',
//     serialNumber: 'VIN0011223344',
//     licensePlate: 'PQR-303',
//     status: 'In service',
//     assignment: {
//       employeeId: 'emp-5',
//       employeeName: 'Luc Martin',
//       history: [{ employeeId: 'emp-5', assignmentDate: '2024-07-01' }],
//     },
//     maintenanceHistory: [],
//   },
//   {
//     id: 'v-7',
//     make: 'Mercedes',
//     model: 'Sprinter',
//     year: 2019,
//     type: 'Van',
//     color: 'Black',
//     serialNumber: 'VIN2233445566',
//     licensePlate: 'STU-404',
//     status: 'In service',
//     assignment: {
//       employeeId: 'emp-6',
//       employeeName: 'Julie Dubois',
//       history: [{ employeeId: 'emp-6', assignmentDate: '2023-09-10' }],
//     },
//     maintenanceHistory: [{ date: '2024-01-15', description: 'Major maintenance', cost: 850.00 }],
//   },
//   {
//     id: 'v-8',
//     make: 'Tesla',
//     model: 'Model 3',
//     year: 2022,
//     type: 'Sedan',
//     color: 'White',
//     serialNumber: 'VIN3344556677',
//     licensePlate: 'VWX-505',
//     status: 'In service',
//     assignment: {
//       employeeId: 'emp-7',
//       employeeName: 'Marc Lefevre',
//       history: [{ employeeId: 'emp-7', assignmentDate: '2023-12-01' }],
//     },
//     maintenanceHistory: [],
//   },
//   {
//     id: 'v-9',
//     make: 'Volkswagen',
//     model: 'Golf',
//     year: 2021,
//     type: 'Sedan',
//     color: 'Blue',
//     serialNumber: 'VIN4455667788',
//     licensePlate: 'YZA-606',
//     status: 'In maintenance',
//     assignment: {
//       employeeId: null,
//       history: [],
//     },
//     maintenanceHistory: [{ date: '2024-07-25', description: 'Tire change', cost: 450.00 }],
//   },
//   {
//     id: 'v-10',
//     make: 'Audi',
//     model: 'A4',
//     year: 2023,
//     type: 'Sedan',
//     color: 'Grey',
//     serialNumber: 'VIN5566778899',
//     licensePlate: 'BCD-707',
//     status: 'In service',
//     assignment: {
//       employeeId: 'emp-8',
//       employeeName: 'Anais Girard',
//       history: [{ employeeId: 'emp-8', assignmentDate: '2024-04-10' }],
//     },
//     maintenanceHistory: [],
//   },
//   {
//     id: 'v-11',
//     make: 'Hyundai',
//     model: 'Tucson',
//     year: 2022,
//     type: 'SUV',
//     color: 'Red',
//     serialNumber: 'VIN6677889900',
//     licensePlate: 'EFG-808',
//     status: 'In service',
//     assignment: {
//       employeeId: 'emp-9',
//       employeeName: 'Thomas Petit',
//       history: [{ employeeId: 'emp-9', assignmentDate: '2023-03-20' }],
//     },
//     maintenanceHistory: [{ date: '2024-02-18', description: 'Brake inspection', cost: 150.00 }],
//   },
//   {
//     id: 'v-12',
//     make: 'Kia',
//     model: 'Sportage',
//     year: 2023,
//     type: 'SUV',
//     color: 'Black',
//     serialNumber: 'VIN7788990011',
//     licensePlate: 'HIJ-909',
//     status: 'In service',
//     assignment: {
//       employeeId: 'emp-10',
//       employeeName: 'Camille Leroux',
//       history: [{ employeeId: 'emp-10', assignmentDate: '2024-05-05' }],
//     },
//     maintenanceHistory: [],
//   },
//   {
//     id: 'v-13',
//     make: 'Peugeot',
//     model: '308',
//     year: 2020,
//     type: 'Sedan',
//     color: 'White',
//     serialNumber: 'VIN8899001122',
//     licensePlate: 'KLM-111',
//     status: 'Out of service',
//     assignment: {
//       employeeId: null,
//       history: [],
//     },
//     maintenanceHistory: [{ date: '2023-10-01', description: 'Battery replacement', cost: 250.00 }],
//   },
//   {
//     id: 'v-14',
//     make: 'Renault',
//     model: 'Kangoo',
//     year: 2021,
//     type: 'Van',
//     color: 'Grey',
//     serialNumber: 'VIN9900112233',
//     licensePlate: 'NOP-222',
//     status: 'In service',
//     assignment: {
//       employeeId: 'emp-11',
//       employeeName: 'Eric Moreau',
//       history: [{ employeeId: 'emp-11', assignmentDate: '2023-08-12' }],
//     },
//     maintenanceHistory: [],
//   },
//   {
//     id: 'v-15',
//     make: 'Citroën',
//     model: 'C3',
//     year: 2019,
//     type: 'Sedan',
//     color: 'Blue',
//     serialNumber: 'VIN0011223344',
//     licensePlate: 'QRS-333',
//     status: 'In service',
//     assignment: {
//       employeeId: 'emp-12',
//       employeeName: 'Laura Bonnet',
//       history: [{ employeeId: 'emp-12', assignmentDate: '2022-07-25' }],
//     },
//     maintenanceHistory: [{ date: '2024-03-01', description: 'Oil change', cost: 90.00 }],
//   },
//   {
//     id: 'v-16',
//     make: 'Ford',
//     model: 'Focus',
//     year: 2020,
//     type: 'Sedan',
//     color: 'Black',
//     serialNumber: 'VIN1122334455',
//     licensePlate: 'TUV-444',
//     status: 'In service',
//     assignment: {
//       employeeId: 'emp-13',
//       employeeName: 'David Rousseau',
//       history: [{ employeeId: 'emp-13', assignmentDate: '2024-01-20' }],
//     },
//     maintenanceHistory: [],
//   },
//   {
//     id: 'v-17',
//     make: 'Toyota',
//     model: 'Yaris',
//     year: 2023,
//     type: 'Sedan',
//     color: 'Red',
//     serialNumber: 'VIN2233445566',
//     licensePlate: 'WXY-555',
//     status: 'In service',
//     assignment: {
//       employeeId: 'emp-14',
//       employeeName: 'Chloe Lambert',
//       history: [{ employeeId: 'emp-14', assignmentDate: '2024-06-01' }],
//     },
//     maintenanceHistory: [],
//   },
//   {
//     id: 'v-18',
//     make: 'Volkswagen',
//     model: 'Transporter',
//     year: 2022,
//     type: 'Van',
//     color: 'Blue',
//     serialNumber: 'VIN3344556677',
//     licensePlate: 'ZAB-666',
//     status: 'In maintenance',
//     assignment: {
//       employeeId: null,
//       history: [{ employeeId: 'emp-15', assignmentDate: '2023-05-18', releaseDate: '2024-06-15' }],
//     },
//     maintenanceHistory: [{ date: '2024-07-10', description: 'General check-up', cost: 600.00 }],
//   },
//   {
//     id: 'v-19',
//     make: 'BMW',
//     model: '3 Series',
//     year: 2024,
//     type: 'Sedan',
//     color: 'Grey',
//     serialNumber: 'VIN4455667788',
//     licensePlate: 'CDE-777',
//     status: 'In service',
//     assignment: {
//       employeeId: 'emp-16',
//       employeeName: 'Manon Gauthier',
//       history: [{ employeeId: 'emp-16', assignmentDate: '2024-07-10' }],
//     },
//     maintenanceHistory: [],
//   },
//   {
//     id: 'v-20',
//     make: 'Audi',
//     model: 'Q5',
//     year: 2021,
//     type: 'SUV',
//     color: 'White',
//     serialNumber: 'VIN5566778899',
//     licensePlate: 'FGH-888',
//     status: 'In service',
//     assignment: {
//       employeeId: 'emp-17',
//       employeeName: 'Hugo Richard',
//       history: [{ employeeId: 'emp-17', assignmentDate: '2023-04-22' }],
//     },
//     maintenanceHistory: [{ date: '2024-05-10', description: 'Intermediate maintenance', cost: 350.00 }],
//   },
// ];


// // --- Utility Functions ---
// const generateId = () => `v-${Date.now()}`;

// // --- Modal and Sidebar Components ---

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
//   title: string;
// }

// const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col p-6">
//         <div className="flex justify-between items-center border-b pb-4 mb-4">
//           <h3 className="text-xl font-bold">{title}</h3>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <FiX className="h-6 w-6" />
//           </button>
//         </div>
//         <div className="overflow-y-auto pr-2 flex-1">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// interface SidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
//   title: string;
// }

// const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, children, title }) => {
//   return (
//     <div
//       className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
//         isOpen ? 'translate-x-0' : 'translate-x-full'
//       }`}
//     >
//       <div className="flex flex-col h-full">
//         <div className="flex justify-between items-center p-6 border-b">
//           <h3 className="text-xl font-bold">{title}</h3>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <FiX className="h-6 w-6" />
//           </button>
//         </div>
//         <div className="flex-1 overflow-y-auto p-6">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- Main Application Component ---
// export const VehicleManagement: React.FC = () => {
//   const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
//   const [employees] = useState<Employee[]>(initialEmployees);
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
//   const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
//   const [isFiltersOpen, setIsFiltersOpen] = useState(false);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar

//   const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
//   const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);

//   const [pagination, setPagination] = useState({
//     pageIndex: 0,
//     pageSize: 10,
//   });

//   // --- CRUD Vehicle Management Functions ---

//   // Add a vehicle
//   const addVehicle = (newVehicleData: Omit<Vehicle, 'id' | 'assignment' | 'maintenanceHistory'>) => {
//     const newVehicle: Vehicle = {
//       ...newVehicleData,
//       id: generateId(),
//       assignment: { employeeId: null, history: [] },
//       maintenanceHistory: [],
//     };
//     setVehicles(prev => [...prev, newVehicle]);
//     setIsAddModalOpen(false);
//   };

//   // Update a vehicle
//   const updateVehicle = (id: string, updatedData: Partial<Vehicle>) => {
//     setVehicles(prev =>
//       prev.map(v => (v.id === id ? { ...v, ...updatedData } : v))
//     );
//     setIsEditModalOpen(false);
//   };

//   // Delete a vehicle (with confirmation)
//   const confirmDeleteVehicle = (vehicle: Vehicle) => {
//     setVehicleToDelete(vehicle);
//     setRowSelection({}); // Clear any bulk selection
//     setIsConfirmModalOpen(true);
//   };

//   const deleteVehicle = () => {
//     if (vehicleToDelete) {
//       setVehicles(prev => prev.filter(v => v.id !== vehicleToDelete.id));
//       setVehicleToDelete(null);
//     }
//     setIsConfirmModalOpen(false);
//   };

//   // Link a vehicle to an employee
//   const linkVehicleToEmployee = (vehicleId: string, employeeId: string) => {
//     const employee = employees.find(e => e.id === employeeId);
//     if (!employee) return;

//     setVehicles(prev =>
//       prev.map(v => {
//         if (v.id === vehicleId) {
//           const newHistory = [...v.assignment.history];
//           if (v.assignment.employeeId) {
//             // Release the old employee
//             const lastEntry = newHistory[newHistory.length - 1];
//             if (lastEntry && !lastEntry.releaseDate) {
//               lastEntry.releaseDate = new Date().toISOString().split('T')[0];
//             }
//           }
//           // Assign the new employee
//           newHistory.push({ employeeId: employee.id, assignmentDate: new Date().toISOString().split('T')[0] });
//           return {
//             ...v,
//             status: 'In service',
//             assignment: {
//               employeeId: employee.id,
//               employeeName: employee.name,
//               history: newHistory,
//             },
//           };
//         }
//         return v;
//       })
//     );
//   };

//   // Unlink a vehicle
//   const unlinkVehicle = (vehicleId: string) => {
//     setVehicles(prev =>
//       prev.map(v => {
//         if (v.id === vehicleId && v.assignment.employeeId) {
//           const newHistory = [...v.assignment.history];
//           const lastEntry = newHistory[newHistory.length - 1];
//           if (lastEntry) {
//             lastEntry.releaseDate = new Date().toISOString().split('T')[0];
//           }
//           return {
//             ...v,
//             status: 'Out of service',
//             assignment: {
//               employeeId: null,
//               employeeName: undefined,
//               history: newHistory,
//             },
//           };
//         }
//         return v;
//       })
//     );
//   };

//   // View Modal Management Functions
//   const handleOpenViewModal = (vehicle: Vehicle) => {
//     setEditingVehicle(vehicle);
//     setIsViewModalOpen(true);
//   };

//   const handleCloseViewModal = () => {
//     setIsViewModalOpen(false);
//     setEditingVehicle(null);
//   };

//   // --- Table Configuration ---
//   const columns = useMemo<ColumnDef<Vehicle>[]>(
//     () => [
//       {
//         id: 'select',
//         header: ({ table }) => (
//           <IndeterminateCheckbox
//             {...{
//               checked: table.getIsAllRowsSelected(),
//               indeterminate: table.getIsSomeRowsSelected(),
//               onChange: table.getToggleAllRowsSelectedHandler(),
//             }}
//           />
//         ),
//         cell: ({ row }) => (
//           <IndeterminateCheckbox
//             {...{
//               checked: row.getIsSelected(),
//               disabled: !row.getCanSelect(),
//               indeterminate: row.getIsSomeSelected(),
//               onChange: row.getToggleSelectedHandler(),
//             }}
//           />
//         ),
//       },
//       {
//         accessorKey: 'licensePlate',
//         header: 'License Plate',
//         cell: ({ row, getValue }) => (
//           <div
//             className="font-medium text-blue-600 hover:underline cursor-pointer"
//             onClick={() => handleOpenViewModal(row.original)}
//           >
//             {getValue() as string}
//           </div>
//         ),
//         enableColumnFilter: true,
//       },
//       {
//         accessorKey: 'make',
//         header: 'Make',
//         cell: info => <div className="text-sm text-gray-900">{info.getValue() as string}</div>,
//         enableColumnFilter: true,
//         filterFn: 'includesString',
//       },
//       {
//         accessorKey: 'model',
//         header: 'Model',
//         cell: info => <div className="text-sm text-gray-500">{info.getValue() as string}</div>,
//         enableColumnFilter: true,
//         filterFn: 'includesString',
//       },
//       {
//         accessorKey: 'year',
//         header: 'Year',
//         cell: info => <div className="text-sm text-gray-500">{info.getValue() as number}</div>,
//         enableColumnFilter: true,
//       },
//       {
//         accessorKey: 'assignment.employeeName',
//         header: 'Assigned Employee',
//         cell: info => (
//           <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${info.getValue() ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
//             {info.getValue() || 'Not assigned'}
//           </span>
//         ),
//         enableColumnFilter: true,
//       },
//       {
//         accessorKey: 'status',
//         header: 'Status',
//         cell: info => {
//           const status = info.getValue() as string;
//           let colorClass = '';
//           switch (status) {
//             case 'In service':
//               colorClass = 'bg-green-100 text-green-800';
//               break;
//             case 'In maintenance':
//               colorClass = 'bg-yellow-100 text-yellow-800';
//               break;
//             case 'Out of service':
//               colorClass = 'bg-red-100 text-red-800';
//               break;
//             default:
//               colorClass = 'bg-gray-100 text-gray-800';
//               break;
//           }
//           return (
//             <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClass}`}>
//               {status}
//             </span>
//           );
//         },
//         enableColumnFilter: true,
//         filterFn: 'includesString',
//       },
//       {
//         id: 'actions',
//         header: 'Actions',
//         cell: ({ row }) => (
//           <div className="flex space-x-2">
//             <button
//               onClick={() => handleOpenViewModal(row.original)}
//               className="p-2 text-gray-500 hover:text-gray-900"
//               title="View details"
//             >
//               <FiEye className="w-5 h-5" />
//             </button>
//             <button
//               onClick={() => {
//                 setEditingVehicle(row.original);
//                 setIsEditModalOpen(true);
//               }}
//               className="p-2 text-blue-500 hover:text-blue-900"
//               title="Edit"
//             >
//               <FiEdit className="w-5 h-5" />
//             </button>
//             <button
//               onClick={() => confirmDeleteVehicle(row.original)}
//               className="p-2 text-red-500 hover:text-red-900"
//               title="Delete"
//             >
//               <FiTrash2 className="w-5 h-5" />
//             </button>
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   const table = useReactTable({
//     data: vehicles,
//     columns,
//     state: {
//       sorting,
//       columnFilters,
//       rowSelection,
//       pagination,
//     },
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     onRowSelectionChange: setRowSelection,
//     onPaginationChange: setPagination,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getFacetedRowModel: getFacetedRowModel(),
//     getFacetedUniqueValues: getFacetedUniqueValues(),
//     enableRowSelection: true,
//   });

//   const selectedRowsCount = Object.keys(rowSelection).length;
//   const isMultiSelectActionEnabled = selectedRowsCount > 0;

//   // Added a new state for multi-delete confirmation
//   const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);

//   const confirmBulkDelete = () => {
//     setIsBulkDeleteModalOpen(true);
//   };

//   const handleDeleteSelected = () => {
//     // Logic to delete all selected rows
//     const selectedIds = table.getSelectedRowModel().rows.map(row => row.original.id);
//     setVehicles(prev => prev.filter(v => !selectedIds.includes(v.id)));
//     setRowSelection({}); // Clear selection
//     setIsBulkDeleteModalOpen(false); // Close the bulk delete modal
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen font-sans">
//       <header className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">Vehicle Management</h1>
//         <p className="text-gray-600">Manage your company's fleet of vehicles.</p>
//       </header>

//       {/* Toolbar */}
//       <div className="flex flex-col md:flex-row justify-between items-start mb-6 space-y-4 md:space-y-0">
//         <div className="flex-1 flex items-center space-x-2 w-full md:w-auto">
//           <button
//             onClick={() => setIsFiltersOpen(!isFiltersOpen)}
//             className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-300 transition-colors"
//             title="Show/Hide filters"
//           >
//             <FiSliders className="mr-2" />
//             Filters
//           </button>
//           {isMultiSelectActionEnabled && (
//             <button
//               onClick={confirmBulkDelete} // Use the new bulk delete confirmation function
//               className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors"
//             >
//               <FiTrash2 className="mr-2" />
//               Delete ({selectedRowsCount})
//             </button>
//           )}
//         </div>
//         <div className="flex-shrink-0 md:ml-4 flex items-center space-x-2">
//           <button
//             onClick={() => setIsAddModalOpen(true)}
//             className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition-colors"
//           >
//             <FiPlus className="mr-2" />
//             Add a vehicle
//           </button>
//         </div>
//       </div>

//       {/* Advanced filters area */}
//       <div
//         className={`bg-white rounded-xl shadow-lg p-6 mb-6 transition-all duration-300 ease-in-out ${
//           isFiltersOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 p-0 overflow-hidden'
//         }`}
//       >
//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {table.getHeaderGroups().map(headerGroup =>
//             headerGroup.headers.map(header =>
//               header.column.getCanFilter() ? (
//                 <div key={header.id}>
//                   <label className="block text-sm font-medium text-gray-700">
//                     {flexRender(header.column.columnDef.header, header.getContext())}
//                   </label>
//                   <Filter column={header.column} table={table} />
//                 </div>
//               ) : null
//             )
//           )}
//         </div>
//       </div>

//       {/* Vehicles Table */}
//       <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               {table.getHeaderGroups().map(headerGroup => (
//                 <tr key={headerGroup.id}>
//                   {headerGroup.headers.map(header => (
//                     <th
//                       key={header.id}
//                       onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
//                       className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${header.column.getCanSort() ? 'cursor-pointer select-none' : ''}`}
//                     >
//                       <div className="flex items-center">
//                         {flexRender(header.column.columnDef.header, header.getContext())}
//                         {header.column.getIsSorted() && (
//                           <span className="ml-2">
//                             {header.column.getIsSorted() === 'asc' ? <FiArrowUp /> : <FiArrowDown />}
//                           </span>
//                         )}
//                       </div>
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {table.getRowModel().rows.length > 0 ? (
//                 table.getRowModel().rows.map(row => (
//                   <tr key={row.id} className={row.getIsSelected() ? 'bg-blue-50' : ''}>
//                     {row.getVisibleCells().map(cell => (
//                       <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                       </td>
//                     ))}
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
//                     No vehicles found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//         {/* Pagination */}
//         <div className="flex items-center justify-between p-4 border-t border-gray-200">
//           <span className="text-sm text-gray-700">
//             Page{' '}
//             <strong>
//               {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
//             </strong>{' '}
//             ({table.getRowCount()} vehicles)
//           </span>
//           <div className="flex space-x-2">
//             <button
//               onClick={() => table.setPageIndex(0)}
//               disabled={!table.getCanPreviousPage()}
//               className="p-2 border rounded-md text-gray-700 disabled:opacity-50"
//             >
//               <FiChevronsLeft />
//             </button>
//             <button
//               onClick={() => table.previousPage()}
//               disabled={!table.getCanPreviousPage()}
//               className="p-2 border rounded-md text-gray-700 disabled:opacity-50"
//             >
//               <FiChevronLeft />
//             </button>
//             <button
//               onClick={() => table.nextPage()}
//               disabled={!table.getCanNextPage()}
//               className="p-2 border rounded-md text-gray-700 disabled:opacity-50"
//             >
//               <FiChevronRight />
//             </button>
//             <button
//               onClick={() => table.setPageIndex(table.getPageCount() - 1)}
//               disabled={!table.getCanNextPage()}
//               className="p-2 border rounded-md text-gray-700 disabled:opacity-50"
//             >
//               <FiChevronsRight />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Modals */}

//       {/* Add vehicle modal */}
//       <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add a new vehicle">
//         <AddEditVehicleForm
//           onSave={addVehicle}
//           onCancel={() => setIsAddModalOpen(false)}
//         />
//       </Modal>

//       {/* Edit vehicle modal */}
//       <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit vehicle">
//         {editingVehicle && (
//           <AddEditVehicleForm
//             vehicle={editingVehicle}
//             onSave={(updatedData) => updateVehicle(editingVehicle.id, updatedData)}
//             onCancel={() => setIsEditModalOpen(false)}
//             employees={employees}
//             onLink={linkVehicleToEmployee}
//             onUnlink={unlinkVehicle}
//           />
//         )}
//       </Modal>

//       {/* Single Delete Confirmation Modal */}
//       <Modal isOpen={isConfirmModalOpen && !isBulkDeleteModalOpen} onClose={() => setIsConfirmModalOpen(false)} title="Confirm Deletion">
//         <p className="text-gray-700">
//           Are you sure you want to delete the vehicle with license plate <span className="font-bold">{vehicleToDelete?.licensePlate}</span>? This action is irreversible.
//         </p>
//         <div className="mt-6 flex justify-end space-x-2">
//           <button onClick={() => setIsConfirmModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300">Cancel</button>
//           <button onClick={deleteVehicle} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600">Delete</button>
//         </div>
//       </Modal>

//       {/* Bulk Delete Confirmation Modal */}
//       <Modal isOpen={isBulkDeleteModalOpen} onClose={() => setIsBulkDeleteModalOpen(false)} title="Confirm Bulk Deletion">
//         <p className="text-gray-700">
//           Are you sure you want to delete <span className="font-bold">{selectedRowsCount} selected vehicle(s)</span>? This action is irreversible.
//         </p>
//         <div className="mt-6 flex justify-end space-x-2">
//           <button onClick={() => setIsBulkDeleteModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300">Cancel</button>
//           <button onClick={handleDeleteSelected} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600">Delete All</button>
//         </div>
//       </Modal>

//       {/* View modal */}
//       <Modal isOpen={isViewModalOpen} onClose={handleCloseViewModal} title="Vehicle Details">
//         {editingVehicle && <ViewVehicleDetails vehicle={editingVehicle} />}
//       </Modal>

//       {/* Sidebar - Added here */}
//       <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} title="Additional Information">
//         <p>This is a right sidebar. Its content can be updated to display more information or specific options.</p>
//         <div className="mt-4 p-4 bg-gray-100 rounded-lg">
//           <h5 className="font-semibold">Example Content</h5>
//           <p className="text-sm text-gray-600">
//             You could add a form, detailed history, statistics, or alerts related to vehicles here.
//           </p>
//         </div>
//       </Sidebar>
//     </div>
//   );
// };

// // Component for column filters
// const Filter = ({ column, table }: { column: any; table: any }) => {
//   const columnFilterValue = column.getFilterValue();
//   const sortedUniqueValues = useMemo(() => {
//     const filterValues = Array.from(column.getFacetedUniqueValues().keys()).sort();
//     return filterValues;
//   }, [column.getFacetedUniqueValues()]);

//   return (
//     <>
//       <datalist id={column.id + 'list'}>
//         {sortedUniqueValues.slice(0, 5000).map((value: any) => (
//           <option value={value} key={value} />
//         ))}
//       </datalist>
//       <input
//         type="text"
//         value={(columnFilterValue ?? '') as string}
//         onChange={e => column.setFilterValue(e.target.value)}
//         placeholder={`Filter...`}
//         className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2 text-sm"
//         list={column.id + 'list'}
//       />
//     </>
//   );
// };

// // Checkbox component for row selection
// const IndeterminateCheckbox = ({ indeterminate, className = '', ...rest }: { indeterminate?: boolean } & React.HTMLProps<HTMLInputElement>) => {
//   const ref = useRef<HTMLInputElement>(null!);

//   useEffect(() => {
//     if (typeof indeterminate === 'boolean') {
//       ref.current.indeterminate = !rest.checked && indeterminate;
//     }
//   }, [ref, indeterminate, rest.checked]);

//   return (
//     <input
//       type="checkbox"
//       ref={ref}
//       className={`${className} form-checkbox h-4 w-4 text-orange-600 transition duration-150 ease-in-out rounded border-gray-300 focus:ring-orange-500`}
//       {...rest}
//     />
//   );
// };

// // Add/Edit Vehicle Form
// const AddEditVehicleForm: React.FC<{
//   onSave: (data: any) => void;
//   onCancel: () => void;
//   vehicle?: Vehicle;
//   employees?: Employee[];
//   onLink?: (vehicleId: string, employeeId: string) => void;
//   onUnlink?: (vehicleId: string) => void;
// }> = ({ onSave, onCancel, vehicle, employees, onLink, onUnlink }) => {
//   const [formData, setFormData] = useState<Partial<Vehicle>>(vehicle || {
//     make: '',
//     model: '',
//     year: new Date().getFullYear(),
//     type: '',
//     color: '',
//     serialNumber: '',
//     licensePlate: '',
//     status: 'In service',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: name === 'year' ? Number(value) : value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   const handleLink = (employeeId: string) => {
//     if (vehicle && onLink) {
//       onLink(vehicle.id, employeeId);
//       onCancel();
//     }
//   };

//   const handleUnlink = () => {
//     if (vehicle && onUnlink) {
//       onUnlink(vehicle.id);
//       onCancel();
//     }
//   };

//   const isNewVehicle = !vehicle;

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       {/* Base vehicle fields */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Make</label>
//           <input
//             type="text"
//             name="make"
//             value={formData.make || ''}
//             onChange={handleChange}
//             className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Model</label>
//           <input
//             type="text"
//             name="model"
//             value={formData.model || ''}
//             onChange={handleChange}
//             className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Year</label>
//           <input
//             type="number"
//             name="year"
//             value={formData.year || ''}
//             onChange={handleChange}
//             className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">License Plate</label>
//           <input
//             type="text"
//             name="licensePlate"
//             value={formData.licensePlate || ''}
//             onChange={handleChange}
//             className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Serial Number</label>
//           <input
//             type="text"
//             name="serialNumber"
//             value={formData.serialNumber || ''}
//             onChange={handleChange}
//             className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Color</label>
//           <input
//             type="text"
//             name="color"
//             value={formData.color || ''}
//             onChange={handleChange}
//             className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
//           />
//         </div>
//       </div>

//       {!isNewVehicle && (
//         <div className="border-t pt-4 mt-4">
//           <label className="block text-sm font-medium text-gray-700">Vehicle Status</label>
//           <select
//             name="status"
//             value={formData.status || 'In service'}
//             onChange={handleChange}
//             className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
//           >
//             <option value="In service">In service</option>
//             <option value="In maintenance">In maintenance</option>
//             <option value="Out of service">Out of service</option>
//           </select>
//         </div>
//       )}

//       {/* Employee association (for editing only) */}
//       {!isNewVehicle && employees && (
//         <div className="border-t pt-4 mt-4">
//           <h4 className="text-lg font-semibold text-gray-800 flex items-center mb-2">
//             <FiUsers className="mr-2" /> Assign to an employee
//           </h4>
//           {vehicle?.assignment?.employeeId ? (
//             <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
//               <div>
//                 <p className="font-medium text-gray-900">Currently assigned to:</p>
//                 <p className="text-blue-800 font-bold">{vehicle.assignment.employeeName}</p>
//               </div>
//               <button
//                 type="button"
//                 onClick={handleUnlink}
//                 className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
//               >
//                 <FiTrash2 className="mr-2" /> Unassign
//               </button>
//             </div>
//           ) : (
//             <>
//               <label className="block text-sm font-medium text-gray-700">Select an employee</label>
//               <div className="flex space-x-2 mt-1">
//                 <select
//                   name="employeeId"
//                   className="flex-1 rounded-lg border-gray-300 shadow-sm px-3 py-2"
//                 >
//                   <option value="">Select an employee</option>
//                   {employees.map(emp => (
//                     <option key={emp.id} value={emp.id}>
//                       {emp.name} ({emp.department})
//                     </option>
//                   ))}
//                 </select>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     const select = document.querySelector('select[name="employeeId"]') as HTMLSelectElement;
//                     if (select.value) {
//                       handleLink(select.value);
//                     }
//                   }}
//                   className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
//                 >
//                   <FiCheckCircle className="mr-2" /> Assign
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       )}

//       {/* Action buttons */}
//       <div className="flex justify-end space-x-2 mt-6">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition-colors"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition-colors"
//         >
//           <FiCheckCircle className="mr-2" /> {isNewVehicle ? 'Add' : 'Save'}
//         </button>
//       </div>
//     </form>
//   );
// };

// // Vehicle Details View Component
// const ViewVehicleDetails: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
//   return (
//     <div className="space-y-6">
//       {/* Basic Information */}
//       <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//         <h4 className="text-lg font-semibold mb-2">General Information</h4>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
//           <p><span className="font-medium">License Plate:</span> {vehicle.licensePlate}</p>
//           <p><span className="font-medium">Serial Number:</span> {vehicle.serialNumber}</p>
//           <p><span className="font-medium">Make:</span> {vehicle.make}</p>
//           <p><span className="font-medium">Model:</span> {vehicle.model}</p>
//           <p><span className="font-medium">Year:</span> {vehicle.year}</p>
//           <p><span className="font-medium">Color:</span> {vehicle.color}</p>
//           <p><span className="font-medium">Status:</span> {vehicle.status}</p>
//         </div>
//       </div>

//       {/* Current Assignment */}
//       <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//         <h4 className="text-lg font-semibold mb-2 flex items-center">
//           <FiUsers className="mr-2" /> Current Assignment
//         </h4>
//         {vehicle.assignment.employeeId ? (
//           <p className="text-sm text-gray-700"><span className="font-medium">Assigned Employee:</span> {vehicle.assignment.employeeName}</p>
//         ) : (
//           <p className="text-sm text-gray-500 italic">No employee is currently assigned to this vehicle.</p>
//         )}
//       </div>

//       {/* Assignment History */}
//       <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//         <h4 className="text-lg font-semibold mb-2 flex items-center">
//           <FiUser className="mr-2" /> Assignment History
//         </h4>
//         {vehicle.assignment.history.length > 0 ? (
//           <ul className="space-y-2">
//             {vehicle.assignment.history.map((h, index) => (
//               <li key={index} className="text-sm text-gray-700">
//                 <span className="font-medium">Employee ID {h.employeeId}</span>: Assigned on {h.assignmentDate} {h.releaseDate ? `and released on ${h.releaseDate}` : '(ongoing)'}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-sm text-gray-500 italic">No assignment history available.</p>
//         )}
//       </div>

//       {/* Maintenance History */}
//       <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
//         <h4 className="text-lg font-semibold mb-2 flex items-center">
//           <FiTool className="mr-2" /> Maintenance History
//         </h4>
//         {vehicle.maintenanceHistory.length > 0 ? (
//           <ul className="space-y-2">
//             {vehicle.maintenanceHistory.map((h, index) => (
//               <li key={index} className="text-sm text-gray-700">
//                 <span className="font-medium">Date:</span> {h.date} - {h.description} (<span className="text-red-500 font-semibold">{h.cost.toFixed(2)} €</span>)
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-sm text-gray-500 italic">No maintenance history available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VehicleManagement;


// // import React, { useState, useMemo, useRef, useEffect } from 'react';
// // import {
// //   FiPlus,
// //   FiTrash2,
// //   FiEdit,
// //   FiX,
// //   FiSearch,
// //   FiChevronLeft,
// //   FiChevronRight,
// //   FiChevronsLeft,
// //   FiChevronsRight,
// //   FiFilter,
// //   FiUsers,
// //   FiUser,
// //   FiTool,
// //   FiBookOpen,
// //   FiArrowUp,
// //   FiArrowDown,
// //   FiMenu,
// //   FiCheckCircle,
// //   FiAlertCircle,
// //   FiSliders,
// //   FiEye,
// // } from 'react-icons/fi';
// // import {
// //   useReactTable,
// //   getCoreRowModel,
// //   flexRender,
// //   ColumnDef,
// //   getPaginationRowModel,
// //   getFilteredRowModel,
// //   getSortedRowModel,
// //   SortingState,
// //   ColumnFiltersState,
// //   getFacetedRowModel,
// //   getFacetedUniqueValues,
// //   RowSelectionState,
// // } from '@tanstack/react-table';

// // // --- Data Model Interfaces ---

// // // Simplified Employee Model
// // export interface Employee {
// //   id: string;
// //   name: string;
// //   department: string;
// // }

// // // Vehicle Model
// // export interface Vehicle {
// //   id: string;
// //   make: string;
// //   model: string;
// //   year: number;
// //   type: string;
// //   color: string;
// //   serialNumber: string;
// //   licensePlate: string;
// //   status: 'In service' | 'In maintenance' | 'Out of service';
// //   assignment: {
// //     employeeId: string | null;
// //     employeeName?: string;
// //     history: {
// //       employeeId: string;
// //       assignmentDate: string;
// //       releaseDate?: string;
// //     }[];
// //   };
// //   maintenanceHistory: {
// //     date: string;
// //     description: string;
// //     cost: number;
// //   }[];
// // }

// // // --- Base Data and Configurations (Fictitious Data) ---
// // const initialEmployees: Employee[] = [
// //   { id: 'emp-1', name: 'Jean Dupont', department: 'Sales' },
// //   { id: 'emp-2', name: 'Marie Curie', department: 'R&D' },
// //   { id: 'emp-3', name: 'Pierre Durand', department: 'Logistics' },
// //   { id: 'emp-4', name: 'Sophie Bernard', department: 'Sales' },
// //   { id: 'emp-5', name: 'Luc Martin', department: 'Marketing' },
// //   { id: 'emp-6', name: 'Julie Dubois', department: 'Production' },
// //   { id: 'emp-7', name: 'Marc Lefevre', department: 'Support' },
// //   { id: 'emp-8', name: 'Anais Girard', department: 'Finance' },
// //   { id: 'emp-9', name: 'Thomas Petit', department: 'Sales' },
// //   { id: 'emp-10', name: 'Camille Leroux', department: 'R&D' },
// //   { id: 'emp-11', name: 'Eric Moreau', department: 'Logistics' },
// //   { id: 'emp-12', name: 'Laura Bonnet', department: 'Marketing' },
// //   { id: 'emp-13', name: 'David Rousseau', department: 'Production' },
// //   { id: 'emp-14', name: 'Chloe Lambert', department: 'Support' },
// //   { id: 'emp-15', name: 'Antoine Fournier', department: 'Finance' },
// //   { id: 'emp-16', name: 'Manon Gauthier', department: 'Sales' },
// //   { id: 'emp-17', name: 'Hugo Richard', department: 'R&D' },
// //   { id: 'emp-18', name: 'Emma Lemoine', department: 'Logistics' },
// //   { id: 'emp-19', name: 'Paul Vincent', department: 'Marketing' },
// //   { id: 'emp-20', name: 'Léa Leroy', department: 'Production' },
// // ];

// // const initialVehicles: Vehicle[] = [
// //   {
// //     id: 'v-1',
// //     make: 'Toyota',
// //     model: 'Corolla',
// //     year: 2022,
// //     type: 'Sedan',
// //     color: 'Black',
// //     serialNumber: 'VIN1234567890',
// //     licensePlate: 'ABC-123',
// //     status: 'In service',
// //     assignment: {
// //       employeeId: 'emp-1',
// //       employeeName: 'Jean Dupont',
// //       history: [{ employeeId: 'emp-1', assignmentDate: '2023-01-15' }],
// //     },
// //     maintenanceHistory: [
// //       { date: '2024-05-20', description: 'Oil change', cost: 75.50 },
// //     ],
// //   },
// //   {
// //     id: 'v-2',
// //     make: 'Ford',
// //     model: 'Transit',
// //     year: 2020,
// //     type: 'Van',
// //     color: 'White',
// //     serialNumber: 'VIN9876543210',
// //     licensePlate: 'DEF-456',
// //     status: 'In maintenance',
// //     assignment: {
// //       employeeId: null,
// //       history: [{ employeeId: 'emp-3', assignmentDate: '2022-03-10', releaseDate: '2023-06-20' }],
// //     },
// //     maintenanceHistory: [
// //       { date: '2024-06-10', description: 'Transmission repair', cost: 1200.00 },
// //     ],
// //   },
// //   {
// //     id: 'v-3',
// //     make: 'Honda',
// //     model: 'CRV',
// //     year: 2021,
// //     type: 'SUV',
// //     color: 'Grey',
// //     serialNumber: 'VIN1122334455',
// //     licensePlate: 'GHI-789',
// //     status: 'Out of service',
// //     assignment: {
// //       employeeId: null,
// //       history: [],
// //     },
// //     maintenanceHistory: [],
// //   },
// // ];


// // // --- Utility Functions ---
// // const generateId = () => `v-${Date.now()}`;

// // // --- Modal and Sidebar Components ---

// // interface ModalProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   children: React.ReactNode;
// //   title: string;
// // }

// // const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
// //   if (!isOpen) return null;
// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //       <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col p-6">
// //         <div className="flex justify-between items-center border-b pb-4 mb-4">
// //           <h3 className="text-xl font-bold">{title}</h3>
// //           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
// //             <FiX className="h-6 w-6" />
// //           </button>
// //         </div>
// //         <div className="overflow-y-auto pr-2 flex-1">
// //           {children}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // interface SidebarProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   children: React.ReactNode;
// //   title: string;
// // }

// // const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, children, title }) => {
// //   return (
// //     <div
// //       className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
// //         isOpen ? 'translate-x-0' : 'translate-x-full'
// //       }`}
// //     >
// //       <div className="flex flex-col h-full">
// //         <div className="flex justify-between items-center p-6 border-b">
// //           <h3 className="text-xl font-bold">{title}</h3>
// //           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
// //             <FiX className="h-6 w-6" />
// //           </button>
// //         </div>
// //         <div className="flex-1 overflow-y-auto p-6">
// //           {children}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // --- Main Application Component ---
// // export const VehicleManagement: React.FC = () => {
// //   const [vehicles, setVehicles] = useState<Vehicle[]>([]); // Start with an empty array for onboarding view
// //   const [employees] = useState<Employee[]>(initialEmployees);
// //   const [sorting, setSorting] = useState<SortingState>([]);
// //   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
// //   const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
// //   const [isFiltersOpen, setIsFiltersOpen] = useState(false);
// //   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
// //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// //   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
// //   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

// //   const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
// //   const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);

// //   const [pagination, setPagination] = useState({
// //     pageIndex: 0,
// //     pageSize: 10,
// //   });

// //   // --- CRUD Vehicle Management Functions ---

// //   // Add a vehicle
// //   const addVehicle = (newVehicleData: Omit<Vehicle, 'id' | 'assignment' | 'maintenanceHistory'>) => {
// //     const newVehicle: Vehicle = {
// //       ...newVehicleData,
// //       id: generateId(),
// //       assignment: { employeeId: null, history: [] },
// //       maintenanceHistory: [],
// //     };
// //     setVehicles(prev => [...prev, newVehicle]);
// //     setIsAddModalOpen(false);
// //   };

// //   // Update a vehicle
// //   const updateVehicle = (id: string, updatedData: Partial<Vehicle>) => {
// //     setVehicles(prev =>
// //       prev.map(v => (v.id === id ? { ...v, ...updatedData } : v))
// //     );
// //     setIsEditModalOpen(false);
// //   };

// //   // Delete a vehicle (with confirmation)
// //   const confirmDeleteVehicle = (vehicle: Vehicle) => {
// //     setVehicleToDelete(vehicle);
// //     setRowSelection({}); // Clear any bulk selection
// //     setIsConfirmModalOpen(true);
// //   };

// //   const deleteVehicle = () => {
// //     if (vehicleToDelete) {
// //       setVehicles(prev => prev.filter(v => v.id !== vehicleToDelete.id));
// //       setVehicleToDelete(null);
// //     }
// //     setIsConfirmModalOpen(false);
// //   };

// //   // Link a vehicle to an employee
// //   const linkVehicleToEmployee = (vehicleId: string, employeeId: string) => {
// //     const employee = employees.find(e => e.id === employeeId);
// //     if (!employee) return;

// //     setVehicles(prev =>
// //       prev.map(v => {
// //         if (v.id === vehicleId) {
// //           const newHistory = [...v.assignment.history];
// //           if (v.assignment.employeeId) {
// //             // Release the old employee
// //             const lastEntry = newHistory[newHistory.length - 1];
// //             if (lastEntry && !lastEntry.releaseDate) {
// //               lastEntry.releaseDate = new Date().toISOString().split('T')[0];
// //             }
// //           }
// //           // Assign the new employee
// //           newHistory.push({ employeeId: employee.id, assignmentDate: new Date().toISOString().split('T')[0] });
// //           return {
// //             ...v,
// //             status: 'In service',
// //             assignment: {
// //               employeeId: employee.id,
// //               employeeName: employee.name,
// //               history: newHistory,
// //             },
// //           };
// //         }
// //         return v;
// //       })
// //     );
// //   };

// //   // Unlink a vehicle
// //   const unlinkVehicle = (vehicleId: string) => {
// //     setVehicles(prev =>
// //       prev.map(v => {
// //         if (v.id === vehicleId && v.assignment.employeeId) {
// //           const newHistory = [...v.assignment.history];
// //           const lastEntry = newHistory[newHistory.length - 1];
// //           if (lastEntry) {
// //             lastEntry.releaseDate = new Date().toISOString().split('T')[0];
// //           }
// //           return {
// //             ...v,
// //             status: 'Out of service',
// //             assignment: {
// //               employeeId: null,
// //               employeeName: undefined,
// //               history: newHistory,
// //             },
// //           };
// //         }
// //         return v;
// //       })
// //     );
// //   };

// //   // View Modal Management Functions
// //   const handleOpenViewModal = (vehicle: Vehicle) => {
// //     setEditingVehicle(vehicle);
// //     setIsViewModalOpen(true);
// //   };

// //   const handleCloseViewModal = () => {
// //     setIsViewModalOpen(false);
// //     setEditingVehicle(null);
// //   };

// //   // --- Onboarding View ---
// //   if (vehicles.length === 0) {
// //     return (
// //       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
// //         <FiBookOpen className="text-orange-500 w-24 h-24 mb-6" />
// //         <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to Fleet Management</h1>
// //         <p className="text-lg text-gray-600 max-w-xl mb-8">
// //           It looks like your vehicle fleet is currently empty. Let's get you started by adding your first vehicle.
// //         </p>
// //         <button
// //           onClick={() => setIsAddModalOpen(true)}
// //           className="flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-colors text-lg"
// //         >
// //           <FiPlus className="mr-2" />
// //           Add your first vehicle
// //         </button>

// //         {/* The add vehicle modal */}
// //         <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add a new vehicle">
// //           <AddEditVehicleForm
// //             onSave={addVehicle}
// //             onCancel={() => setIsAddModalOpen(false)}
// //           />
// //         </Modal>
// //       </div>
// //     );
// //   }

// //   // --- The rest of the original Vehicle Management component code for when vehicles are present ---
// //   const columns = useMemo<ColumnDef<Vehicle>[]>(
// //     () => [
// //       {
// //         id: 'select',
// //         header: ({ table }) => (
// //           <IndeterminateCheckbox
// //             {...{
// //               checked: table.getIsAllRowsSelected(),
// //               indeterminate: table.getIsSomeRowsSelected(),
// //               onChange: table.getToggleAllRowsSelectedHandler(),
// //             }}
// //           />
// //         ),
// //         cell: ({ row }) => (
// //           <IndeterminateCheckbox
// //             {...{
// //               checked: row.getIsSelected(),
// //               disabled: !row.getCanSelect(),
// //               indeterminate: row.getIsSomeSelected(),
// //               onChange: row.getToggleSelectedHandler(),
// //             }}
// //           />
// //         ),
// //       },
// //       {
// //         accessorKey: 'licensePlate',
// //         header: 'License Plate',
// //         cell: ({ row, getValue }) => (
// //           <div
// //             className="font-medium text-blue-600 hover:underline cursor-pointer"
// //             onClick={() => handleOpenViewModal(row.original)}
// //           >
// //             {getValue() as string}
// //           </div>
// //         ),
// //         enableColumnFilter: true,
// //       },
// //       {
// //         accessorKey: 'make',
// //         header: 'Make',
// //         cell: info => <div className="text-sm text-gray-900">{info.getValue() as string}</div>,
// //         enableColumnFilter: true,
// //         filterFn: 'includesString',
// //       },
// //       {
// //         accessorKey: 'model',
// //         header: 'Model',
// //         cell: info => <div className="text-sm text-gray-500">{info.getValue() as string}</div>,
// //         enableColumnFilter: true,
// //         filterFn: 'includesString',
// //       },
// //       {
// //         accessorKey: 'year',
// //         header: 'Year',
// //         cell: info => <div className="text-sm text-gray-500">{info.getValue() as number}</div>,
// //         enableColumnFilter: true,
// //       },
// //       {
// //         accessorKey: 'assignment.employeeName',
// //         header: 'Assigned Employee',
// //         cell: info => (
// //           <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${info.getValue() ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
// //             {info.getValue() || 'Not assigned'}
// //           </span>
// //         ),
// //         enableColumnFilter: true,
// //       },
// //       {
// //         accessorKey: 'status',
// //         header: 'Status',
// //         cell: info => {
// //           const status = info.getValue() as string;
// //           let colorClass = '';
// //           switch (status) {
// //             case 'In service':
// //               colorClass = 'bg-green-100 text-green-800';
// //               break;
// //             case 'In maintenance':
// //               colorClass = 'bg-yellow-100 text-yellow-800';
// //               break;
// //             case 'Out of service':
// //               colorClass = 'bg-red-100 text-red-800';
// //               break;
// //             default:
// //               colorClass = 'bg-gray-100 text-gray-800';
// //               break;
// //           }
// //           return (
// //             <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClass}`}>
// //               {status}
// //             </span>
// //           );
// //         },
// //         enableColumnFilter: true,
// //         filterFn: 'includesString',
// //       },
// //       {
// //         id: 'actions',
// //         header: 'Actions',
// //         cell: ({ row }) => (
// //           <div className="flex space-x-2">
// //             <button
// //               onClick={() => handleOpenViewModal(row.original)}
// //               className="p-2 text-gray-500 hover:text-gray-900"
// //               title="View details"
// //             >
// //               <FiEye className="w-5 h-5" />
// //             </button>
// //             <button
// //               onClick={() => {
// //                 setEditingVehicle(row.original);
// //                 setIsEditModalOpen(true);
// //               }}
// //               className="p-2 text-blue-500 hover:text-blue-900"
// //               title="Edit"
// //             >
// //               <FiEdit className="w-5 h-5" />
// //             </button>
// //             <button
// //               onClick={() => confirmDeleteVehicle(row.original)}
// //               className="p-2 text-red-500 hover:text-red-900"
// //               title="Delete"
// //             >
// //               <FiTrash2 className="w-5 h-5" />
// //             </button>
// //           </div>
// //         ),
// //       },
// //     ],
// //     []
// //   );

// //   const table = useReactTable({
// //     data: vehicles,
// //     columns,
// //     state: {
// //       sorting,
// //       columnFilters,
// //       rowSelection,
// //       pagination,
// //     },
// //     onSortingChange: setSorting,
// //     onColumnFiltersChange: setColumnFilters,
// //     onRowSelectionChange: setRowSelection,
// //     onPaginationChange: setPagination,
// //     getCoreRowModel: getCoreRowModel(),
// //     getFilteredRowModel: getFilteredRowModel(),
// //     getSortedRowModel: getSortedRowModel(),
// //     getPaginationRowModel: getPaginationRowModel(),
// //     getFacetedRowModel: getFacetedRowModel(),
// //     getFacetedUniqueValues: getFacetedUniqueValues(),
// //     enableRowSelection: true,
// //   });

// //   const selectedRowsCount = Object.keys(rowSelection).length;
// //   const isMultiSelectActionEnabled = selectedRowsCount > 0;

// //   // Added a new state for multi-delete confirmation
// //   const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);

// //   const confirmBulkDelete = () => {
// //     setIsBulkDeleteModalOpen(true);
// //   };

// //   const handleDeleteSelected = () => {
// //     // Logic to delete all selected rows
// //     const selectedIds = table.getSelectedRowModel().rows.map(row => row.original.id);
// //     setVehicles(prev => prev.filter(v => !selectedIds.includes(v.id)));
// //     setRowSelection({}); // Clear selection
// //     setIsBulkDeleteModalOpen(false); // Close the bulk delete modal
// //   };

// //   return (
// //     <div className="p-6 bg-gray-50 min-h-screen font-sans">
// //       <header className="mb-8">
// //         <h1 className="text-3xl font-bold text-gray-900 mb-2">Vehicle Management</h1>
// //         <p className="text-gray-600">Manage your company's fleet of vehicles.</p>
// //       </header>

// //       {/* Toolbar */}
// //       <div className="flex flex-col md:flex-row justify-between items-start mb-6 space-y-4 md:space-y-0">
// //         <div className="flex-1 flex items-center space-x-2 w-full md:w-auto">
// //           <button
// //             onClick={() => setIsFiltersOpen(!isFiltersOpen)}
// //             className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-300 transition-colors"
// //             title="Show/Hide filters"
// //           >
// //             <FiSliders className="mr-2" />
// //             Filters
// //           </button>
// //           {isMultiSelectActionEnabled && (
// //             <button
// //               onClick={confirmBulkDelete} // Use the new bulk delete confirmation function
// //               className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors"
// //             >
// //               <FiTrash2 className="mr-2" />
// //               Delete ({selectedRowsCount})
// //             </button>
// //           )}
// //         </div>
// //         <div className="flex-shrink-0 md:ml-4 flex items-center space-x-2">
// //           <button
// //             onClick={() => setIsAddModalOpen(true)}
// //             className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition-colors"
// //           >
// //             <FiPlus className="mr-2" />
// //             Add a vehicle
// //           </button>
// //         </div>
// //       </div>

// //       {/* Advanced filters area */}
// //       <div
// //         className={`bg-white rounded-xl shadow-lg p-6 mb-6 transition-all duration-300 ease-in-out ${
// //           isFiltersOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 p-0 overflow-hidden'
// //         }`}
// //       >
// //         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
// //           {table.getHeaderGroups().map(headerGroup =>
// //             headerGroup.headers.map(header =>
// //               header.column.getCanFilter() ? (
// //                 <div key={header.id}>
// //                   <label className="block text-sm font-medium text-gray-700">
// //                     {flexRender(header.column.columnDef.header, header.getContext())}
// //                   </label>
// //                   <Filter column={header.column} table={table} />
// //                 </div>
// //               ) : null
// //             )
// //           )}
// //         </div>
// //       </div>

// //       {/* Vehicles Table */}
// //       <div className="bg-white rounded-xl shadow-lg overflow-hidden">
// //         <div className="overflow-x-auto">
// //           <table className="min-w-full divide-y divide-gray-200">
// //             <thead className="bg-gray-50">
// //               {table.getHeaderGroups().map(headerGroup => (
// //                 <tr key={headerGroup.id}>
// //                   {headerGroup.headers.map(header => (
// //                     <th
// //                       key={header.id}
// //                       onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
// //                       className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${header.column.getCanSort() ? 'cursor-pointer select-none' : ''}`}
// //                     >
// //                       <div className="flex items-center">
// //                         {flexRender(header.column.columnDef.header, header.getContext())}
// //                         {header.column.getIsSorted() && (
// //                           <span className="ml-2">
// //                             {header.column.getIsSorted() === 'asc' ? <FiArrowUp /> : <FiArrowDown />}
// //                           </span>
// //                         )}
// //                       </div>
// //                     </th>
// //                   ))}
// //                 </tr>
// //               ))}
// //             </thead>
// //             <tbody className="bg-white divide-y divide-gray-200">
// //               {table.getRowModel().rows.length > 0 ? (
// //                 table.getRowModel().rows.map(row => (
// //                   <tr key={row.id} className={row.getIsSelected() ? 'bg-blue-50' : ''}>
// //                     {row.getVisibleCells().map(cell => (
// //                       <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// //                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
// //                       </td>
// //                     ))}
// //                   </tr>
// //                 ))
// //               ) : (
// //                 <tr>
// //                   <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
// //                     No vehicles found.
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //         {/* Pagination */}
// //         <div className="flex items-center justify-between p-4 border-t border-gray-200">
// //           <span className="text-sm text-gray-700">
// //             Page{' '}
// //             <strong>
// //               {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
// //             </strong>{' '}
// //             ({table.getRowCount()} vehicles)
// //           </span>
// //           <div className="flex space-x-2">
// //             <button
// //               onClick={() => table.setPageIndex(0)}
// //               disabled={!table.getCanPreviousPage()}
// //               className="p-2 border rounded-md text-gray-700 disabled:opacity-50"
// //             >
// //               <FiChevronsLeft />
// //             </button>
// //             <button
// //               onClick={() => table.previousPage()}
// //               disabled={!table.getCanPreviousPage()}
// //               className="p-2 border rounded-md text-gray-700 disabled:opacity-50"
// //             >
// //               <FiChevronLeft />
// //             </button>
// //             <button
// //               onClick={() => table.nextPage()}
// //               disabled={!table.getCanNextPage()}
// //               className="p-2 border rounded-md text-gray-700 disabled:opacity-50"
// //             >
// //               <FiChevronRight />
// //             </button>
// //             <button
// //               onClick={() => table.setPageIndex(table.getPageCount() - 1)}
// //               disabled={!table.getCanNextPage()}
// //               className="p-2 border rounded-md text-gray-700 disabled:opacity-50"
// //             >
// //               <FiChevronsRight />
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Modals */}

// //       {/* Add vehicle modal */}
// //       <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add a new vehicle">
// //         <AddEditVehicleForm
// //           onSave={addVehicle}
// //           onCancel={() => setIsAddModalOpen(false)}
// //         />
// //       </Modal>

// //       {/* Edit vehicle modal */}
// //       <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit vehicle">
// //         {editingVehicle && (
// //           <AddEditVehicleForm
// //             vehicle={editingVehicle}
// //             onSave={(updatedData) => updateVehicle(editingVehicle.id, updatedData)}
// //             onCancel={() => setIsEditModalOpen(false)}
// //             employees={employees}
// //             onLink={linkVehicleToEmployee}
// //             onUnlink={unlinkVehicle}
// //           />
// //         )}
// //       </Modal>

// //       {/* Single Delete Confirmation Modal */}
// //       <Modal isOpen={isConfirmModalOpen && !isBulkDeleteModalOpen} onClose={() => setIsConfirmModalOpen(false)} title="Confirm Deletion">
// //         <p className="text-gray-700">
// //           Are you sure you want to delete the vehicle with license plate <span className="font-bold">{vehicleToDelete?.licensePlate}</span>? This action is irreversible.
// //         </p>
// //         <div className="mt-6 flex justify-end space-x-2">
// //           <button onClick={() => setIsConfirmModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300">Cancel</button>
// //           <button onClick={deleteVehicle} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600">Delete</button>
// //         </div>
// //       </Modal>

// //       {/* Bulk Delete Confirmation Modal */}
// //       <Modal isOpen={isBulkDeleteModalOpen} onClose={() => setIsBulkDeleteModalOpen(false)} title="Confirm Bulk Deletion">
// //         <p className="text-gray-700">
// //           Are you sure you want to delete <span className="font-bold">{selectedRowsCount} selected vehicle(s)</span>? This action is irreversible.
// //         </p>
// //         <div className="mt-6 flex justify-end space-x-2">
// //           <button onClick={() => setIsBulkDeleteModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300">Cancel</button>
// //           <button onClick={handleDeleteSelected} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600">Delete All</button>
// //         </div>
// //       </Modal>

// //       {/* View modal */}
// //       <Modal isOpen={isViewModalOpen} onClose={handleCloseViewModal} title="Vehicle Details">
// //         {editingVehicle && <ViewVehicleDetails vehicle={editingVehicle} />}
// //       </Modal>

// //       {/* Sidebar - Added here */}
// //       <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} title="Additional Information">
// //         <p>This is a right sidebar. Its content can be updated to display more information or specific options.</p>
// //         <div className="mt-4 p-4 bg-gray-100 rounded-lg">
// //           <h5 className="font-semibold">Example Content</h5>
// //           <p className="text-sm text-gray-600">
// //             You could add a form, detailed history, statistics, or alerts related to vehicles here.
// //           </p>
// //         </div>
// //       </Sidebar>
// //     </div>
// //   );
// // };

// // // Component for column filters
// // const Filter = ({ column, table }: { column: any; table: any }) => {
// //   const columnFilterValue = column.getFilterValue();
// //   const sortedUniqueValues = useMemo(() => {
// //     const filterValues = Array.from(column.getFacetedUniqueValues().keys()).sort();
// //     return filterValues;
// //   }, [column.getFacetedUniqueValues()]);

// //   return (
// //     <>
// //       <datalist id={column.id + 'list'}>
// //         {sortedUniqueValues.slice(0, 5000).map((value: any) => (
// //           <option value={value} key={value} />
// //         ))}
// //       </datalist>
// //       <input
// //         type="text"
// //         value={(columnFilterValue ?? '') as string}
// //         onChange={e => column.setFilterValue(e.target.value)}
// //         placeholder={`Filter...`}
// //         className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2 text-sm"
// //         list={column.id + 'list'}
// //       />
// //     </>
// //   );
// // };

// // // Checkbox component for row selection
// // const IndeterminateCheckbox = ({ indeterminate, className = '', ...rest }: { indeterminate?: boolean } & React.HTMLProps<HTMLInputElement>) => {
// //   const ref = useRef<HTMLInputElement>(null!);

// //   useEffect(() => {
// //     if (typeof indeterminate === 'boolean') {
// //       ref.current.indeterminate = !rest.checked && indeterminate;
// //     }
// //   }, [ref, indeterminate, rest.checked]);

// //   return (
// //     <input
// //       type="checkbox"
// //       ref={ref}
// //       className={`${className} form-checkbox h-4 w-4 text-orange-600 transition duration-150 ease-in-out rounded border-gray-300 focus:ring-orange-500`}
// //       {...rest}
// //     />
// //   );
// // };

// // // Add/Edit Vehicle Form
// // const AddEditVehicleForm: React.FC<{
// //   onSave: (data: any) => void;
// //   onCancel: () => void;
// //   vehicle?: Vehicle;
// //   employees?: Employee[];
// //   onLink?: (vehicleId: string, employeeId: string) => void;
// //   onUnlink?: (vehicleId: string) => void;
// // }> = ({ onSave, onCancel, vehicle, employees, onLink, onUnlink }) => {
// //   const [formData, setFormData] = useState<Partial<Vehicle>>(vehicle || {
// //     make: '',
// //     model: '',
// //     year: new Date().getFullYear(),
// //     type: '',
// //     color: '',
// //     serialNumber: '',
// //     licensePlate: '',
// //     status: 'In service',
// //   });

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({ ...prev, [name]: name === 'year' ? Number(value) : value }));
// //   };

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     onSave(formData);
// //   };

// //   const handleLink = (employeeId: string) => {
// //     if (vehicle && onLink) {
// //       onLink(vehicle.id, employeeId);
// //       onCancel();
// //     }
// //   };

// //   const handleUnlink = () => {
// //     if (vehicle && onUnlink) {
// //       onUnlink(vehicle.id);
// //       onCancel();
// //     }
// //   };

// //   const isNewVehicle = !vehicle;

// //   return (
// //     <form onSubmit={handleSubmit} className="space-y-4">
// //       {/* Base vehicle fields */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700">Make</label>
// //           <input
// //             type="text"
// //             name="make"
// //             value={formData.make || ''}
// //             onChange={handleChange}
// //             className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700">Model</label>
// //           <input
// //             type="text"
// //             name="model"
// //             value={formData.model || ''}
// //             onChange={handleChange}
// //             className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700">Year</label>
// //           <input
// //             type="number"
// //             name="year"
// //             value={formData.year || ''}
// //             onChange={handleChange}
// //             className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700">License Plate</label>
// //           <input
// //             type="text"
// //             name="licensePlate"
// //             value={formData.licensePlate || ''}
// //             onChange={handleChange}
// //             className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700">Serial Number</label>
// //           <input
// //             type="text"
// //             name="serialNumber"
// //             value={formData.serialNumber || ''}
// //             onChange={handleChange}
// //             className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
// //             required
// //           />
// //         </div>
// //         <div>
// //           <label className="block text-sm font-medium text-gray-700">Color</label>
// //           <input
// //             type="text"
// //             name="color"
// //             value={formData.color || ''}
// //             onChange={handleChange}
// //             className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
// //           />
// //         </div>
// //       </div>

// //       {!isNewVehicle && (
// //         <div className="border-t pt-4 mt-4">
// //           <label className="block text-sm font-medium text-gray-700">Vehicle Status</label>
// //           <select
// //             name="status"
// //             value={formData.status || 'In service'}
// //             onChange={handleChange}
// //             className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
// //           >
// //             <option value="In service">In service</option>
// //             <option value="In maintenance">In maintenance</option>
// //             <option value="Out of service">Out of service</option>
// //           </select>
// //         </div>
// //       )}

// //       {/* Employee association (for editing only) */}
// //       {!isNewVehicle && employees && (
// //         <div className="border-t pt-4 mt-4">
// //           <h4 className="text-lg font-semibold text-gray-800 flex items-center mb-2">
// //             <FiUsers className="mr-2" /> Assign to an employee
// //           </h4>
// //           {vehicle?.assignment?.employeeId ? (
// //             <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
// //               <div>
// //                 <p className="font-medium text-gray-900">Currently assigned to:</p>
// //                 <p className="text-blue-800 font-bold">{vehicle.assignment.employeeName}</p>
// //               </div>
// //               <button
// //                 type="button"
// //                 onClick={handleUnlink}
// //                 className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
// //               >
// //                 <FiTrash2 className="mr-2" /> Unassign
// //               </button>
// //             </div>
// //           ) : (
// //             <>
// //               <label className="block text-sm font-medium text-gray-700">Select an employee</label>
// //               <div className="flex space-x-2 mt-1">
// //                 <select
// //                   name="employeeId"
// //                   className="flex-1 rounded-lg border-gray-300 shadow-sm px-3 py-2"
// //                 >
// //                   <option value="">Select an employee</option>
// //                   {employees.map(emp => (
// //                     <option key={emp.id} value={emp.id}>
// //                       {emp.name} ({emp.department})
// //                     </option>
// //                   ))}
// //                 </select>
// //                 <button
// //                   type="button"
// //                   onClick={() => {
// //                     const select = document.querySelector('select[name="employeeId"]') as HTMLSelectElement;
// //                     if (select.value) {
// //                       handleLink(select.value);
// //                     }
// //                   }}
// //                   className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
// //                 >
// //                   <FiCheckCircle className="mr-2" /> Assign
// //                 </button>
// //               </div>
// //             </>
// //           )}
// //         </div>
// //       )}

// //       {/* Action buttons */}
// //       <div className="flex justify-end space-x-2 mt-6">
// //         <button
// //           type="button"
// //           onClick={onCancel}
// //           className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition-colors"
// //         >
// //           Cancel
// //         </button>
// //         <button
// //           type="submit"
// //           className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition-colors"
// //         >
// //           <FiCheckCircle className="mr-2" /> {isNewVehicle ? 'Add' : 'Save'}
// //         </button>
// //       </div>
// //     </form>
// //   );
// // };

// // // Vehicle Details View Component
// // const ViewVehicleDetails: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
// //   return (
// //     <div className="space-y-6">
// //       {/* Basic Information */}
// //       <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
// //         <h4 className="text-lg font-semibold mb-2">General Information</h4>
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
// //           <p><span className="font-medium">License Plate:</span> {vehicle.licensePlate}</p>
// //           <p><span className="font-medium">Serial Number:</span> {vehicle.serialNumber}</p>
// //           <p><span className="font-medium">Make:</span> {vehicle.make}</p>
// //           <p><span className="font-medium">Model:</span> {vehicle.model}</p>
// //           <p><span className="font-medium">Year:</span> {vehicle.year}</p>
// //           <p><span className="font-medium">Color:</span> {vehicle.color}</p>
// //           <p><span className="font-medium">Status:</span> {vehicle.status}</p>
// //         </div>
// //       </div>

// //       {/* Current Assignment */}
// //       <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
// //         <h4 className="text-lg font-semibold mb-2 flex items-center">
// //           <FiUsers className="mr-2" /> Current Assignment
// //         </h4>
// //         {vehicle.assignment.employeeId ? (
// //           <p className="text-sm text-gray-700"><span className="font-medium">Assigned Employee:</span> {vehicle.assignment.employeeName}</p>
// //         ) : (
// //           <p className="text-sm text-gray-500 italic">No employee is currently assigned to this vehicle.</p>
// //         )}
// //       </div>

// //       {/* Assignment History */}
// //       <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
// //         <h4 className="text-lg font-semibold mb-2 flex items-center">
// //           <FiUser className="mr-2" /> Assignment History
// //         </h4>
// //         {vehicle.assignment.history.length > 0 ? (
// //           <ul className="space-y-2">
// //             {vehicle.assignment.history.map((h, index) => (
// //               <li key={index} className="text-sm text-gray-700">
// //                 <span className="font-medium">Employee ID {h.employeeId}</span>: Assigned on {h.assignmentDate} {h.releaseDate ? `and released on ${h.releaseDate}` : '(ongoing)'}
// //               </li>
// //             ))}
// //           </ul>
// //         ) : (
// //           <p className="text-sm text-gray-500 italic">No assignment history available.</p>
// //         )}
// //       </div>

// //       {/* Maintenance History */}
// //       <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
// //         <h4 className="text-lg font-semibold mb-2 flex items-center">
// //           <FiTool className="mr-2" /> Maintenance History
// //         </h4>
// //         {vehicle.maintenanceHistory.length > 0 ? (
// //           <ul className="space-y-2">
// //             {vehicle.maintenanceHistory.map((h, index) => (
// //               <li key={index} className="text-sm text-gray-700">
// //                 <span className="font-medium">Date:</span> {h.date} - {h.description} (<span className="text-red-500 font-semibold">{h.cost.toFixed(2)} €</span>)
// //               </li>
// //             ))}
// //           </ul>
// //         ) : (
// //           <p className="text-sm text-gray-500 italic">No maintenance history available.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default VehicleManagement;


import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  FiPlus, FiTrash2, FiEdit, FiX, FiSearch, FiChevronLeft, FiChevronRight,
  FiChevronsLeft, FiChevronsRight, FiFilter, FiUsers, FiUser, FiTool,
  FiBookOpen, FiArrowUp, FiArrowDown, FiMenu, FiCheckCircle, FiAlertCircle,
  FiSliders, FiEye
} from 'react-icons/fi';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFacetedRowModel,
  getFacetedUniqueValues,
  RowSelectionState,
} from '@tanstack/react-table';
import axios from 'axios';

// --- Data Model Interfaces ---
export interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface Vehicle {
  _id: string;
  make: string;
  model: string;
  year: number;
  type: string;
  color: string;
  serialNumber: string;
  licensePlate: string;
  status: 'In service' | 'In maintenance' | 'Out of service';
  assignment: {
    employeeId: string | null;
    employeeName?: string;
    history: {
      employeeId: string;
      assignmentDate: string;
      releaseDate?: string;
    }[];
  };
  maintenanceHistory: {
    date: string;
    description: string;
    cost: number;
  }[];
}

// --- Modal and Sidebar Components ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX className="h-6 w-6" />
          </button>
        </div>
        <div className="overflow-y-auto pr-2 flex-1">{children}</div>
      </div>
    </div>
  );
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, children, title }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX className="h-6 w-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
};

// --- Main Application Component ---
export const VehicleManagement: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
    pageCount: 0,
    total: 0,
  });

  // Fetch vehicles with pagination, sorting, and filtering
  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const filter = JSON.stringify(
          columnFilters.reduce((acc, f) => ({ ...acc, [f.id]: f.value }), {})
        );
        const response = await axios.get('http://localhost:3000/api/Vehicle', {
          params: {
            page: pagination.pageIndex + 1,
            pageSize: pagination.pageSize,
            sortBy: sorting[0]?.id,
            sortOrder: sorting[0]?.desc ? 'desc' : 'asc',
            filter,
          },
        });
        const { data, pagination: serverPagination } = response.data;
        setVehicles(data);
        setPagination((prev) => ({
          ...prev,
          pageCount: serverPagination.pageCount,
          total: serverPagination.total,
        }));
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch vehicles');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [pagination.pageIndex, pagination.pageSize, sorting, columnFilters]);

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/employeeInformation');
        console.log("salem",response.data);
        setEmployees(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch employees');
      }
    };
    fetchEmployees();
  }, []);

  // --- CRUD Vehicle Management Functions ---
  const addVehicle = async (newVehicleData: Omit<Vehicle, 'id' | 'assignment' | 'maintenanceHistory'>) => {
    try {
      console.log(newVehicleData);
      const response = await axios.post('http://localhost:3000/api/vehicle', newVehicleData);
      setVehicles((prev) => [...prev, response.data.data]);
      setIsAddModalOpen(false);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add vehicle');
    }
  };

  const updateVehicle = async (id: string, updatedData: Partial<Vehicle>) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/Vehicle/${id}`, updatedData);
      setVehicles((prev) =>
        prev.map((v) => (v._id === id ? response.data.data : v))
      );
      setIsEditModalOpen(false);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update vehicle');
    }
  };

  const confirmDeleteVehicle = (vehicle: Vehicle) => {
    setVehicleToDelete(vehicle);
    setRowSelection({});
    setIsConfirmModalOpen(true);
  };

  const deleteVehicle = async () => {
    if (vehicleToDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/Vehicle/${vehicleToDelete.id}`);
        setVehicles((prev) => prev.filter((v) => v.id !== vehicleToDelete.id));
        setVehicleToDelete(null);
        setIsConfirmModalOpen(false);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to delete vehicle');
      }
    }
  };

  const confirmBulkDelete = () => {
    setIsBulkDeleteModalOpen(true);
  };

  const handleDeleteSelected = async () => {
    try {
      const selectedIds = table.getSelectedRowModel().rows.map((row) => row.original._id);
      await axios.post('http://localhost:3000/api/vehicle/bulk-delete', { vehicleIds: selectedIds });
      setVehicles((prev) => prev.filter((v) => !selectedIds.includes(v._id)));
      setRowSelection({});
      setIsBulkDeleteModalOpen(false);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete vehicles');
    }
  };

  const linkVehicleToEmployee = async (vehicleId: string, employeeId: string) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/${vehicleId}/assign/${employeeId}`);
    setVehicles((prev) =>
      prev.map((v) => (v._id === vehicleId ? response.data : v))
    );
    setError(null);
  } catch (err: any) {
    setError(err.response?.data?.message || 'Failed to assign vehicle');
  }
};

const unlinkVehicle = async (vehicleId: string) => {
  try {
    const response = await axios.post(`http://localhost:3000/api/${vehicleId}/unassign`);
    setVehicles((prev) =>
      prev.map((v) => (v._id === vehicleId ? response.data.data : v))
    );
    setError(null);
  } catch (err: any) {
    setError(err.response?.data?.message || 'Failed to unassign vehicle');
  }
};

  const addMaintenanceRecord = async (vehicleId: string, record: { date: string; description: string; cost: number }) => {
    try {
      const response = await axios.post(`http://localhost:3000/api/${vehicleId}/maintenance`, record);
      setVehicles((prev) =>
        prev.map((v) => (v._id === vehicleId ? response.data.data : v))
      );
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add maintenance record');
    }
  };

  // View Modal Management Functions
  const handleOpenViewModal = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setEditingVehicle(null);
  };

  // --- Table Configuration ---
const columns = useMemo<ColumnDef<Vehicle>[]>(
  () => [
    {
      id: 'select',
      header: ({ table }) => {
        console.log("Header props:", table); // 👀 log pour debug
        return (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        );
      },
      cell: ({ row }) => {
        console.log("Row props (select):", row.original); // 👀 log pour debug
        return (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        );
      },
    },
    {
      accessorKey: 'licensePlate',
      header: 'License Plate',
      cell: ({ row, getValue }) => {
        console.log("LicensePlate cell:", {
          row: row.original,
          value: getValue(),
        });
        return (
          <div
            className="font-medium text-blue-600 hover:underline cursor-pointer"
            onClick={() => handleOpenViewModal(row.original)}
          >
            {getValue() as string}
          </div>
        );
      },
      enableColumnFilter: true,
    },
    {
      accessorKey: 'make',
      header: 'Make',
      cell: (info) => {
        console.log("Make cell:", info.row.original, "value:", info.getValue());
        return <div className="text-sm text-gray-900">{info.getValue() as string}</div>;
      },
      enableColumnFilter: true,
      filterFn: 'includesString',
    },
    {
      accessorKey: 'model',
      header: 'Model',
      cell: (info) => {
        console.log("Model cell:", info.row.original, "value:", info.getValue());
        return <div className="text-sm text-gray-500">{info.getValue() as string}</div>;
      },
      enableColumnFilter: true,
      filterFn: 'includesString',
    },
    {
      accessorKey: 'year',
      header: 'Year',
      cell: (info) => {
        console.log("Year cell:", info.row.original, "value:", info.getValue());
        return <div className="text-sm text-gray-500">{info.getValue() as number}</div>;
      },
      enableColumnFilter: true,
    },
   {
  accessorFn: (row) => row.assignment?.employeeName, 
  id: 'assignedEmployee', // obligatoire si tu utilises accessorFn
  header: 'Assigned Employee',
  cell: (info) => {
    const value = info.getValue();
    console.log("Assigned Employee cell:", info.row.original, "value:", info.row.original.assignment.employeeId);
    return (
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          value ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
        }`}
      >
        {info.row.original.assignment.employeeId || 'Not assigned'}
      </span>
    );
  },
  enableColumnFilter: true,
}
,
    {
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => {
        console.log("Status cell:", info.row.original, "value:", info.getValue());
        const status = info.getValue() as string;
        let colorClass = '';
        switch (status) {
          case 'In service':
            colorClass = 'bg-green-100 text-green-800';
            break;
          case 'In maintenance':
            colorClass = 'bg-yellow-100 text-yellow-800';
            break;
          case 'Out of service':
            colorClass = 'bg-red-100 text-red-800';
            break;
          default:
            colorClass = 'bg-gray-100 text-gray-800';
            break;
        }
        return (
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClass}`}>
            {status}
          </span>
        );
      },
      enableColumnFilter: true,
      filterFn: 'includesString',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        console.log("Actions cell row:", row.original);
        return (
          <div className="flex space-x-2">
            <button
              onClick={() => handleOpenViewModal(row.original)}
              className="p-2 text-gray-500 hover:text-gray-900"
              title="View details"
            >
              <FiEye className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setEditingVehicle(row.original);
                setIsEditModalOpen(true);
              }}
              className="p-2 text-blue-500 hover:text-blue-900"
              title="Edit"
            >
              <FiEdit className="w-5 h-5" />
            </button>
            <button
              onClick={() => confirmDeleteVehicle(row.original)}
              className="p-2 text-red-500 hover:text-red-900"
              title="Delete"
            >
              <FiTrash2 className="w-5 h-5" />
            </button>
          </div>
        );
      },
    },
  ],
  []
);

  const table = useReactTable({
    data: vehicles,
    columns,
    state: { sorting, columnFilters, rowSelection, pagination },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    enableRowSelection: true,
    manualPagination: true,
    pageCount: pagination.pageCount,
  });

  const selectedRowsCount = Object.keys(rowSelection).length;
  const isMultiSelectActionEnabled = selectedRowsCount > 0;

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Vehicle Management</h1>
        <p className="text-gray-600">Manage your company's fleet of vehicles.</p>
      </header>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
          <FiAlertCircle className="mr-2" /> {error}
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="mb-4 p-4 bg-blue-100 text-blue-700 rounded-lg flex items-center">
          <FiMenu className="mr-2 animate-spin" /> Loading...
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 space-y-4 md:space-y-0">
        <div className="flex-1 flex items-center space-x-2 w-full md:w-auto">
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-300 transition-colors"
            title="Show/Hide filters"
          >
            <FiSliders className="mr-2" />
            Filters
          </button>
          {isMultiSelectActionEnabled && (
            <button
              onClick={confirmBulkDelete}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors"
            >
              <FiTrash2 className="mr-2" />
              Delete ({selectedRowsCount})
            </button>
          )}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-300 transition-colors"
          >
            <FiMenu className="mr-2" />
            More Options
          </button>
        </div>
        <div className="flex-shrink-0 md:ml-4 flex items-center space-x-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition-colors"
          >
            <FiPlus className="mr-2" />
            Add a vehicle
          </button>
        </div>
      </div>

      {/* Advanced filters area */}
      <div
        className={`bg-white rounded-xl shadow-lg p-6 mb-6 transition-all duration-300 ease-in-out ${
          isFiltersOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 p-0 overflow-hidden'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {table.getHeaderGroups().map((headerGroup) =>
            headerGroup.headers.map((header) =>
              header.column.getCanFilter() ? (
                <div key={header.id}>
                  <label className="block text-sm font-medium text-gray-700">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </label>
                  <Filter column={header.column} table={table} />
                </div>
              ) : null
            )
          )}
        </div>
      </div>

      {/* Vehicles Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                        header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() && (
                          <span className="ml-2">
                            {header.column.getIsSorted() === 'asc' ? <FiArrowUp /> : <FiArrowDown />}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className={row.getIsSelected() ? 'bg-blue-50' : ''}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                    No vehicles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <span className="text-sm text-gray-700">
            Page{' '}
            <strong>
              {pagination.pageIndex + 1} of {pagination.pageCount}
            </strong>{' '}
            ({pagination.total} vehicles)
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="p-2 border rounded-md text-gray-700 disabled:opacity-50"
            >
              <FiChevronsLeft />
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-2 border rounded-md text-gray-700 disabled:opacity-50"
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-2 border rounded-md text-gray-700 disabled:opacity-50"
            >
              <FiChevronRight />
            </button>
            <button
              onClick={() => table.setPageIndex(pagination.pageCount - 1)}
              disabled={!table.getCanNextPage()}
              className="p-2 border rounded-md text-gray-700 disabled:opacity-50"
            >
              <FiChevronsRight />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
<Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add a new vehicle">
  <AddEditVehicleForm
    onSave={addVehicle}
    onCancel={() => setIsAddModalOpen(false)}
  />
</Modal>

<Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit vehicle">
  {editingVehicle && (
    <AddEditVehicleForm
      vehicle={editingVehicle}
      onSave={(updatedData) => updateVehicle(editingVehicle._id, updatedData)}
      onCancel={() => setIsEditModalOpen(false)}
      employees={employees}
      onLink={linkVehicleToEmployee}
      onUnlink={unlinkVehicle}
    />
  )}
</Modal>
      <Modal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} title="Confirm Deletion">
        <p className="text-gray-700">
          Are you sure you want to delete the vehicle with license plate{' '}
          <span className="font-bold">{vehicleToDelete?.licensePlate}</span>? This action is irreversible.
        </p>
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={() => setIsConfirmModalOpen(false)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={deleteVehicle}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </Modal>

      <Modal isOpen={isBulkDeleteModalOpen} onClose={() => setIsBulkDeleteModalOpen(false)} title="Confirm Bulk Deletion">
        <p className="text-gray-700">
          Are you sure you want to delete{' '}
          <span className="font-bold">{selectedRowsCount} selected vehicle(s)</span>? This action is
          irreversible.
        </p>
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={() => setIsBulkDeleteModalOpen(false)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteSelected}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
          >
            Delete All
          </button>
        </div>
      </Modal>

      <Modal isOpen={isViewModalOpen} onClose={handleCloseViewModal} title="Vehicle Details">
        {editingVehicle && (
          <ViewVehicleDetails
            vehicle={editingVehicle}
            onAddMaintenance={addMaintenanceRecord}
          />
        )}
      </Modal>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} title="Vehicle Statistics">
        <p className="text-sm text-gray-600">
          Add vehicle statistics or additional options here (e.g., total vehicles by status).
        </p>
        {/* TODO: Fetch and display stats from http://localhost:3000/api/vehicle/stats */}
      </Sidebar>
    </div>
  );
};

// Component for column filters
const Filter = ({ column, table }: { column: any; table: any }) => {
  const columnFilterValue = column.getFilterValue();
  const sortedUniqueValues = useMemo(
    () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  return (
    <>
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <input
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder={`Filter...`}
        className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2 text-sm"
        list={column.id + 'list'}
      />
    </>
  );
};

// Checkbox component for row selection
const IndeterminateCheckbox = ({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & React.HTMLProps<HTMLInputElement>) => {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={`${className} form-checkbox h-4 w-4 text-orange-600 transition duration-150 ease-in-out rounded border-gray-300 focus:ring-orange-500`}
      {...rest}
    />
  );
};

// Add/Edit Vehicle Form
const AddEditVehicleForm: React.FC<{
  onSave: (data: any) => void;
  onCancel: () => void;
  vehicle?: Vehicle;
  employees?: Employee[];
  onLink?: (vehicleId: string, employeeId: string) => void;
  onUnlink?: (vehicleId: string) => void;
}> = ({ onSave, onCancel, vehicle, employees, onLink, onUnlink }) => {
  const [formData, setFormData] = useState<Partial<Vehicle>>(
    vehicle || {
      make: '',
      model: '',
      year: new Date().getFullYear(),
      type: '',
      color: '',
      serialNumber: '',
      licensePlate: '',
      status: 'In service',
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'year' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleLink = (employeeId: string) => {
    if (vehicle && onLink) {
      onLink(vehicle._id, employeeId);
      onCancel(); // Close modal after assignment, as per original behavior
    }
  };

  const handleUnlink = () => {
    if (vehicle && onUnlink) {
      onUnlink(vehicle.id);
      onCancel(); // Close modal after unassignment, as per original behavior
    }
  };

  const isNewVehicle = !vehicle;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Base vehicle fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Make</label>
          <input
            type="text"
            name="make"
            value={formData.make || ''}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Model</label>
          <input
            type="text"
            name="model"
            value={formData.model || ''}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Year</label>
          <input
            type="number"
            name="year"
            value={formData.year || ''}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">License Plate</label>
          <input
            type="text"
            name="licensePlate"
            value={formData.licensePlate || ''}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Serial Number</label>
          <input
            type="text"
            name="serialNumber"
            value={formData.serialNumber || ''}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Color</label>
          <input
            type="text"
            name="color"
            value={formData.color || ''}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
          />
        </div>
      </div>

      {!isNewVehicle && (
        <div className="border-t pt-4 mt-4">
          <label className="block text-sm font-medium text-gray-700">Vehicle Status</label>
          <select
            name="status"
            value={formData.status || 'In service'}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
          >
            <option value="In service">In service</option>
            <option value="In maintenance">In maintenance</option>
            <option value="Out of service">Out of service</option>
          </select>
        </div>
      )}

      {/* Restored "Assign to an employee" section exactly as in your original code */}
      {!isNewVehicle && employees && (
        <div className="border-t pt-4 mt-4">
          <h4 className="text-lg font-semibold text-gray-800 flex items-center mb-2">
            <FiUsers className="mr-2" /> Assign to an employee
          </h4>
          {vehicle?.assignment?.employeeId ? (
            <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Currently assigned to:</p>
                <p className="text-blue-800 font-bold">{vehicle.assignment.employeeName}</p>
              </div>
              <button
                type="button"
                onClick={handleUnlink}
                className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
              >
                <FiTrash2 className="mr-2" /> Unassign
              </button>
            </div>
          ) : (
            <>
              <label className="block text-sm font-medium text-gray-700">Select an employee</label>
              <div className="flex space-x-2 mt-1">
                <select
                  name="employeeId"
                  className="flex-1 rounded-lg border-gray-300 shadow-sm px-3 py-2"
                >
                  <option value="">Select an employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.firstName} ({emp.lastName})
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => {
                    const select = document.querySelector('select[name="employeeId"]') as HTMLSelectElement;
                    if (select.value) {
                      handleLink(select.value);
                    }
                  }}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
                >
                  <FiCheckCircle className="mr-2" /> Assign
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-end space-x-2 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition-colors"
        >
          <FiCheckCircle className="mr-2" /> {isNewVehicle ? 'Add' : 'Save'}
        </button>
      </div>
    </form>
  );
};

// Vehicle Details View Component with Maintenance Form
const ViewVehicleDetails: React.FC<{
  vehicle: Vehicle;
  onAddMaintenance: (vehicleId: string, record: { date: string; description: string; cost: number }) => void;
}> = ({ vehicle, onAddMaintenance }) => {
  const [maintenanceForm, setMaintenanceForm] = useState({
    date: '',
    description: '',
    cost: 0,
  });

  const handleMaintenanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMaintenanceForm((prev) => ({
      ...prev,
      [name]: name === 'cost' ? Number(value) : value,
    }));
  };

  const handleMaintenanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMaintenance(vehicle.id, maintenanceForm);
    setMaintenanceForm({ date: '', description: '', cost: 0 });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold mb-2">General Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
          <p>
            <span className="font-medium">License Plate:</span> {vehicle.licensePlate}
          </p>
          <p>
            <span className="font-medium">Serial Number:</span> {vehicle.serialNumber}
          </p>
          <p>
            <span className="font-medium">Make:</span> {vehicle.make}
          </p>
          <p>
            <span className="font-medium">Model:</span> {vehicle.model}
          </p>
          <p>
            <span className="font-medium">Year:</span> {vehicle.year}
          </p>
          <p>
            <span className="font-medium">Color:</span> {vehicle.color}
          </p>
          <p>
            <span className="font-medium">Status:</span> {vehicle.status}
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold mb-2 flex items-center">
          <FiUsers className="mr-2" /> Current Assignment
        </h4>
        {vehicle.assignment.employeeId ? (
          <p className="text-sm text-gray-700">
            <span className="font-medium">Assigned Employee:</span> {vehicle.assignment.employeeId}
          </p>
        ) : (
          <p className="text-sm text-gray-500 italic">No employee is currently assigned to this vehicle.</p>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold mb-2 flex items-center">
          <FiUser className="mr-2" /> Assignment History
        </h4>
        {vehicle.assignment.history.length > 0 ? (
          <ul className="space-y-2">
            {vehicle.assignment.history.map((h, index) => (
              <li key={index} className="text-sm text-gray-700">
                <span className="font-medium">Employee ID {h.employeeId}</span>: Assigned on{' '}
                {h.assignmentDate} {h.releaseDate ? `and released on ${h.releaseDate}` : '(ongoing)'}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic">No assignment history available.</p>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold mb-2 flex items-center">
          <FiTool className="mr-2" /> Maintenance History
        </h4>
        {vehicle.maintenanceHistory.length > 0 ? (
          <ul className="space-y-2">
            {vehicle.maintenanceHistory.map((h, index) => (
              <li key={index} className="text-sm text-gray-700">
                <span className="font-medium">Date:</span> {h.date} - {h.description} (
                <span className="text-red-500 font-semibold">{h.cost.toFixed(2)} €</span>)
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic">No maintenance history available.</p>
        )}
        <form onSubmit={handleMaintenanceSubmit} className="mt-4 space-y-4">
          <h5 className="text-md font-semibold">Add Maintenance Record</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={maintenanceForm.date}
                onChange={handleMaintenanceChange}
                className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                name="description"
                value={maintenanceForm.description}
                onChange={handleMaintenanceChange}
                className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cost (€)</label>
              <input
                type="number"
                name="cost"
                value={maintenanceForm.cost}
                onChange={handleMaintenanceChange}
                className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
                required
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
            >
              <FiPlus className="mr-2" /> Add Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleManagement;
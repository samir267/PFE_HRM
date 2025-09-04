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
// import axios from 'axios';

// --- Data Model Interfaces ---
export interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface EquipmentUniform {
  _id: string;
  itemName: string;
  itemType: 'Equipment' | 'Uniform';
  size: string;
  condition: 'New' | 'Used' | 'Damaged';
  serialNumber: string;
  assignment: {
    employeeId: string | null;
    employeeName?: string;
    history: {
      employeeId: string;
      assignmentDate: string;
      returnDate?: string;
    }[];
  };
  maintenanceHistory: {
    date: string;
    description: string;
    cost: number;
  }[];
}

export interface ItemType {
  _id: string;
  name: string;
  itemType: 'Equipment' | 'Uniform';
}

// --- Static Data ---
const staticEmployees: Employee[] = [
  { _id: 'emp1', firstName: 'John', lastName: 'Doe' },
  { _id: 'emp2', firstName: 'Jane', lastName: 'Smith' },
  { _id: 'emp3', firstName: 'Alice', lastName: 'Johnson' },
  { _id: 'emp4', firstName: 'Bob', lastName: 'Brown' },
];

const staticItems: EquipmentUniform[] = [
  {
    _id: 'item1',
    itemName: 'Safety Helmet',
    itemType: 'Uniform',
    size: 'M',
    condition: 'New',
    serialNumber: 'SH001',
    assignment: {
      employeeId: 'emp1',
      employeeName: 'John Doe',
      history: [
        { employeeId: 'emp1', assignmentDate: '2025-01-10', returnDate: undefined },
      ],
    },
    maintenanceHistory: [
      { date: '2025-02-15', description: 'Inspection', cost: 50 },
    ],
  },
  {
    _id: 'item2',
    itemName: 'Laptop',
    itemType: 'Equipment',
    size: 'N/A',
    condition: 'Used',
    serialNumber: 'LP002',
    assignment: {
      employeeId: null,
      employeeName: undefined,
      history: [],
    },
    maintenanceHistory: [],
  },
  {
    _id: 'item3',
    itemName: 'Work Boots',
    itemType: 'Uniform',
    size: '42',
    condition: 'New',
    serialNumber: 'WB003',
    assignment: {
      employeeId: 'emp2',
      employeeName: 'Jane Smith',
      history: [
        { employeeId: 'emp2', assignmentDate: '2025-03-01', returnDate: undefined },
      ],
    },
    maintenanceHistory: [],
  },
];

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
export const EquipmentUniformManagement: React.FC = () => {
  const [items, setItems] = useState<EquipmentUniform[]>(staticItems);
  const [employees, setEmployees] = useState<Employee[]>(staticEmployees);
  const [itemTypes, setItemTypes] = useState<ItemType[]>([
    { _id: '1', name: 'Safety Helmet', itemType: 'Uniform' },
    { _id: '2', name: 'Work Boots', itemType: 'Uniform' },
    { _id: '3', name: 'Laptop', itemType: 'Equipment' },
    { _id: '4', name: 'Power Drill', itemType: 'Equipment' },
    { _id: '5', name: 'Safety Vest', itemType: 'Uniform' },
  ]);
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
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<EquipmentUniform | null>(null);
  const [itemToDelete, setItemToDelete] = useState<EquipmentUniform | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
    pageCount: Math.ceil(staticItems.length / 10),
    total: staticItems.length,
  });

  // Simulate fetching items with pagination, sorting, and filtering
  useEffect(() => {
    setLoading(true);
    try {
      let filteredItems = [...staticItems];

      // Apply filters
      columnFilters.forEach((filter) => {
        const { id, value } = filter;
        filteredItems = filteredItems.filter((item) => {
          if (id === 'serialNumber') return item.serialNumber.toLowerCase().includes((value as string).toLowerCase());
          if (id === 'itemName') return item.itemName.toLowerCase().includes((value as string).toLowerCase());
          if (id === 'itemType') return item.itemType.toLowerCase().includes((value as string).toLowerCase());
          if (id === 'size') return item.size.toLowerCase().includes((value as string).toLowerCase());
          if (id === 'condition') return item.condition.toLowerCase().includes((value as string).toLowerCase());
          if (id === 'assignedEmployee') {
            const employeeName = item.assignment.employeeName || 'Not assigned';
            return employeeName.toLowerCase().includes((value as string).toLowerCase());
          }
          return true;
        });
      });

      // Apply sorting
      if (sorting.length > 0) {
        const { id, desc } = sorting[0];
        filteredItems.sort((a, b) => {
          let aValue: any = a[id as keyof EquipmentUniform];
          let bValue: any = b[id as keyof EquipmentUniform];
          if (id === 'assignedEmployee') {
            aValue = a.assignment.employeeName || 'Not assigned';
            bValue = b.assignment.employeeName || 'Not assigned';
          }
          if (typeof aValue === 'string') {
            return desc ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
          }
          return desc ? bValue - aValue : aValue - bValue;
        });
      }

      // Apply pagination
      const start = pagination.pageIndex * pagination.pageSize;
      const end = start + pagination.pageSize;
      const paginatedItems = filteredItems.slice(start, end);

      setItems(paginatedItems);
      setPagination((prev) => ({
        ...prev,
        pageCount: Math.ceil(filteredItems.length / prev.pageSize),
        total: filteredItems.length,
      }));
      setError(null);
    } catch (err: any) {
      setError('Failed to process items');
    } finally {
      setLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize, sorting, columnFilters]);

  // Simulate fetching employees
  useEffect(() => {
    setEmployees(staticEmployees);
  }, []);

  // --- CRUD Functions ---
  const addItem = (newItemData: Omit<EquipmentUniform, '_id' | 'assignment' | 'maintenanceHistory'>, selectedEmployee?: string) => {
    try {
      const newItem: EquipmentUniform = {
        ...newItemData,
        _id: `item${Date.now()}`,
        assignment: {
          employeeId: selectedEmployee || null,
          employeeName: selectedEmployee ? staticEmployees.find((emp) => emp._id === selectedEmployee)?.firstName + ' ' + staticEmployees.find((emp) => emp._id === selectedEmployee)?.lastName : undefined,
          history: selectedEmployee ? [{ employeeId: selectedEmployee, assignmentDate: new Date().toISOString().split('T')[0], returnDate: undefined }] : [],
        },
        maintenanceHistory: [],
      };
      setItems((prev) => [...prev, newItem]);
      setIsAddModalOpen(false);
      setError(null);
    } catch (err: any) {
      setError('Failed to add item');
    }
  };

  const updateItem = (id: string, updatedData: Partial<EquipmentUniform>, selectedEmployee?: string) => {
    try {
      setItems((prev) =>
        prev.map((item) => {
          if (item._id === id) {
            const currentEmployee = item.assignment.employeeId;
            const newAssignment = {
              employeeId: selectedEmployee || null,
              employeeName: selectedEmployee ? staticEmployees.find((emp) => emp._id === selectedEmployee)?.firstName + ' ' + staticEmployees.find((emp) => emp._id === selectedEmployee)?.lastName : undefined,
              history: [...item.assignment.history],
            };
            if (selectedEmployee !== currentEmployee) {
              if (currentEmployee && !selectedEmployee) {
                newAssignment.history.find((h) => h.employeeId === currentEmployee && !h.returnDate)!.returnDate = new Date().toISOString().split('T')[0];
              }
              if (selectedEmployee) {
                newAssignment.history.push({
                  employeeId: selectedEmployee,
                  assignmentDate: new Date().toISOString().split('T')[0],
                  returnDate: undefined,
                });
              }
            }
            return { ...item, ...updatedData, assignment: newAssignment };
          }
          return item;
        })
      );
      setIsEditModalOpen(false);
      setError(null);
    } catch (err: any) {
      setError('Failed to update item');
    }
  };

  const confirmDeleteItem = (item: EquipmentUniform) => {
    setItemToDelete(item);
    setRowSelection({});
    setIsConfirmModalOpen(true);
  };

  const deleteItem = () => {
    if (itemToDelete) {
      try {
        setItems((prev) => prev.filter((item) => item._id !== itemToDelete._id));
        setItemToDelete(null);
        setIsConfirmModalOpen(false);
        setError(null);
      } catch (err: any) {
        setError('Failed to delete item');
      }
    }
  };

  const confirmBulkDelete = () => {
    setIsBulkDeleteModalOpen(true);
  };

  const handleDeleteSelected = () => {
    try {
      const selectedIds = table.getSelectedRowModel().rows.map((row) => row.original._id);
      setItems((prev) => prev.filter((item) => !selectedIds.includes(item._id)));
      setRowSelection({});
      setIsBulkDeleteModalOpen(false);
      setError(null);
    } catch (err: any) {
      setError('Failed to delete items');
    }
  };

  const linkItemToEmployee = (itemId: string, employeeId: string) => {
    try {
      setItems((prev) =>
        prev.map((item) => {
          if (item._id === itemId) {
            const employee = staticEmployees.find((emp) => emp._id === employeeId);
            return {
              ...item,
              assignment: {
                employeeId,
                employeeName: employee ? `${employee.firstName} ${employee.lastName}` : undefined,
                history: [
                  ...item.assignment.history,
                  { employeeId, assignmentDate: new Date().toISOString().split('T')[0], returnDate: undefined },
                ],
              },
            };
          }
          return item;
        })
      );
      setError(null);
    } catch (err: any) {
      setError('Failed to assign item');
    }
  };

  const unlinkItem = (itemId: string) => {
    try {
      setItems((prev) =>
        prev.map((item) => {
          if (item._id === itemId && item.assignment.employeeId) {
            const history = [...item.assignment.history];
            const ongoingAssignment = history.find((h) => h.employeeId === item.assignment.employeeId && !h.returnDate);
            if (ongoingAssignment) {
              ongoingAssignment.returnDate = new Date().toISOString().split('T')[0];
            }
            return {
              ...item,
              assignment: {
                employeeId: null,
                employeeName: undefined,
                history,
              },
            };
          }
          return item;
        })
      );
      setError(null);
    } catch (err: any) {
      setError('Failed to unassign item');
    }
  };

  const addMaintenanceRecord = (itemId: string, record: { date: string; description: string; cost: number }) => {
    try {
      setItems((prev) =>
        prev.map((item) => {
          if (item._id === itemId) {
            return {
              ...item,
              maintenanceHistory: [...item.maintenanceHistory, record],
            };
          }
          return item;
        })
      );
      setError(null);
    } catch (err: any) {
      setError('Failed to add maintenance record');
    }
  };

  const handleOpenViewModal = (item: EquipmentUniform) => {
    setEditingItem(item);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setEditingItem(null);
  };

  // --- Table Configuration ---
  const columns = useMemo<ColumnDef<EquipmentUniform>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      },
      {
        accessorKey: 'serialNumber',
        header: 'Serial Number',
        cell: ({ row, getValue }) => (
          <div
            className="font-medium text-blue-600 hover:underline cursor-pointer"
            onClick={() => handleOpenViewModal(row.original)}
          >
            {getValue() as string}
          </div>
        ),
        enableColumnFilter: true,
      },
      {
        accessorKey: 'itemName',
        header: 'Item Name',
        cell: (info) => <div className="text-sm text-gray-900">{info.getValue() as string}</div>,
        enableColumnFilter: true,
        filterFn: 'includesString',
      },
      {
        accessorKey: 'itemType',
        header: 'Type',
        cell: (info) => <div className="text-sm text-gray-500">{info.getValue() as string}</div>,
        enableColumnFilter: true,
        filterFn: 'includesString',
      },
      {
        accessorKey: 'size',
        header: 'Size',
        cell: (info) => <div className="text-sm text-gray-500">{info.getValue() as string}</div>,
        enableColumnFilter: true,
        filterFn: 'includesString',
      },
      {
        accessorKey: 'condition',
        header: 'Condition',
        cell: (info) => {
          const condition = info.getValue() as string;
          let colorClass = '';
          switch (condition) {
            case 'New':
              colorClass = 'bg-green-100 text-green-800';
              break;
            case 'Used':
              colorClass = 'bg-yellow-100 text-yellow-800';
              break;
            case 'Damaged':
              colorClass = 'bg-red-100 text-red-800';
              break;
            default:
              colorClass = 'bg-gray-100 text-gray-800';
              break;
          }
          return (
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClass}`}>
              {condition}
            </span>
          );
        },
        enableColumnFilter: true,
        filterFn: 'includesString',
      },
      {
        accessorFn: (row) => row.assignment?.employeeName,
        id: 'assignedEmployee',
        header: 'Assigned Employee',
        cell: (info) => (
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              info.getValue() ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
            }`}
          >
            {info.getValue() || 'Not assigned'}
          </span>
        ),
        enableColumnFilter: true,
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
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
                setEditingItem(row.original);
                setIsEditModalOpen(true);
              }}
              className="p-2 text-blue-500 hover:text-blue-900"
              title="Edit"
            >
              <FiEdit className="w-5 h-5" />
            </button>
            <button
              onClick={() => confirmDeleteItem(row.original)}
              className="p-2 text-red-500 hover:text-red-900"
              title="Delete"
            >
              <FiTrash2 className="w-5 h-5" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: items,
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Equipment & Uniform Management</h1>
        <p className="text-gray-600">Manage your company's equipment and uniforms.</p>
      </header>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
          <FiAlertCircle className="mr-2" /> {error}
        </div>
      )}

      {loading && (
        <div className="mb-4 p-4 bg-blue-100 text-blue-700 rounded-lg flex items-center">
          <FiMenu className="mr-2 animate-spin" /> Loading...
        </div>
      )}

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
            onClick={() => setIsTypeModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
          >
            <FiSliders className="mr-2" />
            Manage Types
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition-colors"
          >
            <FiPlus className="mr-2" />
            Add an Item
          </button>
        </div>
      </div>

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
                    No items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <span className="text-sm text-gray-700">
            Page{' '}
            <strong>
              {pagination.pageIndex + 1} of {pagination.pageCount}
            </strong>{' '}
            ({pagination.total} items)
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

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add a new item">
        <AddEditItemForm
          onSave={addItem}
          onCancel={() => setIsAddModalOpen(false)}
          employees={employees}
          itemTypes={itemTypes}
        />
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit item">
        {editingItem && (
          <AddEditItemForm
            item={editingItem}
            onSave={(updatedData, selectedEmployee) => updateItem(editingItem._id, updatedData, selectedEmployee)}
            onCancel={() => setIsEditModalOpen(false)}
            employees={employees}
            itemTypes={itemTypes}
          />
        )}
      </Modal>

      <Modal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} title="Confirm Deletion">
        <p className="text-gray-700">
          Are you sure you want to delete the item with serial number{' '}
          <span className="font-bold">{itemToDelete?.serialNumber}</span>? This action is irreversible.
        </p>
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={() => setIsConfirmModalOpen(false)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={deleteItem}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </Modal>

      <Modal isOpen={isBulkDeleteModalOpen} onClose={() => setIsBulkDeleteModalOpen(false)} title="Confirm Bulk Deletion">
        <p className="text-gray-700">
          Are you sure you want to delete{' '}
          <span className="font-bold">{selectedRowsCount} selected item(s)</span>? This action is
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

      <Modal isOpen={isViewModalOpen} onClose={handleCloseViewModal} title="Item Details">
        {editingItem && (
          <ViewItemDetails
            item={editingItem}
            onAddMaintenance={addMaintenanceRecord}
          />
        )}
      </Modal>

      <Modal isOpen={isTypeModalOpen} onClose={() => setIsTypeModalOpen(false)} title="Manage Item Types">
        <ItemTypesManager itemTypes={itemTypes} setItemTypes={setItemTypes} />
      </Modal>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} title="Item Statistics">
        <p className="text-sm text-gray-600">
          Add equipment/uniform statistics or additional options here (e.g., total items by condition).
        </p>
      </Sidebar>
    </div>
  );
};

// Component for managing item types
const ItemTypesManager: React.FC<{ itemTypes: ItemType[]; setItemTypes: React.Dispatch<React.SetStateAction<ItemType[]>> }> = ({ itemTypes, setItemTypes }) => {
  const [newTypeName, setNewTypeName] = useState('');
  const [newItemType, setNewItemType] = useState<'Equipment' | 'Uniform'>('Equipment');

  const handleAddType = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTypeName) {
      setItemTypes((prev) => [...prev, { _id: Date.now().toString(), name: newTypeName, itemType: newItemType }]);
      setNewTypeName('');
    }
  };

  const deleteType = (id: string) => {
    setItemTypes((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddType} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Type Name</label>
            <input
              type="text"
              value={newTypeName}
              onChange={(e) => setNewTypeName(e.target.value)}
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={newItemType}
              onChange={(e) => setNewItemType(e.target.value as 'Equipment' | 'Uniform')}
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
              required
            >
              <option value="Equipment">Equipment</option>
              <option value="Uniform">Uniform</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
          >
            <FiPlus className="mr-2" /> Add Type
          </button>
        </div>
      </form>

      <div className="border-t pt-4">
        <h4 className="text-lg font-semibold mb-2">Existing Types</h4>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {itemTypes.map((type) => (
              <tr key={type._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{type.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{type.itemType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => deleteType(type._id)}
                    className="text-red-500 hover:text-red-900"
                    title="Delete"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

// Add/Edit Item Form
const AddEditItemForm: React.FC<{
  onSave: (data: any, employeeId?: string) => void;
  onCancel: () => void;
  item?: EquipmentUniform;
  employees: Employee[];
  itemTypes: ItemType[];
}> = ({ onSave, onCancel, item, employees, itemTypes }) => {
  const [formData, setFormData] = useState<Partial<EquipmentUniform>>(
    item || {
      itemName: '',
      itemType: 'Equipment',
      size: '',
      condition: 'New',
      serialNumber: '',
    }
  );
  const [selectedTypeId, setSelectedTypeId] = useState(
    itemTypes.find((t) => t.name === item?.itemName && t.itemType === item?.itemType)?._id || ''
  );
  const [selectedEmployee, setSelectedEmployee] = useState(item?.assignment?.employeeId || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const typeId = e.target.value;
    setSelectedTypeId(typeId);
    const selectedType = itemTypes.find((t) => t._id === typeId);
    if (selectedType) {
      setFormData((prev) => ({
        ...prev,
        itemName: selectedType.name,
        itemType: selectedType.itemType,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, selectedEmployee || undefined);
  };

  const isNewItem = !item;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Item Type</label>
          <select
            value={selectedTypeId}
            onChange={handleTypeChange}
            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
            required
          >
            <option value="">Select a type</option>
            {itemTypes.map((type) => (
              <option key={type._id} value={type._id}>
                {type.name} ({type.itemType})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Size</label>
          <input
            type="text"
            name="size"
            value={formData.size || ''}
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
      </div>

      <div className="border-t pt-4 mt-4">
        <label className="block text-sm font-medium text-gray-700">Condition</label>
        <select
          name="condition"
          value={formData.condition || 'New'}
          onChange={handleChange}
          className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
        >
          <option value="New">New</option>
          <option value="Used">Used</option>
          <option value="Damaged">Damaged</option>
        </select>
      </div>

      <div className="border-t pt-4 mt-4">
        <h4 className="text-lg font-semibold text-gray-800 flex items-center mb-2">
          <FiUsers className="mr-2" /> Assign to an employee
        </h4>
        {item?.assignment?.employeeId && (
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <p className="font-medium text-gray-900">Currently assigned to:</p>
            <p className="text-blue-800 font-bold">{item.assignment.employeeName}</p>
          </div>
        )}
        <label className="block text-sm font-medium text-gray-700">Select an employee</label>
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
        >
          <option value="">Not assigned</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.firstName} {emp.lastName}
            </option>
          ))}
        </select>
      </div>

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
          <FiCheckCircle className="mr-2" /> {isNewItem ? 'Add' : 'Save'}
        </button>
      </div>
    </form>
  );
};

// Item Details View Component with Maintenance Form
const ViewItemDetails: React.FC<{
  item: EquipmentUniform;
  onAddMaintenance: (itemId: string, record: { date: string; description: string; cost: number }) => void;
}> = ({ item, onAddMaintenance }) => {
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
    onAddMaintenance(item._id, maintenanceForm);
    setMaintenanceForm({ date: '', description: '', cost: 0 });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold mb-2">General Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
          <p>
            <span className="font-medium">Serial Number:</span> {item.serialNumber}
          </p>
          <p>
            <span className="font-medium">Item Name:</span> {item.itemName}
          </p>
          <p>
            <span className="font-medium">Type:</span> {item.itemType}
          </p>
          <p>
            <span className="font-medium">Size:</span> {item.size}
          </p>
          <p>
            <span className="font-medium">Condition:</span> {item.condition}
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold mb-2 flex items-center">
          <FiUsers className="mr-2" /> Current Assignment
        </h4>
        {item.assignment.employeeId ? (
          <p className="text-sm text-gray-700">
            <span className="font-medium">Assigned Employee:</span> {item.assignment.employeeName}
          </p>
        ) : (
          <p className="text-sm text-gray-500 italic">No employee is currently assigned to this item.</p>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold mb-2 flex items-center">
          <FiUser className="mr-2" /> Assignment History
        </h4>
        {item.assignment.history.length > 0 ? (
          <ul className="space-y-2">
            {item.assignment.history.map((h, index) => (
              <li key={index} className="text-sm text-gray-700">
                <span className="font-medium">Employee ID {h.employeeId}</span>: Assigned on{' '}
                {h.assignmentDate} {h.returnDate ? `and returned on ${h.returnDate}` : '(ongoing)'}
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
        {item.maintenanceHistory.length > 0 ? (
          <ul className="space-y-2">
            {item.maintenanceHistory.map((h, index) => (
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

export default EquipmentUniformManagement;
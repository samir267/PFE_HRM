import React, { useState, useMemo, useEffect } from 'react';
import {
  FiPhone,
  FiPlus,
  FiTrash2,
  FiArchive,
  FiList,
  FiLayout,
  FiX,
  FiEdit,
  FiCheckCircle,
  FiInfo,
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiFilter,
  FiSearch,
  FiClipboard,
  FiAlertCircle
} from 'react-icons/fi';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getPaginationRowModel,
} from '@tanstack/react-table';
import personalDataService from '../../../services/personalData.service';

// Interface pour le modèle de données des utilisateurs
interface User {
  id: string;
  name: string;
  _id?: string;
}

// Interface pour le modèle de données des numéros de téléphone/fax
interface PhoneNumber {
  id: string;
  type: string;
  number: string;
  userId: string;
  isPrimary: boolean;
  personalIdentityId?: string;
}

// Données de base pour le dropdown "Type"
const allPhoneTypes = ['Principal', 'Personnel', 'Professionnel', 'Fax', 'Autre'];

// Composant de notification simple
const Notification: React.FC<{ message: string; type: 'success' | 'info' | 'error'; onClose: () => void }> = ({ message, type, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : type === 'info' ? 'bg-blue-500' : 'bg-red-500';
  const icon = type === 'success' ? <FiCheckCircle /> : type === 'info' ? <FiInfo /> : <FiAlertCircle />;

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-xl flex items-center animate-fade-in z-50`}>
      <div className="mr-2">{icon}</div>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
        <FiX />
      </button>
    </div>
  );
};

// Fonction de validation de numéro de téléphone
const validatePhoneNumber = (number: string | number): boolean => {
  const phoneStr = number.toString();
  const re = /^\+?\d{1,4}?[-.\s]?\d{1,3}[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/;
  return re.test(phoneStr) || /^\d{10,12}$/.test(phoneStr); // Accepte les numéros bruts de 10-12 chiffres
};

// Formater le numéro de téléphone pour l'affichage
const formatPhoneNumber = (number: string | number): string => {
  const phoneStr = number.toString();
  if (/^\d{10,12}$/.test(phoneStr)) {
    return `+${phoneStr}`; // Ajoute un "+" pour les numéros bruts
  }
  return phoneStr;
};

// Composant pour la barre latérale droite
const RightBar: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  selectedNumber: PhoneNumber | null;
  onUpdate: (id: string, updatedData: Partial<PhoneNumber>) => void;
  onSetPrimary: (id: string) => void;
  allUsers: User[];
}> = ({ isOpen, onClose, selectedNumber, onUpdate, onSetPrimary, allUsers }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNumber, setEditedNumber] = useState<Partial<PhoneNumber>>({});
  const [isNumberValid, setIsNumberValid] = useState(true);

  useEffect(() => {
    if (selectedNumber) {
      setEditedNumber(selectedNumber);
      setIsEditing(false);
      setIsNumberValid(validatePhoneNumber(selectedNumber.number));
    }
  }, [selectedNumber]);

  if (!isOpen || !selectedNumber) {
    return null;
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditedNumber({ ...editedNumber, number: value });
    setIsNumberValid(validatePhoneNumber(value));
  };

  const handleSave = async () => {
    try {
      if (selectedNumber.id && editedNumber.number && validatePhoneNumber(editedNumber.number)) {
        const employeeId = selectedNumber.personalIdentityId || selectedNumber.userId;
        const payload = {
          phoneType: editedNumber.type,
          phoneNumber: editedNumber.number,
          isPrimary: editedNumber.isPrimary,
        };

        await personalDataService.editContact(employeeId, selectedNumber.id, payload);
        onUpdate(selectedNumber.id, editedNumber);
        setIsEditing(false);
        onClose();
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du contact:', error);
      setNotification({ message: 'Erreur lors de la mise à jour du numéro', type: 'error' });
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg p-6 overflow-y-auto transform transition-transform duration-300 z-50">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h3 className="text-xl font-bold">Détails du numéro</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FiX className="h-6 w-6" />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          {isEditing ? (
            <select
              value={editedNumber.type || ''}
              onChange={(e) => setEditedNumber({ ...editedNumber, type: e.target.value })}
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm"
            >
              <option value="" disabled>Sélectionner un type</option>
              {allPhoneTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          ) : (
            <div className="flex items-center mt-1">
              <p className="text-gray-900">{selectedNumber.type}</p>
              {selectedNumber.isPrimary && <FiStar className="ml-2 text-yellow-500" title="Numéro principal" />}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Numéro</label>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={editedNumber.number || ''}
                onChange={handleNumberChange}
                className={`mt-1 w-full rounded-lg shadow-sm px-3 py-2 ${!isNumberValid ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'}`}
                placeholder="Saisir le numéro"
              />
              {!isNumberValid && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <FiAlertCircle className="mr-1" />
                  Format de numéro invalide.
                </p>
              )}
            </div>
          ) : (
            <p className="mt-1 text-gray-900">{formatPhoneNumber(selectedNumber.number)}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Utilisateur</label>
          <p className="mt-1 text-gray-900">{allUsers.find(u => u.id === selectedNumber.userId)?.name}</p>
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            disabled={!editedNumber.number || !editedNumber.type || !isNumberValid}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiCheckCircle className="mr-2" /> Enregistrer
          </button>
        ) : (
          <>
            <button
              onClick={() => onSetPrimary(selectedNumber.id)}
              disabled={selectedNumber.isPrimary}
              className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Définir comme principal"
            >
              <FiStar className="mr-2" /> Principal
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition-colors"
            >
              <FiEdit className="mr-2" /> Modifier
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Filter Sidebar component with integrated top filters
const FilterSidebar: React.FC<{
  allUsers: User[];
  phoneNumbers: PhoneNumber[];
  filterQuery: string;
  onFilterQueryChange: (query: string) => void;
  selectedUserIds: string[];
  onUserSelect: (userId: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  pagination: { pageIndex: number; pageSize: number };
  onPaginationChange: (pageIndex: number) => void;
  pageCount: number;
  filterType: string;
  onFilterTypeChange: (type: string) => void;
  onLoadUserPhones: (userId: string) => void;
}> = ({
  allUsers,
  phoneNumbers,
  filterQuery,
  onFilterQueryChange,
  selectedUserIds,
  onUserSelect,
  onSelectAll,
  onDeselectAll,
  pagination,
  onPaginationChange,
  pageCount,
  filterType,
  onFilterTypeChange,
  onLoadUserPhones,
}) => {
  const usersToDisplay = useMemo(() => {
    if (filterQuery) {
      const lowercasedQuery = filterQuery.toLowerCase();
      const matchedUsers = allUsers.filter(user =>
        user.name.toLowerCase().includes(lowercasedQuery) || user.id.toLowerCase().includes(lowercasedQuery)
      );
      return matchedUsers;
    }
    return [];
  }, [allUsers, filterQuery]);

  const paginatedUsers = useMemo(() => {
    if (filterQuery === '%') {
      const start = pagination.pageIndex * pagination.pageSize;
      const end = start + pagination.pageSize;
      return allUsers.slice(start, end);
    }
    return usersToDisplay;
  }, [allUsers, filterQuery, pagination, usersToDisplay]);

  useEffect(() => {
    onPaginationChange(0);
  }, [filterQuery]);

  return (
    <div className="w-80 p-6 bg-white rounded-xl shadow-lg h-full overflow-y-auto flex-shrink-0">
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <h3 className="font-bold text-lg text-gray-800 flex items-center">
          <FiFilter className="mr-2 text-gray-500" />
          Filtres
        </h3>
      </div>
      
      {/* Search Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rechercher un utilisateur
        </label>
        <div className="relative">
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => onFilterQueryChange(e.target.value)}
            placeholder="Nom, code... ou '%' pour tout"
            className="w-full pl-10 pr-3 py-2 rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      
      {/* Type Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filtrer par type
        </label>
        <select
          value={filterType}
          onChange={(e) => onFilterTypeChange(e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="">Tous les types</option>
          {allPhoneTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      
      {/* User Selection Filter */}
      {filterQuery && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-gray-700">Utilisateurs trouvés ({paginatedUsers.length})</h4>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (selectedUserIds.length === paginatedUsers.length) {
                  onDeselectAll();
                } else {
                  onSelectAll();
                }
              }}
              className="text-sm text-orange-600 hover:text-orange-800"
            >
              {selectedUserIds.length === paginatedUsers.length ? 'Tout désélectionner' : 'Tout sélectionner'}
            </button>
          </div>
          <ul className="space-y-2 max-h-60 overflow-y-auto">
            {paginatedUsers.map(user => {
              const primaryPhoneNumber = phoneNumbers.find(p => p.userId === user.id && p.isPrimary);
              return (
                <li key={user.id}>
                  <div className="flex items-start cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedUserIds.includes(user.id)}
                      onChange={() => onUserSelect(user.id)}
                      className="form-checkbox h-4 w-4 text-orange-600 transition duration-150 ease-in-out rounded border-gray-300 focus:ring-orange-500 mt-1"
                    />
                    <div className="ml-3 flex-1">
                      <span className="block text-sm font-medium text-gray-800">{user.name}</span>
                      <span className="block text-xs text-gray-500">Code: {user.id}</span>
                      {primaryPhoneNumber && (
                        <span className="block text-xs text-gray-500 flex items-center">
                          <FiPhone className="mr-1" />
                          {formatPhoneNumber(primaryPhoneNumber.number)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onLoadUserPhones(user.id);
                      }}
                      className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                      title={`Charger les numéros de ${user.name}`}
                    >
                      <FiPhone />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Pagination Controls for User List */}
      {filterQuery === '%' && allUsers.length > pagination.pageSize && (
        <div className="flex justify-between items-center mt-4 border-t pt-4">
          <span className="text-sm text-gray-600">
            Page {pagination.pageIndex + 1} sur {pageCount}
          </span>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => onPaginationChange(0)}
              disabled={pagination.pageIndex === 0}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50"
            >
              <FiChevronsLeft />
            </button>
            <button
              onClick={() => onPaginationChange(pagination.pageIndex - 1)}
              disabled={pagination.pageIndex === 0}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50"
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={() => onPaginationChange(pagination.pageIndex + 1)}
              disabled={pagination.pageIndex >= pageCount - 1}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50"
            >
              <FiChevronRight />
            </button>
            <button
              onClick={() => onPaginationChange(pageCount - 1)}
              disabled={pagination.pageIndex >= pageCount - 1}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50"
            >
              <FiChevronsRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const PhoneFaxSection: React.FC = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([]);
  const [archivedNumbers, setArchivedNumbers] = useState<PhoneNumber[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [isRightBarOpen, setIsRightBarOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<PhoneNumber | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [phoneNumberValue, setPhoneNumberValue] = useState('');
  const [phoneType, setPhoneType] = useState('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [userPagination, setUserPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Fonction pour charger tous les numéros de téléphone depuis l'API
  const fetchAllPhoneNumbers = async () => {
    try {
      setIsLoading(true);
      console.log('Chargement de tous les numéros de téléphone...');
      
      const allPhones: PhoneNumber[] = [];
      for (const user of allUsers) {
        try {
          const response = await personalDataService.getEmployeePhones(user._id || user.id);
          let userPhones = [];
          
          if (Array.isArray(response)) {
            userPhones = response;
          } else if (response?.data && Array.isArray(response.data)) {
            userPhones = response.data;
          } else if (response?.phones && Array.isArray(response.phones)) {
            userPhones = response.phones;
          } else {
            console.error(`Structure de réponse inattendue pour getEmployeePhones de l'utilisateur ${user.id}:`, response);
            continue;
          }

          const formattedPhones: PhoneNumber[] = userPhones
            .filter(phone => phone.phoneNumber && validatePhoneNumber(phone.phoneNumber))
            .map((phone: any, index: number) => ({
              id: phone._id || phone.id || `phone_${user.id}_${index}`,
              type: phone.phoneType || phone.type || 'Autre',
              number: formatPhoneNumber(phone.phoneNumber || ''),
              userId: user.id,
              isPrimary: phone.isPrimary || false,
              personalIdentityId: phone.personalIdentityId || user._id || user.id,
            }));

          allPhones.push(...formattedPhones);
        } catch (error) {
          console.error(`Erreur lors du chargement des numéros pour l'utilisateur ${user.id}:`, error);
        }
      }

      console.log('Numéros formatés:', allPhones);
      setPhoneNumbers(allPhones);

    } catch (error) {
      console.error('Erreur lors du chargement des numéros:', error);
      setNotification({ message: 'Erreur lors du chargement des numéros', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour charger les numéros d'un utilisateur spécifique
  const fetchUserPhoneNumbers = async (userId: string) => {
    try {
      setIsLoading(true);
      console.log(`Chargement des numéros de téléphone pour l'utilisateur ${userId}...`);
      
      const user = allUsers.find(u => u.id === userId);
      const employeeId = user?._id || userId;
      
      const response = await personalDataService.getEmployeePhones(employeeId);
      console.log(`Réponse API pour l'utilisateur ${userId}:`, response);

      let userPhones = [];
      if (Array.isArray(response)) {
        userPhones = response;
      } else if (response?.data && Array.isArray(response.data)) {
        userPhones = response.data;
      } else if (response?.phones && Array.isArray(response.phones)) {
        userPhones = response.phones;
      } else {
        console.error('Structure de réponse inattendue pour getEmployeePhones:', response);
        setNotification({ message: 'Structure de données inattendue', type: 'error' });
        return [];
      }

      const formattedPhones: PhoneNumber[] = userPhones
        .filter(phone => phone.phoneNumber && validatePhoneNumber(phone.phoneNumber))
        .map((phone: any, index: number) => ({
          id: phone._id || phone.id || `${userId}_phone_${index}`,
          type: phone.phoneType || phone.type || 'Autre',
          number: formatPhoneNumber(phone.phoneNumber || ''),
          userId: userId,
          isPrimary: phone.isPrimary || false,
          personalIdentityId: phone.personalIdentityId || employeeId,
        }));

      console.log(`Numéros pour ${user?.name}:`, formattedPhones);

      setPhoneNumbers(prevPhones => {
        const otherUsersPhones = prevPhones.filter(phone => phone.userId !== userId);
        return [...otherUsersPhones, ...formattedPhones];
      });

      setNotification({ message: `Numéros chargés pour ${user?.name}`, type: 'success' });
      return formattedPhones;

    } catch (error) {
      console.error(`Erreur lors du chargement des numéros pour l'utilisateur ${userId}:`, error);
      setNotification({ message: 'Erreur lors du chargement des numéros', type: 'error' });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Chargement initial des utilisateurs
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await personalDataService.getEmployees();
        console.log('Réponse complète des employés:', response);

        let employees = [];
        if (Array.isArray(response)) {
          employees = response;
        } else if (response?.data && Array.isArray(response.data)) {
          employees = response.data;
        } else if (response?.employees && Array.isArray(response.employees)) {
          employees = response.employees;
        } else if (response?.result && Array.isArray(response.result)) {
          employees = response.result;
        } else {
          console.error('Structure de réponse inattendue pour getEmployees:', response);
          setNotification({ message: 'Erreur lors du chargement des employés', type: 'error' });
          return;
        }

        const users: User[] = employees.map((emp: any, index: number) => ({
          id: emp.registrationNumber ?? emp._id ?? emp.id ?? `emp_${index}`,
          name: `${emp.firstName ?? emp.first_name ?? ''} ${emp.lastName ?? emp.last_name ?? ''}`.trim() || emp.name || `Employé ${index + 1}`,
          _id: emp._id,
        }));

        console.log('Utilisateurs finaux:', users);
        setAllUsers(users);

      } catch (error) {
        console.error('Erreur lors du chargement des employés:', error);
        setNotification({ message: 'Erreur lors du chargement des employés', type: 'error' });
      }
    };

    fetchEmployees();
  }, []);

  // Charger tous les numéros une fois les utilisateurs chargés
  useEffect(() => {
    if (allUsers.length > 0) {
      fetchAllPhoneNumbers();
    }
  }, [allUsers]);

  // Appel à fetchAllPhoneNumbers lorsque filterQuery === '%'
  useEffect(() => {
    if (filterQuery === '%') {
      fetchAllPhoneNumbers();
    }
  }, [filterQuery]);

  const totalUsersCount = allUsers.length;
  const userPageCount = Math.ceil(totalUsersCount / userPagination.pageSize);

  const paginatedUsers = useMemo(() => {
    if (filterQuery === '%') {
      const start = userPagination.pageIndex * userPagination.pageSize;
      const end = start + userPagination.pageSize;
      return allUsers.slice(start, end);
    }
    
    if (filterQuery) {
      const lowercasedQuery = filterQuery.toLowerCase();
      return allUsers.filter(user =>
        user.name.toLowerCase().includes(lowercasedQuery) || user.id.toLowerCase().includes(lowercasedQuery)
      );
    }
    
    return [];
  }, [allUsers, filterQuery, userPagination]);

  useEffect(() => {
    if (filterQuery) {
      setSelectedUserIds(paginatedUsers.map(user => user.id));
    } else {
      setSelectedUserIds([]);
    }
  }, [paginatedUsers, filterQuery]);

  const showNotification = (message: string, type: 'success' | 'info' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  
  const handleAddNumberFromModal = async () => {
    if (!registrationNumber || !phoneNumberValue || !phoneType) {
      showNotification('Veuillez remplir tous les champs', 'error');
      return;
    }

    if (!validatePhoneNumber(phoneNumberValue)) {
      showNotification('Format de numéro invalide', 'error');
      return;
    }

    try {
      const contactData = {
        phoneType: phoneType,
        phoneNumber: phoneNumberValue,
        isPrimary: phoneType === 'Principal'
      };

      const selectedUser = allUsers.find(user => user.id === registrationNumber);
      const employeeId = selectedUser?._id || registrationNumber;

      const response = await personalDataService.addPhoneContact(employeeId, contactData);
      console.log('Numéro ajouté avec succès:', response);

      handleCloseModal();
      showNotification('Numéro ajouté avec succès', 'success');
      
      await fetchUserPhoneNumbers(registrationNumber);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du numéro:', error);
      showNotification('Erreur lors de l\'ajout du numéro', 'error');
    }
  };
  
  const handleRemoveNumber = (id: string, userId: string) => {
    const userPhones = phoneNumbers.filter(p => p.userId === userId);
    const phoneToDelete = phoneNumbers.find(p => p.id === id);

    if (userPhones.length === 1) {
      showNotification('Un utilisateur doit avoir au moins un numéro de téléphone.', 'error');
      return;
    }
    
    setPhoneNumbers(prev => {
      const newPhones = prev.filter(item => item.id !== id);
      if (phoneToDelete?.isPrimary) {
        const remainingPhonesForUser = newPhones.filter(p => p.userId === userId);
        if (remainingPhonesForUser.length > 0) {
          const firstPhone = remainingPhonesForUser[0];
          firstPhone.isPrimary = true;
          firstPhone.type = 'Principal';
        }
      }
      return newPhones;
    });
    showNotification('Numéro supprimé', 'info');
  };
  
  const handleArchiveNumber = (id: string) => {
    const numberToArchive = phoneNumbers.find(item => item.id === id);
    if (numberToArchive) {
      const userPhones = phoneNumbers.filter(p => p.userId === numberToArchive.userId);
      if (userPhones.length === 1) {
        showNotification('Un utilisateur doit avoir au moins un numéro de téléphone.', 'error');
        return;
      }
      
      setPhoneNumbers(prev => {
        const newPhones = prev.filter(item => item.id !== id);
        if (numberToArchive.isPrimary) {
          const remainingPhonesForUser = newPhones.filter(p => p.userId === numberToArchive.userId);
          if (remainingPhonesForUser.length > 0) {
            const firstPhone = remainingPhonesForUser[0];
            firstPhone.isPrimary = true;
            firstPhone.type = 'Principal';
          }
        }
        return newPhones;
      });
      setArchivedNumbers(prev => [...prev, { ...numberToArchive, isPrimary: false, type: 'Archivé' }]);
      showNotification('Numéro archivé', 'info');
    }
  };
  
  const handleRestoreNumber = (id: string) => {
    const numberToRestore = archivedNumbers.find(item => item.id === id);
    if (numberToRestore) {
      setArchivedNumbers(prev => prev.filter(item => item.id !== id));
      setPhoneNumbers(prev => [...prev, { ...numberToRestore, type: 'Autre' }]);
      showNotification('Numéro restauré', 'success');
    }
  };
  
  const handleSetPrimary = (id: string) => {
    setPhoneNumbers(prev => prev.map(item => ({
      ...item,
      isPrimary: item.id === id,
      type: item.id === id ? 'Principal' : (item.isPrimary ? 'Autre' : item.type)
    })));
    showNotification('Numéro principal mis à jour', 'success');
  };

  const handleChange = (id: string, name: keyof PhoneNumber, value: string) => {
    setPhoneNumbers(prev => prev.map(item =>
      item.id === id ? { ...item, [name]: value } : item
    ));
  };

  const handleUpdateFromRightBar = (id: string, updatedData: Partial<PhoneNumber>) => {
    setPhoneNumbers(prev => prev.map(item =>
      item.id === id ? { ...item, ...updatedData } : item
    ));
    showNotification('Détails mis à jour', 'success');
  };

  const handleOpenRightBar = (number: PhoneNumber) => {
    setSelectedNumber(number);
    setIsRightBarOpen(true);
  };

  const handleUserFilterChange = (userId: string) => {
    setSelectedUserIds(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAllUsers = () => {
    setSelectedUserIds(paginatedUsers.map(user => user.id));
  };

  const handleDeselectAllUsers = () => {
    setSelectedUserIds([]);
  };

  const handleUserPaginationChange = (pageIndex: number) => {
    setUserPagination(prev => ({ ...prev, pageIndex }));
  };

  const handleLoadUserPhones = async (userId: string) => {
    await fetchUserPhoneNumbers(userId);
  };

  const filteredNumbers = useMemo(() => {
    const numbersForSelectedUsers = phoneNumbers.filter(item =>
      selectedUserIds.includes(item.userId)
    );
    
    if (!filterType) {
      return numbersForSelectedUsers.sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0));
    }
    
    const lowercasedType = filterType.toLowerCase();
    
    return numbersForSelectedUsers.filter(item =>
      item.type.toLowerCase() === lowercasedType
    );
  }, [phoneNumbers, selectedUserIds, filterType]);

  const handleOpenModal = () => {
    if (selectedUserIds.length > 0) {
      setRegistrationNumber(selectedUserIds[0]);
    } else {
      setRegistrationNumber('');
    }
    setPhoneNumberValue('');
    setPhoneType('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRegistrationNumber('');
    setPhoneNumberValue('');
    setPhoneType('');
    setIsPhoneNumberValid(true);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumberValue(value);
    setIsPhoneNumberValid(validatePhoneNumber(value));
  };

  const phoneFaxColumns = useMemo<ColumnDef<PhoneNumber>[]>(
    () => [
      {
        header: 'Utilisateur',
        accessorKey: 'userId',
        cell: (info) => {
          const userId = info.getValue() as string;
          const user = allUsers.find(u => u.id === userId);
          return <span>{user?.name || 'N/A'}</span>;
        },
      },
      {
        header: 'Type',
        accessorKey: 'type',
        cell: (info) => {
          const item = info.row.original;
          return (
            <div className="flex items-center">
              <select
                value={info.getValue() as string}
                onChange={(e) => handleChange(item.id, 'type', e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="" disabled>Sélectionner un type</option>
                {allPhoneTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {item.isPrimary && <FiStar className="ml-2 text-yellow-500" title="Numéro principal" />}
            </div>
          );
        },
      },
      {
        header: 'Numéro de téléphone/Fax',
        accessorKey: 'number',
        cell: (info) => {
          const item = info.row.original;
          const isNumberValid = validatePhoneNumber(info.getValue() as string);
          const isDuplicate = filteredNumbers.some(p => p.number === info.getValue() && p.id !== item.id && p.userId === item.userId);
          const isInvalid = !isNumberValid || isDuplicate;

          return (
            <div className="relative">
              <input
                type="text"
                value={formatPhoneNumber(info.getValue() as string)}
                onChange={(e) => handleChange(item.id, 'number', e.target.value)}
                className={`w-full rounded-lg shadow-sm px-3 py-2 ${isInvalid ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'}`}
                placeholder="Saisir le numéro"
              />
              {!isNumberValid && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <FiAlertCircle className="mr-1" />
                  Format invalide.
                </p>
              )}
              {isDuplicate && isNumberValid && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <FiAlertCircle className="mr-1" />
                  Numéro déjà utilisé pour cet utilisateur.
                </p>
              )}
            </div>
          );
        },
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: (info) => {
          const item = info.row.original;
          return (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleSetPrimary(item.id)}
                disabled={item.isPrimary}
                className={`p-1 rounded-md transition-colors ${item.isPrimary ? 'text-yellow-500 cursor-not-allowed' : 'text-yellow-600 hover:text-yellow-900'}`}
                title="Définir comme principal"
              >
                <FiStar className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleRemoveNumber(item.id, item.userId)}
                className="text-red-600 hover:text-red-900 transition-colors p-1"
                title="Supprimer"
              >
                <FiTrash2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleArchiveNumber(item.id)}
                className="text-yellow-600 hover:text-yellow-900 transition-colors p-1"
                title="Archiver"
              >
                <FiArchive className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleOpenRightBar(item)}
                className="text-blue-600 hover:text-blue-900 transition-colors p-1"
                title="Détails"
              >
                <FiInfo className="h-5 w-5" />
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(item.number)}
                className="text-gray-600 hover:text-gray-900 transition-colors p-1"
                title="Copier"
              >
                <FiClipboard className="h-5 w-5" />
              </button>
            </div>
          );
        },
      },
    ],
    [filteredNumbers, allUsers]
  );

  const table = useReactTable({
    data: filteredNumbers,
    columns: phoneFaxColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const shouldShowContent = selectedUserIds.length > 0;

  return (
    <div className="flex h-screen bg-gray-100 p-6 space-x-6">
      {/* Sidebar Filter Panel */}
      <FilterSidebar
        allUsers={allUsers}
        phoneNumbers={phoneNumbers}
        filterQuery={filterQuery}
        onFilterQueryChange={setFilterQuery}
        selectedUserIds={selectedUserIds}
        onUserSelect={handleUserFilterChange}
        onSelectAll={handleSelectAllUsers}
        onDeselectAll={handleDeselectAllUsers}
        pagination={userPagination}
        onPaginationChange={handleUserPaginationChange}
        pageCount={userPageCount}
        filterType={filterType}
        onFilterTypeChange={setFilterType}
        onLoadUserPhones={handleLoadUserPhones}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 bg-white rounded-xl shadow-lg p-6 sm:p-8 flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center mb-4 md:mb-0">
            <FiPhone className="mr-3 text-orange-500 w-6 h-6" />
            Section Téléphone/Fax
            {isLoading && (
              <div className="ml-3 animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
            )}
          </h2>
          <div className="flex flex-wrap items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
              title="Vue en liste"
            >
              <FiList className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('card')}
              className={`p-2 rounded-md ${viewMode === 'card' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
              title="Vue en carte"
            >
              <FiLayout className="w-5 h-5" />
            </button>
            <button
              onClick={fetchAllPhoneNumbers}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
              disabled={isLoading}
              title="Actualiser tous les numéros"
            >
              <FiPhone className="mr-2" />
              Actualiser
            </button>
            <button
              onClick={handleOpenModal}
              type="button"
              className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition-colors"
            >
              <FiPlus className="mr-2" />
              Ajouter
            </button>
          </div>
        </div>

        {/* Modal pour ajouter un numéro */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Ajouter un numéro</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Number
                </label>
                <select
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Sélectionner un utilisateur</option>
                  {allUsers.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.id})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro de téléphone
                </label>
                <input
                  type="text"
                  value={phoneNumberValue}
                  onChange={handlePhoneNumberChange}
                  placeholder="Entrez un numéro"
                  className={`w-full border rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500 ${!isPhoneNumberValid ? 'border-red-500' : 'border-gray-300'}`}
                />
                {!isPhoneNumberValid && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <FiAlertCircle className="mr-1" />
                    Format de numéro invalide.
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type de numéro
                </label>
                <select
                  value={phoneType}
                  onChange={(e) => setPhoneType(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="" disabled>Sélectionner un type</option>
                  {allPhoneTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
               
              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={handleCloseModal}
                >
                  Annuler
                </button>
                <button
                  className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                  onClick={handleAddNumberFromModal}
                  disabled={isLoading || !isPhoneNumberValid || !registrationNumber || !phoneType}
                >
                  {isLoading ? 'Ajout...' : 'Ajouter'}
                </button>
              </div>
            </div>
          </div>
        )}

        {shouldShowContent ? (
          <div className="flex-1 mt-4">
            {viewMode === 'list' ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    {table.getHeaderGroups().map(headerGroup => (
                      <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                          <th
                            key={header.id}
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {table.getRowModel().rows.map(row => (
                      <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id} className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))}
                    {filteredNumbers.length === 0 && !isLoading && (
                      <tr>
                        <td colSpan={table.getAllColumns().length} className="text-center py-4 text-gray-500 italic">
                          Aucune entrée trouvée.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNumbers.map(item => {
                  const user = allUsers.find(u => u.id === item.userId);
                  const isNumberValid = validatePhoneNumber(item.number);
                  return (
                    <div key={item.id} className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <h4 className="text-lg font-semibold text-gray-800">{item.type}</h4>
                            {item.isPrimary && <FiStar className="ml-2 text-yellow-500" title="Numéro principal" />}
                          </div>
                          <p className={`mt-1 flex items-center ${!isNumberValid ? 'text-red-600' : 'text-gray-600'}`}>
                            {formatPhoneNumber(item.number)}
                            {!isNumberValid && <FiAlertCircle className="ml-2" title="Format invalide" />}
                          </p>
                          <p className="mt-2 text-sm text-gray-500">Pour: {user?.name || 'N/A'}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleSetPrimary(item.id)}
                            disabled={item.isPrimary}
                            className={`p-1 rounded-md transition-colors ${item.isPrimary ? 'text-yellow-500 cursor-not-allowed' : 'text-yellow-600 hover:text-yellow-900'}`}
                            title="Définir comme principal"
                          >
                            <FiStar className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleRemoveNumber(item.id, item.userId)}
                            className="text-red-600 hover:text-red-900 transition-colors p-1"
                            title="Supprimer"
                          >
                            <FiTrash2 className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleArchiveNumber(item.id)}
                            className="text-yellow-600 hover:text-yellow-900 transition-colors p-1"
                            title="Archiver"
                          >
                            <FiArchive className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleOpenRightBar(item)}
                            className="text-blue-600 hover:text-blue-900 transition-colors p-1"
                            title="Détails"
                          >
                            <FiInfo className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => navigator.clipboard.writeText(item.number)}
                            className="text-gray-600 hover:text-gray-900 transition-colors p-1"
                            title="Copier"
                          >
                            <FiClipboard className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {filteredNumbers.length === 0 && !isLoading && (
                  <div className="col-span-full text-center py-4 text-gray-500 italic">
                    Aucune entrée trouvée.
                  </div>
                )}
              </div>
            )}
            
            {/* Section des entrées archivées */}
            {archivedNumbers.length > 0 && (
              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-bold text-gray-800 flex items-center mb-4">
                  <FiArchive className="mr-2" /> Entrées archivées
                </h3>
                <ul className="space-y-2">
                  {archivedNumbers.map(item => (
                    <li key={item.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                      <span>{item.type}: {formatPhoneNumber(item.number)} (Pour: {allUsers.find(u => u.id === item.userId)?.name})</span>
                      <button
                        onClick={() => handleRestoreNumber(item.id)}
                        className="text-green-600 hover:text-green-900 transition-colors text-sm"
                      >
                        Restaurer
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center text-gray-500 mt-10">
            <p>
              Veuillez utiliser la barre de recherche dans le panneau latéral pour trouver des utilisateurs ou taper <code className="bg-gray-100 p-1 rounded-md text-sm">"%"</code> pour afficher toutes les données.
            </p>
          </div>
        )}
      </div>
      
      {/* Barre latérale droite */}
      <RightBar
        isOpen={isRightBarOpen}
        onClose={() => setIsRightBarOpen(false)}
        selectedNumber={selectedNumber}
        onUpdate={handleUpdateFromRightBar}
        onSetPrimary={handleSetPrimary}
        allUsers={allUsers}
      />

      {/* Notifications */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default PhoneFaxSection;

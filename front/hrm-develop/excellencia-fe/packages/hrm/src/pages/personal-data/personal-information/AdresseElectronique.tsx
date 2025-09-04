import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  FiMail,
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
  _id?: string; // Ajout de l'_id MongoDB si disponible
}

// Interface pour le modèle de données des adresses électroniques
interface EmailAddress {
  id: string;
  type: string;
  email: string;
  userId: string;
  isPrimary: boolean;
  personalIdentityId: string;
}

// Données de base pour le dropdown "Type"
const allEmailTypes = ['Principal', 'Professionnel', 'Personnel', 'Facturation', 'Commercial', 'Support', 'Comptabilité', 'Direction', 'Autre'];

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

// Fonction de validation d'email simple
const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// Composant pour la barre latérale droite
const RightBar: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  selectedEmail: EmailAddress | null;
  onUpdate: (id: string, updatedData: Partial<EmailAddress>) => void;
  onSetPrimary: (id: string) => void;
  allUsers: User[];
}> = ({ isOpen, onClose, selectedEmail, onSetPrimary, allUsers }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmail, setEditedEmail] = useState<Partial<EmailAddress>>({});
  const [isEmailValid, setIsEmailValid] = useState(true);

  useEffect(() => {
    if (selectedEmail) {
      setEditedEmail(selectedEmail);
      setIsEditing(false);
      setIsEmailValid(validateEmail(selectedEmail.email));
    }
  }, [selectedEmail]);

  if (!isOpen || !selectedEmail) {
    return null;
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditedEmail({ ...editedEmail, email: value });
    setIsEmailValid(validateEmail(value));
  };

  // const handleSave = () => {
  //   if (selectedEmail.id && editedEmail.email && validateEmail(editedEmail.email)) {
  //     onUpdate(selectedEmail.id, editedEmail);
  //     setIsEditing(false);
  //   }
  // };

const handleSave = async () => {
  try {
    const employeeId = selectedEmail.personalIdentityId ; // ✅ on récupère depuis ton objet
    const contactId = selectedEmail.id;

   const payload = {
      contactType: editedEmail.type,
      contactValue: editedEmail.email,
      isPrimary: selectedEmail.isPrimary,
    };

    console.log("📤 Données envoyées à l'API:", payload);

    await personalDataService.editContact(employeeId, contactId, payload);
    
    setIsEditing(false);
    onClose();
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour du contact :", error);
  }
};

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg p-6 overflow-y-auto transform transition-transform duration-300 z-50">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h3 className="text-xl font-bold">Détails de l'adresse</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FiX className="h-6 w-6" />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          {isEditing ? (
            <select
              value={editedEmail.type || ''}
              onChange={(e) => setEditedEmail({ ...editedEmail, type: e.target.value })}
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm"
            >
              <option value="" disabled>Sélectionner un type</option>
              {allEmailTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          ) : (
            <div className="flex items-center mt-1">
              <p className="text-gray-900">{selectedEmail.type}</p>
              {selectedEmail.isPrimary && <FiStar className="ml-2 text-yellow-500" title="Adresse principale" />}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Adresse</label>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={editedEmail.email || ''}
                onChange={handleEmailChange}
                className={`mt-1 w-full rounded-lg shadow-sm px-3 py-2 ${!isEmailValid ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'}`}
                placeholder="Saisir l'adresse email"
              />
              {!isEmailValid && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <FiAlertCircle className="mr-1" />
                  Format d'email invalide.
                </p>
              )}
            </div>
          ) : (
            <p className="mt-1 text-gray-900">{selectedEmail.email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Utilisateur</label>
          <p className="mt-1 text-gray-900">{allUsers.find(u => u.id === selectedEmail.userId)?.name}</p>
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            disabled={!editedEmail.email || !editedEmail.type || !isEmailValid}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiCheckCircle className="mr-2" /> Enregistrer
          </button>
        ) : (
          <>
            <button
              onClick={() => onSetPrimary(selectedEmail.id)}
              disabled={selectedEmail.isPrimary}
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
  emailAddresses: EmailAddress[];
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
  onLoadUserEmails: (userId: string) => void;
}> = ({
  allUsers,
  emailAddresses,
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
  onLoadUserEmails,
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
          {allEmailTypes.map(type => (
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
              const primaryEmailAddress = emailAddresses.find(p => p.userId === user.id && p.isPrimary);
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
                      {primaryEmailAddress && (
                        <span className="block text-xs text-gray-500 flex items-center">
                          <FiMail className="mr-1" />
                          {primaryEmailAddress.email}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onLoadUserEmails(user.id);
                      }}
                      className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                      title={`Charger les emails de ${user.name}`}
                    >
                      <FiMail />
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

const EmailAddressesSection: React.FC = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [emailAddresses, setEmailAddresses] = useState<EmailAddress[]>([]);
  const [archivedEmails, setArchivedEmails] = useState<EmailAddress[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [filterQuery, setFilterQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [isRightBarOpen, setIsRightBarOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<EmailAddress | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [emailType, setEmailType] = useState('');
  
  const [userPagination, setUserPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Fonction pour charger tous les emails depuis l'API
  const fetchAllEmailAddresses = async () => {
    try {
      setIsLoading(true);
      console.log('Chargement de tous les contacts électroniques...');
      
      const response = await personalDataService.getAllContacts();
      console.log('Réponse API getAllContacts:', response);
      
      // Adaptez selon la structure de votre réponse API
      let allContacts = [];
      if (Array.isArray(response)) {
        allContacts = response;
      } else if (response?.data && Array.isArray(response.data)) {
        allContacts = response.data;
      } else if (response?.contacts && Array.isArray(response.contacts)) {
        allContacts = response.contacts;
      } else if (response?.electronicContacts && Array.isArray(response.electronicContacts)) {
        allContacts = response.electronicContacts;
      } else {
        console.error('Structure de réponse inattendue pour getAllContacts:', response);
        showNotification('Structure de données inattendue', 'error');
        return;
      }

      console.log('Contacts extraits:', allContacts);

      // Filtrer uniquement les emails et les convertir au format de votre interface
      const emailAddresses: EmailAddress[] = allContacts
        .filter(contact => {
          const isEmail = contact.contactType?.toLowerCase().includes('mail') || 
                         contact.type?.toLowerCase().includes('mail') ||
                         contact.contactValue?.includes('@') ||
                         contact.email?.includes('@');
          return isEmail;
        })
        .map((contact: any, index: number) => {
          // Trouvez l'utilisateur correspondant
          const matchingUser = allUsers.find(user => 
            user._id === contact.employeeId || 
            user.id === contact.employeeId ||
            user._id === contact.userId ||
            user.id === contact.userId
          );

          return {
            id: contact._id || contact.id || `email_${index}`,
            type: contact.contactType || contact.type || 'Autre',
            email: contact.contactValue || contact.email || contact.value || '',
            userId: matchingUser?.id || contact.employeeId || contact.userId || `unknown_${index}`,
            isPrimary: contact.isPrimary || contact.primary || false
          };
        })
        .filter(email => email.email && email.email.includes('@')); // S'assurer que c'est bien un email

      console.log('Emails formatés:', emailAddresses);
      setEmailAddresses(emailAddresses);

    } catch (error) {
      console.error('Erreur lors du chargement des adresses email:', error);
      showNotification('Erreur lors du chargement des emails', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour charger les emails d'un utilisateur spécifique
  const fetchUserEmailAddresses = async (userId: string) => {
    try {
      setIsLoading(true);
      console.log(`Chargement des contacts électroniques pour l'utilisateur ${userId}...`);
      
      // Trouvez l'utilisateur pour obtenir son _id
      const user = allUsers.find(u => u.id === userId);
      const employeeId = user?._id || userId;
      
      const response = await personalDataService.getEmployeeContacts(employeeId);
      console.log(`Réponse API pour l'utilisateur ${userId}:`, response);

      // Adaptez selon la structure de votre réponse API
      let userContacts = [];
      if (Array.isArray(response)) {
        userContacts = response;
      } else if (response?.data && Array.isArray(response.data)) {
        userContacts = response.data;
      } else if (response?.contacts && Array.isArray(response.contacts)) {
        userContacts = response.contacts;
      } else if (response?.electronicContacts && Array.isArray(response.electronicContacts)) {
        userContacts = response.electronicContacts;
      } else {
        console.error('Structure de réponse inattendue pour getEmployeeContacts:', response);
        showNotification('Structure de données inattendue', 'error');
        return [];
      }

      // Filtrer uniquement les emails et les convertir au format de votre interface
      const userEmails: EmailAddress[] = userContacts
  .filter(contact => {
    const isEmail = contact.contactType?.toLowerCase().includes('mail') || 
                   contact.type?.toLowerCase().includes('mail') ||
                   contact.contactValue?.includes('@') ||
                   contact.email?.includes('@');
    return isEmail;
  })
  .map((contact: any, index: number) => ({
    id: contact._id || contact.id || `${userId}_email_${index}`,
    type: contact.contactType || contact.type || 'Autre',
    email: contact.contactValue || contact.email || contact.value || '',
    userId: userId,
    isPrimary: contact.isPrimary || contact.primary || false,
    personalIdentityId: contact.personalIdentityId || null, // ✅ récupéré ici
  }))
  .filter(email => email.email && email.email.includes('@'));

      console.log(`Emails pour ${user?.name}:`, userEmails);

      // Mettre à jour uniquement les emails de cet utilisateur
      setEmailAddresses(prevEmails => {
        // Supprimer les anciens emails de cet utilisateur et ajouter les nouveaux
        const otherUsersEmails = prevEmails.filter(email => email.userId !== userId);
        return [...otherUsersEmails, ...userEmails];
      });

      showNotification(`Emails chargés pour ${user?.name}`, 'success');
      return userEmails;

    } catch (error) {
      console.error(`Erreur lors du chargement des emails pour l'utilisateur ${userId}:`, error);
      showNotification(`Erreur lors du chargement des emails`, 'error');
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
        console.log('Response complète:', response);

        // Essayer différentes structures de réponse
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
          console.error('Structure de réponse inattendue:', response);
          return;
        }

        console.log('Employees extraits:', employees);

        if (!Array.isArray(employees) || employees.length === 0) {
          console.error('Aucun employé trouvé ou format invalide');
          return;
        }

        const users: User[] = employees.map((emp: any, index: number) => ({
          id: emp.registrationNumber ?? emp._id ?? emp.id ?? `emp_${index}`,
          name: `${emp.firstName ?? emp.first_name ?? ''} ${emp.lastName ?? emp.last_name ?? ''}`.trim() || emp.name || `Employé ${index + 1}`,
          _id: emp._id, // Conserve l'_id original pour les appels API
        }));

        console.log('Users finaux:', users);
        setAllUsers(users);

      } catch (error) {
        console.error('Erreur lors du chargement des employés :', error);
      }
    };

    fetchEmployees();
  }, []);

  // Charger tous les emails une fois les utilisateurs chargés
  useEffect(() => {
    if (allUsers.length > 0) {
      fetchAllEmailAddresses();
    }
  }, [allUsers]);

  // Appel à fetchAllEmailAddresses lorsque filterQuery === '%'
  useEffect(() => {
    if (filterQuery === '%') {
      fetchAllEmailAddresses();
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
  
  
  const handleRemoveEmail = (id: string, userId: string) => {
    const userEmails = emailAddresses.filter(e => e.userId === userId);
    const emailToDelete = emailAddresses.find(e => e.id === id);

    if (userEmails.length === 1) {
      showNotification('Une entité doit avoir au minimum une adresse email.', 'error');
      return;
    }
    
    setEmailAddresses(prev => {
      const newEmails = prev.filter(item => item.id !== id);
      if (emailToDelete?.isPrimary) {
        const remainingEmailsForUser = newEmails.filter(e => e.userId === userId);
        if (remainingEmailsForUser.length > 0) {
          const firstEmail = remainingEmailsForUser[0];
          firstEmail.isPrimary = true;
          firstEmail.type = 'Principal';
        }
      }
      return newEmails;
    });
    showNotification('Adresse supprimée', 'info');
  };
  
  const handleArchiveEmail = (id: string) => {
    const emailToArchive = emailAddresses.find(item => item.id === id);
    if (emailToArchive) {
      const userEmails = emailAddresses.filter(e => e.userId === emailToArchive.userId);
      if (userEmails.length === 1) {
        showNotification('Une entité doit avoir au minimum une adresse email.', 'error');
        return;
      }
      setEmailAddresses(prev => {
        const newEmails = prev.filter(item => item.id !== id);
        if (emailToArchive.isPrimary) {
          const remainingEmailsForUser = newEmails.filter(e => e.userId === emailToArchive.userId);
          if (remainingEmailsForUser.length > 0) {
            const firstEmail = remainingEmailsForUser[0];
            firstEmail.isPrimary = true;
            firstEmail.type = 'Principal';
          }
        }
        return newEmails;
      });
      setArchivedEmails(prev => [...prev, { ...emailToArchive, isPrimary: false, type: 'Archivé' }]);
      showNotification('Adresse archivée', 'info');
    }
  };
  
  const handleRestoreEmail = (id: string) => {
    const emailToRestore = archivedEmails.find(item => item.id === id);
    if (emailToRestore) {
      setArchivedEmails(prev => prev.filter(item => item.id !== id));
      setEmailAddresses(prev => [...prev, { ...emailToRestore, type: 'Autre' }]);
      showNotification('Adresse restaurée', 'success');
    }
  };
  
  const handleSetPrimary = (id: string) => {
    setEmailAddresses(prev => prev.map(item => ({
      ...item,
      isPrimary: item.id === id,
      type: item.id === id ? 'Principal' : (item.isPrimary ? 'Autre' : item.type)
    })));
    showNotification('Adresse principale mise à jour', 'success');
  };

  const handleChange = (id: string, name: keyof EmailAddress, value: string) => {
    setEmailAddresses(prev => prev.map(item =>
      item.id === id ? { ...item, [name]: value } : item
    ));
  };

  const handleUpdateFromRightBar = (id: string, updatedData: Partial<EmailAddress>) => {
    setEmailAddresses(prev => prev.map(item =>
      item.id === id ? { ...item, ...updatedData } : item
    ));
    showNotification('Détails mis à jour', 'success');
  };
  
  const handleOpenRightBar = (email: EmailAddress) => {
    setSelectedEmail(email);
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

  const handleLoadUserEmails = async (userId: string) => {
    await fetchUserEmailAddresses(userId);
  };

  const filteredEmails = useMemo(() => {
    const numbersForSelectedUsers = emailAddresses.filter(item =>
      selectedUserIds.includes(item.userId)
    );
    
    if (!filterType) {
      return numbersForSelectedUsers.sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0));
    }
    
    const lowercasedType = filterType.toLowerCase();
    
    return numbersForSelectedUsers.filter(item =>
      item.type.toLowerCase() === lowercasedType
    );
  }, [emailAddresses, selectedUserIds, filterType]);

  // Handlers for modal
  const handleOpenModal = () => {
    // Pre-fill with first selected user if any
    if (selectedUserIds.length > 0) {
      setRegistrationNumber(selectedUserIds[0]);
    } else {
      setRegistrationNumber('');
    }
    setEmailValue('');
    setEmailType('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRegistrationNumber('');
    setEmailValue('');
    setEmailType('');
  };

  const handleAddEmailFromModal = async () => {
    if (!registrationNumber || !emailValue || !emailType) {
      showNotification('Veuillez remplir tous les champs', 'error');
      return;
    }

    if (!validateEmail(emailValue)) {
      showNotification('Format d\'email invalide', 'error');
      return;
    }

    try {
      const contactData = {
        contactType: emailType,
        contactValue: emailValue,
        isPrimary: emailType === 'Principal'
      };

      // Trouve l'utilisateur sélectionné pour récupérer son _id
      const selectedUser = allUsers.find(user => user.id === registrationNumber);
      const userId = selectedUser?._id || registrationNumber; // Utilise _id si disponible, sinon registrationNumber

      const response = await personalDataService.addEmailContact(userId, contactData);
      console.log('Email ajouté avec succès :', response);

      handleCloseModal();
      showNotification('Email ajouté avec succès', 'success');
      
      // Recharger les emails de cet utilisateur spécifique
      await fetchUserEmailAddresses(registrationNumber);
      
    } catch (error) {
      console.error('Erreur lors de l\'ajout du contact :', error);
      showNotification('Erreur lors de l\'ajout de l\'email', 'error');
    }
  };

  const emailColumns = useMemo<ColumnDef<EmailAddress>[]>(
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
                {allEmailTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {item.isPrimary && <FiStar className="ml-2 text-yellow-500" title="Adresse principale" />}
            </div>
          );
        },
      },
      {
        header: 'Adresse email',
        accessorKey: 'email',
        cell: (info) => {
          const item = info.row.original;
          const isEmailValid = validateEmail(info.getValue() as string);
          const isDuplicate = filteredEmails.some(e => e.email === info.getValue() && e.id !== item.id && e.userId === item.userId);
          const isInvalid = !isEmailValid || isDuplicate;

          return (
            <div className="relative">
              <input
                type="text"
                value={info.getValue() as string}
                onChange={(e) => handleChange(item.id, 'email', e.target.value)}
                className={`w-full rounded-lg shadow-sm px-3 py-2 ${isInvalid ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'}`}
                placeholder="Saisir l'adresse email"
              />
              {!isEmailValid && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <FiAlertCircle className="mr-1" />
                  Format invalide.
                </p>
              )}
              {isDuplicate && isEmailValid && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <FiAlertCircle className="mr-1" />
                  Adresse déjà utilisée pour cet utilisateur.
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
                onClick={() => handleRemoveEmail(item.id, item.userId)}
                className="text-red-600 hover:text-red-900 transition-colors p-1"
                title="Supprimer"
              >
                <FiTrash2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleArchiveEmail(item.id)}
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
                onClick={() => navigator.clipboard.writeText(item.email)}
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
    [filteredEmails, allUsers]
  );

  const table = useReactTable({
    data: filteredEmails,
    columns: emailColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const shouldShowContent = selectedUserIds.length > 0;

  return (
    <div className="flex h-screen bg-gray-100 p-6 space-x-6">
      {/* Sidebar Filter Panel */}
      <FilterSidebar
        allUsers={allUsers}
        emailAddresses={emailAddresses}
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
        onLoadUserEmails={handleLoadUserEmails}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 bg-white rounded-xl shadow-lg p-6 sm:p-8 flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center mb-4 md:mb-0">
            <FiMail className="mr-3 text-orange-500 w-6 h-6" />
            Adresses électroniques
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
              onClick={fetchAllEmailAddresses}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
              disabled={isLoading}
              title="Actualiser tous les emails"
            >
              <FiMail className="mr-2" />
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

        {/* Modal pour ajouter un email */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Ajouter un email</h2>
              
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
                  Adresse email
                </label>
                <input
                  type="email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  placeholder="Entrez un email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type d'email
                </label>
                <select
                  value={emailType}
                  onChange={(e) => setEmailType(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="" disabled>Sélectionner un type</option>
                  {allEmailTypes.map(type => (
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
                  onClick={handleAddEmailFromModal}
                  disabled={isLoading}
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
                    {filteredEmails.length === 0 && !isLoading && (
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
                {filteredEmails.map(item => {
                  const user = allUsers.find(u => u.id === item.userId);
                  const isEmailValid = validateEmail(item.email);
                  return (
                    <div key={item.id} className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <h4 className="text-lg font-semibold text-gray-800">{item.type}</h4>
                            {item.isPrimary && <FiStar className="ml-2 text-yellow-500" title="Adresse principale" />}
                          </div>
                          <p className={`mt-1 flex items-center ${!isEmailValid ? 'text-red-600' : 'text-gray-600'}`}>
                            {item.email}
                            {!isEmailValid && <FiAlertCircle className="ml-2" title="Format invalide" />}
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
                            onClick={() => handleArchiveEmail(item.id)}
                            className="text-yellow-600 hover:text-yellow-900 transition-colors"
                            title="Archiver"
                          >
                            <FiArchive className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleOpenRightBar(item)}
                            className="text-blue-600 hover:text-blue-900 transition-colors"
                            title="Détails"
                          >
                            <FiInfo className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {filteredEmails.length === 0 && !isLoading && (
                  <div className="col-span-full text-center py-4 text-gray-500 italic">
                    Aucune entrée trouvée.
                  </div>
                )}
              </div>
            )}
            
            {/* Section des entrées archivées */}
            {archivedEmails.length > 0 && (
              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-bold text-gray-800 flex items-center mb-4">
                  <FiArchive className="mr-2" /> Entrées archivées
                </h3>
                <ul className="space-y-2">
                  {archivedEmails.map(item => (
                    <li key={item.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                      <span>{item.type}: {item.email} (Pour: {allUsers.find(u => u.id === item.userId)?.name})</span>
                      <button
                        onClick={() => handleRestoreEmail(item.id)}
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
        selectedEmail={selectedEmail}
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

export default EmailAddressesSection;
import React, { useState, useEffect, useMemo } from 'react';
import {
  FiUser,
  FiCalendar,
  FiFileText,
  FiUsers,
  FiCamera,
  FiCheckCircle,
  FiXCircle,
  FiChevronLeft,
  FiChevronRight,
  FiAlertCircle,
  FiPlus,
  FiTrash2,
  FiInfo,
  FiPhone,
  FiHome,
  FiBriefcase,
  FiCreditCard,
  FiMail,
} from 'react-icons/fi';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import Dropdown from './Dropdown';
import { useEmployeePersonalData, useEmployeePersonalIdentity, useEmployeeAddresses, useEmployeePhoneContacts, useEmployeeEmergencyContacts, useEmployeeFamilySituation, useEmployeeBankAccounts } from '../../../hooks/usePersonalData';
import { PersonalIdentity, BirthInformation, Nationality, PostalAddress, PhoneContact, EmergencyContact, MaritalStatus, Dependant, BankAccount } from '../../../services/personalData.service';

// Types adaptés pour la compatibilité avec le composant existant
interface EmployeeInformation {
  title: string;
  firstName: string;
  middleName: string;
  knownAs: string;
  lastName: string;
  suffix: string;
  preferredName: string;
  maidenName: string;
  priorLastName1: string;
  priorLastName2: string;
  profilePhoto: string | null;
  gender: 'Female' | 'Male' | 'Other' | 'Prefer not to say' | '';
  birthDate: string;
  age: { years: number; months: number };
  dateOfDeath: string;
  cityOfBirth: string;
  county: string;
  countryOfBirth: string;
  nationalIdCountryCode: string;
  nationalNumber: string;
  deliveryDate: string;
  corporateId: string;
  spouseName: string;
  spouseFirstName: string;
  spouseGender: 'Female' | 'Male' | 'Other' | '';
  spouseEmployeeId: string;
  citizenships: Array<{ countryCode: string; primaryNationality: boolean }>;
  maritalStatusHistory: Array<{ status: string; effectiveDate: string }>;
  familyMembers: Array<{
    relationship: string;
    lastName: string;
    firstName: string;
    gender: 'Male' | 'Female' | 'Other' | '';
    birthDate: string;
  }>;
  dependent1Count: number;
  dependent2Count: number;
  emergencyContacts: Array<{
    priority: number;
    title: string;
    lastName: string;
    firstName: string;
    phone: string;
  }>;
  homeAddress: {
    street1: string;
    street2: string;
    city: string;
    stateProvince: string;
    postalCode: string;
    country: string;
  };
  workAddress: {
    street1: string;
    street2: string;
    city: string;
    stateProvince: string;
    postalCode: string;
    country: string;
  };
  personalEmail: string;
  workEmail: string;
  mobilePhone: string;
  workPhone: string;
  hireDate: string;
  jobTitle: string;
  department: string;
  managerId: string;
  bankAccount: {
    bankName: string;
    accountHolderName: string;
    accountNumber: string;
    routingNumber: string;
    accountType: 'Checking' | 'Savings' | '';
  };
}

const allTitles = ['Mrs.', 'Mr.', 'Dr.', 'Ms.', 'Mx.'];
const allMaritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];
const allGenders = ['Female', 'Male', 'Other', 'Prefer not to say'];
const allRelationships = ['Spouse', 'Child', 'Parent', 'Sibling', 'Other'];
const allAccountTypes = ['Checking', 'Savings'];
const allCountries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
  'France', 'Japan', 'China', 'India', 'Brazil',
  'Mexico', 'South Africa', 'Nigeria', 'Egypt', 'Spain',
  'Italy', 'Russia', 'Argentina', 'South Korea', 'Saudi Arabia'
];
const allCountryCodes = [
  'USA', 'UK', 'CAN', 'AUS', 'DEU', 'FRA', 'JPN', 'CHN', 'IND', 'BRA', 'MEX', 'ZAF', 'NGA', 'EGY', 'ESP', 'ITA', 'RUS', 'ARG', 'KOR', 'SAU'
];
const allCities = [
  'New York', 'London', 'Toronto', 'Sydney', 'Berlin',
  'Paris', 'Tokyo', 'Shanghai', 'Mumbai', 'Sao Paulo',
  'Mexico City', 'Cape Town', 'Lagos', 'Cairo', 'Madrid',
  'Rome', 'Moscow', 'Buenos Aires', 'Seoul', 'Riyadh'
];
const allStates = [
  'California', 'Texas', 'Florida', 'New York', 'Pennsylvania',
  'Illinois', 'Ohio', 'Georgia', 'North Carolina', 'Michigan',
  'New Jersey', 'Virginia', 'Washington', 'Arizona', 'Massachusetts'
];
const allCounties = [
  'Los Angeles County', 'Cook County', 'King County', 'Harris County', 'Maricopa County',
  'Miami-Dade County', 'Orange County', 'San Diego County', 'Dallas County', 'Tarrant County',
  'Hennepin County', 'Fairfax County', 'Fulton County', 'Wayne County', 'Nassau County',
  'Westchester County', 'Suffolk County', 'Essex County', 'Bergen County', 'Middlesex County'
];

// Fonction utilitaire pour convertir les données du backend vers le format du frontend
const convertBackendToFrontend = (
  personalIdentity: PersonalIdentity | null,
  birthInformation: BirthInformation | null,
  nationalities: Nationality[],
  addresses: PostalAddress[],
  phoneContacts: PhoneContact[],
  emergencyContacts: EmergencyContact[],
  maritalStatuses: MaritalStatus[],
  dependants: Dependant[],
  bankAccounts: BankAccount[]
): EmployeeInformation => {
  const homeAddress = addresses.find(addr => addr.addressType === 'home') || {
    street1: '', street2: '', city: '', stateProvince: '', postalCode: '', country: ''
  };
  
  const workAddress = addresses.find(addr => addr.addressType === 'work') || {
    street1: '', street2: '', city: '', stateProvince: '', postalCode: '', country: ''
  };

  const mobilePhone = phoneContacts.find(phone => phone.phoneType === 'mobile')?.phoneNumber || '';
  const workPhone = phoneContacts.find(phone => phone.phoneType === 'work')?.phoneNumber || '';

  const primaryBankAccount = bankAccounts.find(account => account.isActive) || {
    bankName: '', accountHolderName: '', accountNumber: '', routingNumber: '', accountType: 'Checking'
  };

  return {
    title: personalIdentity?.title || '',
    firstName: personalIdentity?.firstName || '',
    middleName: personalIdentity?.middleName || '',
    knownAs: personalIdentity?.preferredName || '',
    lastName: personalIdentity?.lastName || '',
    suffix: personalIdentity?.suffix || '',
    preferredName: personalIdentity?.preferredName || '',
    maidenName: personalIdentity?.maidenName || '',
    priorLastName1: personalIdentity?.priorLastName1 || '',
    priorLastName2: personalIdentity?.priorLastName2 || '',
    profilePhoto: null,
    gender: personalIdentity?.gender || '',
    birthDate: personalIdentity?.birthDate || '',
    age: { years: 0, months: 0 }, // À calculer
    dateOfDeath: personalIdentity?.dateOfDeath || '',
    cityOfBirth: birthInformation?.placeOfBirth || '',
    county: birthInformation?.county || '',
    countryOfBirth: birthInformation?.countryOfBirthCode || '',
    nationalIdCountryCode: personalIdentity?.nationalIdCountryCode || '',
    nationalNumber: personalIdentity?.nationalNumber || '',
    deliveryDate: personalIdentity?.deliveryDate || '',
    corporateId: personalIdentity?.corporateId || '',
    spouseName: maritalStatuses.find(ms => ms.status === 'Married')?.spouseName || '',
    spouseFirstName: maritalStatuses.find(ms => ms.status === 'Married')?.spouseFirstName || '',
    spouseGender: maritalStatuses.find(ms => ms.status === 'Married')?.spouseGender || '',
    spouseEmployeeId: maritalStatuses.find(ms => ms.status === 'Married')?.spouseEmployeeId || '',
    citizenships: nationalities.map(nat => ({
      countryCode: nat.nationalityCountryCode,
      primaryNationality: nat.isPrimary
    })),
    maritalStatusHistory: maritalStatuses.map(ms => ({
      status: ms.status,
      effectiveDate: ms.effectiveDate
    })),
    familyMembers: dependants.map(dep => ({
      relationship: dep.relationship,
      lastName: dep.lastName,
      firstName: dep.firstName,
      gender: dep.gender,
      birthDate: dep.birthDate
    })),
    dependent1Count: dependants.filter(dep => dep.relationship === 'Child').length,
    dependent2Count: dependants.filter(dep => dep.relationship === 'Spouse').length,
    emergencyContacts: emergencyContacts.map(ec => ({
      priority: ec.priority,
      title: ec.title,
      lastName: ec.lastName,
      firstName: ec.firstName,
      phone: ec.phone
    })),
    homeAddress: {
      street1: homeAddress.street1,
      street2: homeAddress.street2 || '',
      city: homeAddress.city,
      stateProvince: homeAddress.stateProvince,
      postalCode: homeAddress.postalCode,
      country: homeAddress.country
    },
    workAddress: {
      street1: workAddress.street1,
      street2: workAddress.street2 || '',
      city: workAddress.city,
      stateProvince: workAddress.stateProvince,
      postalCode: workAddress.postalCode,
      country: workAddress.country
    },
    personalEmail: '', // À récupérer depuis electronic contacts
    workEmail: '', // À récupérer depuis electronic contacts
    mobilePhone,
    workPhone,
    hireDate: '', // À récupérer depuis le service hiring
    jobTitle: '', // À récupérer depuis le service hiring
    department: '', // À récupérer depuis le service hiring
    managerId: '', // À récupérer depuis le service hiring
    bankAccount: {
      bankName: primaryBankAccount.bankName,
      accountHolderName: primaryBankAccount.accountHolderName,
      accountNumber: primaryBankAccount.accountNumber,
      routingNumber: primaryBankAccount.routingNumber,
      accountType: primaryBankAccount.accountType
    }
  };
};

// Fonction utilitaire pour convertir les données du frontend vers le format du backend
const convertFrontendToBackend = (employeeData: EmployeeInformation) => {
  return {
    personalIdentity: {
      title: employeeData.title,
      firstName: employeeData.firstName,
      middleName: employeeData.middleName,
      lastName: employeeData.lastName,
      suffix: employeeData.suffix,
      preferredName: employeeData.preferredName,
      maidenName: employeeData.maidenName,
      priorLastName1: employeeData.priorLastName1,
      priorLastName2: employeeData.priorLastName2,
      gender: employeeData.gender,
      birthDate: employeeData.birthDate,
      dateOfDeath: employeeData.dateOfDeath,
      cityOfBirth: employeeData.cityOfBirth,
      countryOfBirth: employeeData.countryOfBirth,
      nationalIdCountryCode: employeeData.nationalIdCountryCode,
      nationalNumber: employeeData.nationalNumber,
      deliveryDate: employeeData.deliveryDate,
      corporateId: employeeData.corporateId
    },
    birthInformation: {
      placeOfBirth: employeeData.cityOfBirth,
      countryOfBirthCode: employeeData.countryOfBirth,
      county: employeeData.county
    },
    nationalities: employeeData.citizenships.map(cit => ({
      nationalityCountryCode: cit.countryCode,
      isPrimary: cit.primaryNationality,
      isResident: false
    }))
  };
};

const PersonalInformationAdapted: React.FC<{ employeeId?: string }> = ({ employeeId }) => {
  // Hooks pour récupérer les données depuis le backend
  const { employee, loading: employeeLoading, error: employeeError, updateEmployee } = useEmployeePersonalData(employeeId);
  const { personalIdentity, birthInformation, nationalities, loading: identityLoading, error: identityError, updatePersonalIdentity, updateBirthInformation } = useEmployeePersonalIdentity(employeeId);
  const { addresses, loading: addressesLoading, error: addressesError, createAddress, updateAddress } = useEmployeeAddresses(employeeId);
  const { phoneContacts, loading: phonesLoading, error: phonesError, createPhoneContact, updatePhoneContact } = useEmployeePhoneContacts(employeeId);
  const { emergencyContacts, loading: emergencyLoading, error: emergencyError, createEmergencyContact, updateEmergencyContact } = useEmployeeEmergencyContacts(employeeId);
  const { maritalStatuses, dependants, loading: familyLoading, error: familyError, createMaritalStatus, createDependant } = useEmployeeFamilySituation(employeeId);
  const { bankAccounts, loading: bankLoading, error: bankError, createBankAccount, updateBankAccount } = useEmployeeBankAccounts(employeeId);

  // État local pour les données du frontend
  const [employeeData, setEmployeeData] = useState<EmployeeInformation>({
    title: '',
    firstName: '',
    middleName: '',
    knownAs: '',
    lastName: '',
    suffix: '',
    preferredName: '',
    maidenName: '',
    priorLastName1: '',
    priorLastName2: '',
    profilePhoto: null,
    gender: '',
    birthDate: '',
    age: { years: 0, months: 0 },
    dateOfDeath: '',
    cityOfBirth: '',
    county: '',
    countryOfBirth: '',
    nationalIdCountryCode: '',
    nationalNumber: '',
    deliveryDate: '',
    corporateId: '',
    spouseName: '',
    spouseFirstName: '',
    spouseGender: '',
    spouseEmployeeId: '',
    citizenships: [{ countryCode: '', primaryNationality: true }],
    maritalStatusHistory: [],
    familyMembers: [],
    dependent1Count: 0,
    dependent2Count: 0,
    emergencyContacts: [],
    homeAddress: {
      street1: '',
      street2: '',
      city: '',
      stateProvince: '',
      postalCode: '',
      country: '',
    },
    workAddress: {
      street1: '',
      street2: '',
      city: '',
      stateProvince: '',
      postalCode: '',
      country: '',
    },
    personalEmail: '',
    workEmail: '',
    mobilePhone: '',
    workPhone: '',
    hireDate: '',
    jobTitle: '',
    department: '',
    managerId: '',
    bankAccount: {
      bankName: '',
      accountHolderName: '',
      accountNumber: '',
      routingNumber: '',
      accountType: '',
    },
  });

  const [activeSection, setActiveSection] = useState(0);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Convertir les données du backend vers le format du frontend
  useEffect(() => {
    if (personalIdentity && birthInformation) {
      const convertedData = convertBackendToFrontend(
        personalIdentity,
        birthInformation,
        nationalities,
        addresses || [],
        phoneContacts || [],
        emergencyContacts || [],
        maritalStatuses || [],
        dependants || [],
        bankAccounts || []
      );
      setEmployeeData(convertedData);
    }
  }, [personalIdentity, birthInformation, nationalities, addresses, phoneContacts, emergencyContacts, maritalStatuses, dependants, bankAccounts]);

  const sections = [
    { title: 'Employee Name', icon: <FiUser /> },
    { title: 'Personal Information', icon: <FiFileText /> },
    { title: 'Family Composition', icon: <FiUsers /> },
    { title: 'Contact Information', icon: <FiPhone /> },
    { title: 'Work Information', icon: <FiBriefcase /> },
    { title: 'Banking Information', icon: <FiCreditCard /> },
  ];

  // Gestion des erreurs de chargement
  const loading = employeeLoading || identityLoading || addressesLoading || phonesLoading || emergencyLoading || familyLoading || bankLoading;
  const error = employeeError || identityError || addressesError || phonesError || emergencyError || familyError || bankError;

  // Fonction pour sauvegarder les données
  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Convertir les données du frontend vers le format du backend
      const backendData = convertFrontendToBackend(employeeData);
      
      // Mettre à jour l'identité personnelle
      if (personalIdentity?.id) {
        await updatePersonalIdentity(backendData.personalIdentity);
        await updateBirthInformation(backendData.birthInformation);
      }

      // Mettre à jour les adresses
      if (employeeData.homeAddress.street1) {
        const homeAddressData = {
          employeeId: employeeId!,
          addressType: 'home' as const,
          ...employeeData.homeAddress,
          isPrimary: true
        };
        await createAddress(homeAddressData);
      }

      if (employeeData.workAddress.street1) {
        const workAddressData = {
          employeeId: employeeId!,
          addressType: 'work' as const,
          ...employeeData.workAddress,
          isPrimary: false
        };
        await createAddress(workAddressData);
      }

      // Mettre à jour les contacts téléphoniques
      if (employeeData.mobilePhone) {
        const mobilePhoneData = {
          employeeId: employeeId!,
          phoneType: 'mobile' as const,
          phoneNumber: employeeData.mobilePhone,
          isPrimary: true,
          isActive: true
        };
        await createPhoneContact(mobilePhoneData);
      }

      if (employeeData.workPhone) {
        const workPhoneData = {
          employeeId: employeeId!,
          phoneType: 'work' as const,
          phoneNumber: employeeData.workPhone,
          isPrimary: false,
          isActive: true
        };
        await createPhoneContact(workPhoneData);
      }

      // Mettre à jour le compte bancaire
      if (employeeData.bankAccount.bankName) {
        const bankAccountData = {
          employeeId: employeeId!,
          ...employeeData.bankAccount,
          isActive: true
        };
        await createBankAccount(bankAccountData);
      }

      setModalMessage('Données sauvegardées avec succès !');
      setShowModal(true);
    } catch (err: any) {
      setModalMessage(`Erreur lors de la sauvegarde: ${err.message}`);
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Gestion des changements de données
  const handleInputChange = (field: keyof EmployeeInformation, value: any) => {
    setEmployeeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (parentField: keyof EmployeeInformation, childField: string, value: any) => {
    setEmployeeData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: value
      }
    }));
  };

  // Affichage des erreurs
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>Erreur :</strong> {error}
          </div>
        </div>
      </div>
    );
  }

  // Affichage du chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Informations Personnelles</h1>
            <div className="flex space-x-3">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation des sections */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex space-x-4 overflow-x-auto">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(index)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap ${
                  activeSection === index
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {section.icon}
                <span>{section.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Contenu des sections */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {activeSection === 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Nom de l'Employé</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre
                  </label>
                  <select
                    value={employeeData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionner un titre</option>
                    {allTitles.map(title => (
                      <option key={title} value={title}>{title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={employeeData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Prénom"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de famille
                  </label>
                  <input
                    type="text"
                    value={employeeData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nom de famille"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom préféré
                  </label>
                  <input
                    type="text"
                    value={employeeData.preferredName}
                    onChange={(e) => handleInputChange('preferredName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nom préféré"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Informations Personnelles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Genre
                  </label>
                  <select
                    value={employeeData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionner un genre</option>
                    {allGenders.map(gender => (
                      <option key={gender} value={gender}>{gender}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date de naissance
                  </label>
                  <input
                    type="date"
                    value={employeeData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ville de naissance
                  </label>
                  <input
                    type="text"
                    value={employeeData.cityOfBirth}
                    onChange={(e) => handleInputChange('cityOfBirth', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ville de naissance"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pays de naissance
                  </label>
                  <select
                    value={employeeData.countryOfBirth}
                    onChange={(e) => handleInputChange('countryOfBirth', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionner un pays</option>
                    {allCountries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Autres sections à implémenter de manière similaire */}
          {activeSection === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Composition Familiale</h2>
              <p className="text-gray-600">Section en cours de développement...</p>
            </div>
          )}

          {activeSection === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Informations de Contact</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone mobile
                  </label>
                  <input
                    type="tel"
                    value={employeeData.mobilePhone}
                    onChange={(e) => handleInputChange('mobilePhone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Téléphone mobile"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone professionnel
                  </label>
                  <input
                    type="tel"
                    value={employeeData.workPhone}
                    onChange={(e) => handleInputChange('workPhone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Téléphone professionnel"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">Adresse personnelle</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={employeeData.homeAddress.street1}
                    onChange={(e) => handleNestedInputChange('homeAddress', 'street1', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Rue"
                  />
                  <input
                    type="text"
                    value={employeeData.homeAddress.city}
                    onChange={(e) => handleNestedInputChange('homeAddress', 'city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ville"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Informations Professionnelles</h2>
              <p className="text-gray-600">Section en cours de développement...</p>
            </div>
          )}

          {activeSection === 5 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Informations Bancaires</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de la banque
                  </label>
                  <input
                    type="text"
                    value={employeeData.bankAccount.bankName}
                    onChange={(e) => handleNestedInputChange('bankAccount', 'bankName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nom de la banque"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titulaire du compte
                  </label>
                  <input
                    type="text"
                    value={employeeData.bankAccount.accountHolderName}
                    onChange={(e) => handleNestedInputChange('bankAccount', 'accountHolderName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Titulaire du compte"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Numéro de compte
                  </label>
                  <input
                    type="text"
                    value={employeeData.bankAccount.accountNumber}
                    onChange={(e) => handleNestedInputChange('bankAccount', 'accountNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Numéro de compte"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de compte
                  </label>
                  <select
                    value={employeeData.bankAccount.accountType}
                    onChange={(e) => handleNestedInputChange('bankAccount', 'accountType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionner un type</option>
                    {allAccountTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal de confirmation */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirmation</h3>
              <p className="text-gray-600 mb-6">{modalMessage}</p>
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInformationAdapted;



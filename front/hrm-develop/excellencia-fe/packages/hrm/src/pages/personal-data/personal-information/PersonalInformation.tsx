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
import { personalDataService } from '../../../services/personalData.service';

// --- Interfaces ---
interface Citizenship {
  countryCode: string;
  primaryNationality: boolean;
}

interface MaritalStatusEntry {
  status: string;
  effectiveDate: string;
}

interface FamilyMember {
  relationship: string;
  lastName: string;
  firstName: string;
  gender: 'Male' | 'Female' | 'Other' | '';
  birthDate: string;
}

interface EmergencyContact {
  priority: number;
  title: string;
  lastName: string;
  firstName: string;
  phone: string;
}

interface Address {
  street1: string;
  street2: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
}

interface BankAccount {
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  routingNumber: string;
  accountType: 'Checking' | 'Savings' | '';
}

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
  citizenships: Citizenship[];
  maritalStatusHistory: MaritalStatusEntry[];
  familyMembers: FamilyMember[];
  dependent1Count: number;
  dependent2Count: number;
  emergencyContacts: EmergencyContact[];
  homeAddress: Address;
  workAddress: Address;
  personalEmail: string;
  workEmail: string;
  mobilePhone: string;
  workPhone: string;
  hireDate: string;
  jobTitle: string;
  department: string;
  managerId: string;
  bankAccount: BankAccount;
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

// Objet pour stocker les données finales
let personalInformationData: EmployeeInformation = {
  title: "",
  firstName: "",
  middleName: "",
  knownAs: "",
  lastName: "",
  suffix: "",
  preferredName: "",
  maidenName: "",
  priorLastName1: "",
  priorLastName2: "",
  profilePhoto: "",
  gender: "",
  birthDate: "",
  age: {
    years: 0,
    months: 0
  },
  dateOfDeath: "",
  cityOfBirth: "",
  county: "",
  countryOfBirth: "",
  nationalIdCountryCode: "",
  nationalNumber: "",
  deliveryDate: "",
  corporateId: "",
  spouseName: "",
  spouseFirstName: "",
  spouseGender: "",
  spouseEmployeeId: "",
  citizenships: [],
  maritalStatusHistory: [],
  familyMembers: [],
  dependent1Count: 0,
  dependent2Count: 0,
  emergencyContacts: [],
  homeAddress: {
    street1: "",
    street2: "",
    city: "",
    stateProvince: "",
    postalCode: "",
    country: ""
  },
  workAddress: {
    street1: "",
    street2: "",
    city: "",
    stateProvince: "",
    postalCode: "",
    country: ""
  },
  personalEmail: "",
  workEmail: "",
  mobilePhone: "",
  workPhone: "",
  hireDate: "",
  jobTitle: "",
  department: "",
  managerId: "",
  bankAccount: {
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    routingNumber: "",
    accountType: ""
  }
};

const PersonalInformation: React.FC = () => {
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

  const sections = [
    { title: 'Employee Name', icon: <FiUser /> },
    { title: 'Personal Information', icon: <FiFileText /> },
    { title: 'Family Composition', icon: <FiUsers /> },
    { title: 'Contact Information', icon: <FiPhone /> },
    { title: 'Work Information', icon: <FiBriefcase /> },
    { title: 'Bank Information', icon: <FiCreditCard /> },
  ];




  

  useEffect(() => {
    if (employeeData.birthDate) {
      const birthDate = new Date(employeeData.birthDate);
      const today = new Date();
      const years = today.getFullYear() - birthDate.getFullYear();
      const months = today.getMonth() - birthDate.getMonth();
      setEmployeeData((prev) => ({
        ...prev,
        age: {
          years: years,
          months: months < 0 ? months + 12 : months,
        },
      }));
    }
  }, [employeeData.birthDate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string, name?: string) => {
    let finalName = name || e.target.name;
    const value = typeof e === 'string' ? e : e.target.value;

    const [section, field] = finalName.split('.');

    if (section && field) {
      setEmployeeData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section as keyof EmployeeInformation],
          [field]: value,
        },
      }));
    } else {
      setEmployeeData((prev) => ({ ...prev, [finalName]: value }));
    }
  };

  const handleValidation = () => {
    const errors: Record<string, string> = {};
    const today = new Date().toISOString().split('T')[0];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const sectionValidationRules: { [key: number]: (data: EmployeeInformation) => Record<string, string> } = {
      0: (data) => {
        const err: Record<string, string> = {};
        if (!data.title) err.title = 'Title is required.';
        if (!data.firstName) err.firstName = 'First Name is required.';
        if (!data.lastName) err.lastName = 'Last Name is required.';
        return err;
      },
      1: (data) => {
        const err: Record<string, string> = {};
        if (!data.gender) err.gender = 'Gender is required.';
        if (!data.birthDate) err.birthDate = 'Birth Date is required.';
        if (data.birthDate > today) err.birthDate = 'Birth date cannot be in the future.';
        if (!data.corporateId) err.corporateId = 'Corporate ID is required.';
        if (data.maritalStatusHistory.length > 1) {
          for (let i = 1; i < data.maritalStatusHistory.length; i++) {
            if (data.maritalStatusHistory[i].effectiveDate < data.maritalStatusHistory[i - 1].effectiveDate) {
              err.maritalStatusHistory = 'Marital history must be in chronological order.';
              break;
            }
          }
        }
        return err;
      },
      2: (data) => {
        const err: Record<string, string> = {};
        if (data.emergencyContacts.length === 0) {
          err.emergencyContacts = 'At least one emergency contact is required.';
        }
        return err;
      },
      3: (data) => {
        const err: Record<string, string> = {};
        if (!data.personalEmail || !emailRegex.test(data.personalEmail)) err.personalEmail = 'A valid personal email is required.';
        if (!data.mobilePhone) err.mobilePhone = 'Mobile phone is required.';
        return err;
      },
      4: (data) => {
        const err: Record<string, string> = {};
        if (!data.hireDate) err.hireDate = 'Hire Date is required.';
        if (!data.jobTitle) err.jobTitle = 'Job Title is required.';
        if (!data.department) err.department = 'Department is required.';
        if (!data.workEmail || !emailRegex.test(data.workEmail)) err.workEmail = 'A valid work email is required.';
        return err;
      },
      5: (data) => {
        const err: Record<string, string> = {};
        if (!data.bankAccount.accountNumber) err['bankAccount.accountNumber'] = 'Account number is required.';
        if (!data.bankAccount.routingNumber) err['bankAccount.routingNumber'] = 'Routing number is required.';
        if (!data.bankAccount.accountType) err['bankAccount.accountType'] = 'Account type is required.';
        if (!data.bankAccount.bankName) err['bankAccount.bankName'] = 'Bank name is required.';
        if (!data.bankAccount.accountHolderName) err['bankAccount.accountHolderName'] = 'Account holder name is required.';
        return err;
      }
    };

    const currentSectionErrors = sectionValidationRules[activeSection](employeeData);
    setValidationErrors(currentSectionErrors);
    return Object.keys(currentSectionErrors).length === 0;
  };

  const handleNext = async () => {
    if (handleValidation()) {
      if (activeSection < sections.length - 1) {
        setActiveSection(activeSection + 1);
      } else {
        // Update personalInformationData and submit to API
        personalInformationData = { ...employeeData };
        personalInformationData.profilePhoto="";
        console.log('Données enregistrées dans personalInformationData:', personalInformationData);
        setIsLoading(true);
        try {
          const response = await personalDataService.createEmployeeInformation(personalInformationData);
          if (response.success) {
            console.log('Données enregistrées dans personalInformationData:', personalInformationData);
            setModalMessage('Form submitted successfully! Data saved to the server.');
            setShowModal(true);
          } else {
            throw new Error('Failed to submit employee data');
          }
        } catch (error) {
          setModalMessage('Error submitting data: ' + (error instanceof Error ? error.message : 'Unknown error'));
          setShowModal(true);
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      setModalMessage('Please correct the validation errors before proceeding.');
      setShowModal(true);
    }
  };
  const handlePrev = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEmployeeData((prev) => ({ ...prev, profilePhoto: event.target?.result as string }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handlePhotoDelete = () => {
    setEmployeeData((prev) => ({ ...prev, profilePhoto: null }));
  };

  const handleAddCitizenship = () => {
    setEmployeeData((prev) => ({
      ...prev,
      citizenships: [...prev.citizenships, { countryCode: '', primaryNationality: false }],
    }));
  };

  const handleRemoveCitizenship = (index: number) => {
    setEmployeeData((prev) => ({
      ...prev,
      citizenships: prev.citizenships.filter((_, i) => i !== index),
    }));
  };

  const handleCitizenshipChange = (index: number, name: string, value: string | boolean) => {
    const updatedCitizenships = employeeData.citizenships.map((item, i) => {
      if (i === index) {
        if (name === 'primaryNationality' && value) {
          return { ...item, [name]: value };
        }
        return { ...item, [name]: value };
      } else if (name === 'primaryNationality' && value) {
        return { ...item, primaryNationality: false };
      }
      return item;
    });
    setEmployeeData((prev) => ({ ...prev, citizenships: updatedCitizenships }));
  };

  const handleAddMaritalStatus = () => {
    setEmployeeData(prev => ({
      ...prev,
      maritalStatusHistory: [...prev.maritalStatusHistory, { status: '', effectiveDate: '' }]
    }));
  };

  const handleRemoveMaritalStatus = (index: number) => {
    setEmployeeData(prev => ({
      ...prev,
      maritalStatusHistory: prev.maritalStatusHistory.filter((_, i) => i !== index)
    }));
  };

  const handleMaritalStatusChange = (index: number, name: string, value: string) => {
    const updatedHistory = employeeData.maritalStatusHistory.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setEmployeeData(prev => ({ ...prev, maritalStatusHistory: updatedHistory }));
  };

  const handleAddFamilyMember = () => {
    setEmployeeData(prev => ({
      ...prev,
      familyMembers: [...prev.familyMembers, { relationship: '', lastName: '', firstName: '', gender: '', birthDate: '' }]
    }));
  };

  const handleRemoveFamilyMember = (index: number) => {
    setEmployeeData(prev => ({
      ...prev,
      familyMembers: prev.familyMembers.filter((_, i) => i !== index)
    }));
  };

  const handleFamilyMemberChange = (index: number, name: string, value: string) => {
    const updatedFamily = employeeData.familyMembers.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setEmployeeData(prev => ({ ...prev, familyMembers: updatedFamily }));
  };

  const handleAddEmergencyContact = () => {
    setEmployeeData(prev => ({
      ...prev,
      emergencyContacts: [...prev.emergencyContacts, { priority: prev.emergencyContacts.length + 1, title: '', lastName: '', firstName: '', phone: '' }]
    }));
  };

  const handleRemoveEmergencyContact = (index: number) => {
    setEmployeeData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.filter((_, i) => i !== index).map((contact, i) => ({ ...contact, priority: i + 1 }))
    }));
  };

  const handleEmergencyContactChange = (index: number, name: string, value: string) => {
    const updatedContacts = employeeData.emergencyContacts.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setEmployeeData(prev => ({ ...prev, emergencyContacts: updatedContacts }));
  };

  const citizenshipColumns = useMemo<ColumnDef<Citizenship>[]>(
    () => [
      {
        header: 'Citizenship',
        accessorKey: 'countryCode',
        cell: (info) => {
          const index = info.row.index;
          return (
            <Dropdown
              label=""
              options={allCountryCodes}
              value={info.getValue() as string}
              onChange={(value) => handleCitizenshipChange(index, 'countryCode', value)}
              name={`citizenships.${index}.countryCode`}
            />
          );
        },
      },
      {
        header: 'Primary',
        accessorKey: 'primaryNationality',
        cell: (info) => {
          const index = info.row.index;
          return (
            <input
              type="checkbox"
              checked={info.getValue() as boolean}
              onChange={(e) => handleCitizenshipChange(index, 'primaryNationality', e.target.checked)}
              className="h-5 w-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
            />
          );
        },
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: (info) => (
          <button onClick={() => handleRemoveCitizenship(info.row.index)} className="text-red-600 hover:text-red-900 transition-colors">
            <FiTrash2 className="h-5 w-5" />
          </button>
        ),
      },
    ],
    [employeeData.citizenships]
  );

  const maritalStatusColumns = useMemo<ColumnDef<MaritalStatusEntry>[]>(
    () => [
      {
        header: 'Marital Status',
        accessorKey: 'status',
        cell: (info) => {
          const index = info.row.index;
          return (
            <Dropdown
              label=""
              options={allMaritalStatuses}
              value={info.getValue() as string}
              onChange={(value) => handleMaritalStatusChange(index, 'status', value)}
              name={`maritalStatusHistory.${index}.status`}
            />
          );
        },
      },
      {
        header: 'Effective Date',
        accessorKey: 'effectiveDate',
        cell: (info) => {
          const index = info.row.index;
          return (
            <input
              type="date"
              value={info.getValue() as string}
              onChange={(e) => handleMaritalStatusChange(index, 'effectiveDate', e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
            />
          );
        },
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: (info) => (
          <button onClick={() => handleRemoveMaritalStatus(info.row.index)} className="text-red-600 hover:text-red-900 transition-colors">
            <FiTrash2 className="h-5 w-5" />
          </button>
        ),
      },
    ],
    [employeeData.maritalStatusHistory]
  );

  const familyMemberColumns = useMemo<ColumnDef<FamilyMember>[]>(
    () => [
      {
        header: 'Relationship',
        accessorKey: 'relationship',
        cell: (info) => {
          const index = info.row.index;
          return (
            <Dropdown
              label=""
              options={allRelationships}
              value={info.getValue() as string}
              onChange={(value) => handleFamilyMemberChange(index, 'relationship', value)}
              name={`familyMembers.${index}.relationship`}
            />
          );
        },
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
        cell: (info) => {
          const index = info.row.index;
          return (
            <input
              type="text"
              value={info.getValue() as string}
              onChange={(e) => handleFamilyMemberChange(index, 'lastName', e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
            />
          );
        },
      },
      {
        header: 'First Name',
        accessorKey: 'firstName',
        cell: (info) => {
          const index = info.row.index;
          return (
            <input
              type="text"
              value={info.getValue() as string}
              onChange={(e) => handleFamilyMemberChange(index, 'firstName', e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
            />
          );
        },
      },
      {
        header: 'Gender',
        accessorKey: 'gender',
        cell: (info) => {
          const index = info.row.index;
          return (
            <Dropdown
              label=""
              options={allGenders.filter(g => g !== 'Prefer not to say')}
              value={info.getValue() as string}
              onChange={(value) => handleFamilyMemberChange(index, 'gender', value)}
              name={`familyMembers.${index}.gender`}
            />
          );
        },
      },
      {
        header: 'Birth Date',
        accessorKey: 'birthDate',
        cell: (info) => {
          const index = info.row.index;
          return (
            <input
              type="date"
              value={info.getValue() as string}
              onChange={(e) => handleFamilyMemberChange(index, 'birthDate', e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
            />
          );
        },
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: (info) => (
          <button onClick={() => handleRemoveFamilyMember(info.row.index)} className="text-red-600 hover:text-red-900 transition-colors">
            <FiTrash2 className="h-5 w-5" />
          </button>
        ),
      },
    ],
    [employeeData.familyMembers]
  );

  const emergencyContactColumns = useMemo<ColumnDef<EmergencyContact>[]>(
    () => [
      { header: 'Prio.', accessorKey: 'priority' },
      {
        header: 'Title',
        accessorKey: 'title',
        cell: (info) => {
          const index = info.row.index;
          return (
            <Dropdown
              label=""
              options={allTitles}
              value={info.getValue() as string}
              onChange={(value) => handleEmergencyContactChange(index, 'title', value)}
              name={`emergencyContacts.${index}.title`}
            />
          );
        },
      },
      {
        header: 'Last Name',
        accessorKey: 'lastName',
        cell: (info) => {
          const index = info.row.index;
          return (
            <input
              type="text"
              value={info.getValue() as string}
              onChange={(e) => handleEmergencyContactChange(index, 'lastName', e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
            />
          );
        },
      },
      {
        header: 'First Name',
        accessorKey: 'firstName',
        cell: (info) => {
          const index = info.row.index;
          return (
            <input
              type="text"
              value={info.getValue() as string}
              onChange={(e) => handleEmergencyContactChange(index, 'firstName', e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
            />
          );
        },
      },
      {
        header: 'Phone',
        accessorKey: 'phone',
        cell: (info) => {
          const index = info.row.index;
          return (
            <input
              type="text"
              value={info.getValue() as string}
              onChange={(e) => handleEmergencyContactChange(index, 'phone', e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
            />
          );
        },
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: (info) => (
          <button onClick={() => handleRemoveEmergencyContact(info.row.index)} className="text-red-600 hover:text-red-900 transition-colors">
            <FiTrash2 className="h-5 w-5" />
          </button>
        ),
      },
    ],
    [employeeData.emergencyContacts]
  );

  const citizenshipTable = useReactTable({
    data: employeeData.citizenships,
    columns: citizenshipColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const maritalStatusTable = useReactTable({
    data: employeeData.maritalStatusHistory,
    columns: maritalStatusColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const familyMemberTable = useReactTable({
    data: employeeData.familyMembers,
    columns: familyMemberColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const emergencyContactTable = useReactTable({
    data: employeeData.emergencyContacts,
    columns: emergencyContactColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const renderAddressForm = (addressType: 'homeAddress' | 'workAddress') => {
    const address = employeeData[addressType];
    const prefix = addressType;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 border rounded-xl bg-gray-50 mb-8">
        <h4 className="col-span-full text-lg font-semibold text-gray-700 mb-2">{addressType === 'homeAddress' ? 'Home Address' : 'Work Address'}</h4>
        <div>
          <label className="block text-sm font-medium text-gray-700">Street 1</label>
          <input type="text" name={`${prefix}.street1`} value={address.street1} onChange={(e) => handleChange(e.target.value, `${prefix}.street1`)} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Street 2 (optional)</label>
          <input type="text" name={`${prefix}.street2`} value={address.street2} onChange={(e) => handleChange(e.target.value, `${prefix}.street2`)} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2" />
        </div>
        <Dropdown
          label="City"
          options={allCities}
          value={address.city}
          onChange={(value) => handleChange(value, `${prefix}.city`)}
          name={`${prefix}.city`}
        />
        <Dropdown
          label="State / Province"
          options={allStates}
          value={address.stateProvince}
          onChange={(value) => handleChange(value, `${prefix}.stateProvince`)}
          name={`${prefix}.stateProvince`}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">Postal Code</label>
          <input type="text" name={`${prefix}.postalCode`} value={address.postalCode} onChange={(e) => handleChange(e.target.value, `${prefix}.postalCode`)} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2" />
        </div>
        <Dropdown
          label="Country"
          options={allCountries}
          value={address.country}
          onChange={(value) => handleChange(value, `${prefix}.country`)}
          name={`${prefix}.country`}
        />
      </div>
    );
  };

  const renderTable = (table: any, addButtonHandler: () => void, tableName: string, validationKey: string) => (
    <div className="mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h4 className="text-lg font-semibold text-gray-700 mb-2 sm:mb-0">{tableName}</h4>
        <button onClick={addButtonHandler} className="flex items-center text-orange-600 hover:text-orange-800 text-md transition-colors">
          <FiPlus className="mr-2" /> Add
        </button>
      </div>
      {validationErrors[validationKey] && <p className="mt-2 text-sm text-red-500">{validationErrors[validationKey]}</p>}
      <div className="overflow-x-auto rounded-lg shadow-md border border-gray-400">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup: any) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => (
                  <th key={header.id} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row: any, index: number) => (
              <tr key={row.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50' }>
                {row.getVisibleCells().map((cell: any) => (
                  <td key={cell.id} className="px-6 py-16 whitespace-nowrap text-sm text-gray-900">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 0:
        return (
          <>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
                <Dropdown
                  label="Title"
                  options={allTitles}
                  value={employeeData.title}
                  onChange={(value) => handleChange(value, 'title')}
                  name="title"
                  error={validationErrors.title}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" name="firstName" value={employeeData.firstName} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
                  {validationErrors.firstName && <p className="mt-2 text-sm text-red-500">{validationErrors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Middle Name (optional)</label>
                  <input type="text" name="middleName" value={employeeData.middleName} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Known as (optional)</label>
                  <input type="text" name="knownAs" value={employeeData.knownAs} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input type="text" name="lastName" value={employeeData.lastName} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
                  {validationErrors.lastName && <p className="mt-2 text-sm text-red-500">{validationErrors.lastName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Suffix</label>
                  <input type="text" name="suffix" value={employeeData.suffix} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Preferred Name</label>
                  <input type="text" name="preferredName" value={employeeData.preferredName} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Maiden Name</label>
                  <input type="text" name="maidenName" value={employeeData.maidenName} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Prior Last Name 1</label>
                  <input type="text" name="priorLastName1" value={employeeData.priorLastName1} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Prior Last Name 2</label>
                  <input type="text" name="priorLastName2" value={employeeData.priorLastName2} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
                </div>
              </div>
              <div className="lg:w-1/4 flex-shrink-0 flex flex-col items-center p-6 border rounded-xl shadow-sm bg-gray-50">
                <h4 className="text-lg font-semibold text-gray-700 mb-6">Profile Photo</h4>
                <div className="w-48 h-48 rounded-full border-4 border-gray-300 flex items-center justify-center overflow-hidden">
                  {employeeData.profilePhoto ? (
                    <img src={employeeData.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <FiCamera className="text-gray-400 w-20 h-20" />
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-4">Recommended: 200x200px</p>
                <div className="mt-6 flex gap-4">
                  <label className="cursor-pointer bg-orange-500 text-white text-md px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                    Upload
                    <input type="file" className="hidden" onChange={handlePhotoUpload} accept="image/*" />
                  </label>
                  <button onClick={handlePhotoDelete} className="bg-gray-200 text-gray-700 text-md px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <div className="grid grid-cols-1 gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Dropdown
                label="Gender"
                options={allGenders}
                value={employeeData.gender}
                onChange={(value) => handleChange(value, 'gender')}
                name="gender"
                error={validationErrors.gender}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700">Birth Date</label>
                <input type="date" name="birthDate" value={employeeData.birthDate} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
                {validationErrors.birthDate && <p className="mt-2 text-sm text-red-500">{validationErrors.birthDate}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input type="text" readOnly value={`${employeeData.age.years} years, ${employeeData.age.months} months`} className="mt-2 block w-full rounded-lg border-gray-300 bg-gray-100 shadow-sm px-4 py-2" />
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-700">Date of Death (optional)</label>
                <input type="date" name="dateOfDeath" value={employeeData.dateOfDeath} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
              </div> */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <Dropdown
                label="City of Birth"
                options={allCities}
                value={employeeData.cityOfBirth}
                onChange={(value) => handleChange(value, 'cityOfBirth')}
                name="cityOfBirth"
              />
              <Dropdown
                label="County"
                options={allCounties}
                value={employeeData.county}
                onChange={(value) => handleChange(value, 'county')}
                name="county"
              />
              <Dropdown
                label="Country of Birth"
                options={allCountries}
                value={employeeData.countryOfBirth}
                onChange={(value) => handleChange(value, 'countryOfBirth')}
                name="countryOfBirth"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Generic National Number</label>
                <input type="text" name="nationalNumber" value={employeeData.nationalNumber} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Corporate ID</label>
                <input type="text" name="corporateId" value={employeeData.corporateId} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
                {validationErrors.corporateId && <p className="mt-2 text-sm text-red-500">{validationErrors.corporateId}</p>}
              </div>
            </div>
            {renderTable(maritalStatusTable, handleAddMaritalStatus, 'Marital Status History', 'maritalStatusHistory')}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6 p-6 border rounded-xl bg-gray-50">
              <h4 className="col-span-full text-lg font-semibold text-gray-700 mb-2">Current Spouse</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input type="text" name="spouseName" value={employeeData.spouseName} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input type="text" name="spouseFirstName" value={employeeData.spouseFirstName} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <Dropdown
                label="Gender"
                options={allGenders.filter(g => g !== 'Prefer not to say')}
                value={employeeData.spouseGender}
                onChange={(value) => handleChange(value, 'spouseGender')}
                name="spouseGender"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                <input type="text" name="spouseEmployeeId" value={employeeData.spouseEmployeeId} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" placeholder="VER + number" />
              </div>
            </div>
            {renderTable(citizenshipTable, handleAddCitizenship, 'Citizenship', 'citizenships')}
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 gap-8">
            {renderTable(familyMemberTable, handleAddFamilyMember, 'Family Composition', 'familyMembers')}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 p-6 border rounded-xl bg-gray-50">
              <h4 className="col-span-full text-lg font-semibold text-gray-700 mb-2">Number of Dependents</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dependent</label>
                <input type="number" name="dependent1Count" min="0" value={employeeData.dependent1Count} onChange={(e) => setEmployeeData(prev => ({ ...prev, dependent1Count: parseInt(e.target.value) || 0 }))} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-700">Dependent 2</label>
                <input type="number" name="dependent2Count" min="0" value={employeeData.dependent2Count} onChange={(e) => setEmployeeData(prev => ({ ...prev, dependent2Count: parseInt(e.target.value) || 0 }))} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
              </div> */}
            </div>
            {renderTable(emergencyContactTable, handleAddEmergencyContact, 'Emergency Contacts', 'emergencyContacts')}
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-1 gap-8">
            <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border rounded-xl bg-gray-50">
              <h4 className="col-span-full text-lg font-semibold text-gray-700 mb-2">Primary Contacts</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700">Personal Email</label>
                <input type="email" name="personalEmail" value={employeeData.personalEmail} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
                {validationErrors.personalEmail && <p className="mt-2 text-sm text-red-500">{validationErrors.personalEmail}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mobile Phone</label>
                <input type="tel" name="mobilePhone" value={employeeData.mobilePhone} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
                {validationErrors.mobilePhone && <p className="mt-2 text-sm text-red-500">{validationErrors.mobilePhone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Work Email</label>
                <input type="email" name="workEmail" value={employeeData.workEmail} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
                {validationErrors.workEmail && <p className="mt-2 text-sm text-red-500">{validationErrors.workEmail}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Work Phone (optional)</label>
                <input type="tel" name="workPhone" value={employeeData.workPhone} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
              </div>
            </div>
            {renderAddressForm('homeAddress')}
            {renderAddressForm('workAddress')}
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-1 gap-8">
            <h3 className="text-xl font-semibold text-gray-800">Work Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Hire Date</label>
                <input type="date" name="hireDate" value={employeeData.hireDate} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
                {validationErrors.hireDate && <p className="mt-2 text-sm text-red-500">{validationErrors.hireDate}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Job Title</label>
                <input type="text" name="jobTitle" value={employeeData.jobTitle} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
                {validationErrors.jobTitle && <p className="mt-2 text-sm text-red-500">{validationErrors.jobTitle}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <input type="text" name="department" value={employeeData.department} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
                {validationErrors.department && <p className="mt-2 text-sm text-red-500">{validationErrors.department}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Manager ID (optional)</label>
                <input type="text" name="managerId" value={employeeData.managerId} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" placeholder="EMP + number" />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="grid grid-cols-1 gap-8">
            <h3 className="text-xl font-semibold text-gray-800">Bank Information for Payroll</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border rounded-xl bg-gray-50">
              <div>
                <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                <input type="text" name="bankAccount.bankName" value={employeeData.bankAccount.bankName} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
                {validationErrors['bankAccount.bankName'] && <p className="mt-2 text-sm text-red-500">{validationErrors['bankAccount.bankName']}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Account Holder Name</label>
                <input type="text" name="bankAccount.accountHolderName" value={employeeData.bankAccount.accountHolderName} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
                {validationErrors['bankAccount.accountHolderName'] && <p className="mt-2 text-sm text-red-500">{validationErrors['bankAccount.accountHolderName']}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Account Number</label>
                <input type="text" name="bankAccount.accountNumber" value={employeeData.bankAccount.accountNumber} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
                {validationErrors['bankAccount.accountNumber'] && <p className="mt-2 text-sm text-red-500">{validationErrors['bankAccount.accountNumber']}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Routing Number</label>
                <input type="text" name="bankAccount.routingNumber" value={employeeData.bankAccount.routingNumber} onChange={handleChange} className="mt-2 block w-full rounded-lg border-gray-300 shadow-sm px-4 py-2 focus:ring-orange-500 focus:border-orange-500" />
                {validationErrors['bankAccount.routingNumber'] && <p className="mt-2 text-sm text-red-500">{validationErrors['bankAccount.routingNumber']}</p>}
              </div>
              <Dropdown
                label="Account Type"
                options={allAccountTypes}
                value={employeeData.bankAccount.accountType}
                onChange={(value) => handleChange(value, 'bankAccount.accountType')}
                name="bankAccount.accountType"
                error={validationErrors['bankAccount.accountType']}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-orange-600 text-white p-6 flex items-center justify-between shadow-lg flex-wrap">
        <div className="flex items-center space-x-2 sm:space-x-6">
          <FiHome className="w-6 h-6 sm:w-8 sm:h-8" />
          <span className="text-xl sm:text-2xl font-bold">Personal Information</span>
        </div>
        <div className="flex items-center space-x-4 mt-2 sm:mt-0">
          <span className="text-sm sm:text-md">Progress: {activeSection + 1} of {sections.length}</span>
        </div>
      </div>
      <div className="flex-grow p-4 sm:p-8">
        <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-xl max-w-full lg:max-w-full mx-auto">
          <div className="flex flex-wrap space-x-0 sm:space-x-2 mb-8 border-b-2 border-gray-200">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(index)}
                className={`flex items-center px-4 sm:px-6 py-3 border-b-4 font-medium text-sm sm:text-md transition-colors duration-200
                  ${activeSection === index
                    ? 'border-orange-600 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {section.icon}
                <span className="ml-1 sm:ml-3 whitespace-nowrap">{section.title}</span>
              </button>
            ))}
          </div>
          <div className="py-6">
            {renderSectionContent()}
          </div>
          <div className="flex justify-between mt-10">
            <button
              onClick={handlePrev}
              disabled={activeSection === 0}
              className={`flex items-center px-4 sm:px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors
                ${activeSection === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <FiChevronLeft className="mr-2 sm:mr-3" /> Previous
            </button>
            <button
              onClick={handleNext}
              className="flex items-center px-4 sm:px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              {activeSection === sections.length - 1 ? 'Submit' : 'Next'} <FiChevronRight className="ml-2 sm:ml-3" />
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <FiAlertCircle className="mr-3 text-orange-500 w-6 h-6" /> Information
            </h3>
            <p className="text-gray-700 mb-8 text-md">{modalMessage}</p>
            <div className="flex justify-end">
              <button
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-md"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInformation;


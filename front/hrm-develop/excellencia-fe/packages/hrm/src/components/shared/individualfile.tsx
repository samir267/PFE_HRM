// import React from 'react';
// import {
//   FiUser, FiCalendar, FiFileText, FiUsers, FiCamera, FiPhone, FiHome,
//   FiBriefcase, FiCreditCard, FiMail, FiMapPin, FiGlobe, FiTag, FiSearch
// } from 'react-icons/fi';

// // ----------------------------------------------------------------------------------------------------
// // Interfaces and Mock Data
// // ----------------------------------------------------------------------------------------------------

// interface Citizenship {
//   countryCode: string;
//   primaryNationality: boolean;
// }

// interface MaritalStatusEntry {
//   status: string;
//   effectiveDate: string;
// }

// interface FamilyMember {
//   relationship: string;
//   lastName: string;
//   firstName: string;
//   gender: 'Male' | 'Female' | 'Other' | '';
//   birthDate: string;
// }

// interface EmergencyContact {
//   priority: number;
//   title: string;
//   lastName: string;
//   firstName: string;
//   phone: string;
// }

// interface EmployeeAddress {
//   addressType: 'Home' | 'Work' | 'Vacation' | 'Temporary' | 'Other';
//   country: string;
//   startDate: string;
//   endDate: string;
//   isPrimary: boolean;
//   street1: string;
//   street2: string;
//   city: string;
//   postalCode: string;
// }

// interface EmailAddress {
//   type: 'Principal' | 'Professional' | 'Personal' | 'Billing' | 'Other';
//   email: string;
//   isPrimary: boolean;
// }

// interface PhoneNumber {
//   type: 'Personal' | 'Professional' | 'Fax' | 'Mobile';
//   number: string;
// }

// interface BankDetail {
//   paymentMethod: 'SEPA' | 'SWIFT' | 'Cheque' | 'Cash' | 'DirectDebit' | 'CreditCard' | 'Other';
//   countryCode: string;
//   iban: string;
//   bic: string;
//   isPrimary: boolean;
// }

// interface PhysicalCharacteristics {
//   height: { imperial: { feet: number; inches: number }; metric: { cm: number } };
//   weight: { imperial: { lbs: number }; metric: { kg: number } };
//   shoeSize: { us: number; eu: number };
//   clothingSizes: { shirt: string; coat: string; trousers: string; hat: string; dress: string; gloves: string };
//   customMeasurements: {
//     waist: { imperial: number; metric: number };
//     head: { imperial: number; metric: number };
//     neck: { imperial: number; metric: number };
//     shoulderWidth: { imperial: number; metric: number };
//     insideLeg: { imperial: number; metric: number };
//     chest: { imperial: number; metric: number };
//     sleeveLength: { imperial: number; metric: number };
//   };
// }

// export interface Employee {
//   id: string;
//   title: string;
//   firstName: string;
//   middleName: string;
//   lastName: string;
//   preferredName: string;
//   jobTitle: string;
//   department: string;
//   profilePhoto: string | null;
//   gender: 'Female' | 'Male' | 'Other' | 'Prefer not to say';
//   birthDate: string;
//   maritalStatusHistory: MaritalStatusEntry[];
//   citizenships: Citizenship[];
//   familyMembers: FamilyMember[];
//   emergencyContacts: EmergencyContact[];
//   addresses: EmployeeAddress[];
//   emails: EmailAddress[];
//   phones: PhoneNumber[];
//   bankDetails: BankDetail[];
//   physicalCharacteristics: PhysicalCharacteristics;
// }

// export const initialEmployees: Employee[] = [
//   {
//     id: 'emp1',
//     title: 'Mr.',
//     firstName: 'John',
//     middleName: 'Michael',
//     lastName: 'Doe',
//     preferredName: 'Johnny',
//     jobTitle: 'Software Engineer',
//     department: 'Technology',
//     profilePhoto: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
//     gender: 'Male',
//     birthDate: '1990-05-15',
//     maritalStatusHistory: [{ status: 'Married', effectiveDate: '2018-03-20' }],
//     citizenships: [{ countryCode: 'USA', primaryNationality: true }],
//     familyMembers: [{ relationship: 'Spouse', lastName: 'Doe', firstName: 'Jane', gender: 'Female', birthDate: '1992-07-22' }],
//     emergencyContacts: [{ priority: 1, title: 'Mrs.', lastName: 'Doe', firstName: 'Jane', phone: '555-123-4567' }],
//     addresses: [
//       {
//         addressType: 'Home',
//         country: 'United States',
//         startDate: '2020-01-01',
//         endDate: '',
//         isPrimary: true,
//         street1: '123 Tech Lane',
//         street2: 'Apt 4B',
//         city: 'San Francisco',
//         postalCode: '94105',
//       },
//     ],
//     emails: [
//       { type: 'Professional', email: 'john.doe@techcorp.com', isPrimary: true },
//       { type: 'Personal', email: 'johndoe123@gmail.com', isPrimary: false },
//     ],
//     phones: [
//       { type: 'Professional', number: '555-876-5432' },
//       { type: 'Personal', number: '555-123-4567' },
//     ],
//     bankDetails: [
//       {
//         paymentMethod: 'SEPA',
//         countryCode: 'FR',
//         iban: 'FR7612345678901234567890123',
//         bic: 'BNPAFRPP',
//         isPrimary: true,
//       },
//     ],
//     physicalCharacteristics: {
//       height: { imperial: { feet: 5, inches: 11 }, metric: { cm: 180 } },
//       weight: { imperial: { lbs: 180 }, metric: { kg: 81.6 } },
//       shoeSize: { us: 10, eu: 44 },
//       clothingSizes: { shirt: 'L', coat: '42', trousers: '32/34', hat: 'M', dress: 'N/A', gloves: 'L' },
//       customMeasurements: {
//         waist: { imperial: 32, metric: 81 },
//         head: { imperial: 22.5, metric: 57 },
//         neck: { imperial: 15.5, metric: 39 },
//         shoulderWidth: { imperial: 18, metric: 46 },
//         insideLeg: { imperial: 32, metric: 81 },
//         chest: { imperial: 40, metric: 102 },
//         sleeveLength: { imperial: 34, metric: 86 },
//       },
//     },
//   },
//   {
//     id: 'emp2',
//     title: 'Ms.',
//     firstName: 'Jane',
//     middleName: '',
//     lastName: 'Smith',
//     preferredName: 'Jane',
//     jobTitle: 'Product Manager',
//     department: 'Product',
//     profilePhoto: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
//     gender: 'Female',
//     birthDate: '1988-11-20',
//     maritalStatusHistory: [{ status: 'Single', effectiveDate: '2010-01-10' }],
//     citizenships: [{ countryCode: 'UK', primaryNationality: true }],
//     familyMembers: [],
//     emergencyContacts: [{ priority: 1, title: 'Mr.', lastName: 'Smith', firstName: 'Mark', phone: '555-987-6543' }],
//     addresses: [
//       {
//         addressType: 'Home',
//         country: 'United Kingdom',
//         startDate: '2019-03-01',
//         endDate: '',
//         isPrimary: true,
//         street1: '789 High Street',
//         street2: '',
//         city: 'London',
//         postalCode: 'SW1A 0AA',
//       },
//     ],
//     emails: [
//       { type: 'Professional', email: 'jane.smith@techcorp.com', isPrimary: true },
//       { type: 'Personal', email: 'jane.smith.p@outlook.com', isPrimary: false },
//     ],
//     phones: [
//       { type: 'Professional', number: '555-246-8013' },
//       { type: 'Mobile', number: '555-987-6543' },
//     ],
//     bankDetails: [
//       {
//         paymentMethod: 'SWIFT',
//         countryCode: 'GB',
//         iban: 'GB29NWBK60161331926819',
//         bic: 'NWBKGB2L',
//         isPrimary: true,
//       },
//     ],
//     physicalCharacteristics: {
//       height: { imperial: { feet: 5, inches: 6 }, metric: { cm: 168 } },
//       weight: { imperial: { lbs: 135 }, metric: { kg: 61.2 } },
//       shoeSize: { us: 8, eu: 39 },
//       clothingSizes: { shirt: 'M', coat: '38', trousers: '28/30', hat: 'S', dress: 'M', gloves: 'M' },
//       customMeasurements: {
//         waist: { imperial: 28, metric: 71 },
//         head: { imperial: 21, metric: 53 },
//         neck: { imperial: 14, metric: 35 },
//         shoulderWidth: { imperial: 15, metric: 38 },
//         insideLeg: { imperial: 28, metric: 71 },
//         chest: { imperial: 36, metric: 91 },
//         sleeveLength: { imperial: 24, metric: 61 },
//       },
//     },
//   },
//   {
//     id: 'emp3',
//     title: 'Dr.',
//     firstName: 'Alice',
//     middleName: '',
//     lastName: 'Johnson',
//     preferredName: 'Alice',
//     jobTitle: 'HR Specialist',
//     department: 'Human Resources',
//     profilePhoto: 'https://i.pravatar.cc/150?u=a042581f4e29026704f',
//     gender: 'Female',
//     birthDate: '1975-02-10',
//     maritalStatusHistory: [{ status: 'Divorced', effectiveDate: '2022-09-01' }],
//     citizenships: [{ countryCode: 'CAN', primaryNationality: true }],
//     familyMembers: [{ relationship: 'Child', lastName: 'Johnson', firstName: 'Mark', gender: 'Male', birthDate: '2005-01-01' }],
//     emergencyContacts: [{ priority: 1, title: 'Mrs.', lastName: 'Johnson', firstName: 'Sarah', phone: '555-555-1212' }],
//     addresses: [
//       {
//         addressType: 'Home',
//         country: 'Canada',
//         startDate: '2015-05-20',
//         endDate: '',
//         isPrimary: true,
//         street1: '456 Maple Street',
//         street2: '',
//         city: 'Toronto',
//         postalCode: 'M5V 2H1',
//       },
//     ],
//     emails: [
//       { type: 'Professional', email: 'alice.johnson@techcorp.com', isPrimary: true },
//     ],
//     phones: [
//       { type: 'Professional', number: '555-111-2222' },
//       { type: 'Mobile', number: '555-333-4444' },
//     ],
//     bankDetails: [
//       {
//         paymentMethod: 'SEPA',
//         countryCode: 'FR',
//         iban: 'FR7698765432109876543210987',
//         bic: 'BNPAFRPP',
//         isPrimary: true,
//       },
//     ],
//     physicalCharacteristics: {
//       height: { imperial: { feet: 5, inches: 8 }, metric: { cm: 173 } },
//       weight: { imperial: { lbs: 150 }, metric: { kg: 68 } },
//       shoeSize: { us: 9, eu: 40 },
//       clothingSizes: { shirt: 'M', coat: '40', trousers: '30/32', hat: 'M', dress: 'L', gloves: 'M' },
//       customMeasurements: {
//         waist: { imperial: 30, metric: 76 },
//         head: { imperial: 22, metric: 56 },
//         neck: { imperial: 15, metric: 38 },
//         shoulderWidth: { imperial: 16, metric: 41 },
//         insideLeg: { imperial: 30, metric: 76 },
//         chest: { imperial: 38, metric: 97 },
//         sleeveLength: { imperial: 25, metric: 63 },
//       },
//     },
//   },
// ];

// // ----------------------------------------------------------------------------------------------------
// // Utility Functions
// // ----------------------------------------------------------------------------------------------------

// export const renderSection = (title: string, icon: React.ReactNode, content: React.ReactNode) => (
    
//   <div className="bg-white rounded-xl shadow-md p-6 mb-6">
//     <div className="flex items-center text-orange-600 mb-4">
//       {icon}
//       <h2 className="text-xl font-semibold ml-2 text-gray-800">{title}</h2>
//     </div>
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//       {content}
//     </div>
//   </div>
// );

// export const renderField = (label: string, value: any, fieldKey: string, section: string, type: string = 'text', isEditing: boolean, handleUpdate: (field: string, value: any) => void) => {
//   const fullKey = `${section}.${fieldKey}`;
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     handleUpdate(fullKey, e.target.value);
//   };

//   return (
//     <div className="flex flex-col">
//       <label className="text-gray-500 text-sm font-medium mb-1">{label}</label>
//       {isEditing ? (
//         <input
//           type={type}
//           value={value}
//           onChange={handleChange}
//           className="w-full rounded-md border-gray-300 shadow-sm px-3 py-2 text-gray-900 focus:ring-orange-500 focus:border-orange-500"
//         />
//       ) : (
//         <p className="text-gray-900 text-md font-medium">{value || 'N/A'}</p>
//       )}
//     </div>
//   );
// };

import React from 'react';
import {
  FiUser, FiCalendar, FiFileText, FiUsers, FiCamera, FiPhone, FiHome,
  FiBriefcase, FiCreditCard, FiMail, FiMapPin, FiGlobe, FiTag, FiSearch
} from 'react-icons/fi';

// ----------------------------------------------------------------------------------------------------
// Interfaces and Mock Data
// ----------------------------------------------------------------------------------------------------

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

interface EmployeeAddress {
  addressType: 'Home' | 'Work' | 'Vacation' | 'Temporary' | 'Other';
  country: string;
  startDate: string;
  endDate: string;
  isPrimary: boolean;
  street1: string;
  street2: string;
  city: string;
  postalCode: string;
}

interface EmailAddress {
  type: 'Principal' | 'Professional' | 'Personal' | 'Billing' | 'Other';
  email: string;
  isPrimary: boolean;
}

interface PhoneNumber {
  type: 'Personal' | 'Professional' | 'Fax' | 'Mobile';
  number: string;
}

interface BankDetail {
  paymentMethod: 'SEPA' | 'SWIFT' | 'Cheque' | 'Cash' | 'DirectDebit' | 'CreditCard' | 'Other';
  countryCode: string;
  iban: string;
  bic: string;
  isPrimary: boolean;
}

interface PhysicalCharacteristics {
  height: { imperial: { feet: number; inches: number }; metric: { cm: number } };
  weight: { imperial: { lbs: number }; metric: { kg: number } };
  shoeSize: { us: number; eu: number };
  clothingSizes: { shirt: string; coat: string; trousers: string; hat: string; dress: string; gloves: string };
  customMeasurements: {
    waist: { imperial: number; metric: number };
    head: { imperial: number; metric: number };
    neck: { imperial: number; metric: number };
    shoulderWidth: { imperial: number; metric: number };
    insideLeg: { imperial: number; metric: number };
    chest: { imperial: number; metric: number };
    sleeveLength: { imperial: number; metric: number };
  };
}

export interface Employee {
  id: string;
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  preferredName: string;
  jobTitle: string;
  department: string;
  profilePhoto: string | null;
  gender: 'Female' | 'Male' | 'Other' | 'Prefer not to say';
  birthDate: string;
  maritalStatusHistory: MaritalStatusEntry[];
  citizenships: Citizenship[];
  familyMembers: FamilyMember[];
  emergencyContacts: EmergencyContact[];
  addresses: EmployeeAddress[];
  emails: EmailAddress[];
  phones: PhoneNumber[];
  bankDetails: BankDetail[];
  physicalCharacteristics: PhysicalCharacteristics;
}

export const initialEmployees: Employee[] = [
  {
    id: 'emp1',
    title: 'Mr.',
    firstName: 'Samir',
    middleName: 'skander',
    lastName: 'Chemkhi',
    preferredName: 'test',
    jobTitle: 'Software Engineer',
    department: 'Technology',
    profilePhoto: 'https://static.vecteezy.com/system/resources/previews/024/183/502/non_2x/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg',
    gender: 'Male',
    birthDate: '1990-05-15',
    maritalStatusHistory: [{ status: 'Married', effectiveDate: '2018-03-20' }],
    citizenships: [{ countryCode: 'USA', primaryNationality: true }],
    familyMembers: [{ relationship: 'Spouse', lastName: 'Doe', firstName: 'Jane', gender: 'Female', birthDate: '1992-07-22' }],
    emergencyContacts: [{ priority: 1, title: 'Mrs.', lastName: 'Doe', firstName: 'Jane', phone: '555-123-4567' }],
    addresses: [
      {
        addressType: 'Home',
        country: 'United States',
        startDate: '2020-01-01',
        endDate: '',
        isPrimary: true,
        street1: '123 Tech Lane',
        street2: 'Apt 4B',
        city: 'San Francisco',
        postalCode: '94105',
      },
    ],
    emails: [
      { type: 'Professional', email: 'samirchemkhi09@gmail.com', isPrimary: true },
      { type: 'Personal', email: 'johndoe123@gmail.com', isPrimary: false },
    ],
    phones: [
      { type: 'Professional', number: '555-876-5432' },
      { type: 'Personal', number: '555-123-4567' },
    ],
    bankDetails: [
      {
        paymentMethod: 'SEPA',
        countryCode: 'FR',
        iban: 'FR7612345678901234567890123',
        bic: 'BNPAFRPP',
        isPrimary: true,
      },
    ],
    physicalCharacteristics: {
      height: { imperial: { feet: 5, inches: 11 }, metric: { cm: 180 } },
      weight: { imperial: { lbs: 180 }, metric: { kg: 81.6 } },
      shoeSize: { us: 10, eu: 44 },
      clothingSizes: { shirt: 'L', coat: '42', trousers: '32/34', hat: 'M', dress: 'N/A', gloves: 'L' },
      customMeasurements: {
        waist: { imperial: 32, metric: 81 },
        head: { imperial: 22.5, metric: 57 },
        neck: { imperial: 15.5, metric: 39 },
        shoulderWidth: { imperial: 18, metric: 46 },
        insideLeg: { imperial: 32, metric: 81 },
        chest: { imperial: 40, metric: 102 },
        sleeveLength: { imperial: 34, metric: 86 },
      },
    },
  },
  {
    id: 'emp2',
    title: 'Ms.',
    firstName: 'Jane',
    middleName: '',
    lastName: 'Smith',
    preferredName: 'Jane',
    jobTitle: 'Product Manager',
    department: 'Product',
    profilePhoto: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
    gender: 'Female',
    birthDate: '1988-11-20',
    maritalStatusHistory: [{ status: 'Single', effectiveDate: '2010-01-10' }],
    citizenships: [{ countryCode: 'UK', primaryNationality: true }],
    familyMembers: [],
    emergencyContacts: [{ priority: 1, title: 'Mr.', lastName: 'Smith', firstName: 'Mark', phone: '555-987-6543' }],
    addresses: [
      {
        addressType: 'Home',
        country: 'United Kingdom',
        startDate: '2019-03-01',
        endDate: '',
        isPrimary: true,
        street1: '789 High Street',
        street2: '',
        city: 'London',
        postalCode: 'SW1A 0AA',
      },
    ],
    emails: [
      { type: 'Professional', email: 'jane.smith@techcorp.com', isPrimary: true },
      { type: 'Personal', email: 'jane.smith.p@outlook.com', isPrimary: false },
    ],
    phones: [
      { type: 'Professional', number: '555-246-8013' },
      { type: 'Mobile', number: '555-987-6543' },
    ],
    bankDetails: [
      {
        paymentMethod: 'SWIFT',
        countryCode: 'GB',
        iban: 'GB29NWBK60161331926819',
        bic: 'NWBKGB2L',
        isPrimary: true,
      },
    ],
    physicalCharacteristics: {
      height: { imperial: { feet: 5, inches: 6 }, metric: { cm: 168 } },
      weight: { imperial: { lbs: 135 }, metric: { kg: 61.2 } },
      shoeSize: { us: 8, eu: 39 },
      clothingSizes: { shirt: 'M', coat: '38', trousers: '28/30', hat: 'S', dress: 'M', gloves: 'M' },
      customMeasurements: {
        waist: { imperial: 28, metric: 71 },
        head: { imperial: 21, metric: 53 },
        neck: { imperial: 14, metric: 35 },
        shoulderWidth: { imperial: 15, metric: 38 },
        insideLeg: { imperial: 28, metric: 71 },
        chest: { imperial: 36, metric: 91 },
        sleeveLength: { imperial: 24, metric: 61 },
      },
    },
  },
  {
    id: 'emp3',
    title: 'Dr.',
    firstName: 'Alice',
    middleName: '',
    lastName: 'Johnson',
    preferredName: 'Alice',
    jobTitle: 'HR Specialist',
    department: 'Human Resources',
    profilePhoto: 'https://i.pravatar.cc/150?u=a042581f4e29026704f',
    gender: 'Female',
    birthDate: '1975-02-10',
    maritalStatusHistory: [{ status: 'Divorced', effectiveDate: '2022-09-01' }],
    citizenships: [{ countryCode: 'CAN', primaryNationality: true }],
    familyMembers: [{ relationship: 'Child', lastName: 'Johnson', firstName: 'Mark', gender: 'Male', birthDate: '2005-01-01' }],
    emergencyContacts: [{ priority: 1, title: 'Mrs.', lastName: 'Johnson', firstName: 'Sarah', phone: '555-555-1212' }],
    addresses: [
      {
        addressType: 'Home',
        country: 'Canada',
        startDate: '2015-05-20',
        endDate: '',
        isPrimary: true,
        street1: '456 Maple Street',
        street2: '',
        city: 'Toronto',
        postalCode: 'M5V 2H1',
      },
    ],
    emails: [
      { type: 'Professional', email: 'alice.johnson@techcorp.com', isPrimary: true },
    ],
    phones: [
      { type: 'Professional', number: '555-111-2222' },
      { type: 'Mobile', number: '555-333-4444' },
    ],
    bankDetails: [
      {
        paymentMethod: 'SEPA',
        countryCode: 'FR',
        iban: 'FR7698765432109876543210987',
        bic: 'BNPAFRPP',
        isPrimary: true,
      },
    ],
    physicalCharacteristics: {
      height: { imperial: { feet: 5, inches: 8 }, metric: { cm: 173 } },
      weight: { imperial: { lbs: 150 }, metric: { kg: 68 } },
      shoeSize: { us: 9, eu: 40 },
      clothingSizes: { shirt: 'M', coat: '40', trousers: '30/32', hat: 'M', dress: 'L', gloves: 'M' },
      customMeasurements: {
        waist: { imperial: 30, metric: 76 },
        head: { imperial: 22, metric: 56 },
        neck: { imperial: 15, metric: 38 },
        shoulderWidth: { imperial: 16, metric: 41 },
        insideLeg: { imperial: 30, metric: 76 },
        chest: { imperial: 38, metric: 97 },
        sleeveLength: { imperial: 25, metric: 63 },
      },
    },
  },
];

// ----------------------------------------------------------------------------------------------------
// Utility Functions
// ----------------------------------------------------------------------------------------------------

export const renderSection = (title: string, icon: React.ReactNode, content: React.ReactNode) => (
  <div className="bg-white rounded-xl shadow-md p-6 mb-6">
    <div className="flex items-center text-orange-600 mb-4">
      {icon}
      <h2 className="text-xl font-semibold ml-2 text-gray-800">{title}</h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {content}
    </div>
  </div>
);

export const renderField = (label: string, value: any, fieldKey: string, section: string, type: string = 'text', isEditing: boolean, handleUpdate: (field: string, value: any) => void) => {
  const fullKey = `${section}.${fieldKey}`;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleUpdate(fullKey, e.target.value);
  };

  return (
    <div className="flex flex-col">
      <label className="text-gray-500 text-sm font-medium mb-1">{label}</label>
      {isEditing ? (
        <input
          type={type}
          value={value}
          onChange={handleChange}
          className="w-full rounded-md border-gray-300 shadow-sm px-3 py-2 text-gray-900 focus:ring-orange-500 focus:border-orange-500"
        />
      ) : (
        <p className="text-gray-900 text-md font-medium">{value || 'N/A'}</p>
      )}
    </div>
  );
};
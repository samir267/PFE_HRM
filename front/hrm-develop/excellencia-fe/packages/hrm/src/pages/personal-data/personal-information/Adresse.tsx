import React, { useState } from 'react';
import {
  FiMapPin,
  FiGlobe,
  FiHome,
  FiCalendar,
  FiCheck,
  FiPlus,
  FiTrash2,
  FiChevronUp,
  FiChevronDown,
} from 'react-icons/fi';
import Dropdown from './Dropdown'; // Assuming Dropdown component is in a separate file

// --- Interfaces for the new data model ---
interface Address {
  addressType: string;
  country: string;
  startDate: string;
  endDate: string;
  isPrimary: boolean;
  street1: string;
  street2: string;
  city: string;
  additionalCity?: string;
  postalCode: string;
  addressTypeOption: 'local' | 'international';
}

// --- Mock Data (for demonstration) ---
const allCountries = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'France', 'Germany',
  'Japan', 'China', 'India', 'Brazil', 'Mexico', 'South Africa', 'Spain',
  'Italy', 'Russia', 'Argentina', 'South Korea'
];
const allAddressTypes = [
  'Domicile', 'Travail', 'Vacances', 'Temporaire', 'Autre'
];
const allStates = [
    'California', 'Texas', 'Florida', 'New York', 'Pennsylvania',
    'Illinois', 'Ohio', 'Georgia', 'North Carolina', 'Michigan',
    'New Jersey', 'Virginia', 'Washington', 'Arizona', 'Massachusetts'
];

interface AddressSectionProps {
  // We can pass state from the parent component if needed
  // For this example, we'll manage state internally
  // employeeData: EmployeeInformation;
  // handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | string, name?: string) => void;
}

const AddressSection: React.FC<AddressSectionProps> = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      addressType: '',
      country: '',
      startDate: '',
      endDate: '',
      isPrimary: false,
      street1: '',
      street2: '',
      city: '',
      additionalCity: '',
      postalCode: '',
      addressTypeOption: 'international',
    },
  ]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const handleAddAddress = () => {
    setAddresses(prev => [...prev, {
      addressType: '',
      country: '',
      startDate: '',
      endDate: '',
      isPrimary: false,
      street1: '',
      street2: '',
      city: '',
      additionalCity: '',
      postalCode: '',
      addressTypeOption: 'international',
    }]);
  };

  const handleRemoveAddress = (indexToRemove: number) => {
    setAddresses(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setAddresses(prevAddresses => {
      const updatedAddresses = prevAddresses.map((address, i) => {
        if (i === index) {
          return {
            ...address,
            [name]: type === 'checkbox' ? checked : value,
          };
        }
        return address;
      });
      return updatedAddresses;
    });
  };

  const handleAddressTypeOptionChange = (index: number, option: 'local' | 'international') => {
    setAddresses(prevAddresses => {
      const updatedAddresses = [...prevAddresses];
      updatedAddresses[index] = {
        ...updatedAddresses[index],
        addressTypeOption: option,
        // Réinitialiser les champs spécifiques à l'adresse
        street1: '', street2: '', city: '', additionalCity: '', postalCode: '', country: '',
      };
      return updatedAddresses;
    });
  };

  const handleToggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
      {/* Section Header */}
      <div className="flex items-center mb-6">
        <FiMapPin className="text-orange-500 w-8 h-8 mr-4" />
        <h2 className="text-2xl font-bold text-gray-900">Adresse</h2>
      </div>

      {addresses.map((address, index) => (
        <div key={index} className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6 last:mb-0 border border-gray-200">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => handleToggleExpand(index)}>
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <FiHome className="mr-2 text-orange-500" />
              Adresse {index + 1}
            </h3>
            {expandedIndex === index ? <FiChevronUp className="text-gray-500" /> : <FiChevronDown className="text-gray-500" />}
          </div>

          {expandedIndex === index && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Type d'adresse */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type d'adresse
                  </label>
                  <Dropdown
                    label="Sélectionner le type"
                    options={allAddressTypes}
                    value={address.addressType}
                    onChange={(value) => handleChange({ target: { name: 'addressType', value } } as React.ChangeEvent<HTMLSelectElement>, index)}
                    name="addressType"
                  />
                </div>

                {/* Période de validité */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Période de validité
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="date"
                      name="startDate"
                      value={address.startDate}
                      onChange={(e) => handleChange(e, index)}
                      className="flex-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2 text-gray-900 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <input
                      type="date"
                      name="endDate"
                      value={address.endDate}
                      onChange={(e) => handleChange(e, index)}
                      className="flex-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2 text-gray-900 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Adresse principale */}
                <div className="flex items-center">
                  <input
                    id={`isPrimary-${index}`}
                    type="checkbox"
                    name="isPrimary"
                    checked={address.isPrimary}
                    onChange={(e) => handleChange(e, index)}
                    className="h-5 w-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500 focus:border-orange-500"
                  />
                  <label htmlFor={`isPrimary-${index}`} className="ml-3 block text-sm font-medium text-gray-700">
                    Adresse principale
                  </label>
                </div>

                {/* Saisie d'adresse */}
                <div className="col-span-full">
                  <div className="flex space-x-4 mb-4">
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); handleAddressTypeOptionChange(index, 'international'); }}
                      className={`text-sm font-medium ${address.addressTypeOption === 'international' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-orange-600'}`}
                    >
                      Enter international address
                    </a>
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); handleAddressTypeOptionChange(index, 'local'); }}
                      className={`text-sm font-medium ${address.addressTypeOption === 'local' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-orange-600'}`}
                    >
                      Enter local address
                    </a>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Pays */}
                    {address.addressTypeOption === 'international' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pays
                        </label>
                        <Dropdown
                          label="Sélectionner un pays"
                          options={allCountries}
                          value={address.country}
                          onChange={(value) => handleChange({ target: { name: 'country', value } } as React.ChangeEvent<HTMLSelectElement>, index)}
                          name="country"
                        />
                      </div>
                    )}
                    
                    {/* Numéro et nom de rue */}
                    <div className="col-span-full lg:col-span-1">
                      <label htmlFor={`street1-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Numéro et nom de rue
                      </label>
                      <input
                        type="text"
                        id={`street1-${index}`}
                        name="street1"
                        value={address.street1}
                        onChange={(e) => handleChange(e, index)}
                        className="w-full rounded-lg border-gray-300 shadow-sm px-3 py-2 text-gray-900 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                    
                    {/* Ville */}
                    <div>
                      <label htmlFor={`city-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Ville
                      </label>
                      <input
                        type="text"
                        id={`city-${index}`}
                        name="city"
                        value={address.city}
                        onChange={(e) => handleChange(e, index)}
                        className="w-full rounded-lg border-gray-300 shadow-sm px-3 py-2 text-gray-900 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>

                    {/* Ville supplémentaire / État/Province */}
                    <div>
                      <label htmlFor={`additionalCity-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        {address.addressTypeOption === 'local' ? 'État/Province' : 'Ville supplémentaire'}
                      </label>
                      <Dropdown
                        label="Sélectionner l'état/la province"
                        options={allStates}
                        value={address.additionalCity || ''}
                        onChange={(value) => handleChange({ target: { name: 'additionalCity', value } } as React.ChangeEvent<HTMLSelectElement>, index)}
                        name="additionalCity"
                      />
                    </div>

                    {/* Code postal */}
                    <div>
                      <label htmlFor={`postalCode-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Code postal
                      </label>
                      <input
                        type="text"
                        id={`postalCode-${index}`}
                        name="postalCode"
                        value={address.postalCode}
                        onChange={(e) => handleChange(e, index)}
                        className="w-full rounded-lg border-gray-300 shadow-sm px-3 py-2 text-gray-900 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Delete button for addresses */}
                {addresses.length > 1 && (
                  <div className="col-span-full flex justify-end">
                    <button
                      onClick={() => handleRemoveAddress(index)}
                      className="inline-flex items-center text-red-600 hover:text-red-800 transition-colors"
                    >
                      <FiTrash2 className="mr-2" /> Supprimer cette adresse
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Add Address Button */}
      <button
        onClick={handleAddAddress}
        className="mt-6 flex items-center justify-center w-full px-6 py-3 border border-dashed border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <FiPlus className="mr-2" /> Ajouter une adresse
      </button>

    </div>
  );
};

export default AddressSection;

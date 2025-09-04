

import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
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
  FiAlertCircle,
  FiCreditCard,
  FiGlobe,
  FiCornerDownRight,
  FiKey
} from 'react-icons/fi';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getPaginationRowModel,
} from '@tanstack/react-table';

// Interfaces pour le modèle de données
interface Payee {
  id: string;
  name: string;
}

interface BankDetail {
  id: string;
  paymentMethod: 'SEPA' | 'SWIFT' | 'Cheque' | 'Cash' | 'DirectDebit' | 'CreditCard' | 'Other';
  payeeId: string;
  countryCode: string;
  iban: string;
  bic: string;
  isPrimary: boolean;
  ibanKey: string;
}

// Données de base pour les dropdowns
const allPaymentMethods = {
  SEPA: 'Virement SEPA',
  SWIFT: 'Virement international (SWIFT)',
  Cheque: 'Chèque',
  Cash: 'Espèces',
  DirectDebit: 'Prélèvement',
  CreditCard: 'Carte bancaire',
  Other: 'Autre'
};
const allCountries = [
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Allemagne' },
  { code: 'ES', name: 'Espagne' },
  { code: 'IT', name: 'Italie' },
  { code: 'US', name: 'États-Unis' },
  { code: 'GB', name: 'Royaume-Uni' },
  { code: 'JP', name: 'Japon' }
];

const initialPayees: Payee[] = [
  { id: 'payee1', name: 'Fournisseur A' },
  { id: 'payee2', name: 'Client B' },
  { id: 'payee3', name: 'John Doe' },
  { id: 'payee4', name: 'Company XYZ' },
  { id: 'payee5', name: 'Jane Smith' },
  { id: 'payee6', name: 'Fournisseur C' },
  { id: 'payee7', name: 'Client D' },
  { id: 'payee8', name: 'Entity E' },
  { id: 'payee9', name: 'Global Corp' },
  { id: 'payee10', name: 'Financial Services' },
];

const initialBankDetails: BankDetail[] = [
  { id: '1', paymentMethod: 'SEPA', payeeId: 'payee1', countryCode: 'FR', iban: 'FR1420041010050500013M02606', bic: 'PSSTFRPPMET', isPrimary: true, ibanKey: '06' },
  { id: '2', paymentMethod: 'SEPA', payeeId: 'payee1', countryCode: 'FR', iban: 'FR7630006000011234567890189', bic: 'PSSTFRPP', isPrimary: false, ibanKey: '89' },
  { id: '3', paymentMethod: 'SWIFT', payeeId: 'payee2', countryCode: 'US', iban: '', bic: 'CHASUS33', isPrimary: true, ibanKey: '' },
  { id: '4', paymentMethod: 'Cheque', payeeId: 'payee3', countryCode: 'FR', iban: '', bic: '', isPrimary: true, ibanKey: '' },
  { id: '5', paymentMethod: 'SEPA', payeeId: 'payee4', countryCode: 'DE', iban: 'DE89370400440532013000', bic: 'COBADEFFXXX', isPrimary: true, ibanKey: '00' },
  { id: '6', paymentMethod: 'SEPA', payeeId: 'payee5', countryCode: 'IT', iban: 'IT60X0542811101000000123456', bic: 'BPPIITRRXXX', isPrimary: true, ibanKey: '56' },
  { id: '7', paymentMethod: 'SWIFT', payeeId: 'payee6', countryCode: 'GB', iban: 'GB29NWBK60161331926819', bic: 'NWBKGB2L', isPrimary: true, ibanKey: '19' },
  { id: '8', paymentMethod: 'SEPA', payeeId: 'payee7', countryCode: 'ES', iban: 'ES9121000418450200051332', bic: 'CAIXESBBXXX', isPrimary: true, ibanKey: '32' },
  { id: '9', paymentMethod: 'SEPA', payeeId: 'payee8', countryCode: 'FR', iban: 'FR7640618840618840618840618', bic: 'AGRIFRPP', isPrimary: true, ibanKey: '18' },
];

// Fonctions de validation
const isSEPA = (countryCode: string) => ['FR', 'DE', 'ES', 'IT', 'BE', 'NL', 'LU', 'IE', 'PT', 'AT', 'FI', 'CY', 'EE', 'LV', 'LT', 'MT', 'SK', 'SI', 'GR', 'BG', 'RO', 'HR', 'CZ', 'HU', 'PL', 'SE', 'DK', 'NO', 'IS', 'LI', 'MC', 'SM', 'VA', 'CH'].includes(countryCode);

const validateIBAN = (iban: string, countryCode: string): boolean => {
  if (!iban) return false;
  const ibanClean = iban.replace(/ /g, '').toUpperCase();
  const ibanLengths: { [key: string]: number } = {
    'FR': 27, 'DE': 22, 'ES': 24, 'IT': 27, 'GB': 22, 'NL': 18, 'BE': 16, 'LU': 20,
    'PT': 25, 'IE': 22, 'AT': 20, 'FI': 18, 'CY': 28, 'EE': 20, 'LV': 21, 'LT': 20,
    'MT': 31, 'SK': 24, 'SI': 19, 'GR': 27, 'BG': 22, 'RO': 24, 'HR': 21, 'CZ': 24,
    'HU': 28, 'PL': 28, 'SE': 24, 'DK': 18, 'NO': 15, 'IS': 26, 'LI': 21, 'MC': 27,
    'SM': 27, 'VA': 22, 'CH': 21
  };
  const length = ibanLengths[countryCode];
  if (!length || ibanClean.length !== length) {
    return false;
  }
  const re = /^[A-Z0-9]{15,34}$/;
  if (!re.test(ibanClean)) {
    return false;
  }
  const rearranged = ibanClean.substring(4) + ibanClean.substring(0, 4);
  let numeric = '';
  for (const char of rearranged) {
    if (/[A-Z]/.test(char)) {
      numeric += (char.charCodeAt(0) - 55).toString();
    } else {
      numeric += char;
    }
  }
  let remainder = numeric.slice(0, 2);
  for (let i = 2; i < numeric.length; i += 7) {
    const chunk = numeric.slice(i, i + 7);
    remainder = (parseInt(remainder + chunk, 10) % 97).toString();
  }
  return parseInt(remainder, 10) === 1;
};

const validateBIC = (bic: string, countryCode: string): boolean => {
  if (!bic) return false;
  const re = /^([a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2})([a-zA-Z0-9]{3})?$/;
  if (!re.test(bic)) {
    return false;
  }
  return bic.substring(4, 6).toUpperCase() === countryCode;
};

const calculateIBANKey = (iban: string): string => {
  if (!iban) return '';
  const ibanClean = iban.replace(/ /g, '').toUpperCase();
  if (ibanClean.length < 4) return '';
  const key = ibanClean.substring(2, 4);
  return key;
};

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

// Composant pour la barre latérale droite
const RightBar: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  selectedBankDetail: BankDetail | null;
  onUpdate: (id: string, updatedData: Partial<BankDetail>) => void;
  onSetPrimary: (id: string) => void;
  allPayees: Payee[];
}> = ({ isOpen, onClose, selectedBankDetail, onUpdate, onSetPrimary, allPayees }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetail, setEditedDetail] = useState<Partial<BankDetail>>({});
  const [isIBANValid, setIsIBANValid] = useState(true);
  const [isBICValid, setIsBICValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (selectedBankDetail) {
      setEditedDetail(selectedBankDetail);
      setIsEditing(false);
      setIsIBANValid(validateIBAN(selectedBankDetail.iban, selectedBankDetail.countryCode));
      setIsBICValid(validateBIC(selectedBankDetail.bic, selectedBankDetail.countryCode));
    }
  }, [selectedBankDetail]);

  useEffect(() => {
    if (editedDetail.iban && editedDetail.countryCode) {
      setIsIBANValid(validateIBAN(editedDetail.iban, editedDetail.countryCode));
    }
    if (editedDetail.bic && editedDetail.countryCode) {
      setIsBICValid(validateBIC(editedDetail.bic, editedDetail.countryCode));
    }
    
    const isIBANRequired = isSEPA(editedDetail.countryCode || 'FR') || editedDetail.paymentMethod === 'SWIFT';
    const isBICRequired = editedDetail.paymentMethod === 'SWIFT' || !isSEPA(editedDetail.countryCode || '');
    
    const validIBAN = !isIBANRequired || (isIBANValid && editedDetail.iban);
    const validBIC = !isBICRequired || (isBICValid && editedDetail.bic);
    
    setIsFormValid(validIBAN && validBIC);
  }, [editedDetail, isIBANValid, isBICValid]);

  if (!isOpen || !selectedBankDetail) {
    return null;
  }
  
  const handleIBANChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/ /g, '').toUpperCase();
    const formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
    setEditedDetail({ ...editedDetail, iban: formattedValue, ibanKey: calculateIBANKey(value) });
  };
  
  const handleBICChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setEditedDetail({ ...editedDetail, bic: value });
  };

  const handleSave = () => {
    if (isFormValid) {
      const cleanData = {
        ...editedDetail,
        iban: editedDetail.iban?.replace(/ /g, '')
      };
      if (selectedBankDetail.id) {
        onUpdate(selectedBankDetail.id, cleanData);
      }
      setIsEditing(false);
    }
  };

  const payee = allPayees.find(p => p.id === selectedBankDetail.payeeId);

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg p-6 overflow-y-auto transform transition-transform duration-300 z-50">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h3 className="text-xl font-bold">Détails bancaires</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FiX className="h-6 w-6" />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Bénéficiaire</label>
          <p className="mt-1 text-gray-900">{payee?.name || 'N/A'}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Méthode de paiement</label>
          {isEditing ? (
            <select
              value={editedDetail.paymentMethod || 'SEPA'}
              onChange={(e) => setEditedDetail({ ...editedDetail, paymentMethod: e.target.value as BankDetail['paymentMethod'] })}
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm"
            >
              {Object.entries(allPaymentMethods).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          ) : (
            <div className="flex items-center mt-1">
              <p className="text-gray-900">{allPaymentMethods[selectedBankDetail.paymentMethod]}</p>
              {selectedBankDetail.isPrimary && <FiStar className="ml-2 text-yellow-500" title="Principal" />}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Code pays</label>
          <p className="mt-1 text-gray-900">{selectedBankDetail.countryCode}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">IBAN</label>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={editedDetail.iban || ''}
                onChange={handleIBANChange}
                className={`mt-1 w-full rounded-lg shadow-sm px-3 py-2 ${!isIBANValid && (editedDetail.iban || '').length > 0 ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Saisir l'IBAN"
              />
              {!isIBANValid && (editedDetail.iban || '').length > 0 && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <FiAlertCircle className="mr-1" />
                  Format IBAN invalide.
                </p>
              )}
            </div>
          ) : (
            <div className="flex items-center">
              <p className="mt-1 text-gray-900">{selectedBankDetail.iban}</p>
              {isIBANValid ? <FiCheckCircle className="ml-2 text-green-500" /> : <FiAlertCircle className="ml-2 text-red-500" />}
            </div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">BIC</label>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={editedDetail.bic || ''}
                onChange={handleBICChange}
                className={`mt-1 w-full rounded-lg shadow-sm px-3 py-2 ${!isBICValid && (editedDetail.bic || '').length > 0 ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Saisir le BIC"
              />
              {!isBICValid && (editedDetail.bic || '').length > 0 && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <FiAlertCircle className="mr-1" />
                  Format BIC invalide ou incohérent.
                </p>
              )}
            </div>
          ) : (
            <div className="flex items-center">
              <p className="mt-1 text-gray-900">{selectedBankDetail.bic}</p>
              {isBICValid ? <FiCheckCircle className="ml-2 text-green-500" /> : <FiAlertCircle className="ml-2 text-red-500" />}
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            disabled={!isFormValid}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiCheckCircle className="mr-2" /> Enregistrer
          </button>
        ) : (
          <>
            <button
              onClick={() => onSetPrimary(selectedBankDetail.id)}
              disabled={selectedBankDetail.isPrimary}
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

// Filter Sidebar component
const FilterSidebar: React.FC<{
  allPayees: Payee[];
  bankDetails: BankDetail[];
  filterQuery: string;
  onFilterQueryChange: (query: string) => void;
  selectedPayeeIds: string[];
  onPayeeSelect: (payeeId: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  pagination: { pageIndex: number; pageSize: number };
  onPaginationChange: (pageIndex: number) => void;
  pageCount: number;
  filterMethod: string;
  onFilterMethodChange: (method: string) => void;
}> = ({
  allPayees,
  bankDetails,
  filterQuery,
  onFilterQueryChange,
  selectedPayeeIds,
  onPayeeSelect,
  onSelectAll,
  onDeselectAll,
  pagination,
  onPaginationChange,
  pageCount,
  filterMethod,
  onFilterMethodChange,
}) => {
  const payeesToDisplay = useMemo(() => {
    if (filterQuery) {
      const lowercasedQuery = filterQuery.toLowerCase();
      const matchedPayees = allPayees.filter(payee =>
        payee.name.toLowerCase().includes(lowercasedQuery) || payee.id.toLowerCase().includes(lowercasedQuery)
      );
      return matchedPayees;
    }
    return [];
  }, [allPayees, filterQuery]);

  const paginatedPayees = useMemo(() => {
    if (filterQuery === '%') {
      const start = pagination.pageIndex * pagination.pageSize;
      const end = start + pagination.pageSize;
      return allPayees.slice(start, end);
    }
    return payeesToDisplay;
  }, [allPayees, filterQuery, pagination, payeesToDisplay]);

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
          Rechercher un bénéficiaire
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
      
      {/* Payment Method Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filtrer par méthode
        </label>
        <select
          value={filterMethod}
          onChange={(e) => onFilterMethodChange(e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="">Toutes les méthodes</option>
          {Object.entries(allPaymentMethods).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>
      
      {/* Payee Selection Filter */}
      {filterQuery && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-gray-700">Bénéficiaires trouvés ({paginatedPayees.length})</h4>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (selectedPayeeIds.length === paginatedPayees.length) {
                  onDeselectAll();
                } else {
                  onSelectAll();
                }
              }}
              className="text-sm text-orange-600 hover:text-orange-800"
            >
              {selectedPayeeIds.length === paginatedPayees.length ? 'Tout désélectionner' : 'Tout sélectionner'}
            </button>
          </div>
          <ul className="space-y-2 max-h-60 overflow-y-auto">
            {paginatedPayees.map(payee => {
              const primaryBankDetail = bankDetails.find(p => p.payeeId === payee.id && p.isPrimary);
              return (
                <li key={payee.id}>
                  <label className="flex items-start cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedPayeeIds.includes(payee.id)}
                      onChange={() => onPayeeSelect(payee.id)}
                      className="form-checkbox h-4 w-4 text-orange-600 transition duration-150 ease-in-out rounded border-gray-300 focus:ring-orange-500 mt-1"
                    />
                    <div className="ml-3">
                      <span className="block text-sm font-medium text-gray-800">{payee.name}</span>
                      <span className="block text-xs text-gray-500">Code: {payee.id}</span>
                      {primaryBankDetail && (
                        <span className="block text-xs text-gray-500 flex items-center">
                          <FiCreditCard className="mr-1" />
                          {primaryBankDetail.iban || primaryBankDetail.bic}
                        </span>
                      )}
                    </div>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Pagination Controls for Payee List */}
      {filterQuery === '%' && allPayees.length > pagination.pageSize && (
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

const IBANEntryModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (iban: string, bic: string, countryCode: string) => void;
}> = ({ isOpen, onClose, onSave }) => {
  const [iban, setIban] = useState('');
  const [bic, setBic] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [isIBANValid, setIsIBANValid] = useState(false);
  const [isBICValid, setIsBICValid] = useState(false);

  useEffect(() => {
    if (iban && countryCode) {
      setIsIBANValid(validateIBAN(iban, countryCode));
    } else {
      setIsIBANValid(false);
    }
    if (bic && countryCode) {
      setIsBICValid(validateBIC(bic, countryCode));
    } else {
      setIsBICValid(false);
    }
  }, [iban, bic, countryCode]);

  const handleSave = () => {
    if (isIBANValid && isBICValid) {
      onSave(iban.replace(/ /g, ''), bic, countryCode);
      onClose();
    }
  };

  const handleIBANChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/ /g, '').toUpperCase();
    const formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
    setIban(formattedValue);
  };
  
  const handleBICChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBic(e.target.value.toUpperCase());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h3 className="text-xl font-bold">Saisie assistée IBAN</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX className="h-6 w-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Code pays</label>
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm"
            >
              <option value="">Sélectionner un pays</option>
              {allCountries.map(c => (
                <option key={c.code} value={c.code}>{c.name} ({c.code})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">IBAN</label>
            <input
              type="text"
              value={iban}
              onChange={handleIBANChange}
              className={`mt-1 w-full rounded-lg shadow-sm px-3 py-2 ${!isIBANValid && iban.length > 0 ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Saisir l'IBAN"
              disabled={!countryCode}
            />
            {!isIBANValid && iban.length > 0 && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <FiAlertCircle className="mr-1" />
                Format IBAN invalide.
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">BIC</label>
            <input
              type="text"
              value={bic}
              onChange={handleBICChange}
              className={`mt-1 w-full rounded-lg shadow-sm px-3 py-2 ${!isBICValid && bic.length > 0 ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Saisir le BIC"
              disabled={!countryCode}
            />
            {!isBICValid && bic.length > 0 && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <FiAlertCircle className="mr-1" />
                Format BIC invalide ou incohérent.
              </p>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={handleSave}
            disabled={!isIBANValid || !isBICValid}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiCheckCircle className="mr-2" /> Valider
          </button>
        </div>
      </div>
    </div>
  );
};

const BankDetailsPayment: React.FC = () => {
  const [allPayees, setAllPayees] = useState<Payee[]>([]);
  const [bankDetails, setBankDetails] = useState<BankDetail[]>([]);
  const [archivedDetails, setArchivedDetails] = useState<BankDetail[]>([]);
  
  const [filterQuery, setFilterQuery] = useState('');
  const [filterMethod, setFilterMethod] = useState('');
  const [selectedPayeeIds, setSelectedPayeeIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [isRightBarOpen, setIsRightBarOpen] = useState(false);
  const [selectedBankDetail, setSelectedBankDetail] = useState<BankDetail | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [isIBANEntryModalOpen, setIsIBANEntryModalOpen] = useState(false);
  const [activeNewDetailId, setActiveNewDetailId] = useState<string | null>(null);
  
  const [payeePagination, setPayeePagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    setAllPayees(initialPayees);
    setBankDetails(initialBankDetails);
  }, []);

  const totalPayeesCount = allPayees.length;
  const payeePageCount = Math.ceil(totalPayeesCount / payeePagination.pageSize);

  const paginatedPayees = useMemo(() => {
    if (filterQuery === '%') {
      const start = payeePagination.pageIndex * payeePagination.pageSize;
      const end = start + payeePagination.pageSize;
      return allPayees.slice(start, end);
    }
    
    if (filterQuery) {
      const lowercasedQuery = filterQuery.toLowerCase();
      return allPayees.filter(payee =>
        payee.name.toLowerCase().includes(lowercasedQuery) || payee.id.toLowerCase().includes(lowercasedQuery)
      );
    }
    
    return [];
  }, [allPayees, filterQuery, payeePagination]);

  useEffect(() => {
    if (filterQuery) {
        setSelectedPayeeIds(paginatedPayees.map(payee => payee.id));
    } else {
        setSelectedPayeeIds([]);
    }
  }, [paginatedPayees, filterQuery]);

  const showNotification = (message: string, type: 'success' | 'info' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  
  const handleAddBankDetail = () => {
    if (selectedPayeeIds.length === 0) {
      showNotification('Veuillez sélectionner un bénéficiaire pour ajouter un détail bancaire.', 'error');
      return;
    }
    const targetPayeeId = selectedPayeeIds[0];
    const payeeDetails = bankDetails.filter(e => e.payeeId === targetPayeeId);
    const hasPrimary = payeeDetails.some(e => e.isPrimary);

    const newId = (bankDetails.length + archivedDetails.length + 1).toString();
    const newDetail: BankDetail = {
      id: newId,
      paymentMethod: 'SEPA',
      payeeId: targetPayeeId,
      countryCode: 'FR',
      iban: '',
      bic: '',
      isPrimary: !hasPrimary,
      ibanKey: ''
    };
    setBankDetails(prev => [...prev, newDetail]);
    showNotification('Nouvelle entrée ajoutée', 'success');
  };
  
  const handleRemoveBankDetail = (id: string, payeeId: string) => {
    const payeeDetails = bankDetails.filter(e => e.payeeId === payeeId);
    const detailToDelete = bankDetails.find(e => e.id === id);

    if (payeeDetails.length === 1) {
      showNotification('Un bénéficiaire doit avoir au minimum un détail bancaire.', 'error');
      return;
    }
    
    setBankDetails(prev => {
      const newDetails = prev.filter(item => item.id !== id);
      if (detailToDelete?.isPrimary) {
        const remainingDetailsForPayee = newDetails.filter(e => e.payeeId === payeeId);
        if (remainingDetailsForPayee.length > 0) {
          const firstDetail = remainingDetailsForPayee[0];
          firstDetail.isPrimary = true;
        }
      }
      return newDetails;
    });
    showNotification('Détail bancaire supprimé', 'info');
  };
  
  const handleArchiveBankDetail = (id: string) => {
    const detailToArchive = bankDetails.find(item => item.id === id);
    if (detailToArchive) {
      const payeeDetails = bankDetails.filter(e => e.payeeId === detailToArchive.payeeId);
      if (payeeDetails.length === 1) {
        showNotification('Un bénéficiaire doit avoir au minimum un détail bancaire.', 'error');
        return;
      }
      setBankDetails(prev => {
        const newDetails = prev.filter(item => item.id !== id);
        if (detailToArchive.isPrimary) {
          const remainingDetailsForPayee = newDetails.filter(e => e.payeeId === detailToArchive.payeeId);
          if (remainingDetailsForPayee.length > 0) {
            const firstDetail = remainingDetailsForPayee[0];
            firstDetail.isPrimary = true;
          }
        }
        return newDetails;
      });
      setArchivedDetails(prev => [...prev, { ...detailToArchive, isPrimary: false }]);
      showNotification('Détail bancaire archivé', 'info');
    }
  };
  
  const handleRestoreBankDetail = (id: string) => {
    const detailToRestore = archivedDetails.find(item => item.id === id);
    if (detailToRestore) {
      setArchivedDetails(prev => prev.filter(item => item.id !== id));
      setBankDetails(prev => [...prev, detailToRestore]);
      showNotification('Détail bancaire restauré', 'success');
    }
  };
  
  const handleSetPrimary = (id: string) => {
    setBankDetails(prev => prev.map(item => ({
      ...item,
      isPrimary: item.id === id,
    })));
    showNotification('Détail bancaire principal mis à jour', 'success');
  };

  const handleChange = (id: string, name: keyof BankDetail, value: string) => {
    setBankDetails(prev => prev.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [name]: value };
        if (name === 'iban') {
          const ibanClean = value.replace(/ /g, '').toUpperCase();
          const formattedIban = ibanClean.replace(/(.{4})/g, '$1 ').trim();
          updatedItem.iban = formattedIban;
          updatedItem.ibanKey = calculateIBANKey(ibanClean);
        } else if (name === 'bic') {
          updatedItem.bic = value.toUpperCase();
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const handleUpdateFromRightBar = (id: string, updatedData: Partial<BankDetail>) => {
    setBankDetails(prev => prev.map(item =>
      item.id === id ? { ...item, ...updatedData } : item
    ));
    showNotification('Détails mis à jour', 'success');
  };
  
  const handleOpenRightBar = (detail: BankDetail) => {
    setSelectedBankDetail(detail);
    setIsRightBarOpen(true);
  };

  const handlePayeeFilterChange = (payeeId: string) => {
    setSelectedPayeeIds(prev =>
      prev.includes(payeeId)
        ? prev.filter(id => id !== payeeId)
        : [...prev, payeeId]
    );
  };

  const handleSelectAllPayees = () => {
    setSelectedPayeeIds(paginatedPayees.map(payee => payee.id));
  };

  const handleDeselectAllPayees = () => {
    setSelectedPayeeIds([]);
  };

  const handlePayeePaginationChange = (pageIndex: number) => {
    setPayeePagination(prev => ({ ...prev, pageIndex }));
  };
  
  const handleIBANEntrySave = (iban: string, bic: string, countryCode: string) => {
    setBankDetails(prev => prev.map(item => {
      if (item.id === activeNewDetailId) {
        return {
          ...item,
          iban: iban.replace(/(.{4})/g, '$1 ').trim(),
          bic,
          countryCode,
          ibanKey: calculateIBANKey(iban)
        };
      }
      return item;
    }));
    setActiveNewDetailId(null);
  };

  const filteredBankDetails = useMemo(() => {
    const detailsForSelectedPayees = bankDetails.filter(item =>
      selectedPayeeIds.includes(item.payeeId)
    );
    
    if (!filterMethod) {
      return detailsForSelectedPayees.sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0));
    }
    
    return detailsForSelectedPayees.filter(item =>
      item.paymentMethod === filterMethod
    );
  }, [bankDetails, selectedPayeeIds, filterMethod]);

  const bankDetailColumns = useMemo<ColumnDef<BankDetail>[]>(
    () => [
      {
        header: 'Bénéficiaire',
        accessorKey: 'payeeId',
        cell: (info) => {
          const payeeId = info.getValue() as string;
          const payee = allPayees.find(u => u.id === payeeId);
          return <span>{payee?.name || 'N/A'}</span>;
        },
      },
      {
        header: 'Méthode',
        accessorKey: 'paymentMethod',
        cell: (info) => {
          const item = info.row.original;
          return (
            <div className="flex items-center">
              <select
                value={info.getValue() as string}
                onChange={(e) => handleChange(item.id, 'paymentMethod', e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm px-3 py-2 focus:ring-orange-500 focus:border-orange-500"
              >
                {Object.entries(allPaymentMethods).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                ))}
              </select>
              {item.isPrimary && <FiStar className="ml-2 text-yellow-500" title="Principal" />}
            </div>
          );
        },
      },
      {
        header: 'IBAN',
        accessorKey: 'iban',
        cell: (info) => {
          const item = info.row.original;
          const isIBANValid = validateIBAN(item.iban, item.countryCode);
          return (
            <div className="relative flex items-center">
              <input
                type="text"
                value={info.getValue() as string}
                onChange={(e) => handleChange(item.id, 'iban', e.target.value)}
                className={`w-full rounded-lg shadow-sm px-3 py-2 pr-12 ${!isIBANValid && item.iban.length > 0 ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'}`}
                placeholder="Saisir l'IBAN"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-bold">
                {item.ibanKey || '--'}
              </span>
              {!isIBANValid && item.iban.length > 0 && (
                <FiAlertCircle className="ml-2 text-red-500" title="Format IBAN invalide" />
              )}
              <button
                onClick={() => { setActiveNewDetailId(item.id); setIsIBANEntryModalOpen(true); }}
                className="ml-2 text-blue-600 hover:text-blue-900 transition-colors p-1"
                title="Saisie assistée IBAN"
              >
                <FiCornerDownRight className="h-5 w-5" />
              </button>
            </div>
          );
        },
      },
      {
        header: 'BIC',
        accessorKey: 'bic',
        cell: (info) => {
          const item = info.row.original;
          const isBICValid = validateBIC(item.bic, item.countryCode);
          return (
            <div className="flex items-center">
              <input
                type="text"
                value={info.getValue() as string}
                onChange={(e) => handleChange(item.id, 'bic', e.target.value)}
                className={`w-full rounded-lg shadow-sm px-3 py-2 ${!isBICValid && item.bic.length > 0 ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'}`}
                placeholder="Saisir le BIC"
              />
              {!isBICValid && item.bic.length > 0 && (
                <FiAlertCircle className="ml-2 text-red-500" title="Format BIC invalide" />
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
                onClick={() => handleRemoveBankDetail(item.id, item.payeeId)}
                className="text-red-600 hover:text-red-900 transition-colors p-1"
                title="Supprimer"
              >
                <FiTrash2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleArchiveBankDetail(item.id)}
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
                onClick={() => navigator.clipboard.writeText(item.iban || item.bic)}
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
    [filteredBankDetails, allPayees]
  );

  const table = useReactTable({
    data: filteredBankDetails,
    columns: bankDetailColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const shouldShowContent = selectedPayeeIds.length > 0;

  return (
    <div className="flex h-screen bg-gray-100 p-6 space-x-6">
      {/* Sidebar Filter Panel */}
      <FilterSidebar
        allPayees={allPayees}
        bankDetails={bankDetails}
        filterQuery={filterQuery}
        onFilterQueryChange={setFilterQuery}
        selectedPayeeIds={selectedPayeeIds}
        onPayeeSelect={handlePayeeFilterChange}
        onSelectAll={handleSelectAllPayees}
        onDeselectAll={handleDeselectAllPayees}
        pagination={payeePagination}
        onPaginationChange={handlePayeePaginationChange}
        pageCount={payeePageCount}
        filterMethod={filterMethod}
        onFilterMethodChange={setFilterMethod}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 bg-white rounded-xl shadow-lg p-6 sm:p-8 flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center mb-4 md:mb-0">
            <FiCreditCard className="mr-3 text-orange-500 w-6 h-6" />
            Détails bancaires Payment
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
              onClick={handleAddBankDetail}
              type="button"
              className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition-colors"
            >
              <FiPlus className="mr-2" />
              Ajouter
            </button>
          </div>
        </div>

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
                    {filteredBankDetails.length === 0 && (
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
                {filteredBankDetails.map(item => {
                  const payee = allPayees.find(u => u.id === item.payeeId);
                  const isIBANValid = validateIBAN(item.iban, item.countryCode);
                  return (
                    <div key={item.id} className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <h4 className="text-lg font-semibold text-gray-800">{allPaymentMethods[item.paymentMethod]}</h4>
                            {item.isPrimary && <FiStar className="ml-2 text-yellow-500" title="Principal" />}
                          </div>
                          <p className={`mt-1 flex items-center ${!isIBANValid ? 'text-red-600' : 'text-gray-600'}`}>
                            {item.iban || item.bic || 'N/A'}
                            {!isIBANValid && <FiAlertCircle className="ml-2" title="Format invalide" />}
                          </p>
                          <p className="mt-2 text-sm text-gray-500">Pour: {payee?.name || 'N/A'}</p>
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
                            onClick={() => handleArchiveBankDetail(item.id)}
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
                {filteredBankDetails.length === 0 && (
                  <div className="col-span-full text-center py-4 text-gray-500 italic">
                    Aucune entrée trouvée.
                  </div>
                )}
              </div>
            )}
            
            {/* Section des entrées archivées */}
            {archivedDetails.length > 0 && (
              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-bold text-gray-800 flex items-center mb-4">
                  <FiArchive className="mr-2" /> Entrées archivées
                </h3>
                <ul className="space-y-2">
                  {archivedDetails.map(item => (
                    <li key={item.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                      <span>
                        <span className="font-semibold">{allPaymentMethods[item.paymentMethod]}</span>: {item.iban || item.bic} (Pour: {allPayees.find(u => u.id === item.payeeId)?.name})
                      </span>
                      <button
                        onClick={() => handleRestoreBankDetail(item.id)}
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
              Veuillez utiliser la barre de recherche dans le panneau latéral pour trouver des bénéficiaires ou taper <code className="bg-gray-100 p-1 rounded-md text-sm">"%"</code> pour afficher toutes les données.
            </p>
          </div>
        )}
      </div>
      
      {/* Barre latérale droite */}
      <RightBar
        isOpen={isRightBarOpen}
        onClose={() => setIsRightBarOpen(false)}
        selectedBankDetail={selectedBankDetail}
        onUpdate={handleUpdateFromRightBar}
        onSetPrimary={handleSetPrimary}
        allPayees={allPayees}
      />

      {/* Modal de saisie IBAN assistée */}
      <IBANEntryModal
        isOpen={isIBANEntryModalOpen}
        onClose={() => setIsIBANEntryModalOpen(false)}
        onSave={handleIBANEntrySave}
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

export default BankDetailsPayment;
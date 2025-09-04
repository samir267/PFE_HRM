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
  FiUsers,
  FiEye,
  FiUserPlus,
  FiCreditCard,
  FiMail,
  FiCalendar,
  FiChevronDown,
  FiArrowUp,
  FiArrowDown,
  FiFileText,
  FiFile,
  FiUpload,
  FiDownload,
  FiFolder,
} from 'react-icons/fi';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  PaginationState,
  RowSelectionState,
} from '@tanstack/react-table';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import axios from 'axios';

// --- Interfaces pour le modèle de données ---
interface Member {
  id: string;
  name: string;
  email: string;
  type: 'Gym' | 'Garderie';
  status: 'Actif' | 'Expiré' | 'En attente' | 'Annulé';
  subscription: string;
  details: MemberDetail[];
}

interface MemberDetail {
  subscription: ReactNode;
  id: string;
  memberId: string;
  subscriptionType: 'Premium' | 'Standard' | 'VIP' | 'Temps plein' | 'Temps partiel' | 'Occasionnel';
  startDate: string;
  endDate: string;
  isPrimary: boolean;
}

// --- Configurations ---
const allSubscriptionTypes = {
  Gym: ['Premium', 'Standard', 'VIP'],
  Garderie: ['Temps plein', 'Temps partiel', 'Occasionnel'],
};

const allStatus = ['Actif', 'Expiré', 'En attente', 'Annulé'];

// --- Fonctions de validation et utilitaires ---
const validateEmail = (email: string): boolean => {
  if (!email) return false;
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Actif': return 'bg-green-100 text-green-800';
    case 'Expiré': return 'bg-red-100 text-red-800';
    case 'En attente': return 'bg-yellow-100 text-yellow-800';
    case 'Annulé': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getSubscriptionColor = (type: string) => {
  switch (type) {
    case 'Premium': return 'bg-purple-100 text-purple-800';
    case 'VIP': return 'bg-pink-100 text-pink-800';
    case 'Standard': return 'bg-blue-100 text-blue-800';
    case 'Temps plein': return 'bg-indigo-100 text-indigo-800';
    case 'Temps partiel': return 'bg-teal-100 text-teal-800';
    case 'Occasionnel': return 'bg-lime-100 text-lime-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// --- Composants de Modal ---
const MemberEntryModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, email: string, type: 'Gym' | 'Garderie',subscription: string) => void;
}> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState<'Gym' | 'Garderie'>('Gym');
  const [subscription, setSubscription] = useState('Premium');
  const [isEmailValid, setIsEmailValid] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setEmail('');
      setType('Gym');
      setIsEmailValid(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (email) {
      setIsEmailValid(validateEmail(email));
    }
  }, [email]);

  const handleSave = () => {
    if (name.trim() && isEmailValid && email.trim()) {
      console.log('salem :', name, email, type, subscription);
      onSave(name, email, type, subscription);
      onClose();
    }
  };

  if (!isOpen) return null;


  const handleTypeChange = (newType: "Gym" | "Garderie") => {
  setType(newType);
  if (newType === "Gym") {
    setSubscription("Premium");
  } else {
    setSubscription("Temps plein");
  }
};


 return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h3 className="text-xl font-bold flex items-center">
          <FiUserPlus className="mr-2 text-gray-500" /> Ajouter un membre
        </h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FiX className="h-6 w-6" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Nom complet */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom complet</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
            placeholder="Nom complet du membre"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-1 w-full rounded-lg shadow-sm px-3 py-2 ${
              !isEmailValid && email.length > 0 ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Saisir l'email"
          />
          {!isEmailValid && email.length > 0 && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <FiAlertCircle className="mr-1" />
              Format d'email invalide.
            </p>
          )}
        </div>

        {/* Type de membre */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Type de membre</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "Gym" | "Garderie")}
            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
          >
            <option value="Gym">Gym</option>
            <option value="Garderie">Garderie</option>
          </select>
        </div>

        {/* Type d’abonnement */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Type d'abonnement</label>
          <select
            value={subscription}
            onChange={(e) => setSubscription(e.target.value)}
            className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
          >
            {type === "Gym" ? (
              <>
                <option value="Premium">Premium</option>
                <option value="Standard">Standard</option>
                <option value="VIP">VIP</option>
              </>
            ) : (
              <>
                <option value="Temps plein">Temps plein</option>
                <option value="Temps partiel">Temps partiel</option>
                <option value="Occasionnel">Occasionnel</option>
              </>
            )}
          </select>
        </div>
      </div>

      {/* Boutons */}
      <div className="mt-6 flex justify-end space-x-2">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition-colors"
        >
          Annuler
        </button>
        <button
          onClick={handleSave}
          disabled={!name.trim() || !email.trim() || !isEmailValid}
          className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiPlus className="mr-2" /> Ajouter
        </button>
      </div>
    </div>
  </div>
);

};

const ViewMemberModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
  memberDetails: MemberDetail[];
}> = ({ isOpen, onClose, member, memberDetails }) => {
  if (!isOpen || !member) return null;

  const primaryDetail = memberDetails.find(d => d.memberId === member.id && d.isPrimary);
  const otherDetails = memberDetails.filter(d => d.memberId === member.id && !d.isPrimary);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[80vh] flex flex-col p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h3 className="text-xl font-bold flex items-center">
            <FiUsers className="mr-2 text-gray-500" /> Détails du membre
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX className="h-6 w-6" />
          </button>
        </div>

        <div className="overflow-y-auto pr-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="text-lg font-semibold mb-2">Informations Générales</h4>
              <p className="flex items-center text-gray-700"><span className="font-medium w-20">Nom:</span> {member.name}</p>
              <p className="flex items-center text-gray-700"><span className="font-medium w-20">Email:</span> {member.email}</p>
              <p className="flex items-center text-gray-700"><span className="font-medium w-20">ID:</span> {member.id}</p>
              <p className="flex items-center text-gray-700"><span className="font-medium w-20">Type:</span> {member.type}</p>
              <p className="flex items-center text-gray-700"><span className="font-medium w-20">Statut:</span> <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(member.status)}`}>{member.status}</span></p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="text-lg font-semibold mb-2 flex items-center">
                <FiCreditCard className="mr-2" /> Abonnements
              </h4>
              {primaryDetail && (
                <div className="bg-blue-50 p-3 rounded-md mb-2 flex items-start">
                  <FiStar className="text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-gray-800">Abonnement Principal</h5>
                    <p className="text-sm text-gray-600">Type: <span className={`ml-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSubscriptionColor(primaryDetail.subscriptionType)}`}>{primaryDetail.subscriptionType}</span></p>
                    <p className="text-sm text-gray-600">Début: {primaryDetail.startDate}</p>
                    <p className="text-sm text-gray-600">Fin: {primaryDetail.endDate}</p>
                  </div>
                </div>
              )}
              {otherDetails.length > 0 && (
                <div className="mt-4">
                  <h5 className="font-medium text-gray-800 mb-2">Autres Abonnements</h5>
                  <ul className="space-y-2">
                    {otherDetails.map(detail => (
                      <li key={detail.id} className="bg-gray-100 p-3 rounded-md text-sm text-gray-700 flex items-center justify-between">
                        <div>
                          <p>Type: <span className={`ml-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSubscriptionColor(detail.subscriptionType)}`}>{detail.subscriptionType}</span></p>
                          <p>Début: {detail.startDate}, Fin: {detail.endDate}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {!primaryDetail && otherDetails.length === 0 && (
                <p className="text-sm text-gray-500 italic">Aucun abonnement enregistré.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UpdateMemberModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
  memberDetails: MemberDetail[];
  onUpdateMember: (id: string, updatedData: Partial<Member>) => void;
  onUpdateDetail: (id: string, updatedData: Partial<MemberDetail>) => void;
  onSetPrimaryDetail: (memberId: string, detailId: string) => void;
  // onAddDetail: (memberId: string) => void;
  onRemoveDetail: (id: string) => void;
}> = ({ isOpen, onClose, member, memberDetails, onUpdateMember, onUpdateDetail, onSetPrimaryDetail, onRemoveDetail }) => {
  const [editedMember, setEditedMember] = useState<Partial<Member>>({});
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [editedDetails, setEditedDetails] = useState<MemberDetail[]>([]);

  useEffect(() => {
    if (member) {
      setEditedMember(member);
      setEditedDetails(memberDetails);
      setIsEmailValid(validateEmail(member.email));
    }
  }, [member, memberDetails]);

  useEffect(() => {
    if (editedMember.email) {
      setIsEmailValid(validateEmail(editedMember.email));
    }
  }, [editedMember]);

  if (!isOpen || !member) return null;

  const handleSaveMember = () => {
    if (isEmailValid && editedMember.name && member.id) {
      onUpdateMember(member.id, editedMember);
      onClose();
    }
  };

  const handleDetailChange = (detailId: string, field: keyof MemberDetail, value: any) => {
    setEditedDetails(prev => prev.map(detail =>
      detail.id === detailId ? { ...detail, [field]: value } : detail
    ));
  };

  const handleSaveDetails = () => {
    editedDetails.forEach(detail => onUpdateDetail(detail.id, detail));
    onClose();
  };

  const currentSubscriptionTypes = allSubscriptionTypes[member.type];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[80vh] flex flex-col p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h3 className="text-xl font-bold flex items-center">
            <FiEdit className="mr-2 text-gray-500" /> Modifier le membre
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX className="h-6 w-6" />
          </button>
        </div>

        <div className="overflow-y-auto pr-2">
          <div className="space-y-4 mb-6 pb-6 border-b">
            <h4 className="text-lg font-semibold text-gray-800">Informations du membre</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom</label>
              <input
                type="text"
                value={editedMember.name || ''}
                onChange={(e) => setEditedMember({ ...editedMember, name: e.target.value })}
                className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={editedMember.email || ''}
                onChange={(e) => setEditedMember({ ...editedMember, email: e.target.value })}
                className={`mt-1 w-full rounded-lg shadow-sm px-3 py-2 ${!isEmailValid && (editedMember.email || '').length > 0 ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Saisir l'email"
              />
              {!isEmailValid && (editedMember.email || '').length > 0 && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <FiAlertCircle className="mr-1" />
                  Format d'email invalide.
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Statut</label>
              <select
                value={editedMember.status || ''}
                onChange={(e) => setEditedMember({ ...editedMember, status: e.target.value as 'Actif' | 'Expiré' | 'En attente' | 'Annulé' })}
                className="mt-1 w-full rounded-lg border-gray-300 shadow-sm px-3 py-2"
              >
                {allStatus.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSaveMember}
                disabled={!isEmailValid || !editedMember.name}
                className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiCheckCircle className="mr-2" /> Enregistrer les informations
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                <FiCreditCard className="mr-2" /> Abonnements
              </h4>
              <button
                onClick={() => member.id && onAddDetail(member.id)}
                className="flex items-center px-3 py-1 text-sm text-orange-600 border border-orange-600 rounded-md hover:bg-orange-50 transition-colors"
              >
                <FiPlus className="mr-1" /> Ajouter
              </button>
            </div>
            <div className="space-y-4">
              {editedDetails.map(detail => (
                <div key={detail.id} className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div>
                      <label className="block text-xs font-medium text-gray-500">Type</label>
                      <select
                        value={detail.subscriptionType}
                        onChange={(e) => handleDetailChange(detail.id, 'subscriptionType', e.target.value as any)}
                        className="mt-1 w-full rounded-lg border-gray-300 shadow-sm text-sm"
                      >
                        {currentSubscriptionTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500">Début</label>
                      <input
                        type="date"
                        value={detail.startDate}
                        onChange={(e) => handleDetailChange(detail.id, 'startDate', e.target.value)}
                        className="mt-1 w-full rounded-lg border-gray-300 shadow-sm text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500">Fin</label>
                      <input
                        type="date"
                        value={detail.endDate}
                        onChange={(e) => handleDetailChange(detail.id, 'endDate', e.target.value)}
                        className="mt-1 w-full rounded-lg border-gray-300 shadow-sm text-sm"
                      />
                    </div>
                    <div className="flex items-center space-x-2 mt-4 md:mt-0">
                      <button
                        onClick={() => onSetPrimaryDetail(member.id, detail.id)}
                        disabled={detail.isPrimary}
                        className={`p-2 rounded-md ${detail.isPrimary ? 'text-yellow-500' : 'text-gray-500 hover:bg-gray-200'}`}
                        title="Définir comme principal"
                      >
                        <FiStar />
                      </button>
                      <button
                        onClick={() => onRemoveDetail(detail.id)}
                        className="p-2 text-red-500 rounded-md hover:bg-red-100"
                        title="Supprimer l'abonnement"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {editedDetails.length > 0 && (
                <div className="flex justify-end mt-4">
                  <button
                    onClick={handleSaveDetails}
                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors"
                  >
                    <FiCheckCircle className="mr-2" /> Enregistrer les abonnements
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConfirmModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  confirmColor: string;
}> = ({ isOpen, onClose, onConfirm, title, message, confirmText, confirmColor }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h3 className="text-xl font-bold flex items-center text-red-600">
            <FiAlertCircle className="mr-2" /> {title}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX className="h-6 w-6" />
          </button>
        </div>
        <div className="mb-6">
          <p className="text-gray-700">{message}</p>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 ${confirmColor} text-white rounded-lg shadow-md hover:opacity-80 transition-colors`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

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

const ExportModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: 'pdf' | 'xlsx' | 'csv') => void;
}> = ({ isOpen, onClose, onExport }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h3 className="text-xl font-bold flex items-center">
            <FiDownload className="mr-2 text-gray-500" /> Exporter les membres
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX className="h-6 w-6" />
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => { onExport('pdf'); onClose(); }}
            className="flex items-center justify-center px-4 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors"
          >
            <FiFileText className="mr-2" /> Exporter en PDF
          </button>
          <button
            onClick={() => { onExport('xlsx'); onClose(); }}
            className="flex items-center justify-center px-4 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors"
          >
            <FiFile className="mr-2" /> Exporter en XLSX
          </button>
          <button
            onClick={() => { onExport('csv'); onClose(); }}
            className="flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
          >
            <FiClipboard className="mr-2" /> Exporter en CSV
          </button>
        </div>
      </div>
    </div>
  );
};

const ImportModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onImport: (file: File) => void;
}> = ({ isOpen, onClose, onImport }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleImportClick = () => {
    if (file) {
      onImport(file);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h3 className="text-xl font-bold flex items-center">
            <FiUpload className="mr-2 text-gray-500" /> Importer des membres
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX className="h-6 w-6" />
          </button>
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Sélectionner un fichier CSV</label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="w-full text-gray-700 bg-gray-100 rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
          />
          {file && <p className="text-sm text-gray-500">Fichier sélectionné: {file.name}</p>}
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition-colors">
            Annuler
          </button>
          <button
            onClick={handleImportClick}
            disabled={!file}
            className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiUpload className="mr-2" /> Importer
          </button>
        </div>
      </div>
    </div>
  );
};

const MembersManagement: React.FC = () => {
  const [allMembersData, setAllMembersData] = useState<Member[]>([]);
  const [archivedMembers, setArchivedMembers] = useState<Member[]>([]);
  const [deletedMembers, setDeletedMembers] = useState<Member[]>([]);
  const [memberDetails, setMemberDetails] = useState<MemberDetail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'Gym' | 'Garderie' | 'Archived' | 'Trash'>('Gym');
  const [filterQuery, setFilterQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  const [filterSubscription, setFilterSubscription] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
  const [isMemberEntryModalOpen, setIsMemberEntryModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isPermanentDeleteModalOpen, setIsPermanentDeleteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const isInitialLoad = useRef(true);

  // Fetch all data from the backend
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      fetchData();
    }
  }, []);

  const showNotification = (message: string, type: 'success' | 'info' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // const fetchData = async () => {
  //   setIsLoading(true);
  //   try {
  //     // Fetch members
  //     const membersResponse = await axios.get('http://localhost:3000/api/member/Member');
  //     console.log('Membres extraits:', membersResponse.data);
  //     const membersData = membersResponse.data;

  //     // Fetch archived members (assuming endpoint exists)
  //     // const archivedResponse = await axios.get('http://localhost:3000/api/member/Member/archived');
  //     // const archivedData = archivedResponse.data;

  //     // Fetch deleted members (assuming endpoint exists)
  //     // const deletedResponse = await axios.get('http://localhost:3000/api/member/Member/deleted');
  //     // const deletedData = deletedResponse.data;

  //     // Fetch all member details (assuming endpoint exists)
  //     // const detailsResponse = await axios.get('http://localhost:3000/api/member/Member/details');
  //     // const detailsData = detailsResponse.data;

  //     // Merge details into members
  //     // const membersWithDetails = membersData.map((member: Member) => ({
  //     //   ...member,
  //     //   details: detailsData.filter((d: MemberDetail) => d.memberId === member.id),
  //     // }));

  //     // setAllMembersData(membersWithDetails);
  //     // setArchivedMembers(archivedData);
  //     // setDeletedMembers(deletedData);
  //     // setMemberDetails(detailsData);
  //   } catch (error) {
  //     showNotification('Erreur lors du chargement des données', 'error');
  //     console.error('Fetch data error:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
const fetchData = async () => {
  setIsLoading(true);
  try {
    // Fetch active members
    const membersResponse = await axios.get('http://localhost:3000/api/member/Member');
    console.log('Données brutes des membres:', membersResponse.data);
    
    const membersWithDetails = membersResponse.data.map((member: any) => ({
      id: member._id || member.id || '',
      name: member.name || '',
      email: member.email || '',
      type: member.type || 'Gym',
      status: member.status || 'Actif',
      subscription: member.subscription || '', // ✅ Mapping direct du champ subscription
      details: [],
    }));
    
    console.log('Membres mappés:', membersWithDetails);
    
    // Fetch archived members
    const archivedResponse = await axios.get('http://localhost:3000/api/member/Member/archived');
    console.log('Membres archivés extraits:', archivedResponse.data);
    
    const archivedMembersWithDetails = archivedResponse.data.map((member: any) => ({
      id: member._id || member.id || '',
      name: member.name || '',
      email: member.email || '',
      type: member.type || 'Gym',
      status: member.status || 'Actif',
      subscription: member.subscription || '',
      details: [],
    }));

    // Fetch deleted members
    const deletedResponse = await axios.get('http://localhost:3000/api/member/Member/deleted');
    console.log('Membres supprimés extraits:', deletedResponse.data);
    
    const deletedMembersWithDetails = deletedResponse.data.map((member: any) => ({
      id: member._id || member.id || '',
      name: member.name || '',
      email: member.email || '',
      type: member.type || 'Gym',
      status: member.status || 'Actif',
      subscription: member.subscription || '',
      details: [],
    }));

    console.log('Membres supprimés mappés:', deletedMembersWithDetails);

    // Update state
    setAllMembersData(membersWithDetails);
    setArchivedMembers(archivedMembersWithDetails);
    setDeletedMembers(deletedMembersWithDetails);
  } catch (error) {
    showNotification('Erreur lors du chargement des données', 'error');
    console.error('Fetch data error:', error);
  } finally {
    setIsLoading(false);
  }
};
  const handleTabChange = (tab: 'Gym' | 'Garderie' | 'Archived' | 'Trash') => {
    setActiveTab(tab);
    setFilterQuery('');
    setFilterStatus([]);
    setFilterSubscription([]);
    setDateRange({ start: '', end: '' });
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  };

  const handleSearch = (query: string) => {
    setFilterQuery(query);
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  };

const handleAddMember = async (name: string, email: string, type: 'Gym' | 'Garderie', subscription: string) => {
  try {
    const newMember = { name, email, type, status: 'Actif', subscription };
    console.log('Payload:', newMember); // Add this to debug
    const response = await axios.post('http://localhost:3000/api/member/Member', newMember);
    console.log('Membre ajouté:', response.data);
    const createdMember = response.data;

    const newDetail: MemberDetail = {
      memberId: createdMember.id,
      subscription: subscription,
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date(Date.now() + 31536000000).toISOString().slice(0, 10),
      isPrimary: true,
    };
    // await axios.post(`http://localhost:3000/api/member/Member/${createdMember.id}/details`, newDetail);

    setAllMembersData(prev => [...prev, { ...createdMember, details: [newDetail] }]);
    // setMemberDetails(prev => [...prev, { _id: `${prev.length + 1}`, ...newDetail }]);
    showNotification(`Nouveau membre (${name}) ajouté`, 'success');
  } catch (error) {
    showNotification('Erreur lors de l\'ajout du membre', 'error');
    console.error('Add member error:', error);
  }
};

  // const handleAddDetail = async (memberId: string) => {
  //   try {
  //     const newDetail: MemberDetail = {
  //       memberId,
  //       subscriptionType: allMembersData.find(m => m.id === memberId)?.type === 'Gym' ? 'Standard' : 'Temps plein',
  //       startDate: new Date().toISOString().slice(0, 10),
  //       endDate: new Date(Date.now() + 31536000000).toISOString().slice(0, 10),
  //       isPrimary: false,
  //     };
  //     const response = await axios.post(`/api/member/Member/${memberId}/details`, newDetail);
  //     setMemberDetails(prev => [...prev, response.data]);
  //     setAllMembersData(prev =>
  //       prev.map(m => m.id === memberId ? { ...m, details: [...m.details, response.data] } : m)
  //     );
  //     showNotification('Nouvel abonnement ajouté', 'success');
  //   } catch (error) {
  //     showNotification('Erreur lors de l\'ajout de l\'abonnement', 'error');
  //     console.error('Add detail error:', error);
  //   }
  // };

  const handleRemoveDetail = async (detailId: string) => {
    const detailToRemove = memberDetails.find(d => d.id === detailId);
    if (!detailToRemove) return;

    const allDetailsForMember = memberDetails.filter(d => d.memberId === detailToRemove.memberId);
    if (allDetailsForMember.length <= 1) {
      showNotification('Impossible de supprimer le dernier abonnement d\'un membre.', 'error');
      return;
    }

    try {
      await axios.delete(`/api/member/Member/details/${detailId}`); // Assuming endpoint exists
      setMemberDetails(prev => {
        const newDetails = prev.filter(d => d.id !== detailId);
        if (detailToRemove.isPrimary) {
          const remainingDetails = newDetails.filter(d => d.memberId === detailToRemove.memberId);
          if (remainingDetails.length > 0) {
            handleSetPrimaryDetail(detailToRemove.memberId, remainingDetails[0].id);
          }
        }
        return newDetails;
      });
      setAllMembersData(prev =>
        prev.map(m => m.id === detailToRemove.memberId ? { ...m, details: m.details.filter(d => d.id !== detailId) } : m)
      );
      showNotification('Abonnement supprimé', 'info');
    } catch (error) {
      showNotification('Erreur lors de la suppression de l\'abonnement', 'error');
      console.error('Remove detail error:', error);
    }
  };

  const handleArchiveMember = async (id: string) => {
    try {
      await axios.post(`http://localhost:3000/api/member/Member/${id}/archive`);
      setAllMembersData(prev => prev.filter(item => item.id !== id));
      const memberToArchive = allMembersData.find(item => item.id === id);
      if (memberToArchive) {
        setArchivedMembers(prev => [...prev, memberToArchive]);
      }
      setRowSelection({});
      showNotification('Membre archivé', 'info');
      setIsArchiveModalOpen(false);
    } catch (error) {
      showNotification('Erreur lors de l\'archivage du membre', 'error');
      console.error('Archive member error:', error);
    }
  };

  const handleRestoreMember = async (id: string) => {
    try {
      await axios.post(`/api/member/Member/${id}/restore`); // Assuming endpoint exists
      const memberToRestore = archivedMembers.find(item => item.id === id);
      if (memberToRestore) {
        setArchivedMembers(prev => prev.filter(item => item.id !== id));
        setAllMembersData(prev => [...prev, memberToRestore]);
        showNotification('Membre restauré', 'success');
      }
    } catch (error) {
      showNotification('Erreur lors de la restauration du membre', 'error');
      console.error('Restore member error:', error);
    }
  };

  const handleMoveToTrash = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/member/Member/${id}`);
      setAllMembersData(prev => prev.filter(item => item.id !== id));
      const memberToMove = allMembersData.find(item => item.id === id);
      if (memberToMove) {
        setDeletedMembers(prev => [...prev, memberToMove]);
      }
      setRowSelection({});
      showNotification('Membre déplacé vers la corbeille', 'info');
      setIsDeleteModalOpen(false);
    } catch (error) {
      showNotification('Erreur lors du déplacement vers la corbeille', 'error');
      console.error('Move to trash error:', error);
    }
  };

  const handleRestoreFromTrash = async (id: string) => {
    try {
      await axios.post(`/api/member/Member/${id}/restore`); // Assuming endpoint exists
      const memberToRestore = deletedMembers.find(item => item.id === id);
      if (memberToRestore) {
        setDeletedMembers(prev => prev.filter(item => item.id !== id));
        setAllMembersData(prev => [...prev, memberToRestore]);
        showNotification('Membre restauré de la corbeille', 'success');
      }
    } catch (error) {
      showNotification('Erreur lors de la restauration du membre', 'error');
      console.error('Restore from trash error:', error);
    }
  };

  const handlePermanentDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/member/Member/${id}/permanent`); // Assuming endpoint exists
      setDeletedMembers(prev => prev.filter(item => item.id !== id));
      setMemberDetails(prev => prev.filter(item => item.memberId !== id));
      setRowSelection({});
      showNotification('Membre supprimé définitivement', 'error');
      setIsPermanentDeleteModalOpen(false);
    } catch (error) {
      showNotification('Erreur lors de la suppression définitive', 'error');
      console.error('Permanent delete error:', error);
    }
  };

  const handleSetPrimaryDetail = async (memberId: string, detailId: string) => {
    try {
      await axios.put(`/api/member/Member/details/${detailId}/set-primary`); // Assuming endpoint exists
      setMemberDetails(prev => prev.map(item => ({
        ...item,
        isPrimary: item.memberId === memberId ? item.id === detailId : item.isPrimary,
      })));
      setAllMembersData(prev =>
        prev.map(m => m.id === memberId ? {
          ...m,
          details: m.details.map(d => ({ ...d, isPrimary: d.id === detailId })),
        } : m)
      );
      showNotification('Abonnement principal mis à jour', 'success');
    } catch (error) {
      showNotification('Erreur lors de la mise à jour de l\'abonnement principal', 'error');
      console.error('Set primary detail error:', error);
    }
  };

  const handleUpdateMember = async (id: string, updatedData: Partial<Member>) => {
    try {
      await axios.put(`/api/member/Member/${id}`, updatedData); // Assuming endpoint exists
      setAllMembersData(prev => prev.map(item =>
        item.id === id ? { ...item, ...updatedData } : item
      ));
      showNotification('Détails du membre mis à jour', 'success');
    } catch (error) {
      showNotification('Erreur lors de la mise à jour du membre', 'error');
      console.error('Update member error:', error);
    }
  };

  const handleUpdateDetail = async (id: string, updatedData: Partial<MemberDetail>) => {
    try {
      await axios.put(`/api/member/Member/details/${id}`, updatedData); // Assuming endpoint exists
      setMemberDetails(prev => prev.map(item =>
        item.id === id ? { ...item, ...updatedData } : item
      ));
      setAllMembersData(prev =>
        prev.map(m => ({
          ...m,
          details: m.details.map(d => d.id === id ? { ...d, ...updatedData } : d),
        }))
      );
      showNotification('Détails de l\'abonnement mis à jour', 'success');
    } catch (error) {
      showNotification('Erreur lors de la mise à jour de l\'abonnement', 'error');
      console.error('Update detail error:', error);
    }
  };

  const handleStatusFilterChange = (status: string) => {
    setFilterStatus(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  };

  const handleSubscriptionFilterChange = (subscription: string) => {
    setFilterSubscription(prev =>
      prev.includes(subscription) ? prev.filter(s => s !== subscription) : [...prev, subscription]
    );
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  };

  const handleArchiveSelected = async () => {
    const selectedIds = Object.keys(rowSelection).filter(id => rowSelection[id]);
    try {
      await Promise.all(selectedIds.map(id => axios.post(`/api/member/Member/${id}/archive`)));
      const membersToArchive = members.filter(m => selectedIds.includes(m.id));
      setAllMembersData(prev => prev.filter(m => !selectedIds.includes(m.id)));
      setArchivedMembers(prev => [...prev, ...membersToArchive]);
      setRowSelection({});
      showNotification(`${selectedIds.length} membres archivés`, 'info');
    } catch (error) {
      showNotification('Erreur lors de l\'archivage des membres', 'error');
      console.error('Archive selected error:', error);
    }
  };

  const handleDeleteSelected = async () => {
    const selectedIds = Object.keys(rowSelection).filter(id => rowSelection[id]);
    try {
      await Promise.all(selectedIds.map(id => axios.delete(`http://localhost:3000/api/member/Member/${id}`)));
      const membersToDelete = members.filter(m => selectedIds.includes(m.id));
      setAllMembersData(prev => prev.filter(m => !selectedIds.includes(m.id)));
      setDeletedMembers(prev => [...prev, ...membersToDelete]);
      setRowSelection({});
      showNotification(`${selectedIds.length} membres déplacés vers la corbeille`, 'info');
    } catch (error) {
      showNotification('Erreur lors du déplacement des membres vers la corbeille', 'error');
      console.error('Delete selected error:', error);
    }
  };

  const handlePermanentDeleteSelected = async () => {
    const selectedIds = Object.keys(rowSelection).filter(id => rowSelection[id]);
    try {
      await Promise.all(selectedIds.map(id => axios.delete(`/api/member/Member/${id}/permanent`))); // Assuming endpoint exists
      setDeletedMembers(prev => prev.filter(m => !selectedIds.includes(m.id)));
      setMemberDetails(prev => prev.filter(d => !selectedIds.includes(d.memberId)));
      setRowSelection({});
      showNotification(`${selectedIds.length} membres supprimés définitivement`, 'error');
    } catch (error) {
      showNotification('Erreur lors de la suppression définitive des membres', 'error');
      console.error('Permanent delete selected error:', error);
    }
  };

  const handleRestoreSelected = async () => {
    const selectedIds = Object.keys(rowSelection).filter(id => rowSelection[id]);
    try {
      await Promise.all(selectedIds.map(id => axios.post(`/api/member/Member/${id}/restore`))); // Assuming endpoint exists
      const membersToRestore = deletedMembers.filter(m => selectedIds.includes(m.id));
      setDeletedMembers(prev => prev.filter(m => !selectedIds.includes(m.id)));
      setAllMembersData(prev => [...prev, ...membersToRestore]);
      setRowSelection({});
      showNotification(`${selectedIds.length} membres restaurés`, 'success');
    } catch (error) {
      showNotification('Erreur lors de la restauration des membres', 'error');
      console.error('Restore selected error:', error);
    }
  };

  const handleImportFromCsv = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      await axios.post('/api/member/Member/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }); // Assuming endpoint exists
      await fetchData(); // Refresh data after import
      showNotification('Membres importés avec succès', 'success');
    } catch (error) {
      showNotification('Erreur lors de l\'importation des membres', 'error');
      console.error('Import error:', error);
    }
  };

  const handleExport = async (format: 'pdf' | 'xlsx' | 'csv') => {
    try {
      const response = await axios.get(`/api/member/Member/export?format=${format}`, { responseType: 'blob' }); // Assuming endpoint exists
      const blob = new Blob([response.data], { type: format === 'csv' ? 'text/csv' : format === 'xlsx' ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', `membres.${format}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showNotification(`Exportation réussie au format ${format.toUpperCase()}`, 'success');
    } catch (error) {
      showNotification('Erreur lors de l\'exportation', 'error');
      console.error('Export error:', error);
    }
  };

  const membersToDisplay = useMemo(() => {
    switch (activeTab) {
      case 'Gym':
        return allMembersData.filter(m => m.type === 'Gym');
      case 'Garderie':
        return allMembersData.filter(m => m.type === 'Garderie');
      case 'Archived':
        return archivedMembers;
      case 'Trash':
        return deletedMembers;
      default:
        return [];
    }
  }, [allMembersData, archivedMembers, deletedMembers, activeTab]);

  const filteredMembers = useMemo(() => {
    let filtered = membersToDisplay;
    const activeDetails = memberDetails.filter(d => filtered.some(m => m.id === d.memberId));

    if (filterStatus.length > 0) {
      filtered = filtered.filter(m => filterStatus.includes(m.status));
    }

    if ((activeTab === 'Gym' || activeTab === 'Garderie') && filterSubscription.length > 0) {
      filtered = filtered.filter(m =>
        activeDetails.some(d => d.memberId === m.id && filterSubscription.includes(d.subscriptionType))
      );
    }

    if ((activeTab === 'Gym' || activeTab === 'Garderie') && (dateRange.start || dateRange.end)) {
      filtered = filtered.filter(m =>
        activeDetails.some(d => {
          const hasStartDate = dateRange.start ? new Date(d.startDate) >= new Date(dateRange.start) : true;
          const hasEndDate = dateRange.end ? new Date(d.endDate) <= new Date(dateRange.end) : true;
          return d.memberId === m.id && hasStartDate && hasEndDate;
        })
      );
    }

    if (filterQuery) {
      const lowercasedQuery = filterQuery.toLowerCase();
      filtered = filtered.filter(member =>
        member.name.toLowerCase().includes(lowercasedQuery) ||
        member.id.toLowerCase().includes(lowercasedQuery) ||
        member.email.toLowerCase().includes(lowercasedQuery)||
        member.subscription.toLowerCase().includes(lowercasedQuery)
      );
    }

    return filtered;
  }, [membersToDisplay, activeTab, filterStatus, filterSubscription, dateRange, filterQuery, memberDetails]);

  const columns = useMemo<ColumnDef<Member>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
            className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
          />
        ),
        enableSorting: false,
        size: 40,
      },
      {
        header: ({ column }) => (
          <div className="flex items-center space-x-1 cursor-pointer" onClick={column.getToggleSortingHandler()}>
            <span>Nom du membre</span>
            <span className="text-gray-400">
              {{
                asc: <FiArrowUp />,
                desc: <FiArrowDown />,
              }[column.getIsSorted() as string] ?? <FiArrowDown />}
            </span>
          </div>
        ),
        accessorKey: 'name',
        cell: (info) => (
          <div className="flex items-center">
            <span className="font-medium text-gray-900">{info.getValue() as string}</span>
          </div>
        ),
      },
      {
        header: ({ column }) => (
          <div className="flex items-center space-x-1 cursor-pointer" onClick={column.getToggleSortingHandler()}>
            <span>Statut</span>
            <span className="text-gray-400">
              {{
                asc: <FiArrowUp />,
                desc: <FiArrowDown />,
              }[column.getIsSorted() as string] ?? <FiArrowDown />}
            </span>
          </div>
        ),
        accessorKey: 'status',
        cell: (info) => (
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(info.getValue() as string)}`}>
            {info.getValue() as string}
          </span>
        ),
      },
    {
  header: ({ column }) => (
    <div className="flex items-center space-x-1 cursor-pointer" onClick={column.getToggleSortingHandler()}>
      <span>Abonnement</span>
      <span className="text-gray-400">
        {{
          asc: <FiArrowUp />,
          desc: <FiArrowDown />,
        }[column.getIsSorted() as string] ?? <FiArrowDown />}
      </span>
    </div>
  ),
  accessorKey: 'subscription', // ✅ Ajout de l'accessorKey pour permettre le tri
  cell: (info) => {
    const member = info.row.original;
    console.log('Member subscription:', member.subscription); // Debug pour vérifier la valeur
    return (
      <div className="flex items-center">
        {member.subscription ? (
          <>
            <span
              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSubscriptionColor(
                member.subscription
              )}`}
            >
              {member.subscription}
            </span>
            <FiStar className="ml-2 text-yellow-500" title="Principal" />
          </>
        ) : (
          <span className="text-gray-500 italic">Aucun</span>
        )}
      </div>
    );
  },
  enableSorting: true, // ✅ Activation du tri pour cette colonne
},
      {
        header: 'Actions',
        id: 'actions',
        cell: (info) => {
          const item = info.row.original;
          return (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => { setSelectedMember(item); setIsViewModalOpen(true); }}
                className="text-blue-600 hover:text-blue-900 transition-colors p-1"
                title="Détails"
              >
                <FiEye className="h-5 w-5" />
              </button>
              {(activeTab === 'Gym' || activeTab === 'Garderie') && (
                <>
                  {/* <button
                    onClick={() => { setSelectedMember(item); setIsUpdateModalOpen(true); }}
                    className="text-orange-600 hover:text-orange-900 transition-colors p-1"
                    title="Modifier"
                  >
                    <FiEdit className="h-5 w-5" />
                  </button> */}
                  <button
                    onClick={() => { setSelectedMember(item); setIsArchiveModalOpen(true); }}
                    className="text-yellow-600 hover:text-yellow-900 transition-colors p-1"
                    title="Archiver"
                  >
                    <FiArchive className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => { setSelectedMember(item); setIsDeleteModalOpen(true); }}
                    className="text-red-600 hover:text-red-900 transition-colors p-1"
                    title="Supprimer"
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </>
              )}
              {activeTab === 'Archived' && (
                <button
                  onClick={() => handleRestoreMember(item.id)}
                  className="text-green-600 hover:text-green-900 transition-colors text-sm"
                >
                  Restaurer
                </button>
              )}
              {activeTab === 'Trash' && (
                <>
                  <button
                    onClick={() => handleRestoreFromTrash(item.id)}
                    className="text-green-600 hover:text-green-900 transition-colors text-sm"
                  >
                    Restaurer
                  </button>
                  <button
                    onClick={() => { setSelectedMember(item); setIsPermanentDeleteModalOpen(true); }}
                    className="text-red-600 hover:text-red-900 transition-colors p-1"
                    title="Supprimer définitivement"
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
          );
        },
        enableSorting: false,
      },
    ],
    [memberDetails, activeTab]
  );

  const table = useReactTable({
    data: filteredMembers,
    columns,
    pageCount: Math.ceil(filteredMembers.length / pagination.pageSize),
    state: {
      pagination,
      sorting,
      rowSelection,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const hasSelectedRows = Object.keys(rowSelection).length > 0;

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-6">
      {isLoading && (
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      )}
      {!isLoading && (
        <>
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-4 mb-4">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <button
                  onClick={() => handleTabChange('Gym')}
                  className={`text-lg font-bold p-2 border-b-2 ${activeTab === 'Gym' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  Membres Gym
                </button>
                <button
                  onClick={() => handleTabChange('Garderie')}
                  className={`text-lg font-bold p-2 border-b-2 ${activeTab === 'Garderie' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  Enfants Garderie
                </button>
                <button
                  onClick={() => handleTabChange('Archived')}
                  className={`text-lg font-bold p-2 border-b-2 ${activeTab === 'Archived' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  Archivés
                </button>
                <button
                  onClick={() => handleTabChange('Trash')}
                  className={`text-lg font-bold p-2 border-b-2 ${activeTab === 'Trash' ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                  Corbeille
                </button>
              </div>
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
                {activeTab !== 'Archived' && activeTab !== 'Trash' && (
                  <button
                    onClick={() => setIsMemberEntryModalOpen(true)}
                    type="button"
                    className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition-colors"
                  >
                    <FiUserPlus className="mr-2" />
                    Ajouter
                  </button>
                )}
                {(activeTab === 'Gym' || activeTab === 'Garderie' || activeTab === 'Archived' || activeTab === 'Trash') && (
                  <button
                    onClick={() => setIsExportModalOpen(true)}
                    type="button"
                    className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition-colors"
                  >
                    <FiDownload className="mr-2" />
                    Exporter
                  </button>
                )}
                {(activeTab === 'Gym' || activeTab === 'Garderie') && (
                  <button
                    onClick={() => setIsImportModalOpen(true)}
                    type="button"
                    className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition-colors"
                  >
                    <FiUpload className="mr-2" />
                    Importer
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={filterQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Rechercher par nom, ID, email"
                  className="w-full pl-10 pr-3 py-2 rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-300 transition-colors"
              >
                <FiFilter className="mr-2" />
                Filtres avancés
                <FiChevronDown className={`ml-2 transition-transform ${filtersOpen ? 'rotate-180' : 'rotate-0'}`} />
              </button>
            </div>

            <div className={`overflow-hidden transition-all duration-300 ${filtersOpen ? 'max-h-96 mt-6' : 'max-h-0'}`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gray-50 rounded-lg border">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filtrer par statut</label>
                  <div className="grid grid-cols-2 gap-2">
                    {allStatus.map(status => (
                      <div key={status} className="flex items-center">
                        <input
                          id={`status-${status}`}
                          type="checkbox"
                          checked={filterStatus.includes(status)}
                          onChange={() => handleStatusFilterChange(status)}
                          className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                        />
                        <label htmlFor={`status-${status}`} className="ml-2 text-sm text-gray-700">{status}</label>
                      </div>
                    ))}
                  </div>
                </div>
                {(activeTab === 'Gym' || activeTab === 'Garderie') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Filtrer par abonnement</label>
                    <div className="grid grid-cols-2 gap-2">
                      {allSubscriptionTypes[activeTab as 'Gym' | 'Garderie'].map(sub => (
                        <div key={sub} className="flex items-center">
                          <input
                            id={`sub-${sub}`}
                            type="checkbox"
                            checked={filterSubscription.includes(sub)}
                            onChange={() => handleSubscriptionFilterChange(sub)}
                            className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                          />
                          <label htmlFor={`sub-${sub}`} className="ml-2 text-sm text-gray-700">{sub}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {(activeTab === 'Gym' || activeTab === 'Garderie') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Filtrer par date de fin d'abonnement</label>
                    <div className="flex space-x-2">
                      <input
                        type="date"
                        value={dateRange.start}
                        onChange={(e) => {
                          setDateRange(prev => ({ ...prev, start: e.target.value }));
                          setPagination(prev => ({ ...prev, pageIndex: 0 }));
                        }}
                        className="w-full rounded-lg border-gray-300 shadow-sm text-sm"
                        title="Date de début"
                      />
                      <input
                        type="date"
                        value={dateRange.end}
                        onChange={(e) => {
                          setDateRange(prev => ({ ...prev, end: e.target.value }));
                          setPagination(prev => ({ ...prev, pageIndex: 0 }));
                        }}
                        className="w-full rounded-lg border-gray-300 shadow-sm text-sm"
                        title="Date de fin"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-xl shadow-lg p-6 overflow-hidden flex flex-col">
            {hasSelectedRows && activeTab !== 'Archived' && activeTab !== 'Trash' && (
              <div className="mb-4 flex items-center space-x-4">
                <span className="text-sm text-gray-700 font-medium">{Object.keys(rowSelection).length} lignes sélectionnées</span>
                <button
                  onClick={handleArchiveSelected}
                  className="flex items-center px-3 py-1 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  <FiArchive className="mr-1" /> Archiver
                </button>
                <button
                  onClick={handleDeleteSelected}
                  className="flex items-center px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  <FiTrash2 className="mr-1" /> Supprimer
                </button>
              </div>
            )}
            {hasSelectedRows && activeTab === 'Trash' && (
              <div className="mb-4 flex items-center space-x-4">
                <span className="text-sm text-gray-700 font-medium">{Object.keys(rowSelection).length} lignes sélectionnées</span>
                <button
                  onClick={handleRestoreSelected}
                  className="flex items-center px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  <FiArchive className="mr-1" /> Restaurer
                </button>
                <button
                  onClick={handlePermanentDeleteSelected}
                  className="flex items-center px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  <FiTrash2 className="mr-1" /> Supprimer définitivement
                </button>
              </div>
            )}
            {filteredMembers.length > 0 ? (
              <>
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
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
                    {table.getRowModel().rows.map(row => {
                      const item = row.original;
                      const primaryDetail = memberDetails.find(d => d.memberId === item.id && d.isPrimary);
                      return (
                        <div key={item.id} className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center">
                                <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                                <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                                  {item.status}
                                </span>
                              </div>
                              <p className="mt-1 flex items-center text-gray-600">
                                <FiMail className="mr-2" /> {item.email}
                              </p>
                              <p className="mt-2 text-sm text-gray-500">
                                ID: {item.id}
                              </p>
                              {primaryDetail && (
                                <p className="mt-2 text-sm text-gray-700 flex items-center">
                                  <FiCreditCard className="mr-1" />
                                  Abonnement: <span className={`ml-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSubscriptionColor(primaryDetail.subscriptionType)}`}>{primaryDetail.subscriptionType}</span>
                                </p>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => { setSelectedMember(item); setIsViewModalOpen(true); }}
                                className="text-blue-600 hover:text-blue-900 transition-colors"
                                title="Détails"
                              >
                                <FiEye className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {table.getPageCount() > 1 && (
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm text-gray-700">
                      Page{' '}
                      <span className="font-semibold">{table.getState().pagination.pageIndex + 1}</span> de{' '}
                      <span className="font-semibold">{table.getPageCount()}</span>
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        className="p-2 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                      >
                        <FiChevronsLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="p-2 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                      >
                        <FiChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="p-2 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                      >
                        <FiChevronRight className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                        className="p-2 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                      >
                        <FiChevronsRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center text-gray-500">
                <p className="text-lg">
                  {membersToDisplay.length > 0 ? "Aucun membre trouvé correspondant aux filtres." : "Aucune donnée à afficher. Veuillez choisir un filtre ou ajouter un membre."}
                </p>
              </div>
            )}
          </div>

          <MemberEntryModal
            isOpen={isMemberEntryModalOpen}
            onClose={() =>


            setIsMemberEntryModalOpen(false)}
            onSave={handleAddMember}
          />
          <ViewMemberModal
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            member={selectedMember}
            memberDetails={memberDetails}
          />
          <UpdateMemberModal
            isOpen={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(false)}
            member={selectedMember}
            memberDetails={memberDetails.filter(d => d.memberId === selectedMember?.id)}
            onUpdateMember={handleUpdateMember}
            onUpdateDetail={handleUpdateDetail}
            onSetPrimaryDetail={handleSetPrimaryDetail}
            // onAddDetail={handleAddDetail}
            onRemoveDetail={handleRemoveDetail}
          />
          <ConfirmModal
            isOpen={isArchiveModalOpen}
            onClose={() => setIsArchiveModalOpen(false)}
            onConfirm={() => selectedMember && handleArchiveMember(selectedMember.id)}
            title="Archiver le membre"
            message={`Voulez-vous vraiment archiver ${selectedMember?.name} ? Cette action peut être annulée.`}
            confirmText="Archiver"
            confirmColor="bg-yellow-500"
          />
          <ConfirmModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={() => selectedMember && handleMoveToTrash(selectedMember.id)}
            title="Supprimer le membre"
            message={`Voulez-vous vraiment déplacer ${selectedMember?.name} vers la corbeille ? Cette action peut être annulée.`}
            confirmText="Supprimer"
            confirmColor="bg-red-500"
          />
          <ConfirmModal
            isOpen={isPermanentDeleteModalOpen}
            onClose={() => setIsPermanentDeleteModalOpen(false)}
            onConfirm={() => selectedMember && handlePermanentDelete(selectedMember.id)}
            title="Suppression définitive"
            message={`Voulez-vous vraiment supprimer définitivement ${selectedMember?.name} ? Cette action est irréversible.`}
            confirmText="Supprimer définitivement"
            confirmColor="bg-red-600"
          />
          <ExportModal
            isOpen={isExportModalOpen}
            onClose={() => setIsExportModalOpen(false)}
            onExport={handleExport}
          />
          <ImportModal
            isOpen={isImportModalOpen}
            onClose={() => setIsImportModalOpen(false)}
            onImport={handleImportFromCsv}
          />
          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification(null)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MembersManagement;
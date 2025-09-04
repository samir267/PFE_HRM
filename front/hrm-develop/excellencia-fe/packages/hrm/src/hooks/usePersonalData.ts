import { useState, useEffect, useCallback } from 'react';
import { personalDataService, PersonalIdentity, BirthInformation, Nationality, Employee, PostalAddress, PhoneContact, ElectronicContact, EmergencyContact, MaritalStatus, Dependant, BankAccount } from '../services/personalData.service';
import { useApi, useApiList, useApiForm, useCrudApi } from './useApi';

// Hook pour gérer les données personnelles d'un employé
export function useEmployeePersonalData(employeeId?: string) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployee = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await personalDataService.getEmployee(id);
      if (response.success && response.data) {
        setEmployee(response.data);
      } else {
        setError(response.error || 'Erreur lors du chargement des données employé');
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur inattendue s\'est produite');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEmployee = useCallback(async (data: Partial<Employee>) => {
    if (!employeeId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await personalDataService.updateEmployee(employeeId, data);
      if (response.success && response.data) {
        setEmployee(response.data);
        return response;
      } else {
        setError(response.error || 'Erreur lors de la mise à jour');
        return response;
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur inattendue s\'est produite');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [employeeId]);

  useEffect(() => {
    if (employeeId) {
      fetchEmployee(employeeId);
    }
  }, [employeeId, fetchEmployee]);

  return {
    employee,
    loading,
    error,
    fetchEmployee,
    updateEmployee,
    setEmployee
  };
}

// Hook pour gérer les adresses d'un employé
export function useEmployeeAddresses(employeeId?: string) {
  const {
    data: addresses,
    loading,
    error,
    fetchData,
    refresh
  } = useApiList(
    employeeId ? personalDataService.getEmployeeAddresses.bind(null, employeeId) : () => Promise.resolve({ success: false, data: [] }),
    {}
  );

  const createAddress = useCallback(async (addressData: Omit<PostalAddress, 'id'>) => {
    if (!employeeId) return { success: false, error: 'ID employé requis' };
    const response = await personalDataService.createAddress(employeeId, addressData);
    if (response.success) {
      refresh();
    }
    return response;
  }, [employeeId, refresh]);

  const updateAddress = useCallback(async (addressId: string, addressData: Partial<PostalAddress>) => {
    if (!employeeId) return { success: false, error: 'ID employé requis' };
    const response = await personalDataService.updateAddress(employeeId, addressId, addressData);
    if (response.success) {
      refresh();
    }
    return response;
  }, [employeeId, refresh]);

  return {
    addresses,
    loading,
    error,
    createAddress,
    updateAddress,
    refresh
  };
}

// Hook pour gérer les contacts téléphoniques d'un employé
export function useEmployeePhoneContacts(employeeId?: string) {
  const {
    data: phoneContacts,
    loading,
    error,
    fetchData,
    refresh
  } = useApiList(
    employeeId ? personalDataService.getEmployeePhoneContacts.bind(null, employeeId) : () => Promise.resolve({ success: false, data: [] }),
    {}
  );

  const createPhoneContact = useCallback(async (phoneData: Omit<PhoneContact, 'id'>) => {
    if (!employeeId) return { success: false, error: 'ID employé requis' };
    const response = await personalDataService.createPhoneContact(employeeId, phoneData);
    if (response.success) {
      refresh();
    }
    return response;
  }, [employeeId, refresh]);

  const updatePhoneContact = useCallback(async (phoneId: string, phoneData: Partial<PhoneContact>) => {
    if (!employeeId) return { success: false, error: 'ID employé requis' };
    const response = await personalDataService.updatePhoneContact(employeeId, phoneId, phoneData);
    if (response.success) {
      refresh();
    }
    return response;
  }, [employeeId, refresh]);

  return {
    phoneContacts,
    loading,
    error,
    createPhoneContact,
    updatePhoneContact,
    refresh
  };
}

// Hook pour gérer les contacts d'urgence d'un employé
export function useEmployeeEmergencyContacts(employeeId?: string) {
  const {
    data: emergencyContacts,
    loading,
    error,
    fetchData,
    refresh
  } = useApiList(
    employeeId ? personalDataService.getEmployeePhoneContacts.bind(null, employeeId) : () => Promise.resolve({ success: false, data: [] }),
    {}
  );

  const createEmergencyContact = useCallback(async (contactData: Omit<EmergencyContact, 'id'>) => {
    if (!employeeId) return { success: false, error: 'ID employé requis' };
    const response = await personalDataService.createEmergencyContact(employeeId, contactData);
    if (response.success) {
      refresh();
    }
    return response;
  }, [employeeId, refresh]);

  const updateEmergencyContact = useCallback(async (contactId: string, contactData: Partial<EmergencyContact>) => {
    if (!employeeId) return { success: false, error: 'ID employé requis' };
    const response = await personalDataService.updateEmergencyContact(employeeId, contactId, contactData);
    if (response.success) {
      refresh();
    }
    return response;
  }, [employeeId, refresh]);

  return {
    emergencyContacts,
    loading,
    error,
    createEmergencyContact,
    updateEmergencyContact,
    refresh
  };
}

// Hook pour gérer les situations familiales d'un employé
export function useEmployeeFamilySituation(employeeId?: string) {
  const [maritalStatuses, setMaritalStatuses] = useState<MaritalStatus[]>([]);
  const [dependants, setDependants] = useState<Dependant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFamilyData = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const [maritalResponse, dependantsResponse] = await Promise.all([
        personalDataService.getMaritalStatusesByEmployee(id),
        personalDataService.getDependantsByEmployee(id)
      ]);

      if (maritalResponse.success) {
        setMaritalStatuses(maritalResponse.data || []);
      }
      if (dependantsResponse.success) {
        setDependants(dependantsResponse.data || []);
      }

      if (!maritalResponse.success || !dependantsResponse.success) {
        setError('Erreur lors du chargement des données familiales');
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur inattendue s\'est produite');
    } finally {
      setLoading(false);
    }
  }, []);

  const createMaritalStatus = useCallback(async (maritalData: Omit<MaritalStatus, 'id'>) => {
    if (!employeeId) return { success: false, error: 'ID employé requis' };
    const response = await personalDataService.createMaritalStatus(maritalData);
    if (response.success) {
      fetchFamilyData(employeeId);
    }
    return response;
  }, [employeeId, fetchFamilyData]);

  const createDependant = useCallback(async (dependantData: Omit<Dependant, 'id'>) => {
    if (!employeeId) return { success: false, error: 'ID employé requis' };
    const response = await personalDataService.createDependant(dependantData);
    if (response.success) {
      fetchFamilyData(employeeId);
    }
    return response;
  }, [employeeId, fetchFamilyData]);

  useEffect(() => {
    if (employeeId) {
      fetchFamilyData(employeeId);
    }
  }, [employeeId, fetchFamilyData]);

  return {
    maritalStatuses,
    dependants,
    loading,
    error,
    createMaritalStatus,
    createDependant,
    refresh: () => employeeId && fetchFamilyData(employeeId)
  };
}

// Hook pour gérer les comptes bancaires d'un employé
export function useEmployeeBankAccounts(employeeId?: string) {
  const {
    data: bankAccounts,
    loading,
    error,
    fetchData,
    refresh
  } = useApiList(
    employeeId ? personalDataService.getEmployeeBankAccounts.bind(null, employeeId) : () => Promise.resolve({ success: false, data: [] }),
    {}
  );

  const createBankAccount = useCallback(async (bankData: Omit<BankAccount, 'id'>) => {
    if (!employeeId) return { success: false, error: 'ID employé requis' };
    const response = await personalDataService.createBankAccount(bankData);
    if (response.success) {
      refresh();
    }
    return response;
  }, [employeeId, refresh]);

  const updateBankAccount = useCallback(async (accountId: string, bankData: Partial<BankAccount>) => {
    const response = await personalDataService.updateBankAccount(accountId, bankData);
    if (response.success) {
      refresh();
    }
    return response;
  }, [refresh]);

  return {
    bankAccounts,
    loading,
    error,
    createBankAccount,
    updateBankAccount,
    refresh
  };
}

// Hook pour gérer les informations personnelles d'un employé
export function useEmployeePersonalIdentity(employeeId?: string) {
  const [personalIdentity, setPersonalIdentity] = useState<PersonalIdentity | null>(null);
  const [birthInformation, setBirthInformation] = useState<BirthInformation | null>(null);
  const [nationalities, setNationalities] = useState<Nationality[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPersonalIdentity = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await personalDataService.getPersonalIdentity(id);
      if (response.success && response.data) {
        setPersonalIdentity(response.data);
        
        // Récupérer les informations de naissance
        const birthResponse = await personalDataService.getBirthInformation(id);
        if (birthResponse.success && birthResponse.data) {
          setBirthInformation(birthResponse.data);
        }
      } else {
        setError(response.error || 'Erreur lors du chargement des informations personnelles');
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur inattendue s\'est produite');
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePersonalIdentity = useCallback(async (identityData: Partial<PersonalIdentity>) => {
    if (!personalIdentity?.id) return { success: false, error: 'ID identité personnelle requis' };
    const response = await personalDataService.updatePersonalIdentity(personalIdentity.id, identityData);
    if (response.success && response.data) {
      setPersonalIdentity(response.data);
    }
    return response;
  }, [personalIdentity?.id]);

  const updateBirthInformation = useCallback(async (birthData: Partial<BirthInformation>) => {
    if (!personalIdentity?.id) return { success: false, error: 'ID identité personnelle requis' };
    const response = await personalDataService.updateBirthInformation(personalIdentity.id, birthData);
    if (response.success && response.data) {
      setBirthInformation(response.data);
    }
    return response;
  }, [personalIdentity?.id]);

  useEffect(() => {
    if (employeeId) {
      fetchPersonalIdentity(employeeId);
    }
  }, [employeeId, fetchPersonalIdentity]);

  return {
    personalIdentity,
    birthInformation,
    nationalities,
    loading,
    error,
    updatePersonalIdentity,
    updateBirthInformation,
    refresh: () => employeeId && fetchPersonalIdentity(employeeId)
  };
}

// Hook pour créer un nouvel employé
export function useCreateEmployee() {
  const {
    formData,
    errors,
    loading,
    success,
    updateField,
    updateForm,
    submit,
    reset
  } = useApiForm(personalDataService.createEmployee, {
    personalIdentity: {
      title: '',
      firstName: '',
      middleName: '',
      lastName: '',
      suffix: '',
      preferredName: '',
      maidenName: '',
      priorLastName1: '',
      priorLastName2: '',
      gender: 'Male',
      birthDate: '',
      dateOfDeath: '',
      cityOfBirth: '',
      countryOfBirth: '',
      nationalIdCountryCode: '',
      nationalNumber: '',
      deliveryDate: '',
      corporateId: ''
    },
    birthInformation: {
      personalIdentityId: '',
      placeOfBirth: '',
      countryOfBirthCode: '',
      county: ''
    },
    nationalities: [{
      personalIdentityId: '',
      nationalityCountryCode: '',
      isPrimary: true,
      isResident: false
    }]
  });

  return {
    formData,
    errors,
    loading,
    success,
    updateField,
    updateForm,
    submit,
    reset
  };
}

// Hook pour gérer les opérations CRUD complètes sur les employés
export function useEmployeeCRUD() {
  return useCrudApi(
    personalDataService.createEmployee,
    personalDataService.getEmployee,
    personalDataService.updateEmployee,
    personalDataService.deleteEmployee,
    personalDataService.getAllEmployees
  );
}



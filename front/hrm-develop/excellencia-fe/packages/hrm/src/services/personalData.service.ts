import { apiService, ApiResponse } from './api';

// Types pour les données personnelles basés sur le backend existant
export interface PersonalIdentity {
  id?: string;
  title: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  suffix?: string;
  preferredName?: string;
  maidenName?: string;
  priorLastName1?: string;
  priorLastName2?: string;
  gender: 'Female' | 'Male' | 'Other' | 'Prefer not to say';
  birthDate: string;
  dateOfDeath?: string;
  cityOfBirth: string;
  countryOfBirth: string;
  nationalIdCountryCode?: string;
  nationalNumber?: string;
  deliveryDate?: string;
  corporateId?: string;
}

export interface BirthInformation {
  id?: string;
  personalIdentityId: string;
  placeOfBirth: string;
  countryOfBirthCode: string;
  county?: string;
}

export interface Nationality {
  id?: string;
  personalIdentityId: string;
  nationalityCountryCode: string;
  isPrimary: boolean;
  isResident: boolean;
}

export interface Employee {
  id?: string;
  personalIdentity: PersonalIdentity;
  birthInformation: BirthInformation;
  nationalities: Nationality[];
}

export interface PostalAddress {
  id?: string;
  employeeId: string;
  addressType: 'home' | 'work' | 'mailing';
  street1: string;
  street2?: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  isPrimary: boolean;
}

export interface PhoneContact {
  id?: string;
  employeeId: string;
  phoneType: 'mobile' | 'work' | 'home' | 'fax';
  phoneNumber: string;
  extension?: string;
  isPrimary: boolean;
  isActive: boolean;
}

export interface ElectronicContact {
  id?: string;
  employeeId: string;
  contactType: 'email' | 'linkedin' | 'skype' | 'other';
  contactValue: string;
  isPrimary: boolean;
  isActive: boolean;
}

export interface EmergencyContact {
  id?: string;
  employeeId: string;
  priority: number;
  title: string;
  lastName: string;
  firstName: string;
  relationship: string;
  phone: string;
  email?: string;
  isActive: boolean;
}

export interface ContactPreference {
  id?: string;
  employeeId: string;
  preferredContactMethod: 'email' | 'phone' | 'sms';
  preferredContactTime: 'morning' | 'afternoon' | 'evening' | 'anytime';
  allowMarketingCommunications: boolean;
  allowEmergencyNotifications: boolean;
}

export interface MaritalStatus {
  id?: string;
  personalIdentityId: string;
  status: 'Single' | 'Married' | 'Divorced' | 'Widowed' | 'Separated';
  effectiveDate: string;
  endDate?: string;
  spouseName?: string;
  spouseFirstName?: string;
  spouseGender?: 'Female' | 'Male' | 'Other';
  spouseEmployeeId?: string;
}

export interface Dependant {
  id?: string;
  personalIdentityId: string;
  relationship: 'Spouse' | 'Child' | 'Parent' | 'Sibling' | 'Other';
  lastName: string;
  firstName: string;
  gender: 'Female' | 'Male' | 'Other';
  birthDate: string;
  isActive: boolean;
}

export interface BankAccount {
  id?: string;
  employeeId: string;
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  routingNumber: string;
  accountType: 'Checking' | 'Savings';
  isActive: boolean;
}

export interface Document {
  id?: string;
  employeeId: string;
  type: string;
  name: string;
  fileUrl: string;
  uploadDate: string;
  expiryDate?: string;
  isActive: boolean;
}

export interface Equipment {
  id?: string;
  employeeId: string;
  type: string;
  name: string;
  serialNumber?: string;
  assignmentDate: string;
  returnDate?: string;
  status: 'assigned' | 'returned' | 'maintenance';
}

export interface MedicalExpense {
  id?: string;
  employeeId: string;
  type: string;
  amount: number;
  date: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
}

// Service pour les données personnelles adapté aux endpoints backend existants
class PersonalDataService {
  // === GESTION DES EMPLOYÉS ===
  async createEmployee(employeeData: Omit<Employee, 'id'>): Promise<ApiResponse<Employee>> {
    return await apiService.postPersonalData('/employees', employeeData);
  }

  async getEmployee(employeeId: string): Promise<ApiResponse<Employee>> {
    return await apiService.getPersonalData(`/employees/${employeeId}`);
  }

  async updateEmployee(employeeId: string, employeeData: Partial<Employee>): Promise<ApiResponse<Employee>> {
    return await apiService.putPersonalData(`/employees/${employeeId}`, employeeData);
  }

  async deleteEmployee(employeeId: string): Promise<ApiResponse> {
    return await apiService.deletePersonalData(`/employees/${employeeId}`);
  }

  async getAllEmployees(params?: {
    page?: number;
    limit?: number;
    search?: string;
    department?: string;
  }): Promise<ApiResponse<Employee[]>> {
    return await apiService.getPersonalData('/employees', params);
  }

  // === GESTION DES IDENTITÉS PERSONNELLES ===
  async updatePersonalIdentity(identityId: string, identityData: Partial<PersonalIdentity>): Promise<ApiResponse<PersonalIdentity>> {
    return await apiService.putPersonalData(`/personal-identity/${identityId}`, identityData);
  }

  async getPersonalIdentity(identityId: string): Promise<ApiResponse<PersonalIdentity>> {
    return await apiService.getPersonalData(`/personal-identity/${identityId}`);
  }

  async getAllPersonalIdentities(): Promise<ApiResponse<PersonalIdentity[]>> {
    return await apiService.getPersonalData('/personal-identities');
  }

  async deletePersonalIdentity(identityId: string): Promise<ApiResponse> {
    return await apiService.deletePersonalData(`/personal-identity/${identityId}`);
  }

  // === GESTION DES INFORMATIONS DE NAISSANCE ===
  async updateBirthInformation(personalIdentityId: string, birthData: Partial<BirthInformation>): Promise<ApiResponse<BirthInformation>> {
    return await apiService.putPersonalData(`/birth-information/${personalIdentityId}`, birthData);
  }

  async getBirthInformation(personalIdentityId: string): Promise<ApiResponse<BirthInformation>> {
    return await apiService.getPersonalData(`/birth-information/${personalIdentityId}`);
  }

  // === GESTION DES NATIONALITÉS ===
  async createNationalities(nationalitiesData: Omit<Nationality, 'id'>[]): Promise<ApiResponse<Nationality[]>> {
    return await apiService.postPersonalData('/nationalities', nationalitiesData);
  }

  // === GESTION DES ADRESSES POSTALES ===
  async createAddress(employeeId: string, addressData: Omit<PostalAddress, 'id'>): Promise<ApiResponse<PostalAddress>> {
    return await apiService.postPersonalData(`/employees/${employeeId}/addresses`, addressData);
  }

  async getEmployeeAddresses(employeeId: string): Promise<ApiResponse<PostalAddress[]>> {
    return await apiService.getPersonalData(`/employees/${employeeId}/addresses`);
  }

  async updateAddress(employeeId: string, addressId: string, addressData: Partial<PostalAddress>): Promise<ApiResponse<PostalAddress>> {
    return await apiService.putPersonalData(`/employees/${employeeId}/addresses/${addressId}`, addressData);
  }

  async getAddressById(employeeId: string, addressId: string): Promise<ApiResponse<PostalAddress>> {
    return await apiService.getPersonalData(`/employees/${employeeId}/addresses/${addressId}`);
  }

  // === GESTION DES CONTACTS TÉLÉPHONIQUES ===
  async createPhoneContact(employeeId: string, phoneData: Omit<PhoneContact, 'id'>): Promise<ApiResponse<PhoneContact>> {
    return await apiService.postPersonalData(`/employees/${employeeId}/phones`, phoneData);
  }

  async getEmployeePhoneContacts(employeeId: string): Promise<ApiResponse<PhoneContact[]>> {
    return await apiService.getPersonalData(`/employees/${employeeId}/phones`);
  }

  async updatePhoneContact(employeeId: string, phoneId: string, phoneData: Partial<PhoneContact>): Promise<ApiResponse<PhoneContact>> {
    return await apiService.putPersonalData(`/employees/${employeeId}/phones/${phoneId}`, phoneData);
  }

  // === GESTION DES CONTACTS ÉLECTRONIQUES ===
  async createElectronicContact(employeeId: string, contactData: Omit<ElectronicContact, 'id'>): Promise<ApiResponse<ElectronicContact>> {
    return await apiService.postPersonalData(`/employees/${employeeId}/electronic-contacts`, contactData);
  }

  async updateElectronicContact(employeeId: string, contactId: string, contactData: Partial<ElectronicContact>): Promise<ApiResponse<ElectronicContact>> {
    return await apiService.putPersonalData(`/employees/${employeeId}/electronic-contacts/${contactId}`, contactData);
  }

  // === GESTION DES CONTACTS D'URGENCE ===
  async createEmergencyContact(employeeId: string, contactData: Omit<EmergencyContact, 'id'>): Promise<ApiResponse<EmergencyContact>> {
    return await apiService.postPersonalData(`/employees/${employeeId}/emergency-contacts`, contactData);
  }

  async updateEmergencyContact(employeeId: string, contactId: string, contactData: Partial<EmergencyContact>): Promise<ApiResponse<EmergencyContact>> {
    return await apiService.putPersonalData(`/employees/${employeeId}/emergency-contacts/${contactId}`, contactData);
  }

  // === GESTION DES PRÉFÉRENCES DE CONTACT ===
  async updateContactPreferences(employeeId: string, preferencesData: ContactPreference): Promise<ApiResponse<ContactPreference>> {
    return await apiService.postPersonalData(`/employees/${employeeId}/contact-preferences`, preferencesData);
  }

  async getContactPreferences(employeeId: string): Promise<ApiResponse<ContactPreference>> {
    return await apiService.getPersonalData(`/employees/${employeeId}/contact-preferences`);
  }

  // === VALIDATION DES CONTACTS ===
  async validateContactInformation(employeeId: string): Promise<ApiResponse<any>> {
    return await apiService.postPersonalData(`/employees/${employeeId}/contacts/validate`, {});
  }

  async initiateContactVerification(employeeId: string, contactType: string, contactId: string): Promise<ApiResponse<any>> {
    return await apiService.postPersonalData(`/employees/${employeeId}/contacts/${contactType}/${contactId}/verify`, {});
  }

  // === GESTION DES SITUATIONS FAMILIALES ===
  async createMaritalStatus(maritalData: Omit<MaritalStatus, 'id'>): Promise<ApiResponse<MaritalStatus>> {
    return await apiService.postPersonalData('/marital-status', maritalData);
  }

  async getMaritalStatus(maritalStatusId: string): Promise<ApiResponse<MaritalStatus>> {
    return await apiService.getPersonalData(`/marital-status/${maritalStatusId}`);
  }

  async getMaritalStatusesByEmployee(employeeId: string): Promise<ApiResponse<MaritalStatus[]>> {
    return await apiService.getPersonalData(`/marital-status/employee/${employeeId}`);
  }

  async updateMaritalStatus(maritalStatusId: string, maritalData: Partial<MaritalStatus>): Promise<ApiResponse<MaritalStatus>> {
    return await apiService.putPersonalData(`/marital-status/${maritalStatusId}`, maritalData);
  }

  async deleteMaritalStatus(maritalStatusId: string): Promise<ApiResponse> {
    return await apiService.deletePersonalData(`/marital-status/${maritalStatusId}`);
  }

  // === GESTION DES DÉPENDANTS ===
  async createDependant(dependantData: Omit<Dependant, 'id'>): Promise<ApiResponse<Dependant>> {
    return await apiService.postPersonalData('/dependant', dependantData);
  }

  async getDependant(dependantId: string): Promise<ApiResponse<Dependant>> {
    return await apiService.getPersonalData(`/dependant/${dependantId}`);
  }

  async getDependantsByEmployee(employeeId: string): Promise<ApiResponse<Dependant[]>> {
    return await apiService.getPersonalData(`/dependant/employee/${employeeId}`);
  }

  async updateDependant(dependantId: string, dependantData: Partial<Dependant>): Promise<ApiResponse<Dependant>> {
    return await apiService.putPersonalData(`/dependant/${dependantId}`, dependantData);
  }

  async deleteDependant(dependantId: string): Promise<ApiResponse> {
    return await apiService.deletePersonalData(`/dependant/${dependantId}`);
  }

  // === VALIDATION DES SITUATIONS FAMILIALES ===
  async validateFamilySituation(employeeId: string): Promise<ApiResponse<any>> {
    return await apiService.getPersonalData(`/validate/${employeeId}`);
  }

  // === GESTION DES COMPTES BANCAIRES (à implémenter dans le backend) ===
  async createBankAccount(bankData: Omit<BankAccount, 'id'>): Promise<ApiResponse<BankAccount>> {
    return await apiService.postPersonalData('/bank-accounts', bankData);
  }

  async getEmployeeBankAccounts(employeeId: string): Promise<ApiResponse<BankAccount[]>> {
    return await apiService.getPersonalData(`/bank-accounts/employee/${employeeId}`);
  }

  async updateBankAccount(accountId: string, bankData: Partial<BankAccount>): Promise<ApiResponse<BankAccount>> {
    return await apiService.putPersonalData(`/bank-accounts/${accountId}`, bankData);
  }

  async deleteBankAccount(accountId: string): Promise<ApiResponse> {
    return await apiService.deletePersonalData(`/bank-accounts/${accountId}`);
  }

  // === GESTION DES DOCUMENTS (à implémenter dans le backend) ===
  async uploadDocument(documentData: FormData): Promise<ApiResponse<Document>> {
    return await apiService.postPersonalData('/documents/upload', documentData);
  }

  async getEmployeeDocuments(employeeId: string): Promise<ApiResponse<Document[]>> {
    return await apiService.getPersonalData(`/documents/employee/${employeeId}`);
  }

  async deleteDocument(documentId: string): Promise<ApiResponse> {
    return await apiService.deletePersonalData(`/documents/${documentId}`);
  }

  // === GESTION DES ÉQUIPEMENTS (à implémenter dans le backend) ===
  async assignEquipment(equipmentData: Omit<Equipment, 'id'>): Promise<ApiResponse<Equipment>> {
    return await apiService.postPersonalData('/equipment/assign', equipmentData);
  }

  async getEmployeeEquipment(employeeId: string): Promise<ApiResponse<Equipment[]>> {
    return await apiService.getPersonalData(`/equipment/employee/${employeeId}`);
  }

  async returnEquipment(equipmentId: string): Promise<ApiResponse<Equipment>> {
    return await apiService.putPersonalData(`/equipment/${equipmentId}/return`, {});
  }

  // === GESTION DES DÉPENSES MÉDICALES (à implémenter dans le backend) ===
  async createMedicalExpense(expenseData: Omit<MedicalExpense, 'id'>): Promise<ApiResponse<MedicalExpense>> {
    return await apiService.postPersonalData('/medical-expenses', expenseData);
  }

  async getEmployeeMedicalExpenses(employeeId: string): Promise<ApiResponse<MedicalExpense[]>> {
    return await apiService.getPersonalData(`/medical-expenses/employee/${employeeId}`);
  }

  async updateMedicalExpense(expenseId: string, expenseData: Partial<MedicalExpense>): Promise<ApiResponse<MedicalExpense>> {
    return await apiService.putPersonalData(`/medical-expenses/${expenseId}`, expenseData);
  }

  async deleteMedicalExpense(expenseId: string): Promise<ApiResponse> {
    return await apiService.deletePersonalData(`/medical-expenses/${expenseId}`);
  }

  // === GESTION DES DONNÉES MONOLITHIQUES (pour compatibilité) ===
  async createEmployeeInformation(employeeData: any): Promise<ApiResponse<any>> {
    try {
      // Transformer les données du frontend vers la structure attendue par le backend
      const backendData = this.transformFrontendToBackend(employeeData);
      
      // Utiliser l'endpoint monolithique avec la structure correcte
      const response = await apiService.postPersonalData('/api/employeeInformation', backendData);
      
      // Debug: afficher la réponse pour comprendre la structure
      console.log('Backend response:', response);
      
      // Le backend retourne probablement une réponse directe sans propriété 'success'
      // Si la réponse existe et n'a pas d'erreur, c'est un succès
      if (response && !response.error) {
        return {
          success: true,
          data: response.data || response,
          message: 'Employee information created successfully'
        };
      }

      // Si la réponse a une propriété success, l'utiliser
      if (response.success) {
        return {
          success: true,
          data: response.data,
          message: 'Employee information created successfully'
        };
      }

      // Si on arrive ici, il y a une erreur
      throw new Error(response.error || 'Failed to create employee information');
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

async getEmployees(): Promise<any[]> {
  const response = await apiService.getPersonalData(`/api/employeeInformation`);
  return response;
}


addPhoneContact(employeeId: string, contactData: any): Promise<any> {
  return apiService.postPersonalData(
    `/api/employees/${employeeId}/phones`,
    contactData
  );
}
// Récupérer tous les téléphones d'un employé
async getEmployeePhones(employeeId: string): Promise<any[]> {
  return apiService.getPersonalData(
    `/api/employees/${employeeId}/phones`
  );
}





// Mettre à jour un téléphone spécifique
async updateEmployeePhone(employeeId: string, phoneId: string, data: any): Promise<any> {
  return apiService.putPersonalData(
    `/api/employees/${employeeId}/phones/${phoneId}`,
    data
  );
}


async addEmailContact(employeeId: string, contactData: any): Promise<any> {
  const response = await apiService.postPersonalData(
    `/api/employees/${employeeId}/electronic-contacts`,
    contactData
  );
  return response;
}
async getEmployeeContacts(employeeId: string): Promise<any[]> {
  const response = await apiService.getPersonalData(
    `/api/employees/${employeeId}/electronic-contacts`
  );
  return response;
}

// 🔹 Récupérer tous les contacts électroniques (sans filtrer par employé)
async getAllContacts(): Promise<any[]> {
  const response = await apiService.getPersonalData(
    `/api/employees/electronic-contacts`
  );
  return response;
}

async editContact(employeeId: string, contactId: string, updatedData: any): Promise<any> {
  const response = await apiService.putPersonalData(
    `/api/employees/${employeeId}/electronic-contacts/${contactId}`,
    updatedData
  );
  return response
}

  

  // Méthode pour transformer les données du frontend vers la structure du backend
  private transformFrontendToBackend(frontendData: any): any {
    // Transformer les citoyennetés
    const citizenships = frontendData.citizenships?.map((citizenship: any) => 
      citizenship.countryCode || citizenship
    ) || [];

    // Transformer l'historique du statut marital
    const maritalStatusHistory = frontendData.maritalStatusHistory?.map((status: any) => ({
      status: status.status?.toUpperCase() || status.status,
      from: status.effectiveDate || status.from,
      to: status.to || null
    })) || [];

    // Transformer les membres de la famille
    const familyMembers = frontendData.familyMembers?.map((member: any) => ({
      name: `${member.firstName || ''} ${member.lastName || ''}`.trim(),
      relation: member.relationship || member.relation
    })) || [];

    // Transformer les contacts d'urgence
    const emergencyContacts = frontendData.emergencyContacts?.map((contact: any) => ({
      name: `${contact.firstName || ''} ${contact.lastName || ''}`.trim(),
      phone: contact.phone,
      relation: contact.relationship || 'Emergency Contact'
    })) || [];

    // Transformer les adresses
    const homeAddress = frontendData.homeAddress || {};
    const workAddress = frontendData.workAddress || {};

    // Transformer le compte bancaire
    const bankAccount = frontendData.bankAccount || {};

    return {
      title: frontendData.title?.toUpperCase() || frontendData.title,
      firstName: frontendData.firstName,
      middleName: frontendData.middleName,
      knownAs: frontendData.knownAs,
      lastName: frontendData.lastName,
      suffix: frontendData.suffix,
      preferredName: frontendData.preferredName,
      maidenName: frontendData.maidenName,
      priorLastName1: frontendData.priorLastName1,
      priorLastName2: frontendData.priorLastName2,
      profilePhoto: frontendData.profilePhoto || "",
      gender: frontendData.gender?.toUpperCase() || frontendData.gender,
      birthDate: frontendData.birthDate,
      age: frontendData.age,
      dateOfDeath: frontendData.dateOfDeath || "",
      cityOfBirth: frontendData.cityOfBirth || "",
      county: frontendData.county || "",
      countryOfBirth: frontendData.countryOfBirth || "",
      nationalIdCountryCode: frontendData.nationalIdCountryCode || "",
      nationalNumber: frontendData.nationalNumber || "",
      deliveryDate: frontendData.deliveryDate || "",
      corporateId: frontendData.corporateId,
      spouseName: frontendData.spouseName || "",
      spouseFirstName: frontendData.spouseFirstName || "",
      spouseGender: frontendData.spouseGender?.toUpperCase() || "",
      spouseEmployeeId: frontendData.spouseEmployeeId || "",
      citizenships: citizenships,
      maritalStatusHistory: maritalStatusHistory,
      familyMembers: familyMembers,
      dependent1Count: frontendData.dependent1Count || 0,
      dependent2Count: frontendData.dependent2Count || 0,
      emergencyContacts: emergencyContacts,
      homeAddress: {
        street1: homeAddress.street1 || "",
        street2: homeAddress.street2 || "",
        city: homeAddress.city || "",
        stateProvince: homeAddress.stateProvince || "",
        postalCode: homeAddress.postalCode || "",
        country: homeAddress.country || ""
      },
      workAddress: {
        street1: workAddress.street1 || "",
        street2: workAddress.street2 || "",
        city: workAddress.city || "",
        stateProvince: workAddress.stateProvince || "",
        postalCode: workAddress.postalCode || "",
        country: workAddress.country || ""
      },
      personalEmail: frontendData.personalEmail,
      workEmail: frontendData.workEmail,
      mobilePhone: frontendData.mobilePhone,
      workPhone: frontendData.workPhone || "",
      hireDate: frontendData.hireDate,
      jobTitle: frontendData.jobTitle,
      department: frontendData.department,
      managerId: frontendData.managerId || "",
      bankAccount: {
        bankName: bankAccount.bankName || "",
        accountHolderName: bankAccount.accountHolderName || "",
        accountNumber: bankAccount.accountNumber || "",
        routingNumber: bankAccount.routingNumber || "",
        accountType: bankAccount.accountType?.toUpperCase() || ""
      }
    };
  }

  // === UTILITAIRES ===
  async populateCountries(): Promise<ApiResponse<any>> {
    return await apiService.postPersonalData('/country-references', {});
  }

  async validateCountryCodes(countryCodes: string[]): Promise<ApiResponse<any>> {
    return await apiService.postPersonalData('/country-references/validate', { countryCodes });
  }
}

export const personalDataService = new PersonalDataService();
export default personalDataService;

import { apiService, ApiResponse } from './api';

// Types pour les contrats d'emploi basés sur le backend adapté
export interface EmploymentContract {
  _id?: string;
  assignmentId: string;
  contractType: 'PERMANENT' | 'FIXED_TERM' | 'TEMPORARY' | 'INTERNSHIP';
  contractReference: string;
  signatureDate: string;
  effectiveDate: string;
  endDate?: string;
  documentPath?: string;
  collectiveAgreementId?: string;
  noticePeriodDays: number;
  nonCompeteClause: boolean;
  nonCompeteDurationMonths?: number;
  confidentialityClause: boolean;
  createdBy: string;
  employeeName?: string;
  department?: string;
  position?: string;
  email?: string;
  phone?: string;
  contractStatus?: 'Draft' | 'Active' | 'Expired' | 'Terminated' | 'Pending Renewal';
  contractReviewer?: string;
  workIdentifier?: string;
  contractEligibilityStatus?: 'Valid' | 'Invalid' | 'Under Review';
  managerNotes?: string;
  notes?: string;
  lastReviewDate?: string;
  probationEndDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Type pour la création d'un contrat
// Type pour la création d'un contrat compatible front
export interface CreateContractRequest {
  assignmentId: string;
  contractType: 'PERMANENT' | 'FIXED_TERM' | 'TEMPORARY' | 'INTERNSHIP';
  contractReference: string;
  signatureDate: string;
  effectiveDate: string;
  endDate?: string;
  documentPath?: string;
  collectiveAgreementId?: string;
  noticePeriodDays?: number;
  nonCompeteClause?: boolean;
  nonCompeteDurationMonths?: number;
  confidentialityClause?: boolean;
  createdBy: string;
  employeeName?: string;
  department?: string;
  position?: string;
  email?: string;
  phone?: string;
  contractStatus?: 'Draft' | 'Active' | 'Expired' | 'Terminated' | 'Pending Renewal';
  contractDetails?: {
    contractReviewer?: string;
    workIdentifier?: string;
    contractEligibilityStatus?: 'Valid' | 'Invalid' | 'Under Review';
    managerNotes?: string;
    notes?: string;
    lastReviewDate?: string;
    probationEndDate?: string;
    noticePeriod?: string;
    benefitsPackage?: string;
    salaryDetails?: string;
  };
}


// Type pour les filtres de recherche
export interface ContractFilters {
  assignmentId?: string;
  contractType?: string;
  contractStatus?: string;
  employeeName?: string;
  department?: string;
  contractEligibilityStatus?: string;
  effectiveDate?: string;
  endDate?: string;
}

// Type pour la mise à jour d'un contrat
export interface UpdateContractRequest extends Partial<CreateContractRequest> {
  _id: string;
}

class ContractService {
  // === CRUD OPERATIONS ===
  
  async createContract(contractData: CreateContractRequest): Promise<ApiResponse<EmploymentContract>> {
    return await apiService.postHiringEmployee('/api/v1/employment-contracts', contractData);
  }

  async getAllContracts(filters: ContractFilters = {}): Promise<ApiResponse<EmploymentContract[]>> {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    const url = `/api/v1/employment-contracts${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return await apiService.getHiringEmployee(url);
  }

  async getContractById(contractId: string): Promise<ApiResponse<EmploymentContract>> {
    return await apiService.getHiringEmployee(`/api/v1/employment-contracts/${contractId}`);
  }

  async updateContract(contractId: string, contractData: Partial<CreateContractRequest>): Promise<ApiResponse<EmploymentContract>> {
    return await apiService.putHiringEmployee(`/api/v1/employment-contracts/${contractId}`, contractData);
  }

  async deleteContract(contractId: string): Promise<ApiResponse<void>> {
    return await apiService.deleteHiringEmployee(`/api/v1/employment-contracts/${contractId}`);
  }

  // === SPECIALIZED QUERIES ===

  async getContractsByEmployeeName(employeeName: string): Promise<ApiResponse<EmploymentContract[]>> {
    return await apiService.getHiringEmployee(`/api/v1/employment-contracts/employee/${encodeURIComponent(employeeName)}`);
  }

  async getActiveContracts(): Promise<ApiResponse<EmploymentContract[]>> {
    return await apiService.getHiringEmployee('/api/v1/employment-contracts/status/active');
  }

  async getContractsByStatus(status: string): Promise<ApiResponse<EmploymentContract[]>> {
    return await apiService.getHiringEmployee(`/api/v1/employment-contracts/status/${status}`);
  }

  async getContractsByDepartment(department: string): Promise<ApiResponse<EmploymentContract[]>> {
    return await apiService.getHiringEmployee(`/api/v1/employment-contracts/department/${encodeURIComponent(department)}`);
  }

  async getExpiringContracts(daysThreshold: number = 30): Promise<ApiResponse<EmploymentContract[]>> {
    return await apiService.getHiringEmployee(`/api/v1/employment-contracts/expiring?days=${daysThreshold}`);
  }

  async updateContractStatus(contractId: string, status: string): Promise<ApiResponse<EmploymentContract>> {
    return await apiService.putHiringEmployee(`/api/v1/employment-contracts/${contractId}/status`, { status });
  }

  async getContractStatistics(): Promise<ApiResponse<any>> {
    return await apiService.getHiringEmployee('/api/v1/employment-contracts/statistics');
  }

  // === DATA TRANSFORMATION ===

transformFrontendToBackend(frontendData: any) {
  const mapContractType = (type: string) => {
    switch (type.toLowerCase()) {
      case 'full-time':
      case 'permanent':
        return 'PERMANENT';
      case 'part-time':
      case 'fixed_term':
      case 'contract':
        return 'FIXED_TERM';
      case 'temporary':
        return 'TEMPORARY';
      case 'internship':
        return 'INTERNSHIP';
      default:
        return 'PERMANENT';
    }
  };

  return {
    contractId: frontendData.contractId,
    employeeName: frontendData.employeeName,
    contractType: mapContractType(frontendData.contractType),
    startDate: frontendData.startDate,
    endDate: frontendData.endDate,
    department: frontendData.department,
    email: frontendData.email,
    position: frontendData.position,
    phone: frontendData.phone,
    terminationReason: frontendData.terminationReason,
    contractDetails: frontendData.contractDetails
  };
}


  transformBackendToFrontend(backendData: EmploymentContract): any {
    return {
      _id: backendData._id,
      assignmentId: backendData.assignmentId,
      contractType: backendData.contractType,
      contractId: backendData.contractReference, // Mapping pour le frontend
      contractReference: backendData.contractReference,
      signatureDate: backendData.signatureDate,
      startDate: backendData.effectiveDate, // Mapping pour le frontend
      effectiveDate: backendData.effectiveDate,
      endDate: backendData.endDate,
      documentPath: backendData.documentPath,
      collectiveAgreementId: backendData.collectiveAgreementId,
      noticePeriodDays: backendData.noticePeriodDays,
      nonCompeteClause: backendData.nonCompeteClause,
      nonCompeteDurationMonths: backendData.nonCompeteDurationMonths,
      confidentialityClause: backendData.confidentialityClause,
      createdBy: backendData.createdBy,
      employeeName: backendData.employeeName,
      department: backendData.department,
      position: backendData.position,
      email: backendData.email,
      phone: backendData.phone,
      contractStatus: backendData.contractStatus,
      contractReviewer: backendData.contractReviewer,
      workIdentifier: backendData.workIdentifier,
      contractEligibilityStatus: backendData.contractEligibilityStatus,
      managerNotes: backendData.managerNotes,
      notes: backendData.notes,
      lastReviewDate: backendData.lastReviewDate,
      probationEndDate: backendData.probationEndDate,
      createdAt: backendData.createdAt,
      updatedAt: backendData.updatedAt,
      // Structure pour le frontend
      contractDetails: {
        contractReviewer: backendData.contractReviewer,
        workIdentifier: backendData.workIdentifier,
        contractEligibilityStatus: backendData.contractEligibilityStatus,
        managerNotes: backendData.managerNotes,
        notes: backendData.notes,
        lastReviewDate: backendData.lastReviewDate,
        probationEndDate: backendData.probationEndDate,
        noticePeriod: `${backendData.noticePeriodDays} days`
      }
    };
  }

  // === UTILITY METHODS ===

  getContractTypeLabel(contractType: string): string {
    const typeLabels: Record<string, string> = {
      'PERMANENT': 'Full-time',
      'FIXED_TERM': 'Part-time',
      'TEMPORARY': 'Temporary',
      'INTERNSHIP': 'Internship'
    };
    return typeLabels[contractType] || contractType;
  }

  getStatusLabel(status: string): string {
    const statusLabels: Record<string, string> = {
      'Draft': 'Draft',
      'Active': 'Active',
      'Expired': 'Expired',
      'Terminated': 'Terminated',
      'Pending Renewal': 'Pending Renewal'
    };
    return statusLabels[status] || status;
  }

  getEligibilityStatusLabel(status: string): string {
    const eligibilityLabels: Record<string, string> = {
      'Valid': 'Valid',
      'Invalid': 'Invalid',
      'Under Review': 'Under Review'
    };
    return eligibilityLabels[status] || status;
  }

  isContractExpiring(contract: EmploymentContract, daysThreshold: number = 30): boolean {
    if (!contract.endDate || contract.contractStatus !== 'Active') return false;
    
    const endDate = new Date(contract.endDate);
    const now = new Date();
    const thresholdDate = new Date();
    thresholdDate.setDate(now.getDate() + daysThreshold);
    
    return endDate <= thresholdDate && endDate >= now;
  }

  getDaysUntilExpiry(contract: EmploymentContract): number | null {
    if (!contract.endDate) return null;
    
    const endDate = new Date(contract.endDate);
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}

export const contractService = new ContractService();


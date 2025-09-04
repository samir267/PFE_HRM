import { apiService, ApiResponse } from './api';

// Type pour StaffingRequest
export interface StaffingRequest {
  id: string;              // identifiant business (ex: REQ-1234567890)
  requestTitle: string;
  department: string;
  position: string;
  numberOfVacancies: number;
  employmentType: string;
  expectedStartDate?: string; // ISO string côté front
  selectedSkillCategory: string[];
  requiredSkills: string[];
  experienceLevel: string;
  justification?: string;
  hiringManager: string;
  status: string;
  jobObjectives?: string;
  mainResponsibilities?: string;
  workLocation?: string;
  remoteWorkOptions?: string;
  salaryRange?: string;
  budget?: number;
  budgetApproval?: boolean;
  reportingStructure?: string;
  attachedDocuments?: string[];
  createdAt?: string;
  updatedAt?: string;
}

class StaffingRequestService {
  private baseUrl = '/api/v1/StaffingRequest';

  // ➡️ Créer une StaffingRequest
async createRequest(
  requestData: Omit<StaffingRequest, 'createdAt' | 'updatedAt'>
): Promise<ApiResponse<StaffingRequest>> {
  console.log('base',this.baseUrl)
  return await apiService.postHiringEmployee(this.baseUrl, requestData);
}

async updateStatus(id: string, status: string): Promise<ApiResponse<StaffingRequest>> {
  const endpoint = `${this.baseUrl}ChangeStatus/${id}`;
  return await apiService.putHiringEmployee(endpoint, { status });
}



  // ➡️ Récupérer toutes les StaffingRequests
  async getAllRequests(): Promise<ApiResponse<StaffingRequest[]>> {
    return await apiService.getHiringEmployee(this.baseUrl);
  }

  // ➡️ Récupérer une StaffingRequest par ID MongoDB
  async getRequestById(id: string): Promise<ApiResponse<StaffingRequest>> {
    return await apiService.getHiringEmployee(`${this.baseUrl}/${id}`);
  }

  // ➡️ Récupérer par identifiant business (REQ-xxxx)
  async getRequestByBusinessId(reqId: string): Promise<ApiResponse<StaffingRequest>> {
    return await apiService.getHiringEmployee(`${this.baseUrl}/business/${reqId}`);
  }

  // ➡️ Mettre à jour une StaffingRequest
  async updateRequest(
    id: string,
    requestData: Partial<StaffingRequest>
  ): Promise<ApiResponse<StaffingRequest>> {
    return await apiService.putHiringEmployee(`${this.baseUrl}/${id}`, requestData);
  }

  // ➡️ Supprimer une StaffingRequest
  async deleteRequest(id: string): Promise<ApiResponse> {
    return await apiService.deleteHiringEmployee(`${this.baseUrl}/${id}`);
  }
}

export const staffingRequestService = new StaffingRequestService();
export default staffingRequestService;

import { apiService, ApiResponse } from './api';
import { EmploymentContract } from './contract.service';

// Type EmploymentContract


// Service pour les contrats d'emploi uniquement
class EmploymentContractService {
  private baseUrl = '/api/v1/employment-contracts';

  // Créer un contrat
  async createContract(contractData: Omit<EmploymentContract, 'id'>): Promise<ApiResponse<EmploymentContract>> {
    return await apiService.postHiringEmployee(this.baseUrl, contractData);
  }

  // Récupérer tous les contrats
  async getAllContracts(): Promise<ApiResponse<EmploymentContract[]>> {
    return await apiService.getHiringEmployee(this.baseUrl);
  }

async performAction(contractId: string, action: 'activate' | 'terminate'): Promise<ApiResponse<EmploymentContract>> {
  const endpoint = `${this.baseUrl}/${contractId}/${action}`;
  return await apiService.postHiringEmployee(endpoint, {}); 
}

}

  // Récupérer un contrat par ID
  // async getContractById(contractId: string): Promise<ApiResponse<EmploymentContract>> {
  //   return await apiService.getHiringEmployee(`${this.baseUrl}/${contractId}`);
  // }

  // // Mettre à jour un contrat
  // async updateContract(contractId: string, contractData: Partial<EmploymentContract>): Promise<ApiResponse<EmploymentContract>> {
  //   return await apiService.putHiringEmployee(`${this.baseUrl}/${contractId}`, contractData);
  // }

  // Terminer un contrat (avec date et raison)
//   async terminateContract(contractId: string, terminationData: { endDate: string; reason: string }): Promise<ApiResponse<EmploymentContract>> {
//     return await apiService.putHiringEmployee(`${this.baseUrl}/${contractId}/terminate`, terminationData);
//   }

//   // Supprimer un contrat
//   async deleteContract(contractId: string): Promise<ApiResponse> {
//     return await apiService.deleteHiringEmployee(`${this.baseUrl}/${contractId}`);
//   }
// }

export const employmentContractService = new EmploymentContractService();
export default employmentContractService;


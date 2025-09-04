import { FilterQuery, SortOrder, UpdateQuery } from 'mongoose';
import { Contract } from '../../models/Affectation/employeeContract.model';
import { IContract } from '../../types/Affectation/employeeContract.type';
export interface ContractFilters {
  contractStatus?: string;
  contractType?: string;
  department?: string;
  employeeName?: string;
  effectiveDate?: { $gte?: Date; $lte?: Date };
  contractEligibilityStatus?: string;
  assignmentId?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export class ContractService {
  
  /**
   * Créer un nouveau contrat
   */
  async createContract(contractData: Partial<IContract>): Promise<ServiceResponse<IContract>> {
    try {
      // Vérifier l'unicité de l'assignmentId
      const existingContract = await Contract.findOne({ assignmentId: contractData.contractId });
      if (existingContract) {
        return {
          success: false,
          error: 'Assignment ID already exists'
        };
      }

      const contract = new Contract(contractData);
      const savedContract = await contract.save();

      return {
        success: true,
        data: savedContract,
        message: 'Contract created successfully'
      };
    } catch (error:any) {
      console.error('Service - Create contract error:', error);
      
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map((err: any) => err.message);
        return {
          success: false,
          error: `Validation error: ${validationErrors.join(', ')}`
        };
      }
      
      return {
        success: false,
        error: error.message || 'Failed to create contract'
      };
    }
  }

  /**
   * Récupérer un contrat par ID
   */
  async getContractById(id: string): Promise<ServiceResponse<IContract>> {
    try {
      const contract = await Contract.findById(id);
      
      if (!contract) {
        return {
          success: false,
          error: 'Contract not found'
        };
      }

      return {
        success: true,
        data: contract
      };
    } catch (error) {
      console.error('Service - Get contract error:', error);
      return {
        success: false,
        error: 'Failed to fetch contract'
      };
    }
  }

  /**
   * Récupérer un contrat par Assignment ID
   */
  async getContractByAssignmentId(assignmentId: string): Promise<ServiceResponse<IContract>> {
    try {
      const contract = await Contract.findOne({ assignmentId });
      
      if (!contract) {
        return {
          success: false,
          error: 'Contract not found'
        };
      }

      return {
        success: true,
        data: contract
      };
    } catch (error) {
      console.error('Service - Get contract by assignmentId error:', error);
      return {
        success: false,
        error: 'Failed to fetch contract'
      };
    }
  }

  /**
   * Récupérer tous les contrats avec filtres et pagination
   */
  // async getContracts(
  //   filters: ContractFilters = {},
  //   pagination: PaginationOptions = { page: 1, limit: 10 }
  // ): Promise<ServiceResponse<{ contracts: IContract[]; total: number; page: number; totalPages: number }>> {
  //   try {
  //     const query: FilterQuery<IContract> = {};

  //     // Construire les filtres
  //     if (filters.contractStatus) {
  //       query.contractStatus = filters.contractStatus;
  //     }
      
  //     if (filters.contractType) {
  //       query.contractType = filters.contractType;
  //     }
      
  //     if (filters.department) {
  //       query.department = new RegExp(filters.department, 'i');
  //     }
      
  //     if (filters.employeeName) {
  //       query.employeeName = new RegExp(filters.employeeName, 'i');
  //     }
      
  //     if (filters.contractEligibilityStatus) {
  //       query.contractEligibilityStatus = filters.contractEligibilityStatus;
  //     }
      
  //     if (filters.assignmentId) {
  //       query.assignmentId = new RegExp(filters.assignmentId, 'i');
  //     }
      
  //     if (filters.effectiveDate) {
  //       query.effectiveDate = filters.effectiveDate;
  //     }

  //     // Pagination
  //     const skip = (pagination.page - 1) * pagination.limit;
      
  //     // Tri
  //     const sortField = pagination.sortBy || 'createdAt';
  //     const sortOrder = pagination.sortOrder === 'desc' ? -1 : 1;
  //     // const sort = { [sortField]: sortOrder };
  // const sort = { [sortField]: sortOrder };

  //     // Exécuter les requêtes
  //     const [contracts, total] = await Promise.all([
  //       Contract.find(query)
  //         .sort(sort)
  //         .skip(skip)
  //         .limit(pagination.limit)
  //         .exec(),
  //       Contract.countDocuments(query)
  //     ]);

  //     const totalPages = Math.ceil(total / pagination.limit);

  //     return {
  //       success: true,
  //       data: {
  //         contracts,
  //         total,
  //         page: pagination.page,
  //         totalPages
  //       }
  //     };
  //   } catch (error) {
  //     console.error('Service - Get contracts error:', error);
  //     return {
  //       success: false,
  //       error: 'Failed to fetch contracts'
  //     };
  //   }
  // }
async getContracts(): Promise<ServiceResponse<IContract[]>> {
  try {
    const contracts = await Contract.find();

    return {
      success: true,
      data: contracts
    };
  } catch (error: any) {
    console.error('Service - Get contracts error:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch contracts'
    };
  }
}

  /**
   * Mettre à jour un contrat
   */
  async updateContract(id: string, updateData: UpdateQuery<IContract>): Promise<ServiceResponse<IContract>> {
    try {
      const contract = await Contract.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!contract) {
        return {
          success: false,
          error: 'Contract not found'
        };
      }

      return {
        success: true,
        data: contract,
        message: 'Contract updated successfully'
      };
    } catch (error:any) {
      console.error('Service - Update contract error:', error);
      
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map((err: any) => err.message);
        return {
          success: false,
          error: `Validation error: ${validationErrors.join(', ')}`
        };
      }
      
      return {
        success: false,
        error: 'Failed to update contract'
      };
    }
  }

  /**
   * Supprimer un contrat
   */
  async deleteContract(id: string): Promise<ServiceResponse<void>> {
    try {
      const contract = await Contract.findByIdAndDelete(id);

      if (!contract) {
        return {
          success: false,
          error: 'Contract not found'
        };
      }

      return {
        success: true,
        message: 'Contract deleted successfully'
      };
    } catch (error) {
      console.error('Service - Delete contract error:', error);
      return {
        success: false,
        error: 'Failed to delete contract'
      };
    }
  }

  /**
   * Activer un contrat
   */
  async activateContract(id: string): Promise<ServiceResponse<IContract>> {
    return this.updateContractStatus(id, 'Active');
  }

  /**
   * Terminer un contrat
   */
  async terminateContract(id: string): Promise<ServiceResponse<IContract>> {
    return this.updateContractStatus(id, 'Terminated');
  }

  /**
   * Mettre à jour le statut d'un contrat
   */
  async updateContractStatus(id: string, status: string): Promise<ServiceResponse<IContract>> {
    return this.updateContract(id, { contractStatus: status });
  }

  /**
   * Valider un contrat
   */
  // async validateContract(id: string): Promise<ServiceResponse<{ isValid: boolean; errors: string[] }>> {
  //   try {
  //     const contract = await Contract.findById(id);

  //     if (!contract) {
  //       return {
  //         success: false,
  //         error: 'Contract not found'
  //       };
  //     }

  //     const errors: string[] = [];

  //     // Règles de validation métier
  //     if (!contract.employeeName) errors.push('Employee name is required');
  //     if (!contract.contractType) errors.push('Contract type is required');
  //     if (!contract.effectiveDate) errors.push('Effective date is required');
  //     if (!contract.signatureDate) errors.push('Signature date is required');
  //     if (!contract.workIdentifier) errors.push('Work identifier is required');
  //     if (!contract.contractReference) errors.push('Contract reference is required');
      
  //     if (contract.endDate && contract.endDate <= contract.effectiveDate) {
  //       errors.push('End date must be after effective date');
  //     }
      
  //     if (contract.signatureDate > contract.effectiveDate) {
  //       errors.push('Signature date cannot be after effective date');
  //     }
      
  //     if (contract.contractStatus === 'Active' && contract.endDate && contract.endDate < new Date()) {
  //       errors.push('Active contract cannot have past end date');
  //     }

  //     if (contract.nonCompeteClause && !contract.nonCompeteDurationMonths) {
  //       errors.push('Non-compete duration is required when non-compete clause is enabled');
  //     }

  //     const isValid = errors.length === 0;

  //     // Mettre à jour le statut d'éligibilité
  //     await this.updateContract(id, {
  //       contractEligibilityStatus: isValid ? 'Valid' : 'Invalid'
  //     });

  //     return {
  //       success: true,
  //       data: { isValid, errors }
  //     };
  //   } catch (error) {
  //     console.error('Service - Validate contract error:', error);
  //     return {
  //       success: false,
  //       error: 'Failed to validate contract'
  //     };
  //   }
  // }

  /**
   * Récupérer les contrats expirant bientôt
   */
  async getExpiringContracts(days: number = 30): Promise<ServiceResponse<IContract[]>> {
    try {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + days);

      const contracts = await Contract.find({
        contractStatus: 'Active',
        endDate: {
          $gte: new Date(),
          $lte: futureDate
        }
      });

      return {
        success: true,
        data: contracts
      };
    } catch (error) {
      console.error('Service - Get expiring contracts error:', error);
      return {
        success: false,
        error: 'Failed to fetch expiring contracts'
      };
    }
  }

  /**
   * Statistiques des contrats
   */
  async getContractStats(): Promise<ServiceResponse<any>> {
    try {
      const stats = await Contract.aggregate([
        {
          $group: {
            _id: '$contractStatus',
            count: { $sum: 1 }
          }
        }
      ]);

      const totalContracts = await Contract.countDocuments();
      
      const typeStats = await Contract.aggregate([
        {
          $group: {
            _id: '$contractType',
            count: { $sum: 1 }
          }
        }
      ]);

      return {
        success: true,
        data: {
          total: totalContracts,
          byStatus: stats,
          byType: typeStats
        }
      };
    } catch (error) {
      console.error('Service - Get contract stats error:', error);
      return {
        success: false,
        error: 'Failed to fetch contract statistics'
      };
    }
  }
}

import { useState, useEffect, useCallback } from 'react';
import { contractService, EmploymentContract, CreateContractRequest, ContractFilters } from '../services/contract.service';
import { useApi, useApiList, useApiForm, useCrudApi } from './useApi';

// Hook pour gérer la création de contrats
export function useCreateContract() {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createContract = useCallback(async (contractData: any) => {
    setIsCreating(true);
    setError(null);
    
    try {
      // Transformer les données du frontend vers le format du backend
      const backendData = contractService.transformFrontendToBackend(contractData);
      
      // Debug: afficher les données transformées
      console.log('Contract data to backend:', backendData);
      
      const response = await contractService.createContract(backendData);
      
      // Debug: afficher la réponse du backend
      console.log('Backend response:', response);
      
      if (response.success) {
        return {
          success: true,
          data: response.data,
          message: 'Contract created successfully'
        };
      } else {
        throw new Error(response.error || 'Failed to create contract');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred while creating the contract';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsCreating(false);
    }
  }, []);

  return {
    createContract,
    isCreating,
    error,
    clearError: () => setError(null)
  };
}

// Hook pour gérer la liste des contrats
export function useContractsList(filters?: ContractFilters) {
  const [contracts, setContracts] = useState<EmploymentContract[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContracts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await contractService.getAllContracts(filters);
      
      if (response.success && response.data) {
        setContracts(response.data);
      } else {
        throw new Error(response.error || 'Failed to fetch contracts');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching contracts');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchContracts();
  }, [fetchContracts]);

  return {
    contracts,
    loading,
    error,
    refresh: fetchContracts
  };
}

// Hook pour gérer un contrat spécifique
export function useContract(contractId?: string) {
  const [contract, setContract] = useState<EmploymentContract | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContract = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await contractService.getContractById(id);
      
      if (response.success && response.data) {
        setContract(response.data);
      } else {
        throw new Error(response.error || 'Failed to fetch contract');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching contract');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateContract = useCallback(async (contractData: Partial<CreateContractRequest>) => {
    if (!contractId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await contractService.updateContract(contractId, contractData);
      
      if (response.success && response.data) {
        setContract(response.data);
        return {
          success: true,
          data: response.data,
          message: 'Contract updated successfully'
        };
      } else {
        throw new Error(response.error || 'Failed to update contract');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred while updating the contract';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, [contractId]);

  const deleteContract = useCallback(async () => {
    if (!contractId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await contractService.deleteContract(contractId);
      
      if (response.success) {
        setContract(null);
        return {
          success: true,
          message: 'Contract deleted successfully'
        };
      } else {
        throw new Error(response.error || 'Failed to delete contract');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred while deleting the contract';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, [contractId]);

  useEffect(() => {
    if (contractId) {
      fetchContract(contractId);
    }
  }, [contractId, fetchContract]);

  return {
    contract,
    loading,
    error,
    updateContract,
    deleteContract,
    refresh: () => contractId && fetchContract(contractId)
  };
}

// Hook pour gérer les assignations disponibles
export function useAvailableAssignments() {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAssignments = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await contractService.getAvailableAssignments();
      
      if (response.success && response.data) {
        setAssignments(response.data);
      } else {
        throw new Error(response.error || 'Failed to fetch assignments');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching assignments');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  return {
    assignments,
    loading,
    error,
    refresh: fetchAssignments
  };
}

// Hook pour gérer les accords collectifs
export function useCollectiveAgreements() {
  const [agreements, setAgreements] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAgreements = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await contractService.getCollectiveAgreements();
      
      if (response.success && response.data) {
        setAgreements(response.data);
      } else {
        throw new Error(response.error || 'Failed to fetch collective agreements');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching collective agreements');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAgreements();
  }, [fetchAgreements]);

  return {
    agreements,
    loading,
    error,
    refresh: fetchAgreements
  };
}

// Hook pour gérer les types de contrats
export function useContractTypes() {
  const [contractTypes, setContractTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContractTypes = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await contractService.getContractTypes();
      
      if (response.success && response.data) {
        setContractTypes(response.data);
      } else {
        // Fallback aux types par défaut si l'API n'est pas disponible
        setContractTypes(['PERMANENT', 'FIXED_TERM', 'TEMPORARY', 'INTERNSHIP']);
      }
    } catch (err: any) {
      // Fallback aux types par défaut en cas d'erreur
      setContractTypes(['PERMANENT', 'FIXED_TERM', 'TEMPORARY', 'INTERNSHIP']);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContractTypes();
  }, [fetchContractTypes]);

  return {
    contractTypes,
    loading,
    error,
    refresh: fetchContractTypes
  };
}

// Hook pour la validation de contrats
export function useContractValidation() {
  const [isValidating, setIsValidating] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const validateContract = useCallback(async (contractData: any) => {
    setIsValidating(true);
    setValidationErrors([]);
    
    try {
      const backendData = contractService.transformFrontendToBackend(contractData);
      const response = await contractService.validateContract(backendData);
      
      if (response.success) {
        return {
          success: true,
          isValid: true,
          message: 'Contract is valid'
        };
      } else {
        const errors = response.error ? [response.error] : ['Validation failed'];
        setValidationErrors(errors);
        return {
          success: false,
          isValid: false,
          errors
        };
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Validation error occurred';
      setValidationErrors([errorMessage]);
      return {
        success: false,
        isValid: false,
        errors: [errorMessage]
      };
    } finally {
      setIsValidating(false);
    }
  }, []);

  return {
    validateContract,
    isValidating,
    validationErrors,
    clearValidationErrors: () => setValidationErrors([])
  };
}



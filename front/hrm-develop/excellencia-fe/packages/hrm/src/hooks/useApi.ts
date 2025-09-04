import { useState, useCallback, useEffect } from 'react';
import { ApiResponse } from '../services/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<void>;
  reset: () => void;
}

// Hook pour gérer les appels API
export function useApi<T = any>(
  apiFunction: (...args: any[]) => Promise<ApiResponse<T>>,
  immediate = false,
  ...immediateArgs: any[]
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
    success: false,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      setState(prev => ({
        ...prev,
        loading: true,
        error: null,
        success: false,
      }));

      try {
        const response = await apiFunction(...args);
        
        if (response.success) {
          setState({
            data: response.data || null,
            loading: false,
            error: null,
            success: true,
          });
        } else {
          setState({
            data: null,
            loading: false,
            error: response.error || 'Une erreur s\'est produite',
            success: false,
          });
        }
      } catch (error: any) {
        setState({
          data: null,
          loading: false,
          error: error.message || 'Une erreur inattendue s\'est produite',
          success: false,
        });
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      success: false,
    });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute(...immediateArgs);
    }
  }, [immediate, execute, ...immediateArgs]);

  return {
    ...state,
    execute,
    reset,
  };
}

// Hook pour gérer les listes avec pagination
export function useApiList<T = any>(
  apiFunction: (params?: any) => Promise<ApiResponse<T[]>>,
  initialParams: any = {}
) {
  const [params, setParams] = useState(initialParams);
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchData = useCallback(async (newParams?: any) => {
    setLoading(true);
    setError(null);

    try {
      const currentParams = { ...params, ...newParams };
      const response = await apiFunction(currentParams);

      if (response.success) {
        setData(response.data || []);
        if (response.pagination) {
          setPagination(response.pagination);
        }
        setParams(currentParams);
      } else {
        setError(response.error || 'Erreur lors du chargement des données');
      }
    } catch (error: any) {
      setError(error.message || 'Une erreur inattendue s\'est produite');
    } finally {
      setLoading(false);
    }
  }, [apiFunction, params]);

  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const updateParams = useCallback((newParams: any) => {
    setParams(prev => ({ ...prev, ...newParams }));
  }, []);

  const goToPage = useCallback((page: number) => {
    fetchData({ page });
  }, [fetchData]);

  const changeLimit = useCallback((limit: number) => {
    fetchData({ limit, page: 1 });
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    pagination,
    params,
    fetchData,
    refresh,
    updateParams,
    goToPage,
    changeLimit,
  };
}

// Hook pour gérer les formulaires avec validation
export function useApiForm<T = any>(
  apiFunction: (data: T) => Promise<ApiResponse<any>>,
  initialData: T
) {
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const updateField = useCallback((field: keyof T, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const updateForm = useCallback((newData: Partial<T>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  }, []);

  const validate = useCallback((data: T): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    
    // Validation de base - à adapter selon vos besoins
    Object.keys(data).forEach(key => {
      const value = data[key as keyof T];
      if (value === undefined || value === null || value === '') {
        newErrors[key as keyof T] = 'Ce champ est requis';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, []);

  const submit = useCallback(async (submitData?: T) => {
    const dataToSubmit = submitData || formData;
    
    if (!validate(dataToSubmit)) {
      return { success: false, error: 'Veuillez corriger les erreurs de validation' };
    }

    setLoading(true);
    setSuccess(false);

    try {
      const response = await apiFunction(dataToSubmit);
      
      if (response.success) {
        setSuccess(true);
        return response;
      } else {
        setErrors({} as any); // Réinitialiser les erreurs
        return response;
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Une erreur inattendue s\'est produite'
      };
    } finally {
      setLoading(false);
    }
  }, [apiFunction, formData, validate]);

  const reset = useCallback(() => {
    setFormData(initialData);
    setErrors({});
    setLoading(false);
    setSuccess(false);
  }, [initialData]);

  return {
    formData,
    errors,
    loading,
    success,
    updateField,
    updateForm,
    submit,
    reset,
    validate,
  };
}

// Hook pour gérer les opérations CRUD
export function useCrudApi<T = any>(
  createApi: (data: Omit<T, 'id'>) => Promise<ApiResponse<T>>,
  readApi: (id: string) => Promise<ApiResponse<T>>,
  updateApi: (id: string, data: Partial<T>) => Promise<ApiResponse<T>>,
  deleteApi: (id: string) => Promise<ApiResponse<any>>,
  listApi: (params?: any) => Promise<ApiResponse<T[]>>
) {
  const [currentItem, setCurrentItem] = useState<T | null>(null);
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (data: Omit<T, 'id'>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await createApi(data);
      if (response.success && response.data) {
        setItems(prev => [...prev, response.data!]);
        return response;
      } else {
        setError(response.error || 'Erreur lors de la création');
        return response;
      }
    } catch (error: any) {
      setError(error.message || 'Une erreur inattendue s\'est produite');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [createApi]);

  const read = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await readApi(id);
      if (response.success && response.data) {
        setCurrentItem(response.data);
        return response;
      } else {
        setError(response.error || 'Erreur lors de la lecture');
        return response;
      }
    } catch (error: any) {
      setError(error.message || 'Une erreur inattendue s\'est produite');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [readApi]);

  const update = useCallback(async (id: string, data: Partial<T>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await updateApi(id, data);
      if (response.success && response.data) {
        setItems(prev => prev.map(item => 
          (item as any).id === id ? response.data! : item
        ));
        if (currentItem && (currentItem as any).id === id) {
          setCurrentItem(response.data);
        }
        return response;
      } else {
        setError(response.error || 'Erreur lors de la mise à jour');
        return response;
      }
    } catch (error: any) {
      setError(error.message || 'Une erreur inattendue s\'est produite');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [updateApi, currentItem]);

  const remove = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await deleteApi(id);
      if (response.success) {
        setItems(prev => prev.filter(item => (item as any).id !== id));
        if (currentItem && (currentItem as any).id === id) {
          setCurrentItem(null);
        }
        return response;
      } else {
        setError(response.error || 'Erreur lors de la suppression');
        return response;
      }
    } catch (error: any) {
      setError(error.message || 'Une erreur inattendue s\'est produite');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [deleteApi, currentItem]);

  const list = useCallback(async (params?: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await listApi(params);
      if (response.success) {
        setItems(response.data || []);
        return response;
      } else {
        setError(response.error || 'Erreur lors du chargement de la liste');
        return response;
      }
    } catch (error: any) {
      setError(error.message || 'Une erreur inattendue s\'est produite');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [listApi]);

  return {
    currentItem,
    items,
    loading,
    error,
    create,
    read,
    update,
    remove,
    list,
    setCurrentItem,
  };
}



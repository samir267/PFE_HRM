import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Configuration des URLs des microservices
const API_CONFIG = {
  PERSONAL_DATA: 'http://localhost:3000',
  HIRING_EMPLOYEE: 'http://localhost:4000',
  AUTH: 'http://localhost:3000'
};

// Types de base pour les réponses API
export interface ApiResponse<T = any> {
  _id: any;
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Classe de base pour les services API
class ApiService {
  private personalDataApi: AxiosInstance;
  private hiringEmployeeApi: AxiosInstance;
  private authApi: AxiosInstance;

  constructor() {
    // Configuration pour Personal Data API
    this.personalDataApi = axios.create({
      baseURL: API_CONFIG.PERSONAL_DATA,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Configuration pour Hiring Employee API
    this.hiringEmployeeApi = axios.create({
      baseURL: API_CONFIG.HIRING_EMPLOYEE,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Configuration pour Auth API
    this.authApi = axios.create({
      baseURL: API_CONFIG.AUTH,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Intercepteurs pour gérer les tokens d'authentification
    this.setupInterceptors();
  }

  private setupInterceptors() {
    const addAuthToken = (config: any) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    };

    const handleResponse = (response: AxiosResponse) => {
      return response;
    };

    const handleError = (error: any) => {
      if (error.response?.status === 401) {
        // Token expiré ou invalide
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    };

    [this.personalDataApi, this.hiringEmployeeApi, this.authApi].forEach(api => {
      api.interceptors.request.use(addAuthToken);
      api.interceptors.response.use(handleResponse, handleError);
    });
  }

  // Méthodes pour Personal Data API
  async getPersonalData(endpoint: string, params?: any): Promise<ApiResponse> {
    try {
      const response = await this.personalDataApi.get(endpoint, { params });
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async postPersonalData(endpoint: string, data: any): Promise<ApiResponse> {
    try {
      const response = await this.personalDataApi.post(endpoint, data);
      
      // Si la réponse a un statut de succès (200, 201, etc.), retourner les données
      if (response.status >= 200 && response.status < 300) {
        // Si les données de réponse n'ont pas de propriété 'success', les ajouter
        if (response.data && typeof response.data === 'object' && !response.data.hasOwnProperty('success')) {
          return {
            success: true,
            data: response.data,
            message: 'Operation completed successfully'
          };
        }
        return response.data;
      }
      
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async putPersonalData(endpoint: string, data: any): Promise<ApiResponse> {
    try {
      const response = await this.personalDataApi.put(endpoint, data);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async deletePersonalData(endpoint: string): Promise<ApiResponse> {
    try {
      const response = await this.personalDataApi.delete(endpoint);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Méthodes pour Hiring Employee API
  async getHiringEmployee(endpoint: string, params?: any): Promise<ApiResponse> {
    try {
      const response = await this.hiringEmployeeApi.get(endpoint, { params });
      console.log("data",response.data);

      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async postHiringEmployee(endpoint: string, data: any): Promise<ApiResponse> {
    try {
      const response = await this.hiringEmployeeApi.post(endpoint, data);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async putHiringEmployee(endpoint: string, data: any): Promise<ApiResponse> {
    try {
      const response = await this.hiringEmployeeApi.put(endpoint, data);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async deleteHiringEmployee(endpoint: string): Promise<ApiResponse> {
    try {
      const response = await this.hiringEmployeeApi.delete(endpoint);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  // Méthodes pour Auth API
  async login(credentials: { email: string; password: string }): Promise<ApiResponse> {
    try {
      const response = await this.authApi.post('/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async register(userData: any): Promise<ApiResponse> {
    try {
      const response = await this.authApi.post('/auth/register', userData);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async logout(): Promise<ApiResponse> {
    try {
      const response = await this.authApi.post('/auth/logout');
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any) {
    if (error.response) {
      // Erreur de réponse du serveur
      return {
        success: false,
        error: error.response.data?.message || error.response.statusText,
        status: error.response.status
      };
    } else if (error.request) {
      // Erreur de réseau
      return {
        success: false,
        error: 'Erreur de connexion au serveur'
      };
    } else {
      // Autre erreur
      return {
        success: false,
        error: error.message || 'Une erreur inattendue s\'est produite'
      };
    }
  }
}

// Instance singleton
export const apiService = new ApiService();
export default apiService;

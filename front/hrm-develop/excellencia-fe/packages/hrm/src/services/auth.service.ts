import { apiService, ApiResponse } from './api';

// Types pour l'authentification
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// Service d'authentification
class AuthService {
  private tokenKey = 'authToken';
  private refreshTokenKey = 'refreshToken';
  private userKey = 'user';

  // Connexion
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await apiService.login(credentials);
      
      if (response.success && response.data) {
        // Stocker les tokens et les informations utilisateur
        this.setToken(response.data.token);
        if (response.data.refreshToken) {
          this.setRefreshToken(response.data.refreshToken);
        }
        this.setUser(response.data.user);
      }
      
      return response;
    } catch (error: any) {
      return {
        success: false,
        error: error.error || 'Erreur lors de la connexion'
      };
    }
  }

  // Inscription
  async register(userData: RegisterData): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await apiService.register(userData);
      
      if (response.success && response.data) {
        // Stocker les tokens et les informations utilisateur
        this.setToken(response.data.token);
        if (response.data.refreshToken) {
          this.setRefreshToken(response.data.refreshToken);
        }
        this.setUser(response.data.user);
      }
      
      return response;
    } catch (error: any) {
      return {
        success: false,
        error: error.error || 'Erreur lors de l\'inscription'
      };
    }
  }

  // Déconnexion
  async logout(): Promise<ApiResponse> {
    try {
      const response = await apiService.logout();
      
      // Nettoyer le stockage local
      this.clearAuth();
      
      return response;
    } catch (error: any) {
      // Même en cas d'erreur, nettoyer le stockage local
      this.clearAuth();
      
      return {
        success: false,
        error: error.error || 'Erreur lors de la déconnexion'
      };
    }
  }

  // Rafraîchir le token
  async refreshToken(): Promise<ApiResponse<AuthResponse>> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error('Aucun refresh token disponible');
      }

      const response = await apiService.postHiringEmployee('/auth/refresh', { refreshToken });
      
      if (response.success && response.data) {
        this.setToken(response.data.token);
        if (response.data.refreshToken) {
          this.setRefreshToken(response.data.refreshToken);
        }
        this.setUser(response.data.user);
      }
      
      return response;
    } catch (error: any) {
      // En cas d'échec du refresh, déconnecter l'utilisateur
      this.clearAuth();
      
      return {
        success: false,
        error: error.error || 'Erreur lors du rafraîchissement du token'
      };
    }
  }

  // Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Obtenir l'utilisateur actuel
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.userKey);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Erreur lors du parsing des données utilisateur:', error);
        return null;
      }
    }
    return null;
  }

  // Obtenir le token d'authentification
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Obtenir le refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  // Vérifier si le token est expiré
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'expiration du token:', error);
      return true;
    }
  }

  // Stocker le token
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Stocker le refresh token
  private setRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  // Stocker les informations utilisateur
  private setUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  // Nettoyer toutes les données d'authentification
  private clearAuth(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.userKey);
  }

  // Changer le mot de passe
  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse> {
    try {
      const response = await apiService.postHiringEmployee('/auth/change-password', {
        currentPassword,
        newPassword
      });
      return response;
    } catch (error: any) {
      return {
        success: false,
        error: error.error || 'Erreur lors du changement de mot de passe'
      };
    }
  }

  // Demander une réinitialisation de mot de passe
  async forgotPassword(email: string): Promise<ApiResponse> {
    try {
      const response = await apiService.postHiringEmployee('/auth/forgot-password', { email });
      return response;
    } catch (error: any) {
      return {
        success: false,
        error: error.error || 'Erreur lors de la demande de réinitialisation'
      };
    }
  }

  // Réinitialiser le mot de passe
  async resetPassword(token: string, newPassword: string): Promise<ApiResponse> {
    try {
      const response = await apiService.postHiringEmployee('/auth/reset-password', {
        token,
        newPassword
      });
      return response;
    } catch (error: any) {
      return {
        success: false,
        error: error.error || 'Erreur lors de la réinitialisation du mot de passe'
      };
    }
  }

  // Vérifier les permissions de l'utilisateur
  hasPermission(permission: string): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    // Logique simple de vérification des permissions
    // À adapter selon votre système de permissions
    const userPermissions = this.getUserPermissions(user.role);
    return userPermissions.includes(permission);
  }

  // Obtenir les permissions selon le rôle
  private getUserPermissions(role: string): string[] {
    const permissionsMap: { [key: string]: string[] } = {
      'admin': ['*'], // Toutes les permissions
      'hr_manager': [
        'employee:read',
        'employee:write',
        'employee:delete',
        'recruitment:read',
        'recruitment:write',
        'payroll:read',
        'payroll:write'
      ],
      'hr_employee': [
        'employee:read',
        'employee:write',
        'recruitment:read',
        'payroll:read'
      ],
      'manager': [
        'employee:read',
        'team:read',
        'team:write',
        'performance:read',
        'performance:write'
      ],
      'employee': [
        'profile:read',
        'profile:write'
      ]
    };

    return permissionsMap[role] || [];
  }

  // Vérifier si l'utilisateur a un rôle spécifique
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  // Obtenir tous les rôles de l'utilisateur
  getUserRoles(): string[] {
    const user = this.getCurrentUser();
    return user ? [user.role] : [];
  }
}

export const authService = new AuthService();
export default authService;



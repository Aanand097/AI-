export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface TokenPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  sessionExpired: boolean;
}

export interface AuthActions {
  login(email: string, password: string, rememberMe?: boolean): Promise<void>;
  signup(name: string, email: string, password: string): Promise<void>;
  logout(): void;
  restoreSession(): Promise<void>;
  clearError(): void;
  setError(error: string): void;
}

export type AuthContextType = AuthState & AuthActions;

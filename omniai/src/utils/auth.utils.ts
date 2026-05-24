import { User, AuthResponse } from '@/types/auth.types';
import { AUTH_CONSTANTS } from '@/constants/auth.constants';

/**
 * Mock database of users (stored in localStorage)
 * In production, this would be on the backend
 */
const MOCK_USERS_DB_KEY = 'omniai_mock_users_db';

/**
 * Generate a mock JWT token
 * In production, tokens would come from backend
 */
export const generateMockToken = (userId: string, expiresIn: number): string => {
  const payload = {
    userId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + expiresIn,
  };

  // Base64 encode (not secure, just for demo)
  return btoa(JSON.stringify(payload));
};

/**
 * Simulate a small delay like a real API call
 */
const simulateApiDelay = (ms: number = 1000): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Get mock users database
 */
const getMockUsersDB = (): Record<string, User & { password: string }> => {
  if (typeof window === 'undefined') return {};

  const db = localStorage.getItem(MOCK_USERS_DB_KEY);
  if (!db) {
    // Initialize with demo user
    const demoUsers = {
      'demo-user': {
        id: 'demo-user',
        name: 'Demo User',
        email: 'demo@omniai.com',
        password: 'Demo@12345', // Plain text in mock (never do this in production!)
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
        createdAt: new Date().toISOString(),
      },
    };
    localStorage.setItem(MOCK_USERS_DB_KEY, JSON.stringify(demoUsers));
    return demoUsers;
  }

  return JSON.parse(db);
};

/**
 * Save mock users database
 */
const saveMockUsersDB = (
  users: Record<string, User & { password: string }>
): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(MOCK_USERS_DB_KEY, JSON.stringify(users));
  }
};

/**
 * Mock login function
 */
export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  await simulateApiDelay(1200);

  const users = getMockUsersDB();
  const user = Object.values(users).find((u) => u.email === email);

  if (!user || user.password !== password) {
    throw new Error('Invalid email or password.');
  }

  const accessToken = generateMockToken(user.id, 15 * 60); // 15 minutes
  const refreshToken = generateMockToken(user.id, 7 * 24 * 60 * 60); // 7 days

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
    },
    accessToken,
    refreshToken,
    expiresIn: 15 * 60,
  };
};

/**
 * Mock signup function
 */
export const signupUser = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  await simulateApiDelay(1500);

  const users = getMockUsersDB();

  // Check if email exists
  if (Object.values(users).some((u) => u.email === email)) {
    throw new Error('This email is already registered.');
  }

  // Create new user
  const userId = `user_${Date.now()}`;
  const newUser: User & { password: string } = {
    id: userId,
    name,
    email,
    password, // Stored in plain text for demo (never do this in production!)
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    createdAt: new Date().toISOString(),
  };

  users[userId] = newUser;
  saveMockUsersDB(users);

  const accessToken = generateMockToken(userId, 15 * 60);
  const refreshToken = generateMockToken(userId, 7 * 24 * 60 * 60);

  return {
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
      createdAt: newUser.createdAt,
    },
    accessToken,
    refreshToken,
    expiresIn: 15 * 60,
  };
};

/**
 * Get current user from storage
 */
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;

  const userJson = localStorage.getItem(AUTH_CONSTANTS.USER_KEY);
  if (!userJson) return null;

  try {
    return JSON.parse(userJson);
  } catch {
    return null;
  }
};

/**
 * Get stored tokens
 */
export const getStoredTokens = (): {
  accessToken: string | null;
  refreshToken: string | null;
} => {
  if (typeof window === 'undefined') {
    return { accessToken: null, refreshToken: null };
  }

  return {
    accessToken: localStorage.getItem(AUTH_CONSTANTS.TOKEN_KEY),
    refreshToken: localStorage.getItem(AUTH_CONSTANTS.REFRESH_TOKEN_KEY),
  };
};

/**
 * Check if token is expired
 */
export const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

/**
 * Save session to localStorage
 */
export const saveSession = (
  user: User,
  accessToken: string,
  refreshToken: string,
  rememberMe: boolean = false
): void => {
  if (typeof window === 'undefined') return;

  localStorage.setItem(AUTH_CONSTANTS.USER_KEY, JSON.stringify(user));
  localStorage.setItem(AUTH_CONSTANTS.TOKEN_KEY, accessToken);
  localStorage.setItem(AUTH_CONSTANTS.REFRESH_TOKEN_KEY, refreshToken);

  if (rememberMe) {
    localStorage.setItem(AUTH_CONSTANTS.REMEMBER_ME_KEY, 'true');
  }

  localStorage.setItem(
    AUTH_CONSTANTS.TOKEN_EXPIRY_KEY,
    String(Date.now() + AUTH_CONSTANTS.TOKEN_EXPIRY_TIME)
  );
};

/**
 * Clear session from localStorage
 */
export const clearSession = (): void => {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(AUTH_CONSTANTS.USER_KEY);
  localStorage.removeItem(AUTH_CONSTANTS.TOKEN_KEY);
  localStorage.removeItem(AUTH_CONSTANTS.REFRESH_TOKEN_KEY);
  localStorage.removeItem(AUTH_CONSTANTS.REMEMBER_ME_KEY);
  localStorage.removeItem(AUTH_CONSTANTS.TOKEN_EXPIRY_KEY);
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const { accessToken } = getStoredTokens();
  return !isTokenExpired(accessToken);
};

/**
 * Restore session from localStorage
 */
export const restoreSessionFromStorage = (): User | null => {
  if (!isAuthenticated()) {
    clearSession();
    return null;
  }

  return getCurrentUser();
};

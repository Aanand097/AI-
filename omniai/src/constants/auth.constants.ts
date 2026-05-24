export const AUTH_CONSTANTS = {
  TOKEN_KEY: 'omniai_access_token',
  REFRESH_TOKEN_KEY: 'omniai_refresh_token',
  USER_KEY: 'omniai_user',
  REMEMBER_ME_KEY: 'omniai_remember_me',
  SESSION_KEY: 'omniai_session',
  TOKEN_EXPIRY_KEY: 'omniai_token_expiry',
  
  TOKEN_EXPIRY_TIME: 15 * 60 * 1000, // 15 minutes
  REFRESH_TOKEN_EXPIRY_TIME: 7 * 24 * 60 * 60 * 1000, // 7 days
  REMEMBER_ME_EXPIRY_TIME: 30 * 24 * 60 * 60 * 1000, // 30 days
  
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
} as const;

export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful! Redirecting...',
  SIGNUP_SUCCESS: 'Account created! Redirecting to dashboard...',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  EMAIL_EXISTS: 'This email is already registered.',
  PASSWORD_MISMATCH: 'Passwords do not match.',
  VALIDATION_ERROR: 'Please fix the errors below.',
  NETWORK_ERROR: 'Network error. Please try again.',
  REQUIRED_FIELD: 'This field is required.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  WEAK_PASSWORD: 'Password must be at least 8 characters.',
  AGREE_TERMS: 'You must agree to the terms and conditions.',
} as const;

export const SOCIAL_PROVIDERS = [
  { name: 'Google', icon: 'Google', color: 'hover:bg-blue-600/10' },
  { name: 'GitHub', icon: 'Github', color: 'hover:bg-gray-700/10' },
  { name: 'Microsoft', icon: 'Windows', color: 'hover:bg-blue-500/10' },
] as const;

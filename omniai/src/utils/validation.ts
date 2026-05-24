import { AUTH_CONSTANTS, AUTH_MESSAGES } from '@/constants/auth.constants';

export const validateEmail = (email: string): string | null => {
  if (!email || email.trim() === '') {
    return AUTH_MESSAGES.REQUIRED_FIELD;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return AUTH_MESSAGES.INVALID_EMAIL;
  }

  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password || password.trim() === '') {
    return AUTH_MESSAGES.REQUIRED_FIELD;
  }

  if (password.length < AUTH_CONSTANTS.MIN_PASSWORD_LENGTH) {
    return AUTH_MESSAGES.WEAK_PASSWORD;
  }

  return null;
};

export const validateName = (name: string): string | null => {
  if (!name || name.trim() === '') {
    return AUTH_MESSAGES.REQUIRED_FIELD;
  }

  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters.';
  }

  return null;
};

export const validatePasswordMatch = (
  password: string,
  confirmPassword: string
): string | null => {
  if (password !== confirmPassword) {
    return AUTH_MESSAGES.PASSWORD_MISMATCH;
  }

  return null;
};

export const validateLoginForm = (
  email: string,
  password: string
): Record<string, string> => {
  const errors: Record<string, string> = {};

  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;

  return errors;
};

export const validateSignupForm = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  agreeToTerms: boolean
): Record<string, string> => {
  const errors: Record<string, string> = {};

  const nameError = validateName(name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;

  const matchError = validatePasswordMatch(password, confirmPassword);
  if (matchError) errors.confirmPassword = matchError;

  if (!agreeToTerms) {
    errors.agreeToTerms = AUTH_MESSAGES.AGREE_TERMS;
  }

  return errors;
};

export const hasErrors = (errors: Record<string, string>): boolean => {
  return Object.keys(errors).length > 0;
};

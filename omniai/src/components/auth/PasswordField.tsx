'use client';

import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { InputField } from './InputField';

interface PasswordFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  error?: string;
  disabled?: boolean;
  autoComplete?: string;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  error,
  disabled = false,
  autoComplete,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <InputField
        label={label}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        error={error}
        disabled={disabled}
        autoComplete={autoComplete}
      />

      {/* Toggle password visibility button */}
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={disabled}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? (
          <EyeOff className="w-5 h-5" />
        ) : (
          <Eye className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

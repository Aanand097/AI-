'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  error?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  autoComplete?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onFocus,
  error,
  disabled = false,
  icon,
  autoComplete,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>

      <div className="relative">
        {/* Input wrapper with animated border */}
        <motion.div
          animate={{
            boxShadow: isFocused
              ? '0 0 20px rgba(59, 130, 246, 0.2), inset 0 0 20px rgba(59, 130, 246, 0.05)'
              : '0 0 0px rgba(59, 130, 246, 0)',
          }}
          transition={{ duration: 0.2 }}
          className={`relative rounded-lg border transition-all duration-200 ${
            error
              ? 'border-red-500/50 bg-red-500/5'
              : isFocused
                ? 'border-blue-500/50 bg-blue-500/5'
                : 'border-white/10 bg-white/5'
          }`}
        >
          {/* Icon */}
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              {icon}
            </div>
          )}

          {/* Input field */}
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={() => {
              setIsFocused(true);
              onFocus?.();
            }}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            autoComplete={autoComplete}
            className={`w-full px-4 py-3 bg-transparent text-white placeholder-gray-500 outline-none transition-all ${
              icon ? 'pl-10' : ''
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          />
        </motion.div>
      </div>

      {/* Error message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="text-red-400 text-xs mt-1.5"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

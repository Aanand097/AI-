'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

interface SocialLoginButtonProps {
  provider: 'google' | 'github' | 'microsoft';
  isLoading?: boolean;
  onClick?: () => void;
}

const PROVIDER_CONFIG = {
  google: {
    name: 'Google',
    icon: 'Mail',
    color: 'hover:border-blue-400/50 hover:bg-blue-400/5',
  },
  github: {
    name: 'GitHub',
    icon: 'Github',
    color: 'hover:border-gray-400/50 hover:bg-gray-400/5',
  },
  microsoft: {
    name: 'Microsoft',
    icon: 'Windows',
    color: 'hover:border-cyan-400/50 hover:bg-cyan-400/5',
  },
};

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  isLoading = false,
  onClick,
}) => {
  const config = PROVIDER_CONFIG[provider];
  const IconComponent =
    LucideIcons[config.icon as keyof typeof LucideIcons] || LucideIcons.Globe;

  return (
    <motion.button
      whileHover={{ scale: isLoading ? 1 : 1.02 }}
      whileTap={{ scale: isLoading ? 1 : 0.98 }}
      disabled={isLoading}
      onClick={onClick}
      className={`w-full py-2.5 px-4 rounded-lg border border-white/10 bg-white/5 text-gray-300 hover:text-white transition-all duration-200 ${config.color} disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
      type="button"
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <IconComponent className="w-4 h-4" />
      )}
      <span className="text-sm font-medium">{config.name}</span>
    </motion.button>
  );
};

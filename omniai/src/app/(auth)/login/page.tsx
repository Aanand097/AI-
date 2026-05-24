'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { InputField } from '@/components/auth/InputField';
import { PasswordField } from '@/components/auth/PasswordField';
import { Button } from '@/components/auth/Button';
import { ErrorMessage } from '@/components/auth/ErrorMessage';
import { SocialLoginButton } from '@/components/auth/SocialLoginButton';
import { useAuth } from '@/hooks/useAuth';
import { validateLoginForm } from '@/utils/validation';
import { AUTH_MESSAGES } from '@/constants/auth.constants';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login, error, isLoading, clearError } = useAuth();

  const [formData, setFormData] = useState({
    email: 'demo@omniai.com',
    password: 'Demo@12345',
    rememberMe: false,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear field-specific error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();

    // Validate form
    const errors = validateLoginForm(formData.email, formData.password);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await login(formData.email, formData.password, formData.rememberMe);

      // Redirect to dashboard on success
      router.push('/dashboard');
    } catch (err) {
      // Error is handled by the store
      console.error('Login failed:', err);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'github' | 'microsoft') => {
    // In production, this would initiate OAuth flow
    console.log(`Login with ${provider}`);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your OmniAI account"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error message */}
        {error && (
          <ErrorMessage message={error} onDismiss={clearError} />
        )}

        {/* Email input */}
        <InputField
          label="Email address"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleInputChange}
          name="email"
          error={formErrors.email}
          disabled={isLoading}
          icon={<Mail className="w-5 h-5" />}
          autoComplete="email"
        />

        {/* Password input */}
        <PasswordField
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          name="password"
          error={formErrors.password}
          disabled={isLoading}
          autoComplete="current-password"
        />

        {/* Remember me and forgot password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-4 h-4 rounded border-white/20 bg-white/5 border accent-blue-500 cursor-pointer disabled:opacity-50"
            />
            <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
              Remember me
            </span>
          </label>

          <Link
            href="/forgot-password"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          disabled={isLoading}
          className="mt-6"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gradient-to-br from-[#0B0F19] via-[#0D1117] to-[#1A1F2E] text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social login buttons */}
        <div className="space-y-2">
          <SocialLoginButton
            provider="google"
            isLoading={isLoading}
            onClick={() => handleSocialLogin('google')}
          />
          <SocialLoginButton
            provider="github"
            isLoading={isLoading}
            onClick={() => handleSocialLogin('github')}
          />
          <SocialLoginButton
            provider="microsoft"
            isLoading={isLoading}
            onClick={() => handleSocialLogin('microsoft')}
          />
        </div>

        {/* Sign up link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-400 text-sm"
        >
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Sign up
          </Link>
        </motion.p>

        {/* Demo credentials hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20"
        >
          <p className="text-xs text-blue-300">
            <span className="font-semibold">Demo credentials:</span><br />
            Email: demo@omniai.com<br />
            Password: Demo@12345
          </p>
        </motion.div>
      </form>
    </AuthLayout>
  );
}

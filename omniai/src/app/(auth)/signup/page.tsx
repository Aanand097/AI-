'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, User } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { InputField } from '@/components/auth/InputField';
import { PasswordField } from '@/components/auth/PasswordField';
import { Button } from '@/components/auth/Button';
import { ErrorMessage } from '@/components/auth/ErrorMessage';
import { SocialLoginButton } from '@/components/auth/SocialLoginButton';
import { useAuth } from '@/hooks/useAuth';
import { validateSignupForm } from '@/utils/validation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const { signup, error, isLoading, clearError } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
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
    const errors = validateSignupForm(
      formData.name,
      formData.email,
      formData.password,
      formData.confirmPassword,
      formData.agreeToTerms
    );

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await signup(formData.name, formData.email, formData.password);

      // Redirect to dashboard on success
      router.push('/dashboard');
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  const handleSocialSignup = (provider: 'google' | 'github' | 'microsoft') => {
    console.log(`Signup with ${provider}`);
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Join OmniAI today"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error message */}
        {error && (
          <ErrorMessage message={error} onDismiss={clearError} />
        )}

        {/* Full name input */}
        <InputField
          label="Full name"
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleInputChange}
          name="name"
          error={formErrors.name}
          disabled={isLoading}
          icon={<User className="w-5 h-5" />}
          autoComplete="name"
        />

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
          autoComplete="new-password"
        />

        {/* Confirm password input */}
        <PasswordField
          label="Confirm password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          name="confirmPassword"
          error={formErrors.confirmPassword}
          disabled={isLoading}
          autoComplete="new-password"
        />

        {/* Terms agreement */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            disabled={isLoading}
            className="w-4 h-4 rounded border-white/20 bg-white/5 border accent-blue-500 cursor-pointer disabled:opacity-50 mt-1"
          />
          <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
            I agree to the{' '}
            <a
              href="#"
              className="text-blue-400 hover:text-blue-300"
              onClick={(e) => e.preventDefault()}
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href="#"
              className="text-blue-400 hover:text-blue-300"
              onClick={(e) => e.preventDefault()}
            >
              Privacy Policy
            </a>
          </span>
        </label>

        {formErrors.agreeToTerms && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-xs -mt-5"
          >
            {formErrors.agreeToTerms}
          </motion.p>
        )}

        {/* Submit button */}
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          disabled={isLoading}
          className="mt-6"
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </Button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gradient-to-br from-[#0B0F19] via-[#0D1117] to-[#1A1F2E] text-gray-400">
              Or sign up with
            </span>
          </div>
        </div>

        {/* Social signup buttons */}
        <div className="space-y-2">
          <SocialLoginButton
            provider="google"
            isLoading={isLoading}
            onClick={() => handleSocialSignup('google')}
          />
          <SocialLoginButton
            provider="github"
            isLoading={isLoading}
            onClick={() => handleSocialSignup('github')}
          />
          <SocialLoginButton
            provider="microsoft"
            isLoading={isLoading}
            onClick={() => handleSocialSignup('microsoft')}
          />
        </div>

        {/* Login link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-400 text-sm"
        >
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Sign in
          </Link>
        </motion.p>
      </form>
    </AuthLayout>
  );
}

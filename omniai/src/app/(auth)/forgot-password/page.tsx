'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { InputField } from '@/components/auth/InputField';
import { Button } from '@/components/auth/Button';
import { ErrorMessage } from '@/components/auth/ErrorMessage';
import { validateEmail } from '@/utils/validation';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="We sent you a password reset link"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Success icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Message */}
          <div className="text-center space-y-2">
            <p className="text-gray-300">
              We&apos;ve sent a password reset link to:
            </p>
            <p className="text-blue-400 font-medium">{email}</p>
            <p className="text-gray-400 text-sm">
              Click the link in the email to reset your password. The link
              expires in 24 hours.
            </p>
          </div>

          {/* Additional info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-3.5 rounded-lg bg-blue-500/10 border border-blue-500/20"
          >
            <p className="text-xs text-blue-300">
              <span className="font-semibold">Didn&apos;t receive the email?</span>
              <br />
              Check your spam folder or try another email address.
            </p>
          </motion.div>

          {/* Back to login button */}
          <Button
            onClick={() => window.location.href = '/login'}
            variant="secondary"
            fullWidth
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to login
          </Button>
        </motion.div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset password"
      subtitle="Enter your email to receive a reset link"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error message */}
        {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}

        {/* Email input */}
        <InputField
          label="Email address"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={handleEmailChange}
          error={error ? error : undefined}
          disabled={isLoading}
          icon={<Mail className="w-5 h-5" />}
          autoComplete="email"
        />

        {/* Info text */}
        <p className="text-sm text-gray-400">
          We&apos;ll send you an email with a link to reset your password.
        </p>

        {/* Submit button */}
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send reset link'}
        </Button>

        {/* Back to login */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to sign in
          </Link>
        </motion.div>
      </form>
    </AuthLayout>
  );
}

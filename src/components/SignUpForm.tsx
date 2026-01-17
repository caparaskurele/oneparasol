'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation error messages
const validationRules = {
  name: {
    required: 'Full name is required',
    minLength: 'Name must be at least 2 characters',
    maxLength: 'Name must not exceed 100 characters',
  },
  email: {
    required: 'Email address is required',
    invalid: 'Please enter a valid email address',
  },
  password: {
    required: 'Password is required',
    minLength: 'Password must be at least 6 characters',
    maxLength: 'Password must not exceed 128 characters',
    noMatch: 'Passwords do not match',
  },
};

export default function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Check for success message from signin redirect
  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccess('Account created! Please sign in with your credentials.');
      // Clear the query param
      window.history.replaceState({}, document.title, '/signup');
    }
  }, [searchParams]);

  // Validate individual field
  const validateField = (fieldName: string, value: string): string => {
    switch (fieldName) {
      case 'name':
        if (!value) return validationRules.name.required;
        if (value.length < 2) return validationRules.name.minLength;
        if (value.length > 100) return validationRules.name.maxLength;
        return '';
      case 'email':
        if (!value) return validationRules.email.required;
        if (!EMAIL_REGEX.test(value)) return validationRules.email.invalid;
        return '';
      case 'password':
        if (!value) return validationRules.password.required;
        if (value.length < 6) return validationRules.password.minLength;
        if (value.length > 128) return validationRules.password.maxLength;
        return '';
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== password) return validationRules.password.noMatch;
        return '';
      default:
        return '';
    }
  };

  // Handle field blur for real-time validation
  const handleFieldBlur = (fieldName: string, value: string) => {
    const error = validateField(fieldName, value);
    setFieldErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate all fields
    const newErrors: Record<string, string> = {
      name: validateField('name', name),
      email: validateField('email', email),
      password: validateField('password', password),
      confirmPassword: validateField('confirmPassword', confirmPassword),
    };

    setFieldErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((err) => err)) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create account. Please try again.');
        setLoading(false);
        return;
      }

      // Redirect to signin with success message
      setSuccess('Account created successfully! Redirecting to sign in...');
      setTimeout(() => {
        router.push('/signin?registered=true');
      }, 1000);
    } catch (err: any) {
      console.error('Sign up error:', err);
      setError('Network error. Please check your connection and try again.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-300 text-sm">
          {success}
        </div>
      )}

      {/* Full Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={(e) => handleFieldBlur('name', e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
            fieldErrors.name
              ? 'border-red-500 focus:ring-red-500'
              : 'border-slate-300 dark:border-slate-600 focus:ring-indigo-500'
          } bg-white dark:bg-slate-800 text-slate-900 dark:text-white`}
          placeholder="John Doe"
          disabled={loading}
        />
        {fieldErrors.name && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-1">{fieldErrors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={(e) => handleFieldBlur('email', e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
            fieldErrors.email
              ? 'border-red-500 focus:ring-red-500'
              : 'border-slate-300 dark:border-slate-600 focus:ring-indigo-500'
          } bg-white dark:bg-slate-800 text-slate-900 dark:text-white`}
          placeholder="you@example.com"
          disabled={loading}
        />
        {fieldErrors.email && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-1">{fieldErrors.email}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={(e) => handleFieldBlur('password', e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
            fieldErrors.password
              ? 'border-red-500 focus:ring-red-500'
              : 'border-slate-300 dark:border-slate-600 focus:ring-indigo-500'
          } bg-white dark:bg-slate-800 text-slate-900 dark:text-white`}
          placeholder="••••••"
          disabled={loading}
        />
        {fieldErrors.password && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-1">{fieldErrors.password}</p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={(e) => handleFieldBlur('confirmPassword', e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition ${
            fieldErrors.confirmPassword
              ? 'border-red-500 focus:ring-red-500'
              : 'border-slate-300 dark:border-slate-600 focus:ring-indigo-500'
          } bg-white dark:bg-slate-800 text-slate-900 dark:text-white`}
          placeholder="••••••"
          disabled={loading}
        />
        {fieldErrors.confirmPassword && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-1">{fieldErrors.confirmPassword}</p>
        )}
      </div>

      {/* Sign Up Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2 px-4 rounded-lg transition"
      >
        {loading ? 'Creating account...' : 'Sign Up'}
      </button>

      {/* Link to Sign In */}
      <p className="text-center text-slate-600 dark:text-slate-400 text-sm">
        Already have an account?{' '}
        <Link href="/signin" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
          Sign in
        </Link>
      </p>
    </form>
  );
}

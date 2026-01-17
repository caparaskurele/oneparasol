'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Check for success message from signup redirect
  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccess('Account created successfully! Please sign in with your credentials.');
      // Clear the query param
      window.history.replaceState({}, document.title, '/signin');
    }
  }, [searchParams]);

  // Validate individual field
  const validateField = (fieldName: string, value: string): string => {
    switch (fieldName) {
      case 'email':
        if (!value) return 'Email address is required';
        if (!EMAIL_REGEX.test(value)) return 'Please enter a valid email address';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
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

    // Validate all fields
    const newErrors: Record<string, string> = {
      email: validateField('email', email),
      password: validateField('password', password),
    };

    setFieldErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some((err) => err)) {
      return;
    }

    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email: email.trim(),
        password,
        redirect: false,
      });

      if (!result?.ok) {
        setError(result?.error || 'Invalid email or password. Please try again.');
        setLoading(false);
        return;
      }

      // Redirect to profile on success
      setSuccess('Sign in successful! Redirecting...');
      setTimeout(() => {
        router.push('/my-profile');
      }, 500);
    } catch (err) {
      console.error('Sign in error:', err);
      setError('An error occurred. Please check your credentials and try again.');
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

      {/* Sign In Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2 px-4 rounded-lg transition"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>

      {/* Link to Sign Up */}
      <p className="text-center text-slate-600 dark:text-slate-400 text-sm">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
          Sign up
        </Link>
      </p>
    </form>
  );
}

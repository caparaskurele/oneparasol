import { Suspense } from 'react';
import { Container } from '@/components/Container';
import SignInForm from '@/components/SignInForm';

function SignInContent() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Welcome Back
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Sign in to your account to continue learning
        </p>

        <Suspense fallback={<div className="text-center text-slate-600 dark:text-slate-400">Loading...</div>}>
          <SignInForm />
        </Suspense>
      </div>
    </div>
  );
}

export default function SignInPage() {

  return (
    <Container>
      <SignInContent />
    </Container>
  );
}

import { Suspense } from 'react';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';
import { Container } from '@/components/Container';

export const metadata = {
  title: 'Forgot Password - OneParasol',
  description: 'Reset your OneParasol password using email verification.',
};

export default function ForgotPasswordPage() {
  return (
    <Container>
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <Suspense fallback={<div>Loading...</div>}>
          <ForgotPasswordForm />
        </Suspense>
      </div>
    </Container>
  );
}

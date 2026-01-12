'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SignInContent({ onRegistered }: { onRegistered: boolean }) {
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered') === 'true';

  return (
    <>
      {registered && (
        <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 px-4 py-3 rounded-lg mb-6">
          Account created successfully! Please sign in.
        </div>
      )}
    </>
  );
}

export function SignInMessage() {
  return (
    <Suspense fallback={null}>
      <SignInContent onRegistered={false} />
    </Suspense>
  );
}

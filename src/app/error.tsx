'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream/10 p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center space-y-6">
        <div className="bg-brand-brown/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl text-brand-brown">🏜️</span>
        </div>
        <h1 className="text-3xl font-bold text-brand-dark">Something went wrong!</h1>
        <p className="text-brand-dark/70">
          We encountered an unexpected error. Our team has been notified and is working to fix it.
        </p>
        <div className="pt-4 space-y-3">
          <Button
            onClick={() => reset()}
            className="w-full bg-brand-brown hover:bg-brand-brown/90 text-white font-bold py-6 text-lg"
          >
            Try again
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
            className="w-full border-brand-gold/30 text-brand-dark hover:bg-brand-cream/20"
          >
            Return to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}

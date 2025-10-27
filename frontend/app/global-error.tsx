'use client';

import { ErrorProps } from '@/types';

export function GlobalError({ title, error }: ErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1>Error loading {title}</h1>

        <div>
          <p className="text-destructive">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-4">
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

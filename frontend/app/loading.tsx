'use client';

import { LoadingProps } from '@/types';

export default function Loading({ className }: LoadingProps) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${className}`}
    >
      <div className="w-[50px] h-[50px] border-[6px] border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}

'use client';

import { TasksProps } from '@/types';

export default function TasksHeader({ tasks }: { tasks: TasksProps[] }) {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
        Task Manager
      </h1>
      <p className="mt-2 text-gray-600">
        Organize your tasks efficiently.{' '}
        <span className="inline-block">
          Progress:{' '}
          {Math.round(
            (tasks.filter((t) => t.done).length / tasks.length) * 100
          )}
          %
        </span>
      </p>
    </header>
  );
}

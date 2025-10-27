import { TasksProps } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTasks(): Promise<TasksProps[]> {
  const res = await fetch(`${API_URL}/tasks`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch tasks');

  return res.json();
}

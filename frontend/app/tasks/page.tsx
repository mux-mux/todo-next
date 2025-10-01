import { TasksProps } from '@/types';
import { GlobalError } from '../global-error';
import TaskList from './task-list';

async function getTasks(): Promise<TasksProps[]> {
  const res = await fetch('http://localhost:3001/tasks', {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch tasks');

  return res.json();
}

export default async function TasksPage() {
  try {
    const tasks = await getTasks();
    if (!tasks || tasks.length === 0) return <div>No tasks found.</div>;

    return <TaskList initialTasks={tasks} />;
  } catch (error) {
    return (
      <GlobalError
        title="Tasks"
        error={error instanceof Error ? error.message : String(error)}
      />
    );
  }
}

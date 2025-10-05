import { GlobalError } from '../global-error';
import TaskList from '@/components/tasks/TaskList';
import { getTasks } from '@/app/lib/tasks';

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

import { TasksProps } from '@/types';
import { GlobalError } from '../global-error';

async function getTasks(): Promise<TasksProps[]> {
  const res = await fetch('http://localhost:3001/tasks', {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch tasks');

  return res.json();
}

export default async function TasksPage() {
  let tasks: TasksProps[];

  try {
    tasks = await getTasks();
  } catch (error) {
    return (
      <GlobalError
        title="Tasks"
        error={error instanceof Error ? error.message : String(error)}
      />
    );
  }

  if (!tasks || tasks.length === 0) return <div>No tasks found.</div>;

  return (
    <table>
      <thead>
        <tr>
          <th className="pr-4">Title</th>
          <th className="pr-4">Desciption</th>
          <th className="pr-4">Priority</th>
          <th className="pr-4">Completed</th>
          <th className="pr-4">Category</th>
          <th className="pr-4">Due Date</th>
          <th className="pr-4">Created At</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(
          ({
            id,
            title,
            description,
            priority,
            completed,
            category,
            dueDate,
            createdAt,
          }) => (
            <tr key={id}>
              <td className="pr-4">{title}</td>
              <td className="pr-4">{description}</td>
              <td className="pr-4">{priority}</td>
              <td className="pr-4">{completed ? 'true' : 'false'}</td>
              <td className="pr-4">{category}</td>
              <td className="pr-4">{dueDate}</td>
              <td className="pr-4">{createdAt}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}

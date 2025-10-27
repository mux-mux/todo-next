import { TasksProps } from '@/types';

export default function TasksFooter({ tasks }: { tasks: TasksProps[] }) {
  return (
    <footer className="mt-8 text-center text-sm text-gray-600">
      {tasks.length > 0 && (
        <p>
          {tasks.filter((t) => t.done).length} of {tasks.length} tasks completed
        </p>
      )}
    </footer>
  );
}

export type TasksProps = {
  id: number;
  title: string;
  description: string;
  priority: number;
  done: boolean;
  category: string;
  dueDate: string;
  createdAt: string;
};

export type FilterStatus = 'all' | 'done' | 'undone';

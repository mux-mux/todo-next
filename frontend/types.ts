export type TasksProps = {
  id: number;
  title: string;
  description: string;
  priority: number;
  done: boolean;
  category: string;
  due: string;
  createdat: string;
};

export type NewTaskProps = {
  title: string;
  description: string;
  priority: number;
  category: string;
  due: string;
};

export type FilterStatus = 'all' | 'done' | 'undone';

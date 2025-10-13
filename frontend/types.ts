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
export type TaskCardProps = {
  task: TasksProps;
  toggleTaskCompletion: (id: number, done: boolean) => void;
  removeTask: (id: number) => void;
};
export type TaskFiltersProps = {
  tasks: TasksProps[];
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterStatus: FilterStatus;
  setFilterStatus: (value: FilterStatus) => void;
  filterCategory: FilterCategory;
  setFilterCategory: (value: FilterCategory) => void;
  sortOrder: 'asc' | 'desc' | 'none';
  setSortOrder: (value: 'asc' | 'desc' | 'none') => void;
  children?: React.ReactNode;
};
export type TaskFormDialogProps = {
  tasks: TasksProps[];
  newTask: NewTaskProps;
  setNewTask: React.Dispatch<React.SetStateAction<NewTaskProps>>;
  addTask: () => void;
};

export type FilterCategory = string;
export type FilterStatus = 'all' | 'done' | 'undone';

export type ErrorProps = { title: string | null; error?: string | null };

export type LoadingProps = { className?: string };

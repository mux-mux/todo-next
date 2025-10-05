'use client';

import { useState } from 'react';
import { FilterStatus, TasksProps, NewTaskProps } from '@/types';
import TaskFilters from './TaskFilters';
import TaskFormDialog from './TaskFormDialog';
import TaskCard from './TaskCard';
import { Card, CardContent } from '@/components/ui/card';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const initialNewTasks: NewTaskProps = {
  title: '',
  description: '',
  priority: 5,
  category: '',
  due: new Date().toISOString().split('T')[0],
};

export default function TaskList({
  initialTasks,
}: {
  initialTasks: TasksProps[];
}) {
  const [tasks, setTasks] = useState<TasksProps[]>(initialTasks);
  const [newTask, setNewTask] = useState<NewTaskProps>(initialNewTasks);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('none');
  const [searchTerm, setSearchTerm] = useState('');

  const addTask = async () => {
    if (!newTask.title.trim()) return;
    const res = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
    const nextTask = await res.json();
    setTasks([...tasks, nextTask]);
    setNewTask(initialNewTasks);
  };

  const removeTask = async (id: number) => {
    await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = async (id: number, done: boolean) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done } : t)));
    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ done }),
      });

      if (!res.ok) throw new Error('Failed to update task');

      const updatedTask = await res.json();

      setTasks((prev) =>
        prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
    } catch {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, done: !done } : t))
      );
    }
  };

  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description || '')
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesCategory =
        filterCategory === 'all' || task.category === filterCategory;

      const matchesFilter =
        filterStatus === 'all' ||
        (filterStatus === 'done' && task.done) ||
        (filterStatus === 'undone' && !task.done);

      return matchesSearch && matchesFilter && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.priority - b.priority;
      if (sortOrder === 'desc') return b.priority - a.priority;
      return 0;
    });

  return (
    <div className="min-h-screen rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
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
        <main>
          <TaskFilters
            tasks={tasks}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          >
            <TaskFormDialog
              newTask={newTask}
              setNewTask={setNewTask}
              addTask={addTask}
            />
          </TaskFilters>

          <div className="space-y-4">
            {filteredTasks.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-gray-500">
                    {filterStatus !== 'all'
                      ? 'No tasks match your search/filter criteria'
                      : 'No tasks yet. Add your first task!'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  toggleTaskCompletion={toggleTaskCompletion}
                  removeTask={removeTask}
                />
              ))
            )}
          </div>
        </main>

        <footer className="mt-8 text-center text-sm text-gray-600">
          {tasks.length > 0 && (
            <p>
              {tasks.filter((t) => t.done).length} of {tasks.length} tasks
              completed
            </p>
          )}
        </footer>
      </div>
    </div>
  );
}

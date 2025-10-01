'use client';

import { useState } from 'react';
import { TasksProps } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

export default function TaskList({
  initialTasks,
}: {
  initialTasks: TasksProps[];
}) {
  const [tasks, setTasks] = useState<TasksProps[]>(() => initialTasks);

  const getPriorityColor = (priority: number) => {
    if (priority <= 3) return 'bg-green-100 text-green-800';
    if (priority <= 6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const removeTask = async (id: number) => {
    await fetch(`http://localhost:3001/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = async (id: number, completed: boolean) => {
    const res = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    });
    const updatedTask = await res.json();

    setTasks(
      tasks.map((t) =>
        t.id === Number(updatedTask.id)
          ? { ...t, ...updatedTask, id: Number(updatedTask.id) }
          : t
      )
    );
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id} className="transition-all hover:shadow-md">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() =>
                  toggleTaskCompletion(task.id, !task.completed)
                }
                className="mt-1 h-5 w-5"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-4">
                  <h3
                    className={`text-lg font-medium ${
                      task.completed
                        ? 'line-through text-gray-500'
                        : 'text-gray-800'
                    }`}
                  >
                    {task.title}
                  </h3>
                  <Badge
                    className={
                      getPriorityColor(task.priority) +
                      'inline-block min-w-[26px]'
                    }
                  >
                    {task.priority}
                  </Badge>
                </div>
                {task.description && (
                  <p
                    className={`mt-2 text-gray-600 ${
                      task.completed ? 'line-through' : ''
                    }`}
                  >
                    {task.description}
                  </p>
                )}
                <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                  <span>
                    {task.category && (
                      <span className="mr-2">🗒️{task.category}</span>
                    )}
                    {task.dueDate && (
                      <span
                        className={
                          new Date(task.dueDate) < new Date()
                            ? 'text-red-500'
                            : ''
                        }
                      >
                        📅 {new Date(task.dueDate).toISOString().slice(0, 10)}
                      </span>
                    )}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTask(task.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 translate-x-[5px]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

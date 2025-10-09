'use client';

import { TasksProps } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';

type TaskCardProps = {
  task: TasksProps;
  toggleTaskCompletion: (id: number, done: boolean) => void;
  removeTask: (id: number) => void;
};

export default function TaskCard({
  task,
  toggleTaskCompletion,
  removeTask,
}: TaskCardProps) {
  const getPriorityColor = (priority: number) => {
    if (priority <= 3) return 'bg-green-100 text-green-800';
    if (priority <= 6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Card key={task.id} className="transition-all hover:shadow-md py-4">
      <CardContent className="px-4 overflow-auto">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={task.done}
            onCheckedChange={() => toggleTaskCompletion(task.id, !task.done)}
            className="mt-1 h-5 w-5"
            aria-label={`Mark ${task.title} task as done/undone`}
          />
          <div className="flex-1">
            <div className="flex items-center justify-between gap-4">
              <h2
                className={`text-lg font-medium ${
                  task.done ? 'line-through text-gray-500' : 'text-gray-800'
                }`}
              >
                {task.title}
              </h2>
              <Badge
                className={
                  getPriorityColor(task.priority) + ' inline-block min-w-[26px]'
                }
              >
                {task.priority}
              </Badge>
            </div>
            {task.description && (
              <p
                className={`mt-2 text-gray-600 ${
                  task.done ? 'line-through' : ''
                }`}
              >
                {task.description}
              </p>
            )}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span className="grid grid-cols-1 sm:grid-cols-2">
                {task.category && (
                  <span className="mr-2">🗒️{task.category}</span>
                )}
                {task.due && (
                  <span
                    className={
                      new Date(task.due).setHours(0, 0, 0, 0) <
                      new Date().setHours(0, 0, 0, 0)
                        ? 'text-red-600'
                        : ''
                    }
                  >
                    📅 {new Date(task.due).toISOString().slice(0, 10)}
                  </span>
                )}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeTask(task.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 translate-x-[5px]"
                aria-label={`Delete ${task.title} from task list`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

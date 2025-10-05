'use client';

import { NewTaskProps, TasksProps } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type TaskFormDialogProps = {
  tasks: TasksProps[];
  newTask: NewTaskProps;
  setNewTask: React.Dispatch<React.SetStateAction<NewTaskProps>>;
  addTask: () => void;
};

export default function TaskFormDialog({
  tasks,
  newTask,
  setNewTask,
  addTask,
}: TaskFormDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const categories = Array.from(
    new Set(tasks.map((t) => t.category).filter(Boolean))
  );

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Create a task with title, description, priority, due date &
            category.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              placeholder="Task title"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              placeholder="Task description"
            />
          </div>
          <div>
            <Label htmlFor="priority">Priority: {newTask.priority}</Label>
            <Input
              id="priority"
              type="range"
              min="1"
              max="10"
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: Number(e.target.value) })
              }
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={newTask.category}
              onValueChange={(value) =>
                setNewTask({ ...newTask, category: value })
              }
            >
              <SelectTrigger id="category" className="w-full bg-white">
                <SelectValue placeholder="Choose category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
                <SelectItem value="newCategory">
                  <Plus /> Add new...
                </SelectItem>
              </SelectContent>
            </Select>
            {newTask.category === 'newCategory' && (
              <Input
                placeholder="Enter new category"
                value={newTask.title || ''}
                onChange={(e) =>
                  setNewTask({ ...newTask, category: e.target.value })
                }
                className="mt-2"
              />
            )}
          </div>
          <div>
            <Label htmlFor="due">Due Date</Label>
            <Input
              id="due"
              type="date"
              value={newTask.due}
              onChange={(e) => setNewTask({ ...newTask, due: e.target.value })}
              className="cursor-pointer"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              addTask();
              setIsDialogOpen(false);
            }}
          >
            Add Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

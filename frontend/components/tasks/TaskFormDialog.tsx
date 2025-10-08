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
import { useEffect, useState } from 'react';
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = Array.from(
    new Set(tasks.map((t) => t.category).filter(Boolean))
  );

  const validateField = (field: string, value: string) => {
    let message = '';

    switch (field) {
      case 'title':
        if (!value.trim()) message = 'Title is required.';
        else if (value.trim().length < 3)
          message = 'Title must be at least 3 characters.';
        else if (value.trim().length > 255)
          message = 'Title cannot exceed 255 characters.';
        break;

      case 'description':
        if (value.length > 600)
          message = 'Description cannot exceed 600 characters.';
        break;

      case 'category':
        if (!value.trim()) message = 'Category is required.';
        break;

      case 'due':
        if (!value) message = 'Due date is required.';
        else {
          const dueDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (dueDate < today) message = 'Due date must be in the future.';
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  useEffect(() => {
    if (isSubmitted) validateField('title', newTask.title);
  }, [newTask.title, isSubmitted]);

  useEffect(() => {
    if (isSubmitted) validateField('description', newTask.description);
  }, [newTask.description, isSubmitted]);

  useEffect(() => {
    if (isSubmitted) validateField('category', newTask.category);
  }, [newTask.category, isSubmitted]);

  useEffect(() => {
    if (isSubmitted) validateField('due', newTask.due);
  }, [newTask.due, isSubmitted]);

  const isFormValid = () =>
    Object.values(errors).every((msg) => !msg) &&
    newTask.title.trim() &&
    newTask.category &&
    newTask.due;

  const handleAddTask = () => {
    setIsSubmitted(true);
    validateField('title', newTask.title);
    validateField('description', newTask.description);
    validateField('category', newTask.category);
    validateField('due', newTask.due);

    if (isFormValid()) {
      addTask();
      setIsDialogOpen(false);
      setErrors({});
      setIsSubmitted(false);
    }
  };

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

        <div className="space-y-6 max-h-[80vh] p-4 overflow-y-auto">
          <div className="relative">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              placeholder="Task title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1 absolute -bottom-5">
                {errors.title}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newTask.description}
              onChange={(e) => {
                if (e.target.value.length <= 600) {
                  setNewTask({ ...newTask, description: e.target.value });
                }
              }}
              placeholder="Task description (max 600 characters)"
              className="max-h-40 overflow-y-auto resize-none"
            />

            <div className="flex justify-between text-sm mt-1">
              <span
                className={`${
                  newTask.description.length > 550
                    ? 'text-yellow-600'
                    : 'text-gray-500'
                }`}
              >
                {newTask.description.length}/600
              </span>
              {errors.description && (
                <span className="text-red-500">{errors.description}</span>
              )}
            </div>
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
          <div className="relative">
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
                value={
                  newTask.category === 'newCategory' ? '' : newTask.category
                }
                onChange={(e) =>
                  setNewTask({ ...newTask, category: e.target.value })
                }
                className="mt-2"
              />
            )}
            {errors.category && (
              <p className="text-red-500 text-sm mt-1 absolute -bottom-5">
                {errors.category}
              </p>
            )}
          </div>
          <div className="relative">
            <Label htmlFor="due">Due Date</Label>
            <Input
              id="due"
              type="date"
              value={newTask.due}
              onChange={(e) => setNewTask({ ...newTask, due: e.target.value })}
              className="cursor-pointer"
            />
            {errors.due && (
              <p className="text-red-500 text-sm mt-1 absolute -bottom-5">
                {errors.due}
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddTask}>Add Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

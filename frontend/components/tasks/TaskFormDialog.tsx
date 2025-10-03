'use client';

import { NewTaskProps } from '@/types';
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

type TaskFormDialogProps = {
  newTask: NewTaskProps;
  setNewTask: React.Dispatch<React.SetStateAction<NewTaskProps>>;
  addTask: () => void;
};

export default function TaskFormDialog({
  newTask,
  setNewTask,
  addTask,
}: TaskFormDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
            <Input
              id="category"
              value={newTask.category}
              onChange={(e) =>
                setNewTask({ ...newTask, category: e.target.value })
              }
              placeholder="Work, Study, Personal..."
            />
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

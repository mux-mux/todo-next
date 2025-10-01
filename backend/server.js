import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { serverErrorHandler } from './middleware/serverErrorHandler.js';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const PORT = process.env.PORT || 3001;
const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';

const app = express();

app.use(cors());
app.use(express.json());

let id = 0;

let tasks = [
  {
    id: ++id,
    title: 'Complete project proposal document',
    description: 'Write and finalize the project proposal',
    priority: 3,
    completed: false,
    category: 'work',
    dueDate: '2025-10-05',
    createdAt: '2025-09-30 09:00',
  },
  {
    id: ++id,
    title: 'Buy groceries for the week',
    description: 'Get food and household supplies',
    priority: 2,
    completed: false,
    category: 'personal',
    dueDate: '2025-10-02',
    createdAt: '2025-09-30 18:30',
  },
  {
    id: ++id,
    title: '30-minute morning run',
    description: 'Daily exercise for fitness',
    priority: 4,
    completed: false,
    category: 'health',
    dueDate: '2025-10-01',
    createdAt: '2025-09-30 07:00',
  },
  {
    id: ++id,
    title: 'Read Next documentation updates',
    description: 'Study latest framework changes',
    priority: 3,
    completed: false,
    category: 'learning',
    dueDate: '2025-10-07',
    createdAt: '2025-09-30 20:15',
  },
  {
    id: ++id,
    title: 'Plan weekend trip',
    description: 'Organize travel and activities',
    priority: 1,
    completed: false,
    category: 'recreation',
    dueDate: '2025-10-04',
    createdAt: '2025-09-30 19:45',
  },
];

app.get('/', (req, res) => res.send('server is working'));

app.get('/tasks', serverErrorHandler, (req, res) => {
  res.json(tasks);
});

app.post('/tasks', serverErrorHandler, (req, res) => {
  const { title, description, priority, category, dueDate } = req.body;

  const newTask = {
    id: ++id,
    title,
    description,
    priority,
    category,
    dueDate,
    createdAt: getCurrentDateTime(),
  };

  tasks.push(newTask);
  res.status(201).json(tasks);
});

app.patch('/tasks/:id', serverErrorHandler, (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  tasks = tasks.map((task) =>
    task.id == Number(id) ? { ...task, completed: completed } : task
  );
  res.json(tasks);
});

app.delete('/tasks/:id', serverErrorHandler, (req, res) => {
  const { id } = req.params;

  tasks = tasks.filter((task) => task.id !== Number(id));
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server is running on: ${BASE_URL}`);
});

function getCurrentDateTime() {
  return new Date().toISOString().replace('T', ' ').substring(0, 16);
}

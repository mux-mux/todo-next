import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import { serverErrorHandler } from './middleware/serverErrorHandler.js';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const PORT = process.env.PORT || 3001;
const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.get('/', (req, res) => res.send('server is working'));

app.get('/tasks', serverErrorHandler, async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM tasks');
  res.json(rows);
});

app.post('/tasks', serverErrorHandler, async (req, res) => {
  const { title, description, priority, category, due } = req.body;

  const { rows } = await pool.query(
    `INSERT INTO tasks (title, description, priority, category, due)
   VALUES ($1, $2, $3, $4, $5)
   RETURNING *`,
    [title, description, priority, category, due]
  );

  res.status(201).json(rows[0]);
});

app.patch('/tasks/:id', serverErrorHandler, async (req, res) => {
  const { id } = req.params;
  const { done } = req.body;

  const { rows } = await pool.query(
    'UPDATE tasks SET done=$1 WHERE id=$2 RETURNING *',
    [done, id]
  );
  res.json(rows[0]);
});

app.delete('/tasks/:id', serverErrorHandler, async (req, res) => {
  const { id } = req.params;

  await pool.query('DELETE FROM tasks WHERE id=$1', [id]);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server is running on: ${BASE_URL}`);
});

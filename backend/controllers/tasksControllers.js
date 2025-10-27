import { pool } from '../server.js';

export const getTasks = async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM tasks');
  res.json(rows);
};

export const addTask = async (req, res) => {
  const { title, description, priority, category, due } = req.body;

  const { rows } = await pool.query(
    `INSERT INTO tasks (title, description, priority, category, due)
   VALUES ($1, $2, $3, $4, $5)
   RETURNING *`,
    [title.trim(), description.trim(), priority, category.trim(), due]
  );

  res.status(201).json(rows[0]);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { done } = req.body;

  if (typeof done !== 'boolean') {
    return res
      .status(400)
      .json({ success: false, error: 'Invalid done value.' });
  }

  const { rows } = await pool.query(
    'UPDATE tasks SET done=$1 WHERE id=$2 RETURNING *',
    [done, id]
  );

  if (rows.length === 0) {
    return res.status(404).json({ success: false, error: 'Task not found.' });
  }

  res.json(rows[0]);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('DELETE FROM tasks WHERE id=$1', [id]);

  if (result.rowCount === 0) {
    return res.status(404).json({ success: false, error: 'Task not found.' });
  }

  res.status(204).end();
};

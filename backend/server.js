import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import { tasksRouter } from './routes/tasks.js';

const inProduction = process.env.NODE_ENV === 'production';
!inProduction && dotenv.config();

const PORT = process.env.PORT || 3001;
const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: inProduction ? { rejectUnauthorized: false } : false,
});

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('server is working'));
app.use('/tasks', tasksRouter);

if (!inProduction) {
  app.listen(PORT, () => {
    console.log(`Server is running on: ${BASE_URL}`);
  });
}

export default app;

import express from 'express';
import { serverErrorHandler } from '../middleware/serverErrorHandler.js';
import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
} from '../controllers/tasksControllers.js';
import { validateTaskInput } from '../middleware/validateTaskInput.js';

export const tasksRouter = express.Router();

tasksRouter.get('/', serverErrorHandler, getTasks);
tasksRouter.post('/', serverErrorHandler, validateTaskInput, addTask);
tasksRouter.patch('/:id', serverErrorHandler, updateTask);
tasksRouter.delete('/:id', serverErrorHandler, deleteTask);

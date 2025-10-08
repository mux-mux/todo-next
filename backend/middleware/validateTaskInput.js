export function validateTaskInput(req, res, next) {
  const { title, description = '', priority = 1, category, due } = req.body;
  const errors = {};

  if (!title || typeof title !== 'string' || !title.trim()) {
    errors.title = 'Title is required.';
  } else if (title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters long.';
  } else if (title.trim().length > 255) {
    errors.title = 'Title cannot exceed 255 characters.';
  }

  if (description && description.length > 600) {
    errors.description = 'Description cannot exceed 600 characters.';
  }

  if (typeof priority !== 'number' || priority < 1 || priority > 10) {
    errors.priority = 'Priority must be a number between 1 and 10.';
  }

  if (!category || typeof category !== 'string' || !category.trim()) {
    errors.category = 'Category is required.';
  }

  if (!due) {
    errors.due = 'Due date is required.';
  } else {
    const dueDate = new Date(due);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(dueDate.getTime())) {
      errors.due = 'Invalid due date format.';
    } else if (dueDate < today) {
      errors.due = 'Due date must be in the future.';
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
}

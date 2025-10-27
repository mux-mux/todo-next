export function errorHandler(req, res, next) {
  try {
    next();
  } catch (err) {
    handleError(err, res);
  }
}

function handleError(err, res) {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
}

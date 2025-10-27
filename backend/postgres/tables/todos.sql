BEGIN TRANSACTION;
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority INT CHECK (priority BETWEEN 1 AND 10),
  completed BOOLEAN DEFAULT FALSE,
  category VARCHAR(50),
  dueDate DATE,
  createdAt TIMESTAMP DEFAULT NOW()
);
COMMIT;
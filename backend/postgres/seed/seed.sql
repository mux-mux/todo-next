BEGIN TRANSACTION;

INSERT INTO tasks (title, description, priority, done, category, due, created) VALUES
('Complete project proposal document', 'Write and finalize the project proposal', 3, FALSE, 'work', '2025-10-05', '2025-09-30 09:00:00'),
('Buy groceries for the week', 'Get food and household supplies', 2, FALSE, 'personal', '2025-10-02', '2025-09-30 18:30:00'),
('30-minute morning run', 'Daily exercise for fitness', 4, FALSE, 'health', '2025-10-01', '2025-09-30 07:00:00'),
('Read Next documentation updates', 'Study latest framework changes', 3, FALSE, 'learning', '2025-10-07', '2025-09-30 20:15:00'),
('Plan weekend trip', 'Organize travel and activities', 1, FALSE, 'recreation', '2025-10-04', '2025-09-30 19:45:00');

COMMIT;
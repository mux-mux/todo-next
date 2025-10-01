import TasksPage from './tasks/page';

export default function Home() {
  return (
    <div className="font-sans flex items-center justify-center min-h-screen p-4 sm:p-10">
      <main className="flex flex-col items-center sm:items-start">
        <TasksPage />
      </main>
    </div>
  );
}

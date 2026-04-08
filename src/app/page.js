import TaskList from '@/components/TaskList';

export default function HomePage() {
  const tasks = [
    { id: 1, title: 'Buy milk', done: false },
    { id: 2, title: 'Write tests', done: true },
    { id: 3, title: 'Ship it', done: false },
  ];

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskList tasks={tasks} />
    </main>
  );
}
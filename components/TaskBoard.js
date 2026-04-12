'use client';

import { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';

export default function TaskBoard() {
  const [tasks, setTasks] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState('all');

  // Persist tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Update the browser tab title with active task count
  useEffect(() => {
    const active = tasks.filter((t) => !t.done).length;
    document.title = `${active} tasks remaining`;
    return () => { document.title = 'Task Manager'; };
  }, [tasks]);

  function handleAdd(title) {
    const newTask = { id: crypto.randomUUID(), title, done: false };
    setTasks([...tasks, newTask]);
  }

  function handleToggle(id) {
    setTasks(tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  }

  function handleDelete(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  const completedCount = tasks.filter((t) => t.done).length;

  const visible = filter === 'all'
    ? tasks
    : filter === 'active'
      ? tasks.filter((t) => !t.done)
      : tasks.filter((t) => t.done);

  return (
    <div className="max-w-lg mx-auto p-6">
      <AddTaskForm onAdd={handleAdd} />

      <p className="text-sm text-gray-500 mb-4">
        {completedCount} of {tasks.length} complete
      </p>

      <div className="flex gap-2 mb-4">
        {['all', 'active', 'done'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-sm px-3 py-1 rounded ${
              filter === f
                ? 'bg-green-700 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <TaskList tasks={visible} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import TaskStats from './TaskStats';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';

export default function TaskBoard() {
  const [tasks, setTasks] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const active = tasks.filter((t) => !t.done).length;
    document.title = `${active} tasks remaining`;
    return () => { document.title = 'Task Manager'; };
  }, [tasks]);

  const completed = tasks.filter((t) => t.done).length;
  const active = tasks.length - completed;

  const visible = (filter === 'all'
    ? tasks
    : filter === 'done'
      ? tasks.filter((t) => t.done)
      : tasks.filter((t) => !t.done)
  ).toSorted((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  function handleAdd(title, dueDate) {
    setTasks([...tasks, { id: crypto.randomUUID(), title, done: false, dueDate }]);
  }

  function handleToggle(id) {
    setTasks(tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  }

  function handleDelete(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function handleClearDone() {
    setTasks(tasks.filter((t) => !t.done));
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <TaskStats
        total={tasks.length}
        completed={completed}
        active={active}
        onClearCompleted={handleClearDone}
      />
      <AddTaskForm onAdd={handleAdd} />
      <div className="flex gap-2 mb-4">
        {['all', 'active', 'done'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded text-sm ${
              filter === f ? 'bg-green-700 text-white' : 'border'
            }`}
          >{f.charAt(0).toUpperCase() + f.slice(1)}</button>
        ))}
      </div>
      <TaskList
        tasks={visible}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  );
}
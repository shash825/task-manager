'use client';

import { useState } from 'react';
import TaskList from './TaskList';

export default function TaskBoard() {
  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Buy milk', done: false },
    { id: 't2', title: 'Write tests', done: false },
    { id: 't3', title: 'Ship it', done: false },
  ]);

  function handleToggle(id) {
    setTasks(tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    ));
  }

  function handleDelete(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  const completedCount = tasks.filter((t) => t.done).length;

  return (
    <div className="max-w-lg mx-auto p-6">
      <p className="text-sm text-gray-500 mb-4">
        {completedCount} of {tasks.length} complete
      </p>
      <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
}
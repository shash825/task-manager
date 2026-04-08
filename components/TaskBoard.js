'use client';

import TaskList from './TaskList';

export default function TaskBoard() {
  const tasks = [
    { id: 't1', title: 'Buy milk', done: false },
    { id: 't2', title: 'Write tests', done: true },
    { id: 't3', title: 'Ship it', done: false },
  ];

  function handleToggle(id) {
    console.log('Toggle task', id);
  }

  function handleDelete(id) {
    console.log('Delete task', id);
  }

  return <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />;
}
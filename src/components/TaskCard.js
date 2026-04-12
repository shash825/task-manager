'use client';

export default function TaskCard({ title, done, id, dueDate, onToggle, onDelete }) {
  const isOverdue = dueDate && !done && new Date(dueDate) < new Date().setHours(0, 0, 0, 0);

  return (
    <div className="flex items-center justify-between p-3 border-b">
      <div>
        <span className={done ? 'line-through text-gray-400' : 'text-gray-900'}>
          {title}
        </span>
        {dueDate && (
          <span className={`ml-2 text-xs ${isOverdue ? 'text-red-600 font-bold' : 'text-gray-400'}`}>
            {isOverdue ? 'Overdue: ' : 'Due: '}{dueDate}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <button
          className="text-sm text-green-700 hover:underline"
          onClick={() => onToggle(id)}
        >Toggle</button>
        <button
          className="text-sm text-red-600 hover:underline"
          onClick={() => onDelete(id)}
        >Delete</button>
      </div>
    </div>
  );
}
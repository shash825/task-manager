'use client';

export default function TaskCard({ title, done, id, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-between p-3 border-b">
      <span className={done ? 'line-through text-gray-400' : 'text-gray-900'}>
        {title}
      </span>
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
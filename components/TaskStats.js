'use client';

export default function TaskStats({ total, completed, active, onClearCompleted }) {
  return (
    <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
      <p>
        {completed} of {total} complete ({active} remaining)
      </p>
      {completed > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-red-600 hover:underline"
        >Clear completed</button>
      )}
    </div>
  );
}
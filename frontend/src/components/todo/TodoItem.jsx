import React from 'react';
import { Trash2, Edit2, CheckCircle, Circle } from 'lucide-react';

export default function TodoItem({ todo, onToggleComplete, onEdit, onDelete }) {
  return (
    <div className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-4 bg-white ${
      todo.isCompleted ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200 hover:shadow-md'
    }`}>
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <button
          onClick={() => onToggleComplete(todo.id, !todo.isCompleted)}
          className={`mt-0.5 flex-shrink-0 transition-colors ${
            todo.isCompleted ? 'text-emerald-500' : 'text-slate-400 hover:text-blue-500'
          }`}
        >
          {todo.isCompleted ? <CheckCircle size={20} /> : <Circle size={20} />}
        </button>
        
        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold text-slate-800 break-words ${todo.isCompleted ? 'line-through text-slate-400' : ''}`}>
            {todo.title}
          </h4>
          {todo.description && (
            <p className={`text-sm mt-1 break-words ${todo.isCompleted ? 'text-slate-400/70' : 'text-slate-500'}`}>
              {todo.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={() => onEdit(todo)}
          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
          title="Sửa công việc"
        >
          <Edit2 size={16} />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Xóa công việc"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
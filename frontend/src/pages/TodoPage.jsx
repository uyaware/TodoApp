import React from 'react';
import { useTodo } from '../hooks/useTodo';
import TodoForm from '../components/todo/TodoForm';
import TodoItem from '../components/todo/TodoItem';
import TodoFilterBar from '../components/todo/TodoFilterBar';
import TodoPagination from '../components/todo/TodoPagination';
import { Plus } from 'lucide-react';

export default function TodoPage() {
  const {
    todos, loading, error,
    searchTerm, statusFilter, setStatusFilter,
    currentPage, totalPages,
    editingTodo, setEditingTodo,
    isCreating, setIsCreating,
    handleSearchSubmit, handleFormSubmit, handleToggleComplete, handleDelete,
    handleReset, goToPage,
  } = useTodo();

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">🎯 Todo Management</h1>
          <p className="text-sm text-slate-500 mt-1">Hệ thống quản lý và tối ưu hóa công việc hàng ngày</p>
        </div>
        {!isCreating && !editingTodo && (
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-xl transition-colors shadow-sm self-start sm:self-auto"
          >
            <Plus size={18} /> Thêm công việc
          </button>
        )}
      </header>

      {/* Form Add/Edit */}
      {(isCreating || editingTodo) && (
        <div className="mb-6 animate-fadeIn">
          <TodoForm
            initialData={editingTodo}
            onSubmit={handleFormSubmit}
            onClose={() => {
              setIsCreating(false);
              setEditingTodo(null);
            }}
          />
        </div>
      )}

      {/* Filter Bar */}
      <TodoFilterBar
        searchTerm={searchTerm}
        onSearch={handleSearchSubmit}
        statusFilter={statusFilter}
        onFilterChange={setStatusFilter}
        onReset={handleReset}
        loading={loading}
      />

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm mb-6">
          ⚠️ {error}. Vui lòng kiểm tra lại kết nối với API Backend.
        </div>
      )}

      {/* Main List & Loading state */}
      {loading ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-300 border-t-blue-600 mb-2"></div>
          <p className="text-slate-500 text-sm">Đang tải và cập nhật dữ liệu...</p>
        </div>
      ) : todos.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
          <p className="text-slate-400 text-lg font-medium">Không tìm thấy công việc nào phù hợp</p>
          <p className="text-slate-400 text-sm mt-1">Thử thay đổi bộ lọc hoặc thêm mới công việc!</p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={handleToggleComplete}
                onEdit={(item) => {
                  setIsCreating(false);
                  setEditingTodo(item);
                }}
                onDelete={handleDelete}
              />
            ))}
          </div>

          <TodoPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </>
      )}
    </div>
  );
}
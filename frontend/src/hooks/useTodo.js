import { useState, useEffect } from 'react';
import { todoApi } from '../api/todo.api';
import { toast } from 'sonner';

export function useTodo() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Bộ lọc & phân trang
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);

  // Quản lý UI Form
  const [editingTodo, setEditingTodo] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const fetchTodos = async (page = currentPage, currentSearch = searchTerm, currentFilter = statusFilter) => {
    setLoading(true);
    setError(null);
    try {
      const res = await todoApi.getAll(currentSearch, currentFilter, page, limit);
      setTodos(res.metadata?.data || []);
      if (res.metadata?.pagination) {
        setCurrentPage(res.metadata.pagination.currentPage || 1);
        setTotalPages(res.metadata.pagination.totalPages || 1);
      } else {
        // fallback nếu backend không trả field pagination
        setCurrentPage(page);
        setTotalPages(1);
      }
    } catch (err) {
      const message = err.message || 'Có lỗi xảy ra khi tải danh sách';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch lại khi đổi trạng thái lọc (search xử lý riêng qua handleSearchSubmit vì cần Enter/Click mới chạy)
  useEffect(() => {
    fetchTodos(1, searchTerm, statusFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const handleSearchSubmit = (value) => {
    setSearchTerm(value);
    fetchTodos(1, value, statusFilter);
  };

  // Đặt lại toàn bộ bộ lọc về mặc định
  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('');
    fetchTodos(1, '', '');
  };

  // Chuyển trang, giữ nguyên search/filter hiện tại
  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    fetchTodos(page, searchTerm, statusFilter);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingTodo) {
        await todoApi.update(editingTodo.id, formData);
        setEditingTodo(null);
        toast.success('Cập nhật công việc thành công!');
        fetchTodos(currentPage);
      } else {
        await todoApi.create(formData);
        setIsCreating(false);
        toast.success('Thêm công việc thành công!');
        fetchTodos(1);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleToggleComplete = async (id, isCompleted) => {
    try {
      await todoApi.update(id, { isCompleted });
      fetchTodos(currentPage);
      toast.success(isCompleted ? 'Đã hoàn thành công việc!' : 'Đã mở lại công việc!');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = (id) => {
    toast('Bạn có chắc chắn muốn xóa công việc này không?', {
      action: {
        label: 'Xóa',
        onClick: async () => {
          try {
            await todoApi.delete(id);
            toast.success('Đã xóa công việc');
            // Nếu xóa item cuối cùng của trang hiện tại (và không phải trang 1), lùi về trang trước
            const nextPage = todos.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;
            fetchTodos(nextPage);
          } catch (err) {
            toast.error(err.message);
          }
        },
      },
      cancel: { label: 'Hủy' },
      duration: 5000,
    });
  };

  return {
    todos, loading, error,
    searchTerm, statusFilter, setStatusFilter,
    currentPage, totalPages,
    editingTodo, setEditingTodo,
    isCreating, setIsCreating,
    handleSearchSubmit, handleFormSubmit, handleToggleComplete, handleDelete,
    handleReset, goToPage, fetchTodos,
  };
}
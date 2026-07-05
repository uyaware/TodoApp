import React, { useState, useEffect } from 'react';
import { todoSchema } from '../../schemas/todo.schema';
import { X } from 'lucide-react';

export default function TodoForm({ onSubmit, initialData = null, onClose }) {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [errors, setErrors] = useState({});

  // Đổ dữ liệu cũ vào form nếu là hành động Edit
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
      });
    }
  }, [initialData]);

  // Hàm cập nhật state input VÀ xóa lỗi của trường đó ngay lập tức khi người dùng gõ lại cho đúng
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Nếu trường này đang có lỗi, xóa lỗi đó đi khi user bắt đầu gõ lại
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate dữ liệu bằng Zod
    const validation = todoSchema.safeParse(formData);
    
    if (!validation.success) {
      // Chuyển format lỗi của Zod thành một object phẳng { title: "...", description: "..." }
      const fieldErrors = {};
      validation.error.issues.forEach((err) => {
        const fieldName = err.path[0];
        fieldErrors[fieldName] = err.message;
      });
      
      // Cập nhật State để React render lại giao diện kèm lỗi
      setErrors(fieldErrors);
      return; // Dừng lại không cho submit lên cha
    }

    // Nếu dữ liệu hoàn toàn hợp lệ
    setErrors({});
    onSubmit(formData);
    
    // Reset form nếu là thêm mới
    if (!initialData) {
      setFormData({ title: '', description: '' });
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative">
      {onClose && (
        <button 
          type="button" 
          onClick={onClose} 
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={18} />
        </button>
      )}
      <h3 className="text-lg font-bold text-slate-800 mb-4">
        {initialData ? 'Chỉnh sửa công việc' : 'Thêm công việc mới'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Trường Tiêu đề */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tiêu đề *</label>
          <input
            type="text"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              errors.title 
                ? 'border-red-500 focus:ring-red-100 bg-red-50/30 text-red-900' 
                : 'border-slate-300 focus:ring-blue-100 focus:border-blue-500'
            }`}
            placeholder="Nhập tiêu đề công việc..."
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
          />
          {/* Khu vực hiển thị text lỗi */}
          {errors.title && (
            <p className="text-xs text-red-500 font-medium mt-1 animate-fadeIn">
              {errors.title}
            </p>
          )}
        </div>

        {/* Trường Mô tả */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả</label>
          <textarea
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
              errors.description 
                ? 'border-red-500 focus:ring-red-100 bg-red-50/30 text-red-900' 
                : 'border-slate-300 focus:ring-blue-100 focus:border-blue-500'
            }`}
            rows="3"
            placeholder="Nhập mô tả chi tiết..."
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
          {errors.description && (
            <p className="text-xs text-red-500 font-medium mt-1 animate-fadeIn">
              {errors.description}
            </p>
          )}
        </div>

        {/* Buttons hành động */}
        <div className="flex justify-end gap-2 pt-2">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Hủy
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            {initialData ? 'Lưu thay đổi' : 'Thêm công việc'}
          </button>
        </div>
      </form>
    </div>
  );
}
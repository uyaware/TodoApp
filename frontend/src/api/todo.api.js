const BASE_URL = import.meta.env.VITE_BASE_URL;

export const todoApi = {
  // 1. Lấy danh sách công việc (hỗ trợ search, filter trạng thái, và PHÂN TRANG)
  getAll: async (search = '', isCompleted = '', page = 1, limit = 10) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (isCompleted !== '') params.append('isCompleted', isCompleted);
    params.append('page', page);
    params.append('limit', limit);
    
    const api_url = `${BASE_URL}?${params.toString()}`;
    const response = await fetch(api_url);
    if (!response.ok) throw new Error('Không thể lấy danh sách công việc');
    return response.json();
  },

  // 2. Thêm mới công việc
  create: async (data) => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Định dạng dữ liệu không hợp lệ hoặc lỗi server');
    return response.json();
  },

  // 3. Cập nhật trạng thái / Nội dung công việc
  update: async (id, data) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Không thể cập nhật công việc');
    return response.json();
  },

  // 4. Xóa công việc
  delete: async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Không tìm thấy công việc để xóa');
    return true;
  }
};
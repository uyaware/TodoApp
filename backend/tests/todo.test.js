const request = require('supertest');
const app = require('../src/app');
const todoService = require('../src/services/todo.service');
const { NotFoundError } = require('../src/core/error.response');

// Mock layer Service
jest.mock('../src/services/todo.service', () => {
  return {
    createTodo: jest.fn(),
    getAllTodos: jest.fn(),
    updateTodo: jest.fn(),
    deleteTodo: jest.fn()
  };
});

describe('Todo API Test Suite (Khớp chuẩn tài liệu README)', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ==========================================
  // 1. TEST TÍNH NĂNG GET (LẤY DANH SÁCH)
  // ==========================================
  describe('GET /v1/api/todos', () => {
    it('Nên lấy danh sách công việc thành công (200 OK)', async () => {
      const mockList = [
        { id: "64b0f1a2c3d4e5f6a7b8c9d0", title: "Hoàn thiện bài test Intern", isCompleted: false }
      ];
      todoService.getAllTodos.mockResolvedValue(mockList);

      const res = await request(app).get('/v1/api/todos');

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Lấy danh sách công việc thành công');
      expect(res.body.metadata[0].title).toBe("Hoàn thiện bài test Intern");
    });
  });

  // ==========================================
  // 2. TEST TÍNH NĂNG POST (THÊM MỚI)
  // ==========================================
  describe('POST /v1/api/todos', () => {
    it('Nên trả về lỗi 400 nếu dữ liệu validation thất bại', async () => {
      const res = await request(app)
        .post('/v1/api/todos')
        .send({ title: "" }); // Gửi title rỗng để kích hoạt lỗi Zod

      expect(res.statusCode).toBe(400);
      expect(res.body.status).toBe('error');
      // Khớp chuẩn xác với câu chữ trong README của bạn:
      expect(res.body.message).toBe('Định dạng không đúng');
    });

    it('Nên tạo mới thành công với dữ liệu hợp lệ (201 Created)', async () => {
      const mockTodo = { id: "64b0f1a2c3d4e5f6a7b8c9d1", title: "Học kiến trúc hệ thống", description: "Đọc tài liệu về Repository Pattern", isCompleted: false };
      todoService.createTodo.mockResolvedValue(mockTodo);

      const res = await request(app)
        .post('/v1/api/todos')
        .send({ title: "Học kiến trúc hệ thống", description: "Đọc tài liệu về Repository Pattern" });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('Tạo công việc mới thành công');
      expect(res.body.metadata.id).toBe("64b0f1a2c3d4e5f6a7b8c9d1");
    });
  });

  // ==========================================
  // 3. TEST TÍNH NĂNG PUT (CẬP NHẬT)
  // ==========================================
  describe('PUT /v1/api/todos/:id', () => {
    it('Nên cập nhật công việc thành công (200 OK)', async () => {
      const mockUpdatedTodo = { id: "64b0f1a2c3d4e5f6a7b8c9d1", title: "Học kiến trúc hệ thống", isCompleted: true };
      todoService.updateTodo.mockResolvedValue(mockUpdatedTodo);

      const res = await request(app)
        .put('/v1/api/todos/64b0f1a2c3d4e5f6a7b8c9d1')
        .send({ isCompleted: true });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Cập nhật công việc thành công');
      expect(res.body.metadata.isCompleted).toBe(true);
    });

    it('Nên trả về lỗi 400 nếu dữ liệu cập nhật không hợp lệ', async () => {
      const res = await request(app)
        .put('/v1/api/todos/64b0f1a2c3d4e5f6a7b8c9d1')
        .send({ isCompleted: "không phải boolean" });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Định dạng không đúng');
    });
  });

  // ==========================================
  // 4. TEST TÍNH NĂNG DELETE (XÓA)
  // ==========================================
  describe('DELETE /v1/api/todos/:id', () => {
    it('Nên xóa công việc thành công và trả về trạng thái 204 No Content', async () => {
      todoService.deleteTodo.mockResolvedValue(true);

      const res = await request(app).delete('/v1/api/todos/64b0f1a2c3d4e5f6a7b8c9d1');

      // Khớp chuẩn xác với mã 204 trong README của bạn:
      expect(res.statusCode).toBe(204);
      // Đối với 204 No Content, body bắt buộc phải trống rỗng
      expect(res.body).toEqual({}); 
    });

    it('Nên trả về lỗi 404 nếu xóa công việc không tồn tại', async () => {
      todoService.deleteTodo.mockRejectedValue(new NotFoundError("Không tìm thấy công việc để xóa"));

      const res = await request(app).delete('/v1/api/todos/invalid-id');

      expect(res.statusCode).toBe(404);
      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('Không tìm thấy công việc để xóa');
    });
  });

});
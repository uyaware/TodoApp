const Todo = require('../models/todo.model');

class TodoRepository {
	async findAll(filters = {}) {
		const query = {};
		if (filters.isCompleted !== undefined) {
			query.isCompleted = filters.isCompleted === 'true';
		}
		if (filters.search) {
			query.title = { $regex: filters.search, $options: 'i' };
		}

		const page = parseInt(filters.page, 10) || 1;
		const limit = parseInt(filters.limit, 10) || 10;
		const skip = (page - 1) * limit;

		// Chạy song song cả 2 query để tối ưu hiệu năng
		const [data, totalItems] = await Promise.all([
			Todo.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
			Todo.countDocuments(query) // Đếm tổng số lượng thoả mãn bộ lọc
		]);

		return {
			data,
			pagination: {
				totalItems,
				totalPages: Math.ceil(totalItems / limit),
				currentPage: page,
				limit
			}
		};
	}

	async findById(id) {
		return await Todo.findById(id);
	}

	async create(data) {
		return await Todo.create(data);
	}

	async update(id, data) {
		return await Todo.findByIdAndUpdate(id, data, { new: true, runValidators: true });
	}

	async delete(id) {
		return await Todo.findByIdAndDelete(id);
	}
}

// Xuất ra một instance (thực thể đơn lẻ - Singleton Pattern) để dùng chung toàn hệ thống
module.exports = new TodoRepository();
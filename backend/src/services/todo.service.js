const todoRepository = require('../repositories/todo.repository');
const { NotFoundError } = require('../core/error.response');

class TodoService {
	async getAllTodos(filters) {
		return await todoRepository.findAll(filters);
	}

	async createTodo(payload) {
		return await todoRepository.create(payload);
	}

	async updateTodo(id, payload) {
		const todo = await todoRepository.findById(id);
		if (!todo) throw new NotFoundError("Không tìm thấy công việc để chỉnh sửa");
		return await todoRepository.update(id, payload);
	}

	async deleteTodo(id) {
		const todo = await todoRepository.findById(id);
		if (!todo) throw new NotFoundError("Không tìm thấy công việc để xóa");
		return await todoRepository.delete(id);
	}
}

module.exports = new TodoService();
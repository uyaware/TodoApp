// src/controllers/todo.controller.js
const todoService = require('../services/todo.service');
const TodoValidation = require('../validations/todo.validation');
const { OK, CREATED, NoContent } = require('../core/success.response');

class TodoController {
	async getTodos(req, res, next) {
		const todos = await todoService.getAllTodos(req.query);
		new OK({
			message: "Lấy danh sách công việc thành công",
			metadata: todos
		}).send(res);
	}

	async createTodo(req, res, next) {
		const validatedData = TodoValidation.validateCreate(req.body);
		const newTodo = await todoService.createTodo(validatedData);
		new CREATED({
			message: "Tạo công việc mới thành công",
			metadata: newTodo
		}).send(res);
	}

	async updateTodo(req, res, next) {
		const validatedData = TodoValidation.validateUpdate(req.body);
		const updatedTodo = await todoService.updateTodo(req.params.id, validatedData);
		new OK({
			message: "Cập nhật công việc thành công",
			metadata: updatedTodo
		}).send(res);
	}

	async deleteTodo(req, res, next) {
		await todoService.deleteTodo(req.params.id);
		new NoContent({
			message: null,
			metadata: null
		}).send(res);
	}
}

module.exports = new TodoController();
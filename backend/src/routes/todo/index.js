const express = require('express');
const router = express.Router();
const todoController = require('../../controllers/todo.controller');
const asyncHandler = require('../../helpers/asyncHandler');

router.get('', asyncHandler(todoController.getTodos));
router.post('', asyncHandler(todoController.createTodo));
router.put('/:id', asyncHandler(todoController.updateTodo));
router.delete('/:id', asyncHandler(todoController.deleteTodo));

module.exports = router;
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
	title: { type: String, required: true, trim: true },
	description: { type: String, trim: true, default: "" },
	isCompleted: { type: Boolean, default: false }
}, {
	timestamps: true
});

todoSchema.method("toJSON", function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = mongoose.model('Todo', todoSchema);
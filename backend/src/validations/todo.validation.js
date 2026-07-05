const { z } = require('zod');
const { BadRequestError } = require('../core/error.response');

class TodoValidation {
	static validateCreate(data) {
		const schema = z.object({
			title: z.string().min(1).max(100),
			description: z.string().max(500).optional().default("")
		});

		const result = schema.safeParse(data);
		if (!result.success) {
			throw new BadRequestError("Định dạng không đúng");
		}
		return result.data;
	}

	static validateUpdate(data) {
		const schema = z.object({
			title: z.string().min(1).max(100).optional(),
			description: z.string().max(500).optional(),
			isCompleted: z.boolean().optional()
		});

		const result = schema.safeParse(data);
		if (!result.success) {
			throw new BadRequestError("Định dạng không đúng");
		}
		return result.data;
	}
}

module.exports = TodoValidation;
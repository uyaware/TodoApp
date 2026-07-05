import { z } from 'zod';

export const todoSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Tiêu đề không được để trống" })
    .max(100, { message: "Tiêu đề không quá 100 ký tự" })
    .refine((val) => val.trim().length > 0, { message: "Tiêu đề không được chỉ chứa khoảng trắng" }),
  description: z
    .string()
    .max(500, { message: "Mô tả không quá 500 ký tự" })
    .optional()
    .or(z.literal('')),
});
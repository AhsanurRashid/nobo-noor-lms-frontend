import { z } from 'zod';

export const createCourseSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  price: z.union([z.string().min(1), z.number().min(0)]),
});

export type CreateCourseSchema = z.infer<typeof createCourseSchema>;
import { z } from 'zod';

export const editUserSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().regex(/^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/, {
    message: "Please enter a valid Bangladeshi phone number.",
  }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(100),
  role: z.enum(['student', 'instructor', 'admin'], {
    message: "Role must be one of 'student', 'instructor', or 'admin'.",
  }),
});

export type EditUserSchema = z.infer<typeof editUserSchema>;
import { z } from 'zod';

export const forgetPasswordSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address.",
  })
});

export type ForgetPasswordSchema = z.infer<typeof forgetPasswordSchema>;
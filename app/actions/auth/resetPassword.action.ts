"use server";

import { resetPasswordSchema, ResetPasswordSchema } from "@/lib/schemas/resetPassword.schema";

const ResetPasswordAction = async (data: ResetPasswordSchema, token: string | undefined) => {

    if(token === undefined) return { error: "Token not found" };
    
    const validatedData = resetPasswordSchema.safeParse({
        password: data.password,
    });

    if (!validatedData.success) {
        return { error: "Invalid inputs for login", details: validatedData.error.issues };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData.data),
    });

    const result = await response.json();

    return result;
}

export default ResetPasswordAction;
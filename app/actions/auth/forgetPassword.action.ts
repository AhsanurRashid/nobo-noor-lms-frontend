"use server";

import { forgetPasswordSchema, ForgetPasswordSchema } from "@/lib/schemas/forgetPassword.schema";

const ForgetPassword = async (data: ForgetPasswordSchema) => {
    const validatedData = forgetPasswordSchema.safeParse({
        email: data.email,
    });

    if (!validatedData.success) {
        return { error: "Invalid inputs for login", details: validatedData.error.issues };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData.data),
    });

    const result = await response.json();

    return result;
}

export default ForgetPassword;
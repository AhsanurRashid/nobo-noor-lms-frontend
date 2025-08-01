"use server";

import { setToken, setUserId } from "@/lib/auth";
import { loginSchema, LoginSchema } from "@/lib/schemas/login.schema";
import { revalidateTag } from "next/cache";

const LoginAction = async (data: LoginSchema) => {
    const validatedData = loginSchema.safeParse({
        email: data.email,
        password: data.password,
    });

    if (!validatedData.success) {
        return { error: "Invalid inputs for login", details: validatedData.error.issues };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData.data),
    });

    const result = await response.json();

    if(result.code === 200) {
        await setToken(result.token);
        await setUserId(result.user.id);
    }
    return result;
}

export default LoginAction;
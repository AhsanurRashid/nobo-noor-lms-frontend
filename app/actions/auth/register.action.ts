"use server";

import { registerSchema, RegisterSchema } from "@/lib/schemas/register.schema";

const RegisterAction = async (data: RegisterSchema) => {
  const validatedData = registerSchema.safeParse({
    email: data.email,
    password: data.password,
    name: data.name,
    role: data.role,
  });

  if (!validatedData.success) {
    return { error: "Invalid inputs for registration", details: validatedData.error.issues };
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData.data),
    });

    const result = await response.json();
    return result;
}

export default RegisterAction;
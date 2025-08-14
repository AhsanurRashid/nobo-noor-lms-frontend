"use server";

import { getToken } from "@/lib/auth";
import { revalidateTag } from "next/cache";
import { registerSchema, RegisterSchema } from "@/lib/schemas/register.schema";

const createUserAction = async (data: RegisterSchema) => {
  const token = await getToken();
  console.log('token =>', token) 
  if(!token) {
    return { error: "Unauthorized access, please log in." };
  }
  const validatedData = registerSchema.safeParse({
    email: data.email,
    password: data.password,
    name: data.name,
    role: data.role,
    phone: data.phone
  });

  if (!validatedData.success) {
    return { error: "Invalid inputs for registration", details: validatedData.error.issues };
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(validatedData.data),
    });

    if (response.ok) {
      revalidateTag("slider-list");
      revalidateTag("user-count-list");
    }

    const result = await response.json();
    return result;
}

export default createUserAction;
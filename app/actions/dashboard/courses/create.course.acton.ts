"use server";

import { getToken } from "@/lib/auth";
import { createCourseSchema } from "@/lib/schemas/course.schema";
import { revalidateTag } from "next/cache";

const createCourseAction = async (formData: FormData) => {
  const token = await getToken();
  if(!token) {
    return { error: "Unauthorized access, please log in." };
  }
  const validatedData = createCourseSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price")
  });

  if (!validatedData.success) {
    return { error: "Invalid inputs for create course", details: validatedData.error.issues };
  }

  const apiFormData = new FormData();

  apiFormData.append("title", validatedData.data.title);
  apiFormData.append("description", validatedData.data.description);
  apiFormData.append("price", String(validatedData.data.price));

  const thumbnail = formData.get("thumbnail");
  if (thumbnail !== null) {
      apiFormData.append("thumbnail", thumbnail);
  }


    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: apiFormData,
        });

        if (response.ok) {
        revalidateTag("course-list");
        revalidateTag("user-count-list");
        }

        const result = await response.json();
        return result;
    }catch(error) {
        return { error: "Failed to create course", details: error };
    }
}

export default createCourseAction;
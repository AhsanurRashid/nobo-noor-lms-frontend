"use server"

import { getToken } from "@/lib/auth";
import { editUserSchema } from '@/lib/schemas/edit.user.schema';
import { revalidateTag } from "next/cache";
import { z } from "zod";

const editUserAction = async(data: z.infer<typeof editUserSchema>, id: string) =>{
    const token = await getToken()
    if(!token) {
        return { error: "Unauthorized" }
    }

    try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if(res.ok) {
        revalidateTag("user-list")
        revalidateTag("user-count-list")
    }

    const result = await res.json();
    return result;

    }catch (error) {
        return { error: "Failed to edit user", details: error }
    }
}
export default editUserAction;
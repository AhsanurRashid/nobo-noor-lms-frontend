"use server"

import { getToken } from "@/lib/auth"
import { revalidateTag } from "next/cache"

const deleteCourseAction = async (id: string) => {
    const token = await getToken()
    if(!token) {
        return { error: "Unauthorized" }
    }

    if(!id) {
        return { error: "User id not found" }
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if(res.ok) {
            revalidateTag("course-list")
            revalidateTag("user-count-list")
        }
        
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export default deleteCourseAction
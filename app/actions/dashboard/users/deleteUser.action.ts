"use server"

import { getToken } from "@/lib/auth"
import { revalidateTag } from "next/cache"

const deleteUserAction = async (id: string) => {
    const token = await getToken()
    if(!token) {
        return { error: "Unauthorized" }
    }

    if(!id) {
        return { error: "User id not found" }
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if(res.ok) {
            revalidateTag("user-list")
            revalidateTag("user-count-list")
        }
        
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export default deleteUserAction
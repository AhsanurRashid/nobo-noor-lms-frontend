"use server"

import { getToken } from "@/lib/auth";


const getUserByIdAction = async (id: string) => {
    const token = await getToken();
    if (!token) {
        return { error: "Unauthorized access, please log in." };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        return { error: "Failed to fetch user data." };
    }

    const result = await response.json();
    return result;
}

export default getUserByIdAction;
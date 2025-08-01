"use server";

import { getToken, getUserId } from "@/lib/auth";

const getUserAction = async () => {
  const [token, userId] = await Promise.all([getToken(), getUserId()]);

  if (!token || !userId) {
    return { error: "Unauthorized" };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return { error: `Failed to fetch user. Status: ${response.status}` };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Fetch user failed:", error);
    return { error: "Something went wrong" };
  }
};

export default getUserAction;

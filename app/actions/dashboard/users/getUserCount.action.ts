"use server";

import { getToken } from "@/lib/auth";

const getUserCountAction = async () => {
  const token = await getToken()

  if (!token) {
    return { error: "Unauthorized" };
  }

  try {
    "use cache";
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/count`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["user-count-list"] },
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

export default getUserCountAction;

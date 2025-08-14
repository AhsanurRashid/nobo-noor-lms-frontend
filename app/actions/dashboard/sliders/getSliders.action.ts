"use server";

const getSlidersAction = async () => {
  try {
    "use cache";
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sliders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["slider-list"] },
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

export default getSlidersAction;

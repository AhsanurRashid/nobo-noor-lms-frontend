"use server";

const getAllCoursesAction = async ({
  search = "",
  page = 1,
  limit = 10,
}:{
  search?: string;
  page?: number;
  limit?: number;
}) => {
  try {
    "use cache";
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses?page=${page}&search=${encodeURIComponent(search)}&limit=${limit}`, {
      method: "GET",
      next: { tags: ["course-list"] },
    });

    if (!response.ok) {
      return { error: `Failed to fetch course. Status: ${response.status}` };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    return { error: "Something went wrong", details: error };
  }
};

export default getAllCoursesAction;

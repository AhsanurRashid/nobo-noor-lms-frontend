"use server"

import { getToken } from "@/lib/auth";
import { revalidateTag } from "next/cache";

const CreateSliderAction = async (formdata: FormData) => {
    const token = await getToken();
    if (!token) {
        return { error: "Unauthorized access, please log in." };
    }

    const apiFormData = new FormData();
    const sliderImage = formdata.get('slider')

    if (sliderImage) {
        apiFormData.append('slider', sliderImage);
    }

    try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sliders`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: apiFormData,
      }
    );

    if (response.ok) {
      try {
        revalidateTag("slider-list");
      } catch (err) {
        console.error("Revalidation failed:", err);
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "An error occurred during slider creation", details: error };
  }
};

export default CreateSliderAction
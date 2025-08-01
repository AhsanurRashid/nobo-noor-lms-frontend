"use server"

import { getToken } from "@/lib/auth"
import { revalidateTag } from "next/cache"

const updateSliderAction = async (formData: FormData, id: string) => {
    const token = await getToken()
    if(!token) {
        return { error: "Unauthorized" }
    }

    if(!id) {
        return { error: "Slider id not found" }
    }

    const apiFormData = new FormData();
    const sliderImage = formData.get('slider')

    if (!sliderImage) {
        return { error: "File not found" };
    }

    apiFormData.append('slider', sliderImage);

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sliders/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: apiFormData
        })

        if(res.ok) {
            revalidateTag("slider-list")
        }
        
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export default updateSliderAction
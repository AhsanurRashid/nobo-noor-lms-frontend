"use client";

import deleteSliderAction from "@/app/actions/dashboard/sliders/deleteSlider.action";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";

const DeleteSlider = ({id}: { id: string }) => {
    const handleDeleteSlider = async(id: string) => {
        const res = await deleteSliderAction(id)

        if(res.error) {
            toast.error("Slider not deleted", { description: res.error, duration: 2000 });
            return
        }
        if(res.code === 400) {
            toast.error("Slider not deleted", { description: res.error, duration: 2000 });
            return
        }
        if(res.code === 500) {
            toast.error("Slider not deleted", { description: res.error, duration: 2000 });
            return
        }
        if(res.code === 200) {
            toast.success("Slider deleted successfully", { description: res.message, duration: 2000 });
            return
        }
    }
  return (
    <Button onClick={() => handleDeleteSlider(id)} variant="destructive" className="h-6 w-6 rounded-full cursor-pointer">
        <X className="h-4 w-4" />
    </Button>
  )
}

export default DeleteSlider
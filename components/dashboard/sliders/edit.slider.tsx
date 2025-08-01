"use client";

import updateSliderAction from "@/app/actions/dashboard/sliders/updateSlider.action";
import { Button } from "@/components/ui/button";
import { error } from "console";
import { Edit} from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

const EditSlider = ({id}: { id: string }) => {
  const fileUpdateRef = useRef<HTMLInputElement>(null);
  const handleDivClick = () => {
    fileUpdateRef.current?.click();
  }
  
  const handleUpdateSlider = async(e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
        return {error: "File not found"};
    }
    const formData = new FormData();
    formData.append("slider", files[0]);

      const res = await updateSliderAction(formData, id)

      if(res.error) {
          toast.error("Slider update failed", { description: res.error, duration: 2000 });
          return
      }
      if(res.code === 400) {
          toast.error("Slider update failed", { description: res.error, duration: 2000 });
          return
      }
      if(res.code === 500) {
          toast.error("Slider update failed", { description: res.error, duration: 2000 });
          return
      }
      if(res.code === 200) {
          toast.success("Slider updated successfully", { description: res.message, duration: 2000 });
          return
      }
  }

  return (
    <>
      <Button onClick={handleDivClick} variant="ghost" className="h-6 w-6 rounded-full bg-blue-500 hover:bg-blue-400 text-white hover:text-white cursor-pointer">
          <Edit className="h-4 w-4" />
      </Button>
      <input type="file" ref={fileUpdateRef} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateSlider(e, id)}  className="hidden" accept="image/*" />
    </>
  )
}

export default EditSlider
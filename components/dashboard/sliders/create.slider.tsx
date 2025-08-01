"use client";

import CreateSliderAction from "@/app/actions/dashboard/sliders/createSlider.action";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React, { useRef, useTransition } from "react";
import { toast } from "sonner";

const CreateSlider = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }

    const formData = new FormData();
    formData.append("slider", files[0]);

    startTransition(async () => {
      const res = await CreateSliderAction(formData);

      if(res.code === 500) {
        toast.error("Failed to create slider", { 
          description: res.message, 
          duration: 2000 
        });
        return;
      }

      if(res.code === 201) {
        toast.success("Slider created successfully", { 
          description: res.message, 
          duration: 2000 
        });
        return;
      }
      
      if(res.code === 400) {
        toast.error("Failed to create slider", { 
          description: res.message, 
          duration: 2000 
        });
        return;
      }

      if(res.code === 403) {
        toast.error("Failed to create slider", { 
          description: res.message, 
          duration: 2000 
        });
        return;
      }
    })
  }

  return (
    <div>
      <div>
          <Button disabled={isPending} variant="outline" onClick={handleDivClick} className={cn(
            isPending ? "cursor-not-allowed" : "cursor-pointer", 
            "border-dashed border-2 border-gray-300 rounded-md p-6 mb-4 w-full"
          )}>
            <div className="text-xs text-muted-foreground text-center"
            >
              {
                isPending ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin" /> Uploading....
                  </div>
                ): (
                  <div>
                    Click to Upload
                  </div>
                )
              }
            </div>
          </Button>
          <input className="hidden" ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleUpload} />
      </div>
    </div>
  )
}

export default CreateSlider
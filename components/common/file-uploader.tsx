"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type FileUploaderProps = {
  accept?: string;
  multiple?: boolean;
  onChange?: (files: File[]) => void;
  maxFiles?: number;
};

export default function FileUploader({
  accept = "image/*",
  multiple = true,
  maxFiles,
  onChange,
}: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);

    // Limit number of files
    let updatedFiles = [...files, ...newFiles];
    if (maxFiles) {
      updatedFiles = updatedFiles.slice(0, maxFiles);
    }

    setFiles(updatedFiles);
    onChange?.(updatedFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onChange?.(updatedFiles);
  };

  return (
    <div className="space-y-4">
      {/* Upload Box */}
      <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-muted-foreground/25 rounded-xl cursor-pointer hover:border-primary transition">
        <span className="text-sm text-muted-foreground">
          Click files to upload
        </span>
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {/* Preview */}
      {files.length > 0 && accept.startsWith("image/") && (
        <div className={cn(multiple && "grid"," grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4")}>
          {files.map((file, index) => {
            const url = URL.createObjectURL(file);
            return (
              <div key={index} className="relative group">
                <Image
                  src={url}
                  alt={file.name}
                  width={200}
                  height={200}
                  className="w-full h-32 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-1 right-1 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Button */}
      {/* {files.length > 0 && (
        <Button onClick={() => console.log(files)} className="w-full">
          Upload {files.length} file{files.length > 1 ? "s" : ""}
        </Button>
      )} */}
    </div>
  );
}

"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { X } from "lucide-react"

interface ImageUploaderProps {
  label?: string
  imageUrl?: string // 🔥 New prop
  maxWidth?: number
  maxHeight?: number
  onChange: (file: File | null) => void
  onRemove?: () => void
}

export function ImageUploader({
  label = "Click to upload an image",
  imageUrl,
  maxWidth = 160,
  maxHeight = 160,
  onChange,
  onRemove,
}: ImageUploaderProps) {
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(imageUrl || null)

  // Update preview if external imageUrl changes
  useEffect(() => {
    if (!image && imageUrl) {
      setPreview(imageUrl)
    }
  }, [imageUrl, image])

  // Generate object URL if a file is selected
  useEffect(() => {
    if (!image) return

    const url = URL.createObjectURL(image)
    setPreview(url)

    return () => URL.revokeObjectURL(url)
  }, [image])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImage(file)
    onChange(file)
  }

  const removeImage = () => {
    setImage(null)
    setPreview(null)
    onChange(null)
    onRemove?.()
  }

  return (
    <div className="space-y-4 w-full max-w-sm">
      <label
        htmlFor="image-uploader"
        className="flex flex-col items-center justify-center border-2 border-dashed border-muted rounded-xl p-6 cursor-pointer hover:bg-muted/20 transition"
      >
        <span className="text-sm text-muted-foreground mb-2">{label}</span>
        <Input
          id="image-uploader"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      {preview && (
        <div
          className="relative group"
          style={{ width: maxWidth, height: maxHeight }}
        >
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover rounded-md"
          />
          <button
            onClick={removeImage}
            className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  )
}

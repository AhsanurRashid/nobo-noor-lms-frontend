"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { X } from "lucide-react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

type FileWithPreview = {
  id: string
  file: File
  preview: string
}

function SortableImage({
  img,
  index,
  remove,
}: {
  img: FileWithPreview
  index: number
  remove: () => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: img.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative group"
    >
      <Image
        src={img.preview}
        alt={`preview-${index}`}
        width={120}
        height={120}
        className="object-cover rounded-md w-full h-full"
      />
      <button
        onClick={remove}
        className="absolute top-1 right-1 bg-black/60 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition"
      >
        <X size={16} />
      </button>
    </div>
  )
}

export function MultiImageUploader() {
  const [images, setImages] = useState<FileWithPreview[]>([])
  const [error, setError] = useState("")

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const currentCount = images.length
    const remainingSlots = 5 - currentCount

    if (remainingSlots <= 0) {
      setError("You can upload a maximum of 5 images.")
      return
    }

    const selectedFiles = Array.from(files).slice(0, remainingSlots)

    const newImages: FileWithPreview[] = selectedFiles.map(file => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
    }))

    setImages(prev => [...prev, ...newImages])
    setError("")
  }

  const removeImage = (index: number) => {
    setImages(prev => {
      const updated = [...prev]
      updated.splice(index, 1)
      return updated
    })
    setError("")
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = images.findIndex(img => img.id === active.id)
      const newIndex = images.findIndex(img => img.id === over.id)
      setImages(images => arrayMove(images, oldIndex, newIndex))
    }
  }

  const handleSubmit = () => {
    const formData = new FormData()
    images.forEach(img => {
      formData.append("images", img.file)
    })
    // TODO: send to your API
  }

  return (
    <div className="w-full max-w-md space-y-4">
      <label
        htmlFor="image-upload"
        className="flex flex-col items-center justify-center border-2 border-dashed border-muted rounded-xl p-6 cursor-pointer hover:bg-muted/20 transition"
      >
        <span className="text-sm text-muted-foreground mb-2">
          Click or drag to upload images
        </span>
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          disabled={images.length >= 5}
          className="hidden"
        />
      </label>

      {error && (
        <p className="text-sm text-red-500 text-center">{error}</p>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={images.map(img => img.id)} strategy={verticalListSortingStrategy}>
          <div className="grid grid-cols-3 gap-4">
            {images.map((img, idx) => (
              <SortableImage
                key={img.id}
                img={img}
                index={idx}
                remove={() => removeImage(idx)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Button onClick={handleSubmit} disabled={images.length === 0}>
        Upload {images.length} Image{images.length !== 1 && "s"}
      </Button>
    </div>
  )
}

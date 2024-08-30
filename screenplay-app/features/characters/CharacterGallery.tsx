import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Character } from '@/lib/types/types'
import Image from 'next/image'

interface CharacterGalleryProps {
  character: Character
  onUpdate: (updatedCharacter: Character) => void
}

export function CharacterGallery({ character, onUpdate }: CharacterGalleryProps) {
  const [images, setImages] = useState<string[]>(character.images || [])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newImages = [...images, reader.result as string]
        setImages(newImages)
        onUpdate({ ...character, images: newImages })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    setImages(newImages)
    onUpdate({ ...character, images: newImages })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Character Gallery</h3>
      <ScrollArea className="h-[400px] w-full rounded-md border p-4">
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={image}
                alt={`${character.name} - Image ${index + 1}`}
                width={200}
                height={200}
                objectFit="cover"
                className="rounded-md"
              />
              <Button
                size="sm"
                variant="destructive"
                className="absolute top-2 right-2"
                onClick={() => handleRemoveImage(index)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button>Upload Image</Button>
        </label>
      </div>
    </div>
  )
}
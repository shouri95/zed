import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Link, Trash, Tag } from 'lucide-react'
import { Scene } from '@/lib/types/types'
import { Badge } from "@/components/ui/badge"

interface SceneBlockProps extends Omit<Scene, 'connections'> {
  onMove: (id: string, newPosition: { x: number; y: number }) => void
  onEdit: (id: string) => void
  onConnect: (id: string) => void
  onDelete: (id: string) => void
  onAddTag: (id: string, tag: string) => void
}

export function SceneBlock({ id, title, content, position, color, tags, onMove, onEdit, onConnect, onDelete, onAddTag }: SceneBlockProps) {
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const startX = e.clientX
    const startY = e.clientY

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX
      const deltaY = e.clientY - startY
      onMove(id, { x: position.x + deltaX, y: position.y + deltaY })
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleAddTag = () => {
    const tag = prompt("Enter a new tag:")
    if (tag) {
      onAddTag(id, tag)
    }
  }

  return (
    <Card
      className="w-64 absolute cursor-move"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        backgroundColor: color,
      }}
      onMouseDown={handleMouseDown}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex space-x-2">
          <Button size="icon" variant="ghost" onClick={() => onConnect(id)}>
            <Link className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => onEdit(id)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => onDelete(id)}>
            <Trash className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={handleAddTag}>
            <Tag className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">{content.substring(0, 100)}...</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {tags && tags.map((tag, index) => (
            <Badge key={index} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
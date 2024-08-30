import React from 'react'
import { Scene } from '@/lib/types/types'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

interface SceneOutlineProps {
  scenes: Scene[]
  onReorder: (reorderedScenes: Scene[]) => void
  onSceneSelect: (sceneId: string) => void
}

export function SceneOutline({ scenes, onReorder, onSceneSelect }: SceneOutlineProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const newScenes = Array.from(scenes)
    const [reorderedScene] = newScenes.splice(result.source.index, 1)
    newScenes.splice(result.destination.index, 0, reorderedScene)

    onReorder(newScenes)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="scene-outline">
        {(provided) => (
          <ScrollArea className="h-[600px] w-full rounded-md border" {...provided.droppableProps} ref={provided.innerRef}>
            {scenes.map((scene, index) => (
              <Draggable key={scene.id} draggableId={scene.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => onSceneSelect(scene.id)}
                    >
                      {scene.title}
                    </Button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ScrollArea>
        )}
      </Droppable>
    </DragDropContext>
  )
}
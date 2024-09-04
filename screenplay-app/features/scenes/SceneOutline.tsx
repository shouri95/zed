// components/SceneOutline.tsx
import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from 'lucide-react';
import { Scene } from '@/lib/types/types';

interface SceneOutlineProps {
  scenes: Scene[];
  onReorder: (scenes: Scene[]) => void;
  onEdit: (sceneId: string) => void;
  onDelete: (sceneId: string) => void;
}

export const SceneOutline: React.FC<SceneOutlineProps> = ({ scenes, onReorder, onEdit, onDelete }) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newScenes = Array.from(scenes);
    const [reorderedScene] = newScenes.splice(result.source.index, 1);
    newScenes.splice(result.destination.index, 0, reorderedScene);

    onReorder(newScenes);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="scenes">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {scenes.map((scene, index) => (
              <Draggable key={scene.id} draggableId={scene.id} index={index}>
                {(provided) => (
                  <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="mb-2"
                  >
                    <CardContent className="p-2 flex justify-between items-center">
                      <span>{scene.title}</span>
                      <div>
                        <Button variant="ghost" size="sm" onClick={() => onEdit(scene.id)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => onDelete(scene.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
'use client';

import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { SceneBlock } from './scene-block'
import { SceneConnection } from './scene-connection'
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { SceneEditor } from './scene-editor'
import { Scene } from '@/lib/types/types'

interface SceneCanvasProps {
  projectId: string | null
}

export function SceneCanvas({ projectId }: SceneCanvasProps) {
  const [scenes, setScenes] = useState<Scene[]>([])
  const [editingScene, setEditingScene] = useState<Scene | null>(null)

  useEffect(() => {
    // Load scenes for the current project
    // This is where you'd typically fetch data from an API
    if (projectId) {
      // Simulating API call
      const mockScenes: Scene[] = [
        { 
          id: '1', 
          title: 'Opening Scene', 
          content: 'Fade in...', 
          position: { x: 100, y: 100 }, 
          connections: [], 
          order: 1, 
          color: '#FFB3BA',
          type: 'scene',
          characters: [],
          storyPhase: 'Act 1: Setup'
        },
        { 
          id: '2', 
          title: 'Climax', 
          content: 'The hero faces the villain...', 
          position: { x: 400, y: 300 }, 
          connections: [], 
          order: 2, 
          color: '#BAFFC9',
          type: 'scene',
          characters: [],
          storyPhase: 'Act 2: Confrontation'
        },
      ]
      setScenes(mockScenes)
    }
  }, [projectId])

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const newScenes = Array.from(scenes)
    const [reorderedScene] = newScenes.splice(result.source.index, 1)
    newScenes.splice(result.destination.index, 0, reorderedScene)

    // Update scene orders
    const updatedScenes = newScenes.map((scene, index) => ({
      ...scene,
      order: index + 1
    }))

    setScenes(updatedScenes)
    // Here you would also update the scene order in your backend
  }

  const handleAddScene = () => {
    const newScene: Scene = {
      id: `scene-${Date.now()}`,
      title: `New Scene`,
      content: '',
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      connections: [],
      order: scenes.length + 1,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`, // Random color
      type: 'scene',
      characters: [],
      storyPhase: 'Unassigned'
    }
    setScenes([...scenes, newScene])
  }

  const handleMoveScene = (id: string, newPosition: { x: number; y: number }) => {
    setScenes(scenes.map(scene => 
      scene.id === id ? { ...scene, position: newPosition } : scene
    ))
  }

  const handleEditScene = (id: string) => {
    const scene = scenes.find(s => s.id === id)
    if (scene) {
      setEditingScene(scene)
    }
  }

  const handleSaveScene = (updatedScene: Scene) => {
    setScenes(scenes.map(scene => 
      scene.id === updatedScene.id ? updatedScene : scene
    ))
    setEditingScene(null)
  }

  const handleDeleteScene = (id: string) => {
    setScenes(scenes.filter(scene => scene.id !== id))
  }

  const handleAddTag = (id: string, tag: string) => {
    setScenes(scenes.map(scene => 
      scene.id === id ? { ...scene, tags: [...(scene.tags || []), tag] } : scene
    ))
  }
  
  const handleConnectScene = (id: string) => {
    // Implement connection logic here
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="scenes">
        {(provided) => (
          <div 
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="relative w-full h-[600px] border border-gray-200 rounded-lg overflow-hidden bg-gray-50"
          >
            {scenes.map((scene, index) => (
              <Draggable key={scene.id} draggableId={scene.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <SceneBlock
                      {...scene}
                      onMove={handleMoveScene}
                      onEdit={handleEditScene}
                      onConnect={handleConnectScene}
                      onDelete={handleDeleteScene}
                      onAddTag={handleAddTag}
                    />
                    {scene.connections.map(connectedId => {
                      const connectedScene = scenes.find(s => s.id === connectedId)
                      if (connectedScene) {
                        return <SceneConnection key={`${scene.id}-${connectedId}`} scene1={scene} scene2={connectedScene} />
                      }
                      return null
                    })}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <Button
              className="absolute bottom-4 right-4"
              onClick={handleAddScene}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Scene
            </Button>
          </div>
        )}
      </Droppable>
      {editingScene && (
        <SceneEditor
          scene={editingScene}
          onSave={handleSaveScene}
          onClose={() => setEditingScene(null)}
        />
      )}
    </DragDropContext>
  )
}
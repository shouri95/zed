'use client';

import React, { useState, useEffect } from 'react'
import { SceneBlock } from './scene-block'
import { SceneConnection } from './scene-connection'
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import { SceneEditor } from './scene-editor'
import { Scene, Character, Location } from '@/lib/types'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

interface SceneCanvasProps {
  projectId: string | null
}

export function SceneCanvas({ projectId }: SceneCanvasProps) {
  const [scenes, setScenes] = useState<Scene[]>([])
  const [editingScene, setEditingScene] = useState<Scene | null>(null)
  const [connectingScene, setConnectingScene] = useState<string | null>(null)

  useEffect(() => {
    // Load scenes for the current project
    // This is where you'd typically fetch data from an API
    // For now, we'll just set some dummy data
    setScenes([
      { id: '1', title: 'Opening Scene', content: 'Fade in...', position: { x: 100, y: 100 }, connections: [], order: 1, color: '#FFB3BA' },
      { id: '2', title: 'Climax', content: 'The hero faces the villain...', position: { x: 400, y: 300 }, connections: [], order: 2, color: '#BAFFC9' },
    ])
  }, [projectId])

  const handleAddScene = () => {
    const newScene: Scene = {
      id: `scene-${Date.now()}`,
      title: `New Scene`,
      content: '',
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      connections: [],
      order: scenes.length + 1,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}` // Random color
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
    if (connectingScene === null) {
      setConnectingScene(id)
    } else if (connectingScene !== id) {
      setScenes(scenes.map(scene => {
        if (scene.id === connectingScene) {
          return { ...scene, connections: [...scene.connections, id] }
        } else if (scene.id === id) {
          return { ...scene, connections: [...scene.connections, connectingScene] }
        }
        return scene
      }))
      setConnectingScene(null)
    }
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const items = Array.from(scenes)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    const updatedScenes = items.map((item, index) => ({
      ...item,
      order: index + 1
    }))

    setScenes(updatedScenes)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
          characters={[]}
          locations={[]}
        />
      )}
    </DragDropContext>
  )
}
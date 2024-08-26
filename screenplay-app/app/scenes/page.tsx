'use client';

import React, { useState, useEffect } from 'react'
import { SceneCanvas } from '@/components/scenes/scene-canvas'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, Film, BookOpen } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { FullScreenplayView } from '@/components/screenplay/full-screenplay-view'
import { Scene } from '@/lib/types'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useProject } from '@/lib/contexts/ProjectContext'
import { useToast } from "@/components/ui/use-toast"
import { WithProjectProtection } from '@/components/WithProjectProtection'

function ScenesPage() {
  const searchParams = useSearchParams()
  const { currentProject } = useProject()
  const { toast } = useToast()
  const [scenes, setScenes] = useState<Scene[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (currentProject) {
      // Fetch scenes for the current project
      // This is where you'd typically make an API call
      setLoading(true)
      // Simulating API call with setTimeout
      setTimeout(() => {
        setScenes([
          { id: '1', title: 'Opening Scene', content: 'FADE IN...', order: 1, position: { x: 0, y: 0 }, connections: [], color: '#FFB3BA', type: 'scene' },
          { id: '2', title: 'Climax', content: 'The hero faces the villain...', order: 2, position: { x: 0, y: 0 }, connections: [], color: '#BAFFC9', type: 'scene' },
        ])
        setLoading(false)
      }, 1000)
    } else {
      toast({
        title: "No project selected",
        description: "Please select a project to view scenes.",
        variant: "destructive",
      })
    }
  }, [currentProject, toast])

  const handleAddScene = () => {
    if (!currentProject) {
      toast({
        title: "Cannot add scene",
        description: "Please select a project first.",
        variant: "destructive",
      })
      return
    }

    const newScene: Scene = {
      id: `scene-${Date.now()}`,
      title: 'New Scene',
      content: '',
      order: scenes.length + 1,
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      connections: [],
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      type: 'scene'
    }
    setScenes([...scenes, newScene])
  }

  if (loading) {
    return <div>Loading scenes...</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Scenes for {currentProject?.title}</h1>
        <Button onClick={handleAddScene}>
          <PlusCircle className="mr-2 h-4 w-4" /> New Scene
        </Button>
      </div>

      <Tabs defaultValue="canvas" className="w-full">
        <TabsList>
          <TabsTrigger value="canvas">Visual Canvas</TabsTrigger>
          <TabsTrigger value="list">Scene List</TabsTrigger>
          <TabsTrigger value="full">Full Screenplay</TabsTrigger>
        </TabsList>
        <TabsContent value="canvas">
          <Card>
            <CardHeader>
              <CardTitle>Scene Canvas</CardTitle>
              <CardDescription>Visualize and organize your screenplay scenes</CardDescription>
            </CardHeader>
            <CardContent>
              <SceneCanvas projectId={currentProject?.id || null} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Scene List</CardTitle>
              <CardDescription>View and manage your scenes in a list format</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Content Preview</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scenes.map((scene) => (
                    <TableRow key={scene.id}>
                      <TableCell>{scene.order}</TableCell>
                      <TableCell>{scene.title}</TableCell>
                      <TableCell>{scene.content.substring(0, 50)}...</TableCell>
                      <TableCell>
                        <Button variant="ghost">Edit</Button>
                        <Button variant="ghost">Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="full">
          <Card>
            <CardHeader>
              <CardTitle>Full Screenplay</CardTitle>
              <CardDescription>View your entire screenplay</CardDescription>
            </CardHeader>
            <CardContent>
              <FullScreenplayView scenes={scenes} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default WithProjectProtection(ScenesPage)
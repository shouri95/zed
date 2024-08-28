// app/project/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useProject } from '@/lib/contexts/ProjectContext'
import { WithProjectProtection } from '@/components/WithProjectProtection'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PenTool, Users, Book, Calendar, Activity } from 'lucide-react'
import Link from 'next/link'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { StoryTimeline } from '@/components/timeline/StoryTimeline'
import { StoryStructure } from '@/components/story/StoryStructure'
import { ScriptExport } from '@/components/screenplay/ScriptExport'
import { Scene } from '@/lib/types'

function ProjectHomePage() {
  const { id } = useParams()
  const { currentProject, setCurrentProject } = useProject()
  const [scenes, setScenes] = useState<Scene[]>([])

  useEffect(() => {
    // Fetch project details and scenes
    // This is where you'd make API calls to get the project data
    const fetchProjectData = async () => {
      if (id) {
        // Simulating API call
        const mockProject = {
          id: id as string,
          title: `Project ${id}`,
          description: `Description for Project ${id}`,
        }
        setCurrentProject(mockProject)

        // Simulating scenes fetch
        const mockScenes: Scene[] = [
          { id: '1', title: 'Opening Scene', content: 'FADE IN...', order: 1, position: { x: 0, y: 0 }, connections: [], color: '#FFB3BA', type: 'scene', characters: [], storyPhase: 'Act 1: Setup' },
          { id: '2', title: 'Climax', content: 'The hero faces the villain...', order: 2, position: { x: 0, y: 0 }, connections: [], color: '#BAFFC9', type: 'scene', characters: [], storyPhase: 'Act 2: Confrontation' },
        ]
        setScenes(mockScenes)
      }
    }

    fetchProjectData()
  }, [id, setCurrentProject])

  const handleUpdateScenes = (updatedScenes: Scene[]) => {
    setScenes(updatedScenes)
    // Here you would also update the scenes in your backend
  }

  if (!currentProject) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">{currentProject.title}</h1>
      <p className="text-xl text-muted-foreground">{currentProject.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scenes</CardTitle>
            <PenTool className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scenes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Characters</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{/* Add character count here */}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Word Count</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{/* Add word count here */}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Project Progress</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {/* Add progress percentage here */}
              <Progress value={65} className="mt-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Story Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <StoryTimeline scenes={scenes} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Story Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <StoryStructure scenes={scenes} onUpdateScenes={handleUpdateScenes} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Script Export</CardTitle>
        </CardHeader>
        <CardContent>
          <ScriptExport scenes={scenes} />
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Link href={`/project/${id}/scenes`} passHref>
          <Button>
            <PenTool className="mr-2 h-4 w-4" /> Manage Scenes
          </Button>
        </Link>
        <Link href={`/project/${id}/characters`} passHref>
          <Button>
            <Users className="mr-2 h-4 w-4" /> Manage Characters
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default WithProjectProtection(ProjectHomePage)
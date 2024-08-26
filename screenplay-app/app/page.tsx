'use client';

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Film, Users, Book, Activity, Calendar, PenTool } from 'lucide-react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useProject } from '@/lib/contexts/ProjectContext'
import { Project, Scene, Character } from '@/lib/types'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [newProject, setNewProject] = useState({ title: '', description: '' })
  const [recentScenes, setRecentScenes] = useState<Scene[]>([])
  const [characterCount, setCharacterCount] = useState<number>(0)
  const [totalWordCount, setTotalWordCount] = useState<number>(0)
  const [projectProgress, setProjectProgress] = useState<{ name: string; progress: number }[]>([])
  const { setCurrentProject } = useProject()
  const router = useRouter()

  useEffect(() => {
    // Fetch projects, recent scenes, character count, and word count
    // This is where you'd typically make API calls
    // For now, we'll use dummy data
    setProjects([
      { id: '1', title: 'My First Screenplay', description: 'A thrilling adventure' },
      { id: '2', title: 'Rom-Com Experiment', description: 'Love and laughter' },
    ])
    setRecentScenes([
      { id: '1', title: 'Opening Scene', content: 'FADE IN...', order: 1, position: { x: 0, y: 0 }, connections: [], color: '#FFB3BA', type: 'scene' },
      { id: '2', title: 'Meet Cute', content: 'INT. COFFEE SHOP - DAY', order: 2, position: { x: 0, y: 0 }, connections: [], color: '#BAFFC9', type: 'scene' },
    ])
    setCharacterCount(5)
    setTotalWordCount(15000)
    setProjectProgress([
      { name: 'My First Screenplay', progress: 65 },
      { name: 'Rom-Com Experiment', progress: 30 },
    ])
  }, [])

  const handleAddProject = () => {
    const project = {
      id: `project-${Date.now()}`,
      title: newProject.title,
      description: newProject.description
    }
    setProjects([...projects, project])
    setNewProject({ title: '', description: '' })
  }

  const handleOpenProject = (project: Project) => {
    setCurrentProject(project)
    router.push(`/scenes?projectId=${project.id}`)
  }

  const handleQuickAccess = (projectId: string, route: string) => {
    setCurrentProject(projects.find(p => p.id === projectId) || null)
    router.push(`/${route}?projectId=${projectId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input
                  id="title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Input
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddProject}>Create Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Film className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Characters</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{characterCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Words</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWordCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Progress</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(projectProgress.reduce((sum, project) => sum + project.progress, 0) / projectProgress.length)}%
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="progress" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Scenes</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[250px]">
              <ul className="space-y-2">
                {recentScenes.map((scene) => (
                  <li key={scene.id} className="flex justify-between items-center">
                    <span>{scene.title}</span>
                    <Button variant="ghost" onClick={() => router.push(`/scenes?sceneId=${scene.id}`)}>View</Button>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full" onClick={() => handleOpenProject(project)}>
                    <Film className="mr-2 h-4 w-4" /> Open Project
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleQuickAccess(project.id, 'scenes')}>
                      <PenTool className="mr-2 h-4 w-4" /> Scenes
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleQuickAccess(project.id, 'characters')}>
                      <Users className="mr-2 h-4 w-4" /> Characters
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleQuickAccess(project.id, 'script')}>
                      <Book className="mr-2 h-4 w-4" /> Script
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
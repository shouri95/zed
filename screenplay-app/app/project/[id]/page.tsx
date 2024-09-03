// app/project/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useProject } from '@/lib/contexts/ProjectContext'
import { WithProjectProtection } from '@/components/WithProjectProtection'
import Sidebar from '@/components/layout/Sidebar'
import { ScriptEditor } from '@/features/screenplay/script-editor'
import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'

function ProjectWorkspace() {
  const { id } = useParams()
  const { currentProject, setCurrentProject } = useProject()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    if (id) {
      // Fetch project details
      // This is a mock implementation. Replace with actual API call in production.
      const fetchProject = async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockProject = {
          id: id as string,
          title: `Project ${id}`,
          description: `Description for Project ${id}`,
          progress: 65,
          status: 'In Progress',
          genre: 'Sci-Fi'
        }
        setCurrentProject(mockProject)
      }
      fetchProject()
    }
  }, [id, setCurrentProject])

  if (!currentProject) {
    return <div className="flex justify-center items-center h-screen">Loading project...</div>
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">{currentProject.title}</h1>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Project Details</h2>
            <p><strong>Description:</strong> {currentProject.description}</p>
            <p><strong>Progress:</strong> {currentProject.progress}%</p>
            <p><strong>Status:</strong> {currentProject.status}</p>
            <p><strong>Genre:</strong> {currentProject.genre}</p>
          </div>
          <ScriptEditor />
        </main>
      </div>
    </div>
  )
}

export default WithProjectProtection(ProjectWorkspace)
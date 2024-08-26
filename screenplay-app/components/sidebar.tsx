'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { 
  Home,
  Book, 
  Users, 
  Settings, 
  PenTool, 
  Calendar,
  ChevronDown
} from 'lucide-react'
import { useProject } from '@/lib/contexts/ProjectContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Project } from '@/lib/contexts/ProjectContext'

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { currentProject, setCurrentProject } = useProject()

  const isActive = (path: string) => pathname === path

  // This would typically come from an API or context
  const projects: Project[] = [
    { id: '1', title: 'Project 1', description: 'Description for Project 1' },
    { id: '2', title: 'Project 2', description: 'Description for Project 2' },
    { id: '3', title: 'Project 3', description: 'Description for Project 3' },
  ]

  const handleProjectSelect = (project: Project) => {
    setCurrentProject(project)
    router.push(`/project/${project.id}`)
  }

  return (
    <div className="w-64 bg-white border-r h-screen">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Screenplay App</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between mb-4">
              {currentProject ? currentProject.title : "Select a project"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {projects.map((project) => (
              <DropdownMenuItem 
                key={project.id}
                onClick={() => handleProjectSelect(project)}
              >
                {project.title}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-4">
            <Link href="/" passHref>
              <Button variant={isActive('/') ? 'secondary' : 'ghost'} className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            {currentProject && (
              <>
                <Link href={`/project/${currentProject.id}`} passHref>
                  <Button variant={isActive(`/project/${currentProject.id}`) ? 'secondary' : 'ghost'} className="w-full justify-start">
                    <Home className="mr-2 h-4 w-4" />
                    Project Home
                  </Button>
                </Link>
                <Link href={`/project/${currentProject.id}/scenes`} passHref>
                  <Button variant={isActive(`/project/${currentProject.id}/scenes`) ? 'secondary' : 'ghost'} className="w-full justify-start">
                    <PenTool className="mr-2 h-4 w-4" />
                    Scenes
                  </Button>
                </Link>
                <Link href={`/project/${currentProject.id}/characters`} passHref>
                  <Button variant={isActive(`/project/${currentProject.id}/characters`) ? 'secondary' : 'ghost'} className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Characters
                  </Button>
                </Link>
                <Link href={`/project/${currentProject.id}/script`} passHref>
                  <Button variant={isActive(`/project/${currentProject.id}/script`) ? 'secondary' : 'ghost'} className="w-full justify-start">
                    <Book className="mr-2 h-4 w-4" />
                    Script
                  </Button>
                </Link>
                <Link href={`/project/${currentProject.id}/timeline`} passHref>
                  <Button variant={isActive(`/project/${currentProject.id}/timeline`) ? 'secondary' : 'ghost'} className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Timeline
                  </Button>
                </Link>
              </>
            )}
            <Separator />
            <Link href="/settings" passHref>
              <Button variant={isActive('/settings') ? 'secondary' : 'ghost'} className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
// components/sidebar.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Home,
  Book, 
  Users, 
  Settings, 
  PenTool, 
  Calendar,
  FolderOpen
} from 'lucide-react'

export function Sidebar() {
  const pathname = usePathname()
  const projectId = pathname.split('/')[2] // Assuming the structure is /project/[id]

  const isActive = (path: string) => pathname === path

  return (
    <div className="w-64 bg-white border-r h-screen">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Screenplay App</h2>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-4">
            <Link href="/workspace" passHref>
              <Button variant={isActive('/workspace') ? 'secondary' : 'ghost'} className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Workspace
              </Button>
            </Link>
            <Link href="/projects" passHref>
              <Button variant={isActive('/projects') ? 'secondary' : 'ghost'} className="w-full justify-start">
                <FolderOpen className="mr-2 h-4 w-4" />
                Projects
              </Button>
            </Link>
            {projectId && (
              <>
                <Link href={`/project/${projectId}`} passHref>
                  <Button variant={isActive(`/project/${projectId}`) ? 'secondary' : 'ghost'} className="w-full justify-start">
                    <Home className="mr-2 h-4 w-4" />
                    Project Home
                  </Button>
                </Link>
                <Link href={`/project/${projectId}/scenes`} passHref>
                  <Button variant={isActive(`/project/${projectId}/scenes`) ? 'secondary' : 'ghost'} className="w-full justify-start">
                    <PenTool className="mr-2 h-4 w-4" />
                    Scenes
                  </Button>
                </Link>
                <Link href={`/project/${projectId}/characters`} passHref>
                  <Button variant={isActive(`/project/${projectId}/characters`) ? 'secondary' : 'ghost'} className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Characters
                  </Button>
                </Link>
                <Link href={`/project/${projectId}/script`} passHref>
                  <Button variant={isActive(`/project/${projectId}/script`) ? 'secondary' : 'ghost'} className="w-full justify-start">
                    <Book className="mr-2 h-4 w-4" />
                    Script
                  </Button>
                </Link>
                <Link href={`/project/${projectId}/timeline`} passHref>
                  <Button variant={isActive(`/project/${projectId}/timeline`) ? 'secondary' : 'ghost'} className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Timeline
                  </Button>
                </Link>
              </>
            )}
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
'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Project {
  progress: ReactNode
  status: ReactNode
  genre: ReactNode
  id: string
  title: string
  description: string
}

interface ProjectContextType {
  currentProject: Project | null
  setCurrentProject: (project: Project | null) => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [currentProject, setCurrentProject] = useState<Project | null>(null)

  return (
    <ProjectContext.Provider value={{ currentProject, setCurrentProject }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProject() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context
}
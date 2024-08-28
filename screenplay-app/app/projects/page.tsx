// app/projects/page.tsx
'use client';

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { PlusCircle, Search } from 'lucide-react'
import { ProjectCard } from '@/components/ui/card'
import { Carousel } from '@/components/ui/carousel'
import { CreateProject } from '@/components/Projects/CreateProject'

interface Project {
  id: string
  title: string
  genre: string
  status: 'In Progress' | 'Completed' | 'Draft'
  lastUpdated: string
}

const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Thriller']

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [sortBy, setSortBy] = useState('lastUpdated')
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false)

  useEffect(() => {
    // Fetch projects (replace with actual API call)
    const mockProjects: Project[] = [
      { id: '1', title: 'The Great Heist', genre: 'Action', status: 'In Progress', lastUpdated: '2023-08-15' },
      { id: '2', title: 'Laugh Out Loud', genre: 'Comedy', status: 'Draft', lastUpdated: '2023-08-10' },
      { id: '3', title: 'The Haunting', genre: 'Horror', status: 'In Progress', lastUpdated: '2023-08-12' },
      { id: '4', title: 'City of Dreams', genre: 'Drama', status: 'Completed', lastUpdated: '2023-08-05' },
      { id: '5', title: 'The Sting', genre: 'Thriller', status: 'In Progress', lastUpdated: '2023-08-08' },
      { id: '6', title: 'Cosmic Adventure', genre: 'Action', status: 'Draft', lastUpdated: '2023-08-20' },
      { id: '7', title: 'Love in Paris', genre: 'Comedy', status: 'In Progress', lastUpdated: '2023-08-18' },
      { id: '8', title: 'The Midnight Killer', genre: 'Horror', status: 'Completed', lastUpdated: '2023-08-14' },
      { id: '9', title: 'Echoes of the Past', genre: 'Drama', status: 'In Progress', lastUpdated: '2023-08-11' },
      { id: '10', title: 'The Unseen Threat', genre: 'Thriller', status: 'Draft', lastUpdated: '2023-08-09' },
    ]
    setProjects(mockProjects)
  }, [])

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'lastUpdated') {
      return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    }
    return a.title.localeCompare(b.title)
  })

  const handleProjectAction = (action: string, projectId: string) => {
    console.log(`${action} project ${projectId}`)
    // Implement the specific action (edit, view, share) here
  }

  return (
    <div className="w-full px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <Button onClick={() => setIsCreateProjectOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Project
        </Button>
      </div>

      <div className="flex justify-center items-center mb-8 space-x-4">
        <div className="relative w-1/2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lastUpdated">Last Updated</SelectItem>
            <SelectItem value="title">Title</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {genres.map(genre => {
        const genreProjects = sortedProjects.filter(project => project.genre === genre)
        if (genreProjects.length === 0) return null

        return (
          <div key={genre} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{genre}</h2>
            <Carousel options={{ align: 'start', containScroll: 'trimSnaps' }}>
              {genreProjects.map((project) => (
                <div key={project.id} className="flex-[0_0_300px] mr-4">
                  <ProjectCard
                    title={project.title}
                    status={project.status}
                    lastUpdated={project.lastUpdated}
                    onEdit={() => handleProjectAction('edit', project.id)}
                    onView={() => handleProjectAction('view', project.id)}
                    onShare={() => handleProjectAction('share', project.id)}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        )
      })}

      <CreateProject isOpen={isCreateProjectOpen} onClose={() => setIsCreateProjectOpen(false)} />
    </div>
  )
}
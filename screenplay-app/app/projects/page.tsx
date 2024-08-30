'use client';

import React, { useState, lazy, Suspense } from 'react'
import { Button } from "@/components/ui/button"
import { PlusCircle, Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import EmblaCarousel from '@/components/carousel/EmblaCarousel'
import { useProjects } from '@/lib/hooks/useProjects'
import { Project } from '@/lib/types/types'

const CreateProject = lazy(() => import('@/features/project/CreateProject'))

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('lastUpdated')
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false)
  const { projects, loading, error } = useProjects()

  if (loading) return <div>Loading projects...</div>
  if (error) return <div>Error: {error.message}</div>

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === 'lastUpdated') {
      return new Date(b.lastEdited || b.completed || '').getTime() - new Date(a.lastEdited || a.completed || '').getTime()
    }
    return a.title.localeCompare(b.title)
  })

  const renderProjectSlide = (project: Project, index: number) => (
    <div className="embla__slide p-4" key={index}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
        <img
          className="w-full h-48 object-cover"
          src={`/project-images/${project.image}`}
          alt={project.title}
        />
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
          </div>
          <div>
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>{project.genre}</span>
              <span>{project.status}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
            </div>
            <Button className="w-full">View Project</Button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">My Projects</h1>
        <Button onClick={() => setIsCreateProjectOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Project
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="lastUpdated">Last Updated</SelectItem>
            <SelectItem value="title">Title</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProjects.map((project, index) => renderProjectSlide(project, index))}
      </div>

      <div className="sm:hidden">
        <EmblaCarousel slides={sortedProjects} options={{ loop: false }} renderSlide={renderProjectSlide} />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        {isCreateProjectOpen && (
          <CreateProject isOpen={isCreateProjectOpen} onClose={() => setIsCreateProjectOpen(false)} />
        )}
      </Suspense>
    </div>
  )
}
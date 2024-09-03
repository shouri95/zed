// app/projects/page.tsx
'use client';

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { PlusCircle, Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import EmblaCarousel from '@/components/ui/carousel/EmblaCarousel'
import { useProjects } from '@/lib/hooks/useProjects'
import { Project } from '@/lib/types/types'
import { ProjectStats } from '@/components/ProjectStats'
import Link from 'next/link'

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('lastUpdated')
  const { projects, loading, error } = useProjects()
  const [groupedProjects, setGroupedProjects] = useState<{[key: string]: Project[]}>({})

  useEffect(() => {
    if (projects.length > 0) {
      const grouped = projects.reduce((acc, project) => {
        if (!acc[project.genre]) {
          acc[project.genre] = []
        }
        acc[project.genre].push(project)
        return acc
      }, {} as {[key: string]: Project[]})
      setGroupedProjects(grouped)
    }
  }, [projects])

  if (loading) return <div className="flex justify-center items-center h-screen">Loading projects...</div>
  if (error) return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>

  const renderProjectSlide = (project: Project) => (
    <div className="embla__slide p-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
        <div className="p-4 flex-grow">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-gray-600 mb-4 text-sm">{project.description}</p>
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>{project.status}</span>
            <span>{project.progress}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
            <div className="bg-gray-800 h-1.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
          </div>
        </div>
        <div className="p-4 bg-gray-50">
          <Link href={`/project/${project.id}`} passHref>
            <Button className="w-full" variant="outline">View Project</Button>
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> New Project
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

      {Object.entries(groupedProjects).map(([genre, genreProjects]) => (
        <div key={genre} className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{genre}</h2>
          <EmblaCarousel
            slides={genreProjects}
            options={{ align: 'start', containScroll: 'trimSnaps' }}
            renderSlide={renderProjectSlide}
          />
        </div>
      ))}
    </div>
  )
}
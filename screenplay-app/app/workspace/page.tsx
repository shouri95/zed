'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, PlusCircle } from 'lucide-react'
import Overview from '@/features/workspace/Overview'
import EmblaCarousel from '@/components/carousel/EmblaCarousel'
import { VisualizationCharts } from '@/features/workspace/VisualizationCharts'
import { TaskList } from '@/features/workspace/TaskList'
import { Project, Task, ActivityData, OverviewStat } from '@/lib/types/types'

// Mock data (replace with real data in production)
const overviewStats: OverviewStat[] = [
  { title: "Total Projects", value: "12" },
  { title: "In Progress", value: "8" },
  { title: "Completed", value: "4" },
  { title: "Total Revenue", value: "$45,231" },
]

const activityData: ActivityData[] = [
  { date: 'Mon', words: 1500 },
  { date: 'Tue', words: 2000 },
  { date: 'Wed', words: 1800 },
  { date: 'Thu', words: 2200 },
  { date: 'Fri', words: 1900 },
  { date: 'Sat', words: 1000 },
  { date: 'Sun', words: 2500 },
]

const projects: Project[] = [
  { id: "1", title: "The Raay Screenplay", description: "A futuristic sci-fi drama", progress: 80, status: "active", image: "/placeholder-project-image.jpg", genre: "Sci-Fi" },
  { id: "2", title: "Cosmic Odyssey", description: "An epic space adventure", progress: 30, status: "active", image: "/placeholder-project-image.jpg", genre: "Adventure" },
  { id: "3", title: "Neon Nights", description: "A cyberpunk thriller", progress: 100, status: "completed", image: "/placeholder-project-image.jpg", genre: "Thriller" },
  { id: "4", title: "Echoes of Eternity", description: "A time-travel romance", progress: 10, status: "active", image: "/placeholder-project-image.jpg", genre: "Romance" },
  { id: "5", title: "Whispers in the Wind", description: "A supernatural mystery", progress: 100, status: "completed", image: "/placeholder-project-image.jpg", genre: "Mystery" },
]

const tasks: Task[] = [
  { id: 1, title: "Outline Act 2", project: "The Raay Screenplay", dueDate: "2024-05-15", status: "in-progress" },
  { id: 2, title: "Character development for protagonist", project: "Cosmic Odyssey", dueDate: "2024-05-18", status: "pending" },
  { id: 3, title: "Research space travel mechanics", project: "Cosmic Odyssey", dueDate: "2024-05-20", status: "in-progress" },
  { id: 4, title: "Write climax scene", project: "The Raay Screenplay", dueDate: "2024-05-25", status: "pending" },
]

export default function WorkspacePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const renderProjectSlide = (project: Project, index: number) => (
    <div className="embla__slide" key={index}>
      <div className="embla__slide__inner">
        <img
          className="embla__slide__img"
          src={project.image}
          alt={project.title}
        />
        <div className="embla__slide__content">
          <h3 className="embla__slide__title">{project.title}</h3>
          <p className="embla__slide__description">{project.description}</p>
          <div className="embla__slide__meta">
            <span>{project.genre}</span>
            <span>{project.status}</span>
          </div>
          <div className="embla__slide__progress">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
            </div>
          </div>
          <Button className="embla__slide__button">View Project</Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="relative w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search projects, tasks, or documents"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> New Project
          </Button>
        </div>

        <Overview stats={overviewStats} />
        <EmblaCarousel slides={projects} options={{ loop: false }} renderSlide={renderProjectSlide} />
        <VisualizationCharts activityData={activityData} projects={projects} />
        <TaskList tasks={tasks} />
      </main>
    </div>
  )
}
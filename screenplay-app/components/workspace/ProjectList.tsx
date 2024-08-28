import React, { useState } from 'react'
import { Switch } from "@/components/ui/switch"
import useEmblaCarousel from 'embla-carousel-react'
import { ProjectCard } from './ProjectCard'
import { Project } from '@/lib/types'

interface ProjectListProps {
  projects: Project[]
}

export function ProjectList({ projects }: ProjectListProps) {
  const [showCompleted, setShowCompleted] = useState(false)
  const [emblaRef] = useEmblaCarousel({ loop: false, align: 'start' })

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Your Projects</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Show Completed</span>
          <Switch
            checked={showCompleted}
            onCheckedChange={setShowCompleted}
          />
        </div>
      </div>
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {projects
            .filter(project => showCompleted ? true : project.status === "active")
            .map(project => (
              <div key={project.id} className="embla__slide flex-[0_0_300px] mr-4">
                <ProjectCard project={project} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
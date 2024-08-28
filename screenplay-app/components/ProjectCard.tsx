// components/ProjectCard.tsx
import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle } from 'lucide-react'
import { Project } from '@/lib/types'

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <Image 
          src={project.image} 
          alt={project.title} 
          layout="fill" 
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          <p className="text-sm text-gray-300 flex items-center mt-1">
            {project.status === 'active' ? (
              <>
                <Clock className="h-4 w-4 mr-1" />
                Last edited: {project.lastEdited}
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-1" />
                Completed: {project.completed}
              </>
            )}
          </p>
        </div>
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-gray-600 mb-4">{project.description}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm font-medium">{project.progress}%</span>
        </div>
        <Progress value={project.progress} className="mb-4" />
        <Button onClick={onClick} className="w-full">Open Project</Button>
      </CardContent>
    </Card>
  )
}
import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle } from 'lucide-react'

interface ProjectCardProps {
  project: {
    id: number
    title: string
    image: string
    lastEdited?: string
    completed?: string
    status: 'active' | 'completed'
    progress: number
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden bg-gray-800 border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
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
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-400">Progress</span>
          <span className="text-sm font-medium text-gray-400">{project.progress}%</span>
        </div>
        <Progress value={project.progress} className="h-2 mb-4" />
        <Button className="w-full bg-purple-600 hover:bg-purple-700">Open Project</Button>
      </CardContent>
    </Card>
  )
}
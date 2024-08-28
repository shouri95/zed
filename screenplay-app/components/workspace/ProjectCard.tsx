import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Project } from '@/lib/types'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{project.description}</p>
        <div className="flex justify-between items-center mb-4">
          <Badge variant={project.status === "active" ? "default" : "secondary"}>
            {project.status === "active" ? "Active" : "Completed"}
          </Badge>
          <span className="text-sm text-gray-500">{project.progress}% Complete</span>
        </div>
        <Progress value={project.progress} className="mb-4" />
        <Button variant="outline" className="w-full">View Project</Button>
      </CardContent>
    </Card>
  )
}
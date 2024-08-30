import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Task } from '@/lib/types/types'

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  return (
    <li className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
      <div>
        <h4 className="font-medium">{task.title}</h4>
        <p className="text-sm text-gray-500">{task.project}</p>
      </div>
      <div className="flex items-center space-x-4">
        <Badge variant={task.status === "in-progress" ? "default" : "secondary"}>
          {task.status === "in-progress" ? "In Progress" : "Pending"}
        </Badge>
        <span className="text-sm text-gray-500">{task.dueDate}</span>
      </div>
    </li>
  )
}
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { TaskItem } from './TaskItem'
import { Task } from '@/lib/types/types'

interface TaskListProps {
  tasks: Task[]
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Tasks</h2>
        </div>
        <p className="text-gray-600 mb-6">Manage your tasks and track your progress with our powerful task management tools.</p>
        <ul className="space-y-4">
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

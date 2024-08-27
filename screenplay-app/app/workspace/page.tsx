'use client'

import React from 'react'
import { TopNavBar } from '@/components/TopNavBar'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Clock, CheckCircle, Search } from 'lucide-react'

export default function WorkspacePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <div className="w-full max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Search projects, tasks, characters..." 
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex">
          <main className="flex-grow mr-8">
            <h1 className="text-3xl font-bold mb-2">Overview</h1>
            <p className="text-gray-600 mb-8">View key stats and insights for all your projects.</p>

            <div className="grid grid-cols-4 gap-6 mb-8">
              <StatCard title="Total Projects" value="12" />
              <StatCard title="In Progress" value="8" />
              <StatCard title="Completed" value="4" />
              <StatCard title="Total Revenue" value="$45,231" />
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <ProjectProgress />
              <TaskCompletion />
            </div>

            <ProjectsTable />
          </main>
          <aside className="w-80">
            <TasksList />
          </aside>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value }: { title: string, value: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-sm text-gray-600 mt-2">{title}</p>
      </CardContent>
    </Card>
  )
}

function ProjectProgress() {
  const projects = [
    { name: "The Raay Screenplay", progress: 80 },
    { name: "The Raay Screenplay 2", progress: 30 },
    { name: "The Raay Screenplay 3", progress: 10 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Progress</CardTitle>
        <p className="text-sm text-gray-600">Track the progress of your projects.</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{project.name}</span>
                <span className="text-sm font-medium">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function TaskCompletion() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Completion</CardTitle>
        <p className="text-sm text-gray-600">See how many tasks are completed across your projects.</p>
      </CardHeader>
      <CardContent>
        {/* Add task completion chart or stats here */}
        <p>Task completion stats coming soon...</p>
      </CardContent>
    </Card>
  )
}

function ProjectsTable() {
  const projects = [
    { title: "The Raay Screenplay", status: "In Progress", dueDate: "June 30, 2024", tasksInProgress: 4, tasksPending: 2 },
    { title: "The Raay Screenplay 2", status: "Pending", dueDate: "August 15, 2024", tasksInProgress: 0, tasksPending: 1 },
    { title: "The Raay Screenplay 3", status: "In Progress", dueDate: "November 1, 2024", tasksInProgress: 2, tasksPending: 3 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <p className="text-sm text-gray-600">View and manage your screenplay projects.</p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Tasks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project, index) => (
              <TableRow key={index}>
                <TableCell>{project.title}</TableCell>
                <TableCell>
                  <Badge variant={project.status === "In Progress" ? "default" : "secondary"}>
                    {project.status === "In Progress" ? (
                      <Clock className="w-3 h-3 mr-1 inline" />
                    ) : (
                      <CheckCircle className="w-3 h-3 mr-1 inline" />
                    )}
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell>{project.dueDate}</TableCell>
                <TableCell>
                  <Badge variant="default" className="mr-1">{project.tasksInProgress} In Progress</Badge>
                  <Badge variant="secondary">{project.tasksPending} Pending</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function TasksList() {
  const tasks = [
    { name: "Write Act 1", status: "In Progress" },
    { name: "Research character backstories", status: "Pending" },
    { name: "Outline Act 2", status: "In Progress" },
    { name: "Write dialogue for Act 3", status: "Pending" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
        <p className="text-sm text-gray-600">Manage your tasks and track your progress.</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {tasks.map((task, index) => (
            <li key={index} className="flex items-center justify-between">
              <span>{task.name}</span>
              <Badge variant={task.status === "In Progress" ? "default" : "secondary"}>
                {task.status === "In Progress" ? (
                  <Clock className="w-3 h-3 mr-1 inline" />
                ) : (
                  <CheckCircle className="w-3 h-3 mr-1 inline" />
                )}
                {task.status}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
'use client'

import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useProject } from '@/lib/contexts/ProjectContext'
import { WithProjectProtection } from '@/components/WithProjectProtection'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PenTool, Users, Book, Calendar, Activity, BarChart } from 'lucide-react'
import Link from 'next/link'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"

function ProjectHomePage() {
  const { id } = useParams()
  const { currentProject, setCurrentProject } = useProject()

  useEffect(() => {
    // Fetch project details using the id
    // For now, we'll use mock data
    const mockProject = {
      id: id as string,
      title: `Project ${id}`,
      description: `Description for Project ${id}`,
    }
    setCurrentProject(mockProject)
  }, [id, setCurrentProject])

  if (!currentProject) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">{currentProject.title}</h1>
      <p className="text-xl text-muted-foreground">{currentProject.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scenes</CardTitle>
            <PenTool className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Characters</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Word Count</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15,234</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Est. Runtime</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120 min</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
            <CardDescription>Overall completion of your screenplay</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>Overall Progress</div>
                <div className="font-bold">65%</div>
              </div>
              <Progress value={65} className="w-full" />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>Act 1</div>
                  <div className="font-bold">100%</div>
                </div>
                <Progress value={100} className="w-full" />
                <div className="flex items-center justify-between">
                  <div>Act 2</div>
                  <div className="font-bold">50%</div>
                </div>
                <Progress value={50} className="w-full" />
                <div className="flex items-center justify-between">
                  <div>Act 3</div>
                  <div className="font-bold">20%</div>
                </div>
                <Progress value={20} className="w-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates in your project</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div className="ml-2">
                    <p className="text-sm font-medium">Scene 12 updated</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div className="ml-2">
                    <p className="text-sm font-medium">New character added: John Doe</p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div className="ml-2">
                    <p className="text-sm font-medium">Script exported to PDF</p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </div>
                {/* Add more activity items as needed */}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href={`/project/${id}/scenes`} passHref>
              <Button className="w-full">
                <PenTool className="mr-2 h-4 w-4" /> Manage Scenes
              </Button>
            </Link>
            <Link href={`/project/${id}/characters`} passHref>
              <Button className="w-full">
                <Users className="mr-2 h-4 w-4" /> Manage Characters
              </Button>
            </Link>
            <Link href={`/project/${id}/script`} passHref>
              <Button className="w-full">
                <Book className="mr-2 h-4 w-4" /> View Full Script
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scene Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                <span className="flex-1">Act 1</span>
                <span className="font-bold">8 scenes</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                <span className="flex-1">Act 2</span>
                <span className="font-bold">12 scenes</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                <span className="flex-1">Act 3</span>
                <span className="font-bold">4 scenes</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Characters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>John Doe</span>
                <span className="font-bold">32 scenes</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Jane Smith</span>
                <span className="font-bold">28 scenes</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Bob Johnson</span>
                <span className="font-bold">15 scenes</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default WithProjectProtection(ProjectHomePage)
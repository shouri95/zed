'use client'

import React from 'react'
import { WithProjectProtection } from '@/components/WithProjectProtection'
import { useProject } from '@/lib/contexts/ProjectContext'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function TimelinePage() {
  const { id } = useParams()
  const { currentProject } = useProject()

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Timeline for {currentProject?.title}</h1>
      <Card>
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
          <CardDescription>Visualize your story's timeline</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Timeline feature coming soon...</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default WithProjectProtection(TimelinePage)
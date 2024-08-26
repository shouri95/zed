'use client'

import React, { useState, useEffect } from 'react'
import { WithProjectProtection } from '@/components/WithProjectProtection'
import { useProject } from '@/lib/contexts/ProjectContext'
import { useParams } from 'next/navigation'
import { FullScreenplayView } from '@/components/screenplay/full-screenplay-view'
import { Scene } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function ScriptPage() {
  const { id } = useParams()
  const { currentProject } = useProject()
  const [scenes, setScenes] = useState<Scene[]>([])

  useEffect(() => {
    // Fetch scenes for the current project
    // This is where you'd typically make an API call
    // For now, we'll use mock data
    setScenes([
      { id: '1', title: 'Opening Scene', content: 'FADE IN...', order: 1, position: { x: 0, y: 0 }, connections: [], color: '#FFB3BA', type: 'scene' },
      { id: '2', title: 'Climax', content: 'The hero faces the villain...', order: 2, position: { x: 0, y: 0 }, connections: [], color: '#BAFFC9', type: 'scene' },
    ])
  }, [id])

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Full Script for {currentProject?.title}</h1>
      <Card>
        <CardHeader>
          <CardTitle>Full Screenplay</CardTitle>
          <CardDescription>View and export your entire screenplay</CardDescription>
        </CardHeader>
        <CardContent>
          <FullScreenplayView scenes={scenes} />
        </CardContent>
      </Card>
    </div>
  )
}

export default WithProjectProtection(ScriptPage)
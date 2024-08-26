import React from 'react'
import { Scene } from '@/lib/types'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StoryTimelineProps {
  scenes: Scene[]
}

export function StoryTimeline({ scenes }: StoryTimelineProps) {
  const sortedScenes = scenes.sort((a, b) => a.order - b.order)

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Story Timeline</h3>
      <ScrollArea className="h-[400px]">
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          {sortedScenes.map((scene, index) => (
            <div key={scene.id} className="relative pl-8 pb-8">
              <div className="absolute left-2 w-4 h-4 bg-blue-500 rounded-full mt-1.5 -ml-2"></div>
              <Card>
                <CardHeader>
                  <CardTitle>{scene.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">{scene.content.substring(0, 100)}...</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
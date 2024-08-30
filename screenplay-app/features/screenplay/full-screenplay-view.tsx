import React, { useState, useEffect } from 'react'
import { Scene } from '@/lib/types/types'
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatScreenplayContent, estimatePageCount } from '@/lib/utils/utils'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FullScreenplayViewProps {
  scenes: Scene[]
}

export function FullScreenplayView({ scenes }: FullScreenplayViewProps) {
  const [formattedScreenplay, setFormattedScreenplay] = useState('')
  const [pageCount, setPageCount] = useState(0)
  const [exportFormat, setExportFormat] = useState('pdf')

  useEffect(() => {
    if (scenes && scenes.length > 0) {
      const sortedScenes = [...scenes].sort((a, b) => a.order - b.order)
      const fullScreenplay = sortedScenes
        .map(scene => {
          let sceneContent = ''
          if (scene.type === 'transition') {
            sceneContent = scene.content.toUpperCase()
          } else {
            sceneContent = `${scene.title.toUpperCase()}\n\n${formatScreenplayContent(scene.content)}`
          }
          return sceneContent
        })
        .join('\n\n')
      setFormattedScreenplay(fullScreenplay)
      setPageCount(estimatePageCount(sortedScenes))
    } else {
      setFormattedScreenplay('No scenes available.')
      setPageCount(0)
    }
  }, [scenes])

  const handleExport = () => {
    // Implement export functionality based on the selected format
    console.log(`Exporting screenplay as ${exportFormat}`)
    // You would typically call an API endpoint or use a library to generate the export file
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Full Screenplay</h2>
        <div className="flex items-center space-x-2">
          <Select value={exportFormat} onValueChange={setExportFormat}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select export format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="finaldraft">Final Draft</SelectItem>
              <SelectItem value="fountain">Fountain</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExport}>Export</Button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p>Estimated Page Count: {pageCount}</p>
        <p>Scene Count: {scenes.length}</p>
      </div>
      <ScrollArea className="h-[600px] w-full rounded-md border p-4">
        <pre className="font-mono text-sm whitespace-pre-wrap">{formattedScreenplay}</pre>
      </ScrollArea>
    </div>
  )
}
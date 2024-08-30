import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Scene, Character, Location } from '@/lib/types/types'
import { formatScreenplayContent, estimatePageCount, autoCompleteCharacter, autoCompleteLocation } from '@/lib/utils/utils'
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SceneEditorProps {
  scene: Scene
  onSave: (updatedScene: Scene) => void
  onClose: () => void
  characters: Character[]
  locations: Location[]
}

export function SceneEditor({ scene, onSave, onClose, characters, locations }: SceneEditorProps) {
  const [title, setTitle] = useState(scene.title)
  const [content, setContent] = useState(scene.content)
  const [formattedContent, setFormattedContent] = useState('')
  const [pageCount, setPageCount] = useState(0)
  const [lineCount, setLineCount] = useState(0)
  const [sceneType, setSceneType] = useState(scene.type || 'scene')

  useEffect(() => {
    const formatted = formatScreenplayContent(content)
    setFormattedContent(formatted)
    setPageCount(estimatePageCount([{ ...scene, content }]))
    setLineCount(content.split('\n').length)
  }, [content])

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setContent(newContent)
    
    // Auto-formatting
    const lines = newContent.split('\n')
    const formattedLines = lines.map(line => {
      if (line.trim().toUpperCase() === line.trim()) {
        return line.trim() // Character names
      } else if (line.trim().startsWith('(') && line.trim().endsWith(')')) {
        return `  ${line.trim()}` // Parentheticals
      } else if (line.trim().startsWith('INT.') || line.trim().startsWith('EXT.')) {
        return line.trim().toUpperCase() // Scene headings
      } else if (['FADE IN:', 'FADE OUT.', 'CUT TO:'].includes(line.trim().toUpperCase())) {
        return `\n${line.trim().toUpperCase()}\n` // Transitions
      } else {
        return `    ${line.trim()}` // Action and dialogue
      }
    })
    setContent(formattedLines.join('\n'))
  }

  const handleCharacterAutocomplete = (input: string) => {
    return autoCompleteCharacter(input, characters.map(c => c.name))
  }

  const handleLocationAutocomplete = (input: string) => {
    return autoCompleteLocation(input, locations.map(l => l.name))
  }

  const handleSave = () => {
    onSave({ ...scene, title, content, type: sceneType })
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Edit Scene: {scene.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Scene Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sceneType" className="text-right">Scene Type</Label>
            <Select value={sceneType} onValueChange={setSceneType}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select scene type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scene">Scene</SelectItem>
                <SelectItem value="transition">Transition</SelectItem>
                <SelectItem value="montage">Montage</SelectItem>
                <SelectItem value="intercut">Intercut</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="content" className="text-right">Scene Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={handleContentChange}
              className="col-span-3 font-mono"
              rows={20}
              style={{
                lineHeight: '1.5',
                padding: '1rem',
                whiteSpace: 'pre-wrap',
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Preview</Label>
            <div className="col-span-3 font-mono whitespace-pre-wrap border p-4">
              {formattedContent}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Statistics</Label>
            <div className="col-span-3">
              <p>Page Count: {pageCount}</p>
              <p>Line Count: {lineCount}</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
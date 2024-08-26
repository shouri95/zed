import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"

interface Note {
  id: string
  content: string
  timestamp: Date
}

interface SceneNotesProps {
  sceneId: string
  initialNotes: Note[]
  onAddNote: (sceneId: string, note: Note) => void
}

export function SceneNotes({ sceneId, initialNotes, onAddNote }: SceneNotesProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [newNote, setNewNote] = useState('')

  const handleAddNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        content: newNote,
        timestamp: new Date()
      }
      setNotes([...notes, note])
      onAddNote(sceneId, note)
      setNewNote('')
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Scene Notes</h3>
      <ScrollArea className="h-[200px] w-full rounded-md border p-4">
        {notes.map((note) => (
          <div key={note.id} className="mb-4 p-2 bg-gray-100 rounded">
            <p className="text-sm">{note.content}</p>
            <p className="text-xs text-gray-500 mt-1">
              {note.timestamp.toLocaleString()}
            </p>
          </div>
        ))}
      </ScrollArea>
      <div className="flex space-x-2">
        <Textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a new note..."
          className="flex-grow"
        />
        <Button onClick={handleAddNote}>Add Note</Button>
      </div>
    </div>
  )
}
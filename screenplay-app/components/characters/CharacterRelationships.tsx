import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Character, Relationship } from '@/lib/types'

interface CharacterRelationshipsProps {
  characters: Character[]
  relationships: Relationship[]
  onUpdate: (updatedRelationships: Relationship[]) => void
}

export function CharacterRelationships({ characters, relationships, onUpdate }: CharacterRelationshipsProps) {
  const [editedRelationships, setEditedRelationships] = useState<Relationship[]>(relationships)

  const handleAddRelationship = () => {
    const newRelationship: Relationship = {
      id: Date.now().toString(),
      character1Id: '',
      character2Id: '',
      type: '',
      description: ''
    }
    setEditedRelationships([...editedRelationships, newRelationship])
  }

  const handleUpdateRelationship = (id: string, field: keyof Relationship, value: string) => {
    const updatedRelationships = editedRelationships.map(rel =>
      rel.id === id ? { ...rel, [field]: value } : rel
    )
    setEditedRelationships(updatedRelationships)
  }

  const handleSave = () => {
    onUpdate(editedRelationships)
  }

  return (
    <div className="space-y-4">
      <ScrollArea className="h-[400px] w-full rounded-md border p-4">
        {editedRelationships.map((relationship) => (
          <div key={relationship.id} className="mb-4 p-2 bg-gray-100 rounded">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <Label>Character 1</Label>
                <Select
                  value={relationship.character1Id}
                  onValueChange={(value: string) => handleUpdateRelationship(relationship.id, 'character1Id', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select character" />
                  </SelectTrigger>
                  <SelectContent>
                    {characters.map((char) => (
                      <SelectItem key={char.id} value={char.id}>{char.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Character 2</Label>
                <Select
                  value={relationship.character2Id}
                  onValueChange={(value: string) => handleUpdateRelationship(relationship.id, 'character2Id', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select character" />
                  </SelectTrigger>
                  <SelectContent>
                    {characters.map((char) => (
                      <SelectItem key={char.id} value={char.id}>{char.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Label>Relationship Type</Label>
            <Input
              value={relationship.type}
              onChange={(e) => handleUpdateRelationship(relationship.id, 'type', e.target.value)}
              className="mb-2"
            />
            <Label>Description</Label>
            <Textarea
              value={relationship.description}
              onChange={(e) => handleUpdateRelationship(relationship.id, 'description', e.target.value)}
              className="mb-2"
            />
          </div>
        ))}
      </ScrollArea>
      <Button onClick={handleAddRelationship}>Add Relationship</Button>
      <Button onClick={handleSave}>Save Relationships</Button>
    </div>
  )
}
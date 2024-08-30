import React, { useState } from 'react'
import { Character, Relationship } from '@/lib/types/types'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"

interface CharacterRelationshipsProps {
  characters: Character[]
  relationships: Relationship[]
  onUpdateRelationships: (relationships: Relationship[]) => void
}

export function CharacterRelationships({ characters, relationships, onUpdateRelationships }: CharacterRelationshipsProps) {
  const [newRelationship, setNewRelationship] = useState<Partial<Relationship>>({})

  const handleAddRelationship = () => {
    if (newRelationship.character1Id && newRelationship.character2Id && newRelationship.type) {
      onUpdateRelationships([...relationships, newRelationship as Relationship])
      setNewRelationship({})
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Character Relationships</h3>
      <div className="grid grid-cols-3 gap-2">
        <Select
          value={newRelationship.character1Id}
          onValueChange={(value) => setNewRelationship({ ...newRelationship, character1Id: value })}
        >
          <option value="">Select Character 1</option>
          {characters.map((char) => (
            <option key={char.id} value={char.id}>{char.name}</option>
          ))}
        </Select>
        <Select
          value={newRelationship.character2Id}
          onValueChange={(value) => setNewRelationship({ ...newRelationship, character2Id: value })}
        >
          <option value="">Select Character 2</option>
          {characters.map((char) => (
            <option key={char.id} value={char.id}>{char.name}</option>
          ))}
        </Select>
        <Input
          placeholder="Relationship Type"
          value={newRelationship.type || ''}
          onChange={(e) => setNewRelationship({ ...newRelationship, type: e.target.value })}
        />
      </div>
      <Button onClick={handleAddRelationship}>Add Relationship</Button>
      <ul className="space-y-2">
        {relationships.map((rel, index) => (
          <li key={index} className="flex justify-between items-center">
            <span>{characters.find(c => c.id === rel.character1Id)?.name} - {rel.type} - {characters.find(c => c.id === rel.character2Id)?.name}</span>
            <Button variant="destructive" onClick={() => onUpdateRelationships(relationships.filter((_, i) => i !== index))}>Remove</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
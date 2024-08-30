import React from 'react'
import { Character, Scene } from '@/lib/types/types'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface CharacterAppearancesProps {
  character: Character
  scenes: Scene[]
}

export function CharacterAppearances({ character, scenes }: CharacterAppearancesProps) {
  const appearances = scenes.filter(scene => scene.characters.includes(character.id))

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Character Appearances: {character.name}</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Scene</TableHead>
            <TableHead>Appearance Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appearances.map((scene) => (
            <TableRow key={scene.id}>
              <TableCell>{scene.title}</TableCell>
              <TableCell>{scene.characters.filter(id => id === character.id).length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
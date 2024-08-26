import React from 'react'
import { Character, Scene } from '@/lib/types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface CharacterArcProps {
  character: Character
  scenes: Scene[]
}

export function CharacterArc({ character, scenes }: CharacterArcProps) {
  const arcData = scenes.map((scene, index) => ({
    name: `Scene ${index + 1}`,
    arcValue: Math.random() * 10 // Replace this with actual character arc data
  }))

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Character Arc: {character.name}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={arcData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="arcValue" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
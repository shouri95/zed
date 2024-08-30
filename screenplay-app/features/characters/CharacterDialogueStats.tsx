import React, { useState, useEffect } from 'react'
import { Character, Scene } from '@/lib/types/types'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface CharacterDialogueStatsProps {
  character: Character
  scenes: Scene[]
}

interface DialogueStats {
  totalLines: number
  totalWords: number
  averageWordsPerLine: number
  scenesWithDialogue: number
  topWords: { word: string; count: number }[]
}

export function CharacterDialogueStats({ character, scenes }: CharacterDialogueStatsProps) {
  const [stats, setStats] = useState<DialogueStats | null>(null)

  useEffect(() => {
    const calculateStats = () => {
      let totalLines = 0
      let totalWords = 0
      let scenesWithDialogue = 0
      const wordCounts: { [key: string]: number } = {}

      scenes.forEach(scene => {
        const characterLines = scene.content.split('\n').filter(line => 
          line.trim().startsWith(character.name.toUpperCase())
        )

        if (characterLines.length > 0) {
          scenesWithDialogue++
        }

        characterLines.forEach(line => {
          totalLines++
          const words = line.split(/\s+/).filter(word => word.length > 0)
          totalWords += words.length

          words.forEach(word => {
            const lowerWord = word.toLowerCase()
            wordCounts[lowerWord] = (wordCounts[lowerWord] || 0) + 1
          })
        })
      })

      const topWords = Object.entries(wordCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([word, count]) => ({ word, count }))

      setStats({
        totalLines,
        totalWords,
        averageWordsPerLine: totalLines > 0 ? totalWords / totalLines : 0,
        scenesWithDialogue,
        topWords
      })
    }

    calculateStats()
  }, [character, scenes])

  if (!stats) {
    return <div>Loading stats...</div>
  }

  return (
    <ScrollArea className="h-[600px] w-full rounded-md border p-4">
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Dialogue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total Lines: {stats.totalLines}</p>
            <p>Total Words: {stats.totalWords}</p>
            <p>Average Words per Line: {stats.averageWordsPerLine.toFixed(2)}</p>
            <p>Scenes with Dialogue: {stats.scenesWithDialogue}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top 10 Most Used Words</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.topWords}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="word" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  )
}
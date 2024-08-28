import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { OverviewStat } from '@/lib/types'

interface OverviewProps {
  stats: OverviewStat[]
}

export function Overview({ stats }: OverviewProps) {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="text-gray-600 mb-6">View key stats and insights for all your projects.</p>
        <div className="grid grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
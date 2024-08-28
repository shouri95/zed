import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Project, ActivityData } from '@/lib/types'

interface VisualizationChartsProps {
  activityData: ActivityData[]
  projects: Project[]
}

export function VisualizationCharts({ activityData, projects }: VisualizationChartsProps) {
  return (
    <div className="grid grid-cols-2 gap-8 mb-8">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Writing Activity</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="words" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Project Progress</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={projects.filter(p => p.status === "active")}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="progress" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
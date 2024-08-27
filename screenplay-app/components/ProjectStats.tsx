import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Mon', words: 1500 },
  { name: 'Tue', words: 2000 },
  { name: 'Wed', words: 1800 },
  { name: 'Thu', words: 2200 },
  { name: 'Fri', words: 1900 },
  { name: 'Sat', words: 1000 },
  { name: 'Sun', words: 2500 },
]

export function ProjectStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={75} className="w-full" />
          <p className="text-center mt-2">75% Complete</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Word Count</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-4xl font-bold text-center">52,890</h3>
          <p className="text-center text-gray-500">words written</p>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Writing Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="words" fill="#3498db" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
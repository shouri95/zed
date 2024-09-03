// components/project/Script.tsx
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"

const Script: React.FC = () => {
  const [formattedContent, setFormattedContent] = useState('')
  const { control, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    const formatted = formatScreenplay(data.content)
    setFormattedContent(formatted)
  }

  const formatScreenplay = (content: string) => {
    const lines = content.split('\n')
    return lines.map((line) => {
      if (line.trim().toUpperCase() === line.trim()) {
        return `<p class="character">${line.trim()}</p>`
      } else if (line.trim().startsWith('(') && line.trim().endsWith(')')) {
        return `<p class="parenthetical">${line.trim()}</p>`
      } else if (line.trim().startsWith('INT.') || line.trim().startsWith('EXT.')) {
        return `<p class="scene-heading">${line.trim().toUpperCase()}</p>`
      } else if (line.trim() === '') {
        return '<p class="blank-line">&nbsp;</p>'
      } else {
        return `<p class="action">${line.trim()}</p>`
      }
    }).join('')
  }

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="content"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Textarea
              {...field}
              placeholder="Enter your screenplay..."
              rows={20}
              className="font-mono text-sm"
            />
          )}
        />
        <div className="flex space-x-2">
          <Button type="submit">Format Screenplay</Button>
          <Select>
            <option value="scene-heading">Scene Heading</option>
            <option value="action">Action</option>
            <option value="character">Character</option>
            <option value="dialogue">Dialogue</option>
            <option value="parenthetical">Parenthetical</option>
            <option value="transition">Transition</option>
          </Select>
        </div>
      </form>
      {formattedContent && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Formatted Screenplay</h2>
          <div
            className="screenplay-formatted font-mono text-sm border p-4"
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />
        </div>
      )}
      <style jsx>{`
        .screenplay-formatted .scene-heading {
          text-transform: uppercase;
          margin-top: 2em;
        }
        .screenplay-formatted .action {
          margin-top: 1em;
        }
        .screenplay-formatted .character {
          margin-top: 1em;
          margin-left: 40%;
          text-transform: uppercase;
        }
        .screenplay-formatted .parenthetical {
          margin-left: 30%;
        }
        .screenplay-formatted .dialogue {
          margin-left: 25%;
          margin-right: 25%;
        }
      `}</style>
    </div>
  )
}

export default Script
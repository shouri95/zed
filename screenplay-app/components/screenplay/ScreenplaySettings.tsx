import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ScreenplaySettings {
  leftMargin: number
  rightMargin: number
  topMargin: number
  bottomMargin: number
  fontFamily: string
  fontSize: number
}

interface ScreenplaySettingsProps {
  settings: ScreenplaySettings
  onSave: (settings: ScreenplaySettings) => void
  onClose: () => void
}

export function ScreenplaySettings({ settings, onSave, onClose }: ScreenplaySettingsProps) {
  const [localSettings, setLocalSettings] = useState(settings)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLocalSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    onSave(localSettings)
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Screenplay Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="leftMargin">Left Margin (inches)</Label>
            <Input
              id="leftMargin"
              name="leftMargin"
              type="number"
              value={localSettings.leftMargin}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="rightMargin">Right Margin (inches)</Label>
            <Input
              id="rightMargin"
              name="rightMargin"
              type="number"
              value={localSettings.rightMargin}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="topMargin">Top Margin (inches)</Label>
            <Input
              id="topMargin"
              name="topMargin"
              type="number"
              value={localSettings.topMargin}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="bottomMargin">Bottom Margin (inches)</Label>
            <Input
              id="bottomMargin"
              name="bottomMargin"
              type="number"
              value={localSettings.bottomMargin}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="fontFamily">Font Family</Label>
            <Input
              id="fontFamily"
              name="fontFamily"
              value={localSettings.fontFamily}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="fontSize">Font Size (pt)</Label>
            <Input
              id="fontSize"
              name="fontSize"
              type="number"
              value={localSettings.fontSize}
              onChange={handleChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Settings</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

import { useState } from 'react'
import { useFocusStore } from '../lib/store'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Slider } from './ui/slider'

export function TaskSelection() {
  const [title, setTitle] = useState('')
  const [impact, setImpact] = useState(5)
  const [urgency, setUrgency] = useState(5)
  const [effort, setEffort] = useState(5)
  const addTask = useFocusStore((state) => state.addTask)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    addTask({
      title,
      impact,
      urgency,
      effort,
      date: new Date().toISOString(),
      duration: 25 * 60,
    })

    setTitle('')
    setImpact(5)
    setUrgency(5)
    setEffort(5)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          What's the ONE thing you need to focus on?
        </label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your most important task..."
          className="w-full"
        />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Impact ({impact}/10)
          </label>
          <Slider
            value={[impact]}
            onValueChange={(value) => setImpact(value[0])}
            max={10}
            step={1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Urgency ({urgency}/10)
          </label>
          <Slider
            value={[urgency]}
            onValueChange={(value) => setUrgency(value[0])}
            max={10}
            step={1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Effort ({effort}/10)
          </label>
          <Slider
            value={[effort]}
            onValueChange={(value) => setEffort(value[0])}
            max={10}
            step={1}
            className="w-full"
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Set as Today's Focus
      </Button>
    </form>
  )
}
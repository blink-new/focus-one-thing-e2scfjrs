
import { useState } from 'react'
import { Timer } from './Timer'
import { useFocusStore } from '../lib/store'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

export function CurrentTask() {
  const { currentTask, completeTask } = useFocusStore()
  const [reflection, setReflection] = useState('')

  if (!currentTask) return null

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Your ONE Focus</h1>
        <p className="text-xl text-gray-700">{currentTask.title}</p>
        <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800">
          Impact: {currentTask.impact}/10
        </div>
      </div>

      <Timer />

      <div className="space-y-4">
        <Textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="What did you learn? How did it go?"
          className="w-full"
        />
        <Button
          onClick={() => completeTask(currentTask.id, reflection)}
          className="w-full"
        >
          Complete & Reflect
        </Button>
      </div>
    </div>
  )
}
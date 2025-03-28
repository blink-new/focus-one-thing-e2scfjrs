
import { useState } from 'react'
import { Timer } from './Timer'
import { useFocusStore, calculateImpactScore } from '../lib/store'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { ArrowLeft } from 'lucide-react'

export function CurrentTask() {
  const { currentTask, completeTask, setCurrentTask } = useFocusStore()
  const [reflection, setReflection] = useState('')

  if (!currentTask) return null

  const impactScore = calculateImpactScore(currentTask)

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => setCurrentTask(null)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Tasks
      </Button>

      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Focus Time</h1>
        <p className="text-xl text-gray-700 mb-4">{currentTask.title}</p>
        
        <div className="flex justify-center gap-3">
          <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800">
            Impact: {currentTask.impact}/10
          </div>
          <div className="px-3 py-1 rounded-full bg-red-100 text-red-800">
            Urgency: {currentTask.urgency}/10
          </div>
          <div className="px-3 py-1 rounded-full bg-green-100 text-green-800">
            Impact Score: {impactScore.toFixed(1)}
          </div>
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
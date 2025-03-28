
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Timer } from './Timer'
import { useFocusStore, calculateImpactScore } from '../lib/store'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

export function CurrentTask() {
  const { currentTask, completeTask, setCurrentTask } = useFocusStore()
  const [reflection, setReflection] = useState('')

  if (!currentTask) return null

  const impactScore = calculateImpactScore(currentTask)

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-8"
    >
      <Button
        variant="ghost"
        className="mb-4 hover:bg-gray-100"
        onClick={() => setCurrentTask(null)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Tasks
      </Button>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Focus Time</h1>
        <p className="text-xl text-gray-700 mb-6">{currentTask.title}</p>
        
        <div className="flex justify-center gap-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 rounded-full bg-blue-100 text-blue-800"
          >
            Impact: {currentTask.impact}/10
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 rounded-full bg-red-100 text-red-800"
          >
            Urgency: {currentTask.urgency}/10
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 rounded-full bg-green-100 text-green-800"
          >
            Impact Score: {impactScore.toFixed(1)}
          </motion.div>
        </div>
      </motion.div>

      <Timer />

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <Textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="What did you learn? How did it go? Take a moment to reflect..."
          className="w-full min-h-[120px] resize-none"
        />
        <Button
          onClick={() => {
            completeTask(currentTask.id, reflection)
            toast.success('Task completed! Great work! 🎉', {
              duration: 4000,
            })
          }}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          <CheckCircle2 className="h-4 w-4 mr-2" />
          Complete & Reflect
        </Button>
      </motion.div>
    </motion.div>
  )
}
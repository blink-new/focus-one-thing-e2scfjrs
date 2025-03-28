
import { useEffect } from 'react'
import { useFocusStore } from '../lib/store'
import { Button } from './ui/button'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function FocusMode() {
  const focusMode = useFocusStore(state => state.focusMode)
  const focusTask = useFocusStore(state => state.focusTask)
  const toggleFocusMode = useFocusStore(state => state.toggleFocusMode)
  const setFocusTask = useFocusStore(state => state.setFocusTask)

  // Exit focus mode when pressing Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && focusMode) {
        toggleFocusMode()
        setFocusTask(null)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [focusMode, toggleFocusMode, setFocusTask])

  if (!focusMode || !focusTask) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 relative"
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={() => {
              toggleFocusMode()
              setFocusTask(null)
            }}
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">{focusTask.title}</h2>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <div>Impact: {focusTask.impact}/10</div>
                <div>Urgency: {focusTask.urgency}/10</div>
                <div>Effort: {focusTask.effort}/10</div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-lg">
                Focus on this task. Block out distractions and give it your full attention.
              </p>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  onClick={() => {
                    toggleFocusMode()
                    setFocusTask(null)
                  }}
                >
                  Complete & Exit
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    toggleFocusMode()
                    setFocusTask(null)
                  }}
                >
                  Exit Focus Mode
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
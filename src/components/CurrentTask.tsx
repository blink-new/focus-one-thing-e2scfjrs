
import { Play, Pause, Square } from 'lucide-react'
import { useFocusStore, calculateImpactScore, calculatePriority } from '../lib/store'
import { Button } from './ui/button'
import { formatTime } from '../lib/utils'
import { useEffect } from 'react'

export function CurrentTask() {
  const {
    currentTask,
    isTimerRunning,
    remainingTime,
    startTimer,
    stopTimer,
    setRemainingTime,
    updateTaskTimeSpent,
    setCurrentTask
  } = useFocusStore()

  useEffect(() => {
    let interval: number | undefined

    if (isTimerRunning && remainingTime > 0) {
      interval = window.setInterval(() => {
        setRemainingTime(remainingTime - 1)
      }, 1000)
    } else if (remainingTime === 0 && isTimerRunning) {
      stopTimer()
      if (currentTask) {
        // Add the completed session time to total time spent
        const sessionTime = currentTask.duration || 25 * 60
        updateTaskTimeSpent(currentTask.id, sessionTime)
      }
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTimerRunning, remainingTime, currentTask])

  if (!currentTask) {
    return (
      <div className="p-6 text-center dark:bg-zinc-900/30 bg-zinc-50/50 rounded-lg">
        <p className="dark:text-zinc-400 text-zinc-600">
          No active task. Click the timer icon on a task to start focusing!
        </p>
      </div>
    )
  }

  const impactScore = calculateImpactScore(currentTask)
  const priorityScore = calculatePriority(currentTask)

  const handleStartStop = () => {
    if (isTimerRunning) {
      stopTimer()
    } else {
      startTimer()
    }
  }

  const handleReset = () => {
    stopTimer()
    setRemainingTime(currentTask.duration || 25 * 60)
  }

  return (
    <div className="p-6 dark:bg-zinc-900/30 bg-zinc-50/50 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold dark:text-zinc-200">Current Focus</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleStartStop}
            className="h-8 w-8"
          >
            {isTimerRunning ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleReset}
            className="h-8 w-8"
          >
            <Square className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="text-center mb-6">
        <div className="text-4xl font-mono font-bold mb-2">
          {formatTime(remainingTime)}
        </div>
        <div className="text-sm text-muted-foreground">
          {currentTask.totalTimeSpent ? `Total: ${formatTime(currentTask.totalTimeSpent)}` : 'No time logged'}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium dark:text-zinc-200">{currentTask.title}</h3>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div className="dark:text-zinc-400 text-zinc-600">
              <p>Impact: {currentTask.impact}/5</p>
              <p>Urgency: {currentTask.urgency}/5</p>
              <p>Effort: {currentTask.effort}/5</p>
            </div>
            <div className="dark:text-zinc-400 text-zinc-600">
              <p>Impact Score: {impactScore.toFixed(1)}</p>
              <p>Priority Score: {priorityScore.toFixed(1)}</p>
              {currentTask.date && (
                <p>Due: {new Date(currentTask.date).toLocaleDateString()}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
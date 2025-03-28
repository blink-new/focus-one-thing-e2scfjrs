
import { useEffect } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { useFocusStore } from '../lib/store'
import { Button } from './ui/button'
import { Progress } from './ui/progress'

export function Timer() {
  const {
    currentTask,
    isTimerRunning,
    remainingTime,
    startTimer,
    stopTimer,
    setRemainingTime,
  } = useFocusStore()

  useEffect(() => {
    let interval: number
    if (isTimerRunning && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime(remainingTime - 1)
      }, 1000) as unknown as number
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, remainingTime])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = ((25 * 60 - remainingTime) / (25 * 60)) * 100

  if (!currentTask) return null

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold">{formatTime(remainingTime)}</h2>
        <Progress value={progress} className="mt-2" />
      </div>

      <div className="flex justify-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            if (isTimerRunning) {
              stopTimer()
            } else {
              startTimer()
            }
          }}
        >
          {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            stopTimer()
            setRemainingTime(25 * 60)
          }}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
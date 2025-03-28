
import { useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { useFocusStore } from '../lib/store'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { cn } from '../lib/utils'

export function Timer() {
  const {
    currentTask,
    isTimerRunning,
    remainingTime,
    startTimer,
    stopTimer,
    setRemainingTime,
  } = useFocusStore()

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3')
  }, [])

  useEffect(() => {
    let interval: number
    if (isTimerRunning && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime(remainingTime - 1)
      }, 1000) as unknown as number
    } else if (remainingTime === 0 && isTimerRunning) {
      stopTimer()
      audioRef.current?.play()
      toast.success('Time is up! Take a break.', {
        duration: 4000,
      })
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, remainingTime])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = ((25 * 60 - remainingTime) / (25 * 60)) * 100

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Focus Timer
        </h1>
        <p className="text-muted-foreground">
          Stay focused and productive with the Pomodoro technique.
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto space-y-8 bg-card p-8 rounded-xl shadow-sm"
      >
        <div className="text-center">
          <motion.h2 
            key={remainingTime}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.2 }}
            className="text-6xl font-bold"
          >
            {formatTime(remainingTime)}
          </motion.h2>
          <Progress value={progress} className="mt-6" />
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            size="lg"
            onClick={() => {
              if (isTimerRunning) {
                stopTimer()
                toast.info('Timer paused')
              } else {
                startTimer()
                toast.info('Timer started')
              }
            }}
            className={cn(
              "transition-colors w-32",
              isTimerRunning 
                ? "bg-red-500 hover:bg-red-600 text-white" 
                : "bg-blue-500 hover:bg-blue-600 text-white"
            )}
          >
            <span className="mr-2">
              {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </span>
            {isTimerRunning ? 'Pause' : 'Start'}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              stopTimer()
              setRemainingTime(25 * 60)
              toast.info('Timer reset')
            }}
            className="w-32"
          >
            <span className="mr-2">
              <RotateCcw className="h-4 w-4" />
            </span>
            Reset
          </Button>
        </div>

        {currentTask && (
          <div className="text-center text-sm text-muted-foreground">
            Currently working on: <span className="font-medium">{currentTask.title}</span>
          </div>
        )}
      </motion.div>
    </div>
  )
}
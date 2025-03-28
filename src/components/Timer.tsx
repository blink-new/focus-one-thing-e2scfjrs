
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="text-center">
        <motion.h2 
          key={remainingTime}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.2 }}
          className="text-4xl font-bold text-gray-900"
        >
          {formatTime(remainingTime)}
        </motion.h2>
        <Progress value={progress} className="mt-4" />
      </div>

      <div className="flex justify-center space-x-2">
        <Button
          variant="outline"
          size="icon"
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
            "transition-colors",
            isTimerRunning ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-blue-50 text-blue-600 hover:bg-blue-100"
          )}
        >
          {isTimerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            stopTimer()
            setRemainingTime(25 * 60)
            toast.info('Timer reset')
          }}
          className="bg-gray-50 text-gray-600 hover:bg-gray-100"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}
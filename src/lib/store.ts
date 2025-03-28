
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Task {
  id: string
  title: string
  impact: number
  completed: boolean
  date: string
  reflection?: string
  duration?: number
}

interface FocusStore {
  currentTask: Task | null
  tasks: Task[]
  isTimerRunning: boolean
  remainingTime: number
  setCurrentTask: (task: Task | null) => void
  addTask: (task: Task) => void
  completeTask: (id: string, reflection: string) => void
  startTimer: () => void
  stopTimer: () => void
  setRemainingTime: (time: number) => void
}

export const useFocusStore = create<FocusStore>()(
  persist(
    (set) => ({
      currentTask: null,
      tasks: [],
      isTimerRunning: false,
      remainingTime: 25 * 60, // 25 minutes in seconds

      setCurrentTask: (task) => set({ currentTask: task }),
      
      addTask: (task) => set((state) => ({
        tasks: [task, ...state.tasks],
        currentTask: task,
      })),

      completeTask: (id, reflection) => set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id
            ? { ...task, completed: true, reflection }
            : task
        ),
        currentTask: null,
      })),

      startTimer: () => set({ isTimerRunning: true }),
      stopTimer: () => set({ isTimerRunning: false }),
      setRemainingTime: (time) => set({ remainingTime: time }),
    }),
    {
      name: 'focus-store',
    }
  )
)
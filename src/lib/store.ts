
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Task {
  id: string
  title: string
  impact: number
  urgency: number
  effort: number
  completed: boolean
  date: string
  reflection?: string
  duration?: number
  order?: number
}

interface FocusStore {
  tasks: Task[]
  currentTask: Task | null
  isTimerRunning: boolean
  remainingTime: number
  addTask: (task: Task) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  reorderTasks: (taskId: string, newOrder: number) => void
  setCurrentTask: (task: Task | null) => void
  completeTask: (id: string, reflection: string) => void
  startTimer: () => void
  stopTimer: () => void
  setRemainingTime: (time: number) => void
}

export const useFocusStore = create<FocusStore>()(
  persist(
    (set) => ({
      tasks: [],
      currentTask: null,
      isTimerRunning: false,
      remainingTime: 25 * 60,

      addTask: (task) => set((state) => ({
        tasks: [...state.tasks, { ...task, order: state.tasks.length }],
      })),

      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, ...updates } : task
        ),
      })),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      })),

      reorderTasks: (taskId, newOrder) => set((state) => {
        const tasks = [...state.tasks]
        const taskIndex = tasks.findIndex((t) => t.id === taskId)
        const task = tasks[taskIndex]
        
        tasks.splice(taskIndex, 1)
        tasks.splice(newOrder, 0, task)
        
        return {
          tasks: tasks.map((t, i) => ({ ...t, order: i })),
        }
      }),

      setCurrentTask: (task) => set({ currentTask: task }),
      
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

export const calculateImpactScore = (task: Task) => {
  return (task.impact * 0.5) + (task.urgency * 0.3) + ((10 - task.effort) * 0.2)
}
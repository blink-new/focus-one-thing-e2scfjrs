
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Task, Project } from './types'

interface FocusStore {
  tasks: Task[]
  projects: Project[]
  currentTask: Task | null
  isTimerRunning: boolean
  remainingTime: number
  addTask: (task: Omit<Task, 'id' | 'completed' | 'completedAt' | 'reflection'>) => void
  deleteTask: (id: string) => void
  completeTask: (id: string, reflection: string) => void
  setCurrentTask: (task: Task | null) => void
  startTimer: () => void
  stopTimer: () => void
  setRemainingTime: (time: number) => void
  reorderTasks: (newOrder: string[]) => void
  addProject: (project: Omit<Project, 'id'>) => void
  editProject: (id: string, updates: Partial<Omit<Project, 'id'>>) => void
  deleteProject: (id: string) => void
}

const DEFAULT_PROJECTS: Project[] = [
  { id: 'work', name: 'Work', color: '#0ea5e9' },
  { id: 'personal', name: 'Personal', color: '#8b5cf6' },
]

export const useFocusStore = create<FocusStore>()(
  persist(
    (set) => ({
      tasks: [],
      projects: DEFAULT_PROJECTS,
      currentTask: null,
      isTimerRunning: false,
      remainingTime: 25 * 60, // 25 minutes in seconds

      addTask: (task) =>
        set((state) => ({
          tasks: [
            {
              ...task,
              id: crypto.randomUUID(),
              completed: false,
              completedAt: null,
              reflection: '',
            },
            ...state.tasks,
          ],
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),

      completeTask: (id, reflection) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  completed: true,
                  completedAt: new Date().toISOString(),
                  reflection,
                }
              : task
          ),
          currentTask: null,
        })),

      setCurrentTask: (task) =>
        set({
          currentTask: task,
          isTimerRunning: false,
          remainingTime: 25 * 60,
        }),

      startTimer: () => set({ isTimerRunning: true }),
      stopTimer: () => set({ isTimerRunning: false }),
      setRemainingTime: (time) => set({ remainingTime: time }),

      reorderTasks: (newOrder) =>
        set((state) => ({
          tasks: newOrder
            .map((id) => state.tasks.find((task) => task.id === id))
            .filter((task): task is Task => task !== undefined),
        })),

      addProject: (project) =>
        set((state) => ({
          projects: [
            ...state.projects,
            { ...project, id: crypto.randomUUID() },
          ],
        })),

      editProject: (id, updates) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id
              ? { ...project, ...updates }
              : project
          ),
        })),

      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
          tasks: state.tasks.filter((task) => task.projectId !== id),
        })),
    }),
    {
      name: 'focus-store',
    }
  )
)

export function calculateImpactScore(task: Task): number {
  return (task.impact * 0.7 + task.urgency * 0.3)
}
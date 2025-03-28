
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
  projectId: string | null
  reflection?: string
  duration?: number
  order?: number
}

export interface Project {
  id: string
  name: string
  color: string
  isDefault?: boolean
}

interface FocusStore {
  tasks: Task[]
  projects: Project[]
  currentTask: Task | null
  isTimerRunning: boolean
  remainingTime: number
  
  addTask: (task: Task) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  reorderTasks: (taskId: string, newOrder: number) => void
  setCurrentTask: (task: Task | null) => void
  completeTask: (id: string, reflection: string) => void
  
  addProject: (project: Project) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  deleteProject: (id: string) => void
  
  startTimer: () => void
  stopTimer: () => void
  setRemainingTime: (time: number) => void
}

const DEFAULT_PROJECTS: Project[] = [
  { id: 'work', name: 'Work', color: '#0ea5e9', isDefault: true },
  { id: 'personal', name: 'Personal', color: '#8b5cf6', isDefault: true },
]

export const useFocusStore = create<FocusStore>()(
  persist(
    (set) => ({
      tasks: [],
      projects: DEFAULT_PROJECTS,
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

      addProject: (project) => set((state) => ({
        projects: [...state.projects, project],
      })),

      updateProject: (id, updates) => set((state) => ({
        projects: state.projects.map((project) =>
          project.id === id ? { ...project, ...updates } : project
        ),
      })),

      deleteProject: (id) => set((state) => ({
        projects: state.projects.filter((p) => !p.isDefault && p.id !== id),
        tasks: state.tasks.map((task) =>
          task.projectId === id ? { ...task, projectId: null } : task
        ),
      })),

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
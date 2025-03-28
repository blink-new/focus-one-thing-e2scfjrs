
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Task {
  id: string
  title: string
  impact: number
  urgency: number
  effort: number
  completed: boolean
  date?: string
  duration?: number
  projectId?: string
  reflection?: string
}

export interface Project {
  id: string
  name: string
  description?: string
}

export type Theme = 'light' | 'dark' | 'system'

interface Settings {
  appearance: {
    theme: Theme
  }
  timer: {
    focusDuration: number
    shortBreakDuration: number
    longBreakDuration: number
    longBreakInterval: number
    soundEnabled: boolean
  }
  tasks: {
    defaultProjectId: string | null
    autoArchiveDays: number
    showCompleted: boolean
  }
  notifications: {
    timerEnabled: boolean
    taskRemindersEnabled: boolean
  }
}

interface FocusState {
  tasks: Task[]
  projects: Project[]
  currentTask: Task | null
  settings: Settings
  addTask: (task: Omit<Task, 'id' | 'completed'>) => void
  toggleTaskComplete: (id: string) => void
  deleteTask: (id: string) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  addProject: (project: Omit<Project, 'id'>) => void
  deleteProject: (id: string) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  setCurrentTask: (task: Task | null) => void
  reorderTasks: (taskIds: string[]) => void
  updateSettings: (updates: Partial<Settings>) => void
}

export const calculateImpactScore = (task: Task) => {
  return (task.impact * task.urgency) / task.effort
}

export const calculatePriority = (task: Task) => {
  const impactScore = calculateImpactScore(task)
  const daysUntilDue = task.date
    ? (new Date(task.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    : 30
  return impactScore * (1 + 1 / Math.max(1, daysUntilDue))
}

export const useFocusStore = create<FocusState>()(
  persist(
    (set) => ({
      tasks: [],
      projects: [],
      currentTask: null,
      settings: {
        appearance: {
          theme: 'system' as Theme
        },
        timer: {
          focusDuration: 25 * 60, // 25 minutes in seconds
          shortBreakDuration: 5 * 60, // 5 minutes in seconds
          longBreakDuration: 15 * 60, // 15 minutes in seconds
          longBreakInterval: 4, // Every 4 focus sessions
          soundEnabled: true
        },
        tasks: {
          defaultProjectId: null,
          autoArchiveDays: 30,
          showCompleted: true
        },
        notifications: {
          timerEnabled: true,
          taskRemindersEnabled: true
        }
      },
      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: Date.now().toString(),
              completed: false,
            },
          ],
        })),
      toggleTaskComplete: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, completed: !task.completed }
              : task
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
          currentTask: state.currentTask?.id === id ? null : state.currentTask,
        })),
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
          currentTask:
            state.currentTask?.id === id
              ? { ...state.currentTask, ...updates }
              : state.currentTask,
        })),
      addProject: (project) =>
        set((state) => ({
          projects: [
            ...state.projects,
            { ...project, id: Date.now().toString() },
          ],
        })),
      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
          tasks: state.tasks.filter((task) => task.projectId !== id),
        })),
      updateProject: (id, updates) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, ...updates } : project
          ),
        })),
      setCurrentTask: (task) =>
        set(() => ({
          currentTask: task,
        })),
      reorderTasks: (taskIds) =>
        set((state) => ({
          tasks: taskIds
            .map((id) => state.tasks.find((task) => task.id === id))
            .filter((task): task is Task => task !== undefined),
        })),
      updateSettings: (updates) =>
        set((state) => ({
          settings: {
            ...state.settings,
            ...updates,
          },
        })),
    }),
    {
      name: 'focus-store',
    }
  )
)
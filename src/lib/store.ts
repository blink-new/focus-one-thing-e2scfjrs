
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'

export type Theme = 'light' | 'dark' | 'system'

export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: number
  completedAt?: number
  projectId?: string | null
  order: number
}

export interface Project {
  id: string
  name: string
  color: string
}

interface Settings {
  timer: {
    focusDuration: number
    shortBreakDuration: number
    longBreakDuration: number
    longBreakInterval: number
    soundEnabled: boolean
  }
  appearance: {
    theme: Theme
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

interface FocusStore {
  tasks: Task[]
  projects: Project[]
  currentTask: Task | null
  completedTasks: Task[]
  settings: Settings
  addTask: (title: string, projectId?: string) => void
  completeTask: (taskId: string) => void
  uncompleteTask: (taskId: string) => void
  deleteTask: (taskId: string) => void
  setCurrentTask: (task: Task | null) => void
  addProject: (name: string, color: string) => void
  updateProject: (id: string, name: string, color: string) => void
  deleteProject: (id: string) => void
  reorderTasks: (tasks: Task[]) => void
  updateSettings: (settings: Partial<Settings>) => void
}

const DEFAULT_SETTINGS: Settings = {
  timer: {
    focusDuration: 25 * 60, // 25 minutes
    shortBreakDuration: 5 * 60, // 5 minutes
    longBreakDuration: 15 * 60, // 15 minutes
    longBreakInterval: 4,
    soundEnabled: true,
  },
  appearance: {
    theme: 'system',
  },
  tasks: {
    defaultProjectId: null,
    autoArchiveDays: 7,
    showCompleted: true,
  },
  notifications: {
    timerEnabled: true,
    taskRemindersEnabled: true,
  },
}

export const useFocusStore = create<FocusStore>()(
  persist(
    (set) => ({
      tasks: [],
      projects: [],
      currentTask: null,
      completedTasks: [],
      settings: DEFAULT_SETTINGS,
      addTask: (title, projectId) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: uuidv4(),
              title,
              completed: false,
              createdAt: Date.now(),
              projectId: projectId || state.settings.tasks.defaultProjectId,
              order: state.tasks.length,
            },
          ],
        })),
      completeTask: (taskId) =>
        set((state) => {
          const task = state.tasks.find((t) => t.id === taskId)
          if (!task) return state

          const completedTask = {
            ...task,
            completed: true,
            completedAt: Date.now(),
          }

          return {
            tasks: state.tasks.filter((t) => t.id !== taskId),
            completedTasks: [completedTask, ...state.completedTasks],
            currentTask: state.currentTask?.id === taskId ? null : state.currentTask,
          }
        }),
      uncompleteTask: (taskId) =>
        set((state) => {
          const task = state.completedTasks.find((t) => t.id === taskId)
          if (!task) return state

          const uncompletedTask = {
            ...task,
            completed: false,
            completedAt: undefined,
          }

          return {
            completedTasks: state.completedTasks.filter((t) => t.id !== taskId),
            tasks: [...state.tasks, uncompletedTask],
          }
        }),
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== taskId),
          completedTasks: state.completedTasks.filter((t) => t.id !== taskId),
          currentTask: state.currentTask?.id === taskId ? null : state.currentTask,
        })),
      setCurrentTask: (task) =>
        set(() => ({
          currentTask: task,
        })),
      addProject: (name, color) =>
        set((state) => ({
          projects: [
            ...state.projects,
            {
              id: uuidv4(),
              name,
              color,
            },
          ],
        })),
      updateProject: (id, name, color) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, name, color } : p
          ),
        })),
      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
          tasks: state.tasks.map((t) =>
            t.projectId === id ? { ...t, projectId: null } : t
          ),
        })),
      reorderTasks: (tasks) =>
        set(() => ({
          tasks,
        })),
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: {
            ...state.settings,
            ...newSettings,
            timer: {
              ...state.settings.timer,
              ...(newSettings.timer || {}),
            },
            appearance: {
              ...state.settings.appearance,
              ...(newSettings.appearance || {}),
            },
            tasks: {
              ...state.settings.tasks,
              ...(newSettings.tasks || {}),
            },
            notifications: {
              ...state.settings.notifications,
              ...(newSettings.notifications || {}),
            },
          },
        })),
    }),
    {
      name: 'focus-store',
    }
  )
)
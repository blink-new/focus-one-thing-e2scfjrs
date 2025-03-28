
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Task {
  id: string
  title: string
  completed: boolean
  impact: number
  urgency: number
  effort: number
  project: string
  createdAt: string
}

export interface Project {
  id: string
  name: string
  color?: string
}

interface FocusStore {
  tasks: Task[]
  projects: Project[]
  defaultProject: string
  focusMode: boolean
  focusTask: Task | null
  addTask: (task: Task) => void
  toggleComplete: (id: string) => void
  deleteTask: (id: string) => void
  setDefaultProject: (projectId: string) => void
  toggleFocusMode: () => void
  setFocusTask: (task: Task | null) => void
}

export const useFocusStore = create<FocusStore>()(
  persist(
    (set) => ({
      tasks: [],
      projects: [
        { id: 'inbox', name: 'Inbox' },
        { id: 'work', name: 'Work', color: '#0ea5e9' },
        { id: 'personal', name: 'Personal', color: '#8b5cf6' },
        { id: 'blink', name: 'Blink', color: '#f43f5e' },
      ],
      defaultProject: 'inbox',
      focusMode: false,
      focusTask: null,
      addTask: (task) => set((state) => ({ 
        tasks: [...state.tasks, {
          ...task,
          project: task.project || state.defaultProject
        }]
      })),
      toggleComplete: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      setDefaultProject: (projectId) => set({ defaultProject: projectId }),
      toggleFocusMode: () => set((state) => ({ focusMode: !state.focusMode })),
      setFocusTask: (task) => set({ focusTask: task }),
    }),
    {
      name: 'focus-store',
    }
  )
)

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Task {
  id: string
  title: string
  completed: boolean
  projectId: string
  impact: number
  urgency: number
  effort: number
  date?: string
  duration?: number
}

export interface Project {
  id: string
  name: string
  description?: string
}

interface FocusState {
  tasks: Task[]
  projects: Project[]
  addTask: (task: Task) => void
  toggleTaskComplete: (taskId: string) => void
  deleteTask: (taskId: string) => void
  addProject: (project: Project) => void
  deleteProject: (projectId: string) => void
}

export const useFocusStore = create<FocusState>()(
  persist(
    (set) => ({
      tasks: [],
      projects: [],
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),
      toggleTaskComplete: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, completed: !task.completed }
              : task
          ),
        })),
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),
      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, project],
        })),
      deleteProject: (projectId) =>
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== projectId),
          tasks: state.tasks.filter((task) => task.projectId !== projectId),
        })),
    }),
    {
      name: 'focus-store',
    }
  )
)

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
  duration: number
  projectId: string | null
}

export interface Project {
  id: string
  name: string
  color: string
}

interface FocusStore {
  tasks: Task[]
  projects: Project[]
  addTask: (task: Task) => void
  toggleTask: (taskId: string) => void
  editTask: (taskId: string, updates: Partial<Task>) => void
  deleteTask: (taskId: string) => void
  addProject: (project: Project) => void
  deleteProject: (projectId: string) => void
}

export const useFocusStore = create<FocusStore>()(
  persist(
    (set) => ({
      tasks: [],
      projects: [],
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),
      toggleTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, completed: !task.completed }
              : task
          ),
        })),
      editTask: (taskId, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, ...updates }
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
          tasks: state.tasks.map((task) =>
            task.projectId === projectId
              ? { ...task, projectId: null }
              : task
          ),
        })),
    }),
    {
      name: 'focus-store',
    }
  )
)
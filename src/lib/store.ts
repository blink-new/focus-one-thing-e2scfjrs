
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Task, Project } from '../types'

// Impact score calculation
export const calculateImpactScore = (task: Task): number => {
  return Math.round((task.impact * 2 - task.effort) * 10) / 10
}

interface FocusState {
  tasks: Task[]
  projects: Project[]
  defaultProject: string
  currentTask: Task | null
  addTask: (task: Task) => void
  removeTask: (taskId: string) => void
  deleteTask: (taskId: string) => void
  updateTask: (taskId: string, updates: Partial<Task>) => void
  toggleTaskComplete: (taskId: string) => void
  addProject: (project: Project) => void
  removeProject: (projectId: string) => void
  updateProject: (projectId: string, updates: Partial<Project>) => void
  setDefaultProject: (projectId: string) => void
  setCurrentTask: (task: Task | null) => void
}

export const useFocusStore = create<FocusState>()(
  persist(
    (set) => ({
      tasks: [],
      projects: [{ id: 'inbox', name: 'Inbox', color: '#6366f1' }],
      defaultProject: 'inbox',
      currentTask: null,
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),
      removeTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== taskId),
        })),
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== taskId),
        })),
      updateTask: (taskId, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, ...updates } : task
          ),
        })),
      toggleTaskComplete: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, completed: !task.completed }
              : task
          ),
        })),
      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, project],
        })),
      removeProject: (projectId) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== projectId),
        })),
      updateProject: (projectId, updates) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId ? { ...project, ...updates } : project
          ),
        })),
      setDefaultProject: (projectId) =>
        set(() => ({
          defaultProject: projectId,
        })),
      setCurrentTask: (task) =>
        set(() => ({
          currentTask: task,
        })),
    }),
    {
      name: 'focus-store',
    }
  )
)
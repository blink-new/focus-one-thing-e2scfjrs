
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Task, Project } from '../types'

// Impact score calculation
export const calculateImpactScore = (task: Task): number => {
  const urgencyWeight = 0.4
  const importanceWeight = 0.6
  
  // Normalize values to 0-1 scale
  const urgencyScore = task.urgency / 5
  const importanceScore = task.importance / 5
  
  // Calculate weighted score
  const score = (urgencyScore * urgencyWeight) + (importanceScore * importanceWeight)
  
  // Return score rounded to 2 decimal places
  return Math.round(score * 100) / 100
}

interface FocusState {
  tasks: Task[]
  projects: Project[]
  defaultProject: string
  addTask: (task: Task) => void
  removeTask: (taskId: string) => void
  updateTask: (taskId: string, updates: Partial<Task>) => void
  toggleTaskComplete: (taskId: string) => void
  addProject: (project: Project) => void
  removeProject: (projectId: string) => void
  updateProject: (projectId: string, updates: Partial<Project>) => void
  setDefaultProject: (projectId: string) => void
}

export const useFocusStore = create<FocusState>()(
  persist(
    (set) => ({
      tasks: [],
      projects: [{ id: 'inbox', name: 'Inbox', color: '#6366f1' }],
      defaultProject: 'inbox',
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),
      removeTask: (taskId) =>
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
    }),
    {
      name: 'focus-store',
    }
  )
)
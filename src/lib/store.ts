
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

// Score calculation functions
export const calculateImpactScore = (task: Task): number => {
  // Impact score formula: (Impact * Urgency) / Effort
  return (task.impact * task.urgency) / (task.effort || 1)
}

export const calculatePriority = (task: Task): number => {
  // Priority score includes time sensitivity if date is present
  const baseScore = calculateImpactScore(task)
  
  if (!task.date) {
    return baseScore
  }

  const dueDate = new Date(task.date)
  const now = new Date()
  const daysUntilDue = Math.max(0, Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
  
  // Increase priority for tasks due soon
  const timeMultiplier = daysUntilDue <= 1 ? 2 : // Due within 24 hours
                        daysUntilDue <= 3 ? 1.5 : // Due within 3 days
                        daysUntilDue <= 7 ? 1.2 : // Due within a week
                        1 // More than a week away

  return baseScore * timeMultiplier
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
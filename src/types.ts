
export interface Task {
  id: string
  title: string
  completed: boolean
  projectId: string
  impact: number
  urgency: number
  effort: number
  createdAt: string
  date?: string
  duration?: number
  reflection?: string
}

export interface Project {
  id: string
  name: string
  color: string
}
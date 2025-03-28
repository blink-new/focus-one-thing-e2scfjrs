
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useFocusStore } from '../lib/store'
import { TaskInput } from './TaskInput'
import { TaskList } from './TaskList'

export function ProjectView() {
  const { projectId } = useParams()
  const { projects, tasks } = useFocusStore()
  
  const project = projects.find(p => p.id === projectId)
  const projectTasks = useMemo(() => {
    return tasks.filter(task => task.projectId === projectId)
  }, [tasks, projectId])

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {project.name}
        </h1>
        <p className="text-gray-600">
          Manage and track your {project.name.toLowerCase()} tasks.
        </p>
      </div>

      <TaskInput defaultProjectId={projectId} />
      
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Tasks
        </h2>
        <TaskList tasks={projectTasks} />
      </div>
    </div>
  )
}
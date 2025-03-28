
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useFocusStore } from '../lib/store'
import { TaskInput } from './TaskInput'
import { SortableTaskList } from './SortableTaskList'

export function ProjectView() {
  const { projectId } = useParams()
  const { projects, tasks } = useFocusStore()
  
  const project = projects.find(p => p.id === projectId)
  const projectTasks = useMemo(() => {
    return tasks.filter(task => task.projectId === projectId)
  }, [tasks, projectId])

  if (!project) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 text-gray-500"
      >
        Project not found
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
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
        <SortableTaskList tasks={projectTasks} />
      </div>
    </motion.div>
  )
}
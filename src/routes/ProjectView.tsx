
import { useParams } from 'react-router-dom'
import { useFocusStore } from '../lib/store'
import { TaskForm } from '../components/TaskForm'
import { TaskList } from '../components/TaskList'

export function ProjectView() {
  const { projectId } = useParams()
  const project = useFocusStore(state => 
    state.projects.find(p => p.id === projectId)
  )

  return (
    <div className="flex-1 h-full min-h-screen dark:bg-[#0a0a0a] bg-zinc-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold dark:text-zinc-50 text-zinc-900">
            {project?.name || 'Work'}
          </h1>
          <p className="mt-2 dark:text-zinc-400 text-zinc-600">
            {project?.description || 'Manage and track your work tasks.'}
          </p>
        </div>

        <div className="space-y-8">
          <div className="dark:bg-zinc-900/50 bg-white rounded-xl p-6 shadow-sm">
            <TaskForm projectId={projectId} />
          </div>

          <div className="dark:bg-zinc-900/50 bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 dark:text-zinc-50 text-zinc-900">Tasks</h2>
            <TaskList projectId={projectId} />
          </div>
        </div>
      </div>
    </div>
  )
}
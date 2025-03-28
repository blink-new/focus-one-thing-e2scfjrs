
import { useFocusStore } from '../lib/store'
import { Task } from './Task'

interface TaskListProps {
  projectId?: string
}

export function TaskList({ projectId }: TaskListProps) {
  const tasks = useFocusStore(state => 
    state.tasks.filter(task => 
      projectId ? task.projectId === projectId : true
    )
  )

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="dark:text-zinc-400 text-zinc-600">
          No tasks yet. Add one above!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  )
}
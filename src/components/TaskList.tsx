
import { useFocusStore } from '../lib/store'
import { TaskItem } from './TaskItem'

interface TaskListProps {
  projectId?: string
}

export function TaskList({ projectId }: TaskListProps) {
  const tasks = useFocusStore(state => 
    state.tasks.filter(task => 
      projectId ? task.projectId === projectId : true
    )
  )
  const toggleTaskComplete = useFocusStore(state => state.toggleTaskComplete)

  if (!tasks || tasks.length === 0) {
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
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggle={() => toggleTaskComplete(task.id)}
        />
      ))}
    </div>
  )
}

import { useFocusStore } from '../lib/store'
import { Task } from './Task'

interface TaskListProps {
  filter?: string
}

export function TaskList({ filter }: TaskListProps) {
  const tasks = useFocusStore(state => {
    const allTasks = state.tasks
    if (!filter) return allTasks
    return allTasks.filter(t => t.project === filter)
  })

  if (tasks.length === 0) {
    return (
      <div className="p-4 text-center dark:bg-zinc-900 bg-white rounded-lg">
        <p className="text-zinc-500 dark:text-zinc-400">No tasks yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {tasks.map(task => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  )
}
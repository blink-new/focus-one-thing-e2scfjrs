
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
      <div className="p-4 text-center bg-[#0B0F17] rounded-lg">
        <p className="text-slate-600">No tasks yet</p>
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
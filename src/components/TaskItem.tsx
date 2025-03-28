
import { Task } from '../lib/store'
import { Checkbox } from './ui/checkbox'
import { EditTaskDialog } from './EditTaskDialog'

interface TaskItemProps {
  task: Task
  onToggle: () => void
}

export function TaskItem({ task, onToggle }: TaskItemProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <Checkbox checked={task.completed} onCheckedChange={onToggle} />
        <span className={task.completed ? 'line-through text-gray-500' : ''}>
          {task.title}
        </span>
      </div>
      <EditTaskDialog task={task} />
    </div>
  )
}

import { Timer, MoreVertical } from 'lucide-react'
import { Task, useFocusStore } from '../lib/store'
import { Checkbox } from './ui/checkbox'
import { EditTaskDialog } from './EditTaskDialog'
import { Button } from './ui/button'
import { formatTime } from '../lib/utils'

interface TaskItemProps {
  task: Task
  onToggle: () => void
}

export function TaskItem({ task, onToggle }: TaskItemProps) {
  const { setCurrentTask, currentTask } = useFocusStore()
  const isCurrentTask = currentTask?.id === task.id

  const handleTimerClick = () => {
    if (isCurrentTask) {
      setCurrentTask(null)
    } else {
      setCurrentTask(task)
    }
  }

  return (
    <div className="flex items-center justify-between py-3 px-4 bg-card rounded-lg hover:bg-accent/50 transition-colors">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <Checkbox checked={task.completed} onCheckedChange={onToggle} />
        <div className="flex flex-col min-w-0">
          <span className={`truncate ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
            {task.title}
          </span>
          {task.totalTimeSpent && task.totalTimeSpent > 0 && (
            <span className="text-xs text-muted-foreground">
              Total time: {formatTime(task.totalTimeSpent)}
            </span>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant={isCurrentTask ? "secondary" : "ghost"}
          size="icon"
          onClick={handleTimerClick}
          className="h-8 w-8"
        >
          <Timer className="h-4 w-4" />
        </Button>
        <EditTaskDialog task={task} />
      </div>
    </div>
  )
}
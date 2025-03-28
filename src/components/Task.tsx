
import { Timer, Trash2 } from 'lucide-react'
import { Button } from './ui/button'
import { useFocusStore } from '../lib/store'
import { TaskType } from '../types'
import { cn } from '../lib/utils'

interface TaskProps {
  task: TaskType
}

export function Task({ task }: TaskProps) {
  const { deleteTask, toggleTask, setCurrentTask } = useFocusStore()

  return (
    <div className={cn(
      "p-4 rounded-lg flex items-center gap-4 group transition-colors",
      "dark:bg-zinc-900 bg-white",
      "hover:dark:bg-zinc-800/80 hover:bg-zinc-50"
    )}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        className="h-5 w-5 rounded-full"
      />
      
      <div className="flex-1 min-w-0">
        <h3 className={cn(
          "font-medium truncate dark:text-zinc-200",
          task.completed && "line-through text-zinc-400 dark:text-zinc-600"
        )}>
          {task.title}
        </h3>
        {task.project && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Project: {task.project}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentTask(task)}
          className="h-8 w-8"
        >
          <Timer className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => deleteTask(task.id)}
          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
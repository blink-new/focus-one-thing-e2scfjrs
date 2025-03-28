
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
      "bg-[#0B0F17]",
      "hover:bg-[#0D1219]"
    )}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        className="h-5 w-5 rounded-full bg-[#0D1219] border-[#1A2333]"
      />
      
      <div className="flex-1 min-w-0">
        <h3 className={cn(
          "font-medium truncate text-slate-300",
          task.completed && "line-through text-slate-600"
        )}>
          {task.title}
        </h3>
        {task.project && (
          <p className="text-sm text-slate-600">
            Project: {task.project}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentTask(task)}
          className="h-8 w-8 text-slate-400 hover:text-slate-300 hover:bg-[#1A2333]"
        >
          <Timer className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => deleteTask(task.id)}
          className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/20"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
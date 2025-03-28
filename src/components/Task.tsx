
import { useFocusStore } from '../lib/store'
import { Checkbox } from './ui/checkbox'
import { Button } from './ui/button'
import { MoreVertical, Trash } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Task as TaskType } from '../types'

interface TaskProps {
  task: TaskType
}

export function Task({ task }: TaskProps) {
  const toggleComplete = useFocusStore(state => state.toggleTaskComplete)
  const deleteTask = useFocusStore(state => state.deleteTask)
  const project = useFocusStore(state => 
    state.projects.find(p => p.id === task.projectId)
  )

  return (
    <div className="group relative flex items-center space-x-4 dark:bg-zinc-900/30 bg-zinc-50/50 p-4 rounded-lg">
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => toggleComplete(task.id)}
      />
      <div className="flex-1 min-w-0">
        <p className={`font-medium dark:text-zinc-200 text-zinc-900 ${
          task.completed ? 'line-through opacity-50' : ''
        }`}>
          {task.title}
        </p>
        {project && (
          <p className="mt-1 text-sm dark:text-zinc-400 text-zinc-600">
            {project.name}
          </p>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-4">
          <div className="text-sm dark:text-zinc-400 text-zinc-600">
            Impact: {task.impact}/10
          </div>
          <div className="text-sm dark:text-zinc-400 text-zinc-600">
            Urgency: {task.urgency}/10
          </div>
          <div className="text-sm dark:text-zinc-400 text-zinc-600">
            Effort: {task.effort}/10
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="text-red-600 dark:text-red-400"
              onClick={() => deleteTask(task.id)}
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
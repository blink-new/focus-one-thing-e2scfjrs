
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion } from 'framer-motion'
import { GripVertical, Timer } from 'lucide-react'
import { cn } from '../lib/utils'
import { Task } from '../lib/types'
import { useFocusStore } from '../lib/store'
import { Button } from './ui/button'

interface SortableTaskItemProps {
  task: Task
  isActive: boolean
}

export function SortableTaskItem({ task, isActive }: SortableTaskItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id })

  const { setCurrentTask, deleteTask } = useFocusStore()

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      ref={setNodeRef}
      style={style}
      className={cn(
        "group flex items-center gap-2 p-4 bg-white rounded-lg border shadow-sm",
        isActive && "shadow-md",
        task.completed && "opacity-50"
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className="touch-none p-1 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <GripVertical className="h-4 w-4 text-gray-400" />
      </button>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">{task.title}</h3>
        {task.projectId && (
          <p className="text-sm text-gray-500 truncate">
            Project: {task.projectId}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentTask(task)}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Timer className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => deleteTask(task.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </Button>
      </div>
    </motion.div>
  )
}
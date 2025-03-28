
import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Task } from '../lib/types'
import { SortableTaskItem } from './SortableTaskItem'
import { useFocusStore } from '../lib/store'
import { motion, AnimatePresence } from 'framer-motion'

interface SortableTaskListProps {
  tasks: Task[]
}

export function SortableTaskList({ tasks }: SortableTaskListProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const { reorderTasks } = useFocusStore()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id)
      const newIndex = tasks.findIndex((task) => task.id === over.id)
      
      const newOrder = arrayMove(tasks, oldIndex, newIndex)
      reorderTasks(newOrder.map((task) => task.id))
    }

    setActiveId(null)
  }

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg"
      >
        No tasks yet. Add one above!
      </motion.div>
    )
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => setActiveId(active.id as string)}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          <AnimatePresence>
            {tasks.map((task) => (
              <SortableTaskItem
                key={task.id}
                task={task}
                isActive={activeId === task.id}
              />
            ))}
          </AnimatePresence>
        </div>
      </SortableContext>
    </DndContext>
  )
}
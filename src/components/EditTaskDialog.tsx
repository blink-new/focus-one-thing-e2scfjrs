
import { useState } from 'react'
import { MoreVertical } from 'lucide-react'
import { Task, useFocusStore } from '../lib/store'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Slider } from './ui/slider'
import { formatTime } from '../lib/utils'

interface EditTaskDialogProps {
  task: Task
}

export function EditTaskDialog({ task }: EditTaskDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { updateTask, deleteTask } = useFocusStore()
  const [title, setTitle] = useState(task.title)
  const [impact, setImpact] = useState(task.impact)
  const [urgency, setUrgency] = useState(task.urgency)
  const [effort, setEffort] = useState(task.effort)
  const [duration, setDuration] = useState(task.duration || 25 * 60)

  const handleSave = () => {
    updateTask(task.id, {
      title,
      impact,
      urgency,
      effort,
      duration,
    })
    setIsOpen(false)
  }

  const handleDelete = () => {
    deleteTask(task.id)
    setIsOpen(false)
  }

  if (!isOpen) {
    return (
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} className="h-8 w-8">
        <MoreVertical className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg">
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Timer Duration: {formatTime(duration)}</label>
              <Slider
                value={[duration / 60]}
                onValueChange={(value) => setDuration(value[0] * 60)}
                max={60}
                min={1}
                step={1}
                className="my-4"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Impact: {impact}</label>
              <Slider
                value={[impact]}
                onValueChange={(value) => setImpact(value[0])}
                max={5}
                min={1}
                step={1}
                className="my-4"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Urgency: {urgency}</label>
              <Slider
                value={[urgency]}
                onValueChange={(value) => setUrgency(value[0])}
                max={5}
                min={1}
                step={1}
                className="my-4"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Effort: {effort}</label>
              <Slider
                value={[effort]}
                onValueChange={(value) => setEffort(value[0])}
                max={5}
                min={1}
                step={1}
                className="my-4"
              />
            </div>

            {task.totalTimeSpent && task.totalTimeSpent > 0 && (
              <div className="text-sm text-muted-foreground">
                Total time spent: {formatTime(task.totalTimeSpent)}
              </div>
            )}

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
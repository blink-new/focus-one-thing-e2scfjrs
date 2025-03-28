
import { useState, useEffect } from 'react'
import { Task, useFocusStore } from '../lib/store'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Slider } from './ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Pencil } from 'lucide-react'

interface EditTaskDialogProps {
  task: Task
}

export function EditTaskDialog({ task }: EditTaskDialogProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [impact, setImpact] = useState(task.impact)
  const [urgency, setUrgency] = useState(task.urgency)
  const [effort, setEffort] = useState(task.effort)
  const [projectId, setProjectId] = useState(task.projectId || 'inbox')
  
  const { editTask, projects } = useFocusStore()

  useEffect(() => {
    if (open) {
      setTitle(task.title)
      setImpact(task.impact)
      setUrgency(task.urgency)
      setEffort(task.effort)
      setProjectId(task.projectId || 'inbox')
    }
  }, [open, task])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    editTask(task.id, {
      title,
      impact,
      urgency,
      effort,
      projectId: projectId === 'inbox' ? null : projectId,
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Task Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Project</label>
              <Select
                value={projectId}
                onValueChange={(value) => setProjectId(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inbox">Inbox</SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex justify-between">
                Impact <span className="text-blue-600">{impact}/10</span>
              </label>
              <Slider
                value={[impact]}
                onValueChange={(value) => setImpact(value[0])}
                max={10}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex justify-between">
                Urgency <span className="text-red-600">{urgency}/10</span>
              </label>
              <Slider
                value={[urgency]}
                onValueChange={(value) => setUrgency(value[0])}
                max={10}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex justify-between">
                Effort <span className="text-green-600">{effort}/10</span>
              </label>
              <Slider
                value={[effort]}
                onValueChange={(value) => setEffort(value[0])}
                max={10}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
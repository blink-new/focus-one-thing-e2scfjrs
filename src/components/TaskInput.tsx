
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useFocusStore } from '../lib/store'
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

export function TaskInput({ defaultProjectId = null }: { defaultProjectId?: string | null }) {
  const [title, setTitle] = useState('')
  const [impact, setImpact] = useState(5)
  const [urgency, setUrgency] = useState(5)
  const [effort, setEffort] = useState(5)
  const [projectId, setProjectId] = useState(defaultProjectId || 'inbox')
  
  const { addTask, projects } = useFocusStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    addTask({
      title,
      impact,
      urgency,
      effort,
      date: new Date().toISOString(),
      duration: 25 * 60,
      projectId: projectId === 'inbox' ? null : projectId,
    })

    setTitle('')
    setImpact(5)
    setUrgency(5)
    setEffort(5)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          What needs to be done?
        </label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a new task..."
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

      <Button type="submit" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Task
      </Button>
    </form>
  )
}
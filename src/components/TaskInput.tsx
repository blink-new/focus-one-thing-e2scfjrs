
import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useFocusStore } from '../lib/store'
import { Slider } from './ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

export function TaskInput() {
  const defaultProject = useFocusStore(state => state.defaultProject)
  const [title, setTitle] = useState('')
  const [impact, setImpact] = useState([5])
  const [urgency, setUrgency] = useState([5])
  const [effort, setEffort] = useState([5])
  const [project, setProject] = useState(defaultProject)
  const addTask = useFocusStore(state => state.addTask)
  const projects = useFocusStore(state => state.projects)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    addTask({
      id: Date.now().toString(),
      title: title.trim(),
      impact: impact[0],
      urgency: urgency[0],
      effort: effort[0],
      project,
      completed: false,
      createdAt: new Date().toISOString(),
    })

    setTitle('')
    setImpact([5])
    setUrgency([5])
    setEffort([5])
    setProject(defaultProject)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl border shadow-sm">
      <div className="space-y-2 p-6">
        <h3 className="font-medium text-sm">What needs to be done?</h3>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a new task..."
        />
      </div>

      <div className="space-y-6 px-6">
        <div className="grid grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Project</label>
            <Select value={project} onValueChange={setProject}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {projects.map(p => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Impact {impact}/10
            </label>
            <Slider
              value={impact}
              onValueChange={setImpact}
              max={10}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Urgency {urgency}/10
            </label>
            <Slider
              value={urgency}
              onValueChange={setUrgency}
              max={10}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Effort {effort}/10
            </label>
            <Slider
              value={effort}
              onValueChange={setEffort}
              max={10}
              step={1}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end p-6 pt-0">
        <Button type="submit">Add Task</Button>
      </div>
    </form>
  )
}
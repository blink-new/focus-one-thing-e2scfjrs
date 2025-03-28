
import { useState } from 'react'
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
} from './ui/select'

interface TaskFormProps {
  projectId?: string
}

export function TaskForm({ projectId }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [selectedProject, setSelectedProject] = useState(projectId || '')
  const [impact, setImpact] = useState(5)
  const [urgency, setUrgency] = useState(5)
  const [effort, setEffort] = useState(5)
  
  const projects = useFocusStore(state => state.projects)
  const addTask = useFocusStore(state => state.addTask)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    addTask({
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
      projectId: selectedProject,
      impact,
      urgency,
      effort,
      createdAt: new Date().toISOString(),
    })

    setTitle('')
    setImpact(5)
    setUrgency(5)
    setEffort(5)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold dark:text-zinc-50 text-zinc-900">
          What needs to be done?
        </h2>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a new task..."
          className="dark:bg-zinc-800 dark:border-zinc-700"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 dark:text-zinc-300 text-zinc-700">
            Project
          </label>
          <Select
            value={selectedProject}
            onValueChange={setSelectedProject}
          >
            <SelectTrigger className="dark:bg-zinc-800 dark:border-zinc-700">
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-zinc-300 text-zinc-700">
              Impact ({impact}/10)
            </label>
            <Slider
              value={[impact]}
              min={1}
              max={10}
              step={1}
              onValueChange={([value]) => setImpact(value)}
              className="dark:bg-zinc-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-zinc-300 text-zinc-700">
              Urgency ({urgency}/10)
            </label>
            <Slider
              value={[urgency]}
              min={1}
              max={10}
              step={1}
              onValueChange={([value]) => setUrgency(value)}
              className="dark:bg-zinc-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-zinc-300 text-zinc-700">
              Effort ({effort}/10)
            </label>
            <Slider
              value={[effort]}
              min={1}
              max={10}
              step={1}
              onValueChange={([value]) => setEffort(value)}
              className="dark:bg-zinc-800"
            />
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Add Task
      </Button>
    </form>
  )
}
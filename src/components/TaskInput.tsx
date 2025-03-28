
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
  const [title, setTitle] = useState('')
  const [impact, setImpact] = useState([5])
  const [urgency, setUrgency] = useState([5])
  const [effort, setEffort] = useState([5])
  const [project, setProject] = useState('inbox')
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
    setProject('inbox')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 dark:bg-zinc-950/50 bg-white rounded-lg shadow-sm">
      <div className="space-y-2">
        <h3 className="font-medium text-sm dark:text-zinc-400">What needs to be done?</h3>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a new task..."
          className="dark:bg-zinc-950 dark:text-zinc-300 dark:placeholder:text-zinc-600 dark:border-zinc-800"
        />
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-4 items-center">
          <div className="space-y-2">
            <label className="text-sm font-medium dark:text-zinc-400">Project</label>
            <Select value={project} onValueChange={setProject}>
              <SelectTrigger className="dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark:bg-zinc-950 dark:border-zinc-800">
                {projects.map(p => (
                  <SelectItem key={p.id} value={p.id} className="dark:text-zinc-300">
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium dark:text-zinc-400">
              Impact {impact}/10
            </label>
            <Slider
              value={impact}
              onValueChange={setImpact}
              max={10}
              step={1}
              className="dark:bg-zinc-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium dark:text-zinc-400">
              Urgency {urgency}/10
            </label>
            <Slider
              value={urgency}
              onValueChange={setUrgency}
              max={10}
              step={1}
              className="dark:bg-zinc-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium dark:text-zinc-400">
              Effort {effort}/10
            </label>
            <Slider
              value={effort}
              onValueChange={setEffort}
              max={10}
              step={1}
              className="dark:bg-zinc-800"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700">Add Task</Button>
      </div>
    </form>
  )
}
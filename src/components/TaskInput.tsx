
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
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-[#0A0D14] rounded-xl border border-[#1A1F2C]">
      <div className="space-y-2">
        <h3 className="font-medium text-sm text-slate-200">What needs to be done?</h3>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a new task..."
          className="bg-[#12151D] border-[#1A1F2C] text-slate-200 placeholder:text-slate-600"
        />
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Project</label>
            <Select value={project} onValueChange={setProject}>
              <SelectTrigger className="bg-[#12151D] border-[#1A1F2C] text-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#12151D] border-[#1A1F2C]">
                {projects.map(p => (
                  <SelectItem key={p.id} value={p.id} className="text-slate-200">
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              Impact {impact}/10
            </label>
            <Slider
              value={impact}
              onValueChange={setImpact}
              max={10}
              step={1}
              className="[&_[role=slider]]:bg-[#1A1F2C] [&_[role=slider]]:border-[#2A3343]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              Urgency {urgency}/10
            </label>
            <Slider
              value={urgency}
              onValueChange={setUrgency}
              max={10}
              step={1}
              className="[&_[role=slider]]:bg-[#1A1F2C] [&_[role=slider]]:border-[#2A3343]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              Effort {effort}/10
            </label>
            <Slider
              value={effort}
              onValueChange={setEffort}
              max={10}
              step={1}
              className="[&_[role=slider]]:bg-[#1A1F2C] [&_[role=slider]]:border-[#2A3343]"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          type="submit" 
          className="bg-[#1A1F2C] text-slate-200 hover:bg-[#2A3343] transition-colors"
        >
          Add Task
        </Button>
      </div>
    </form>
  )
}
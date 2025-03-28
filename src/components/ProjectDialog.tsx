
import { useState, useEffect } from 'react'
import { X, Trash2, Check } from 'lucide-react'
import { useFocusStore, type Project } from '../lib/store'
import { Button } from './ui/button'
import { Input } from './ui/input'

const COLOR_PRESETS = [
  { name: 'Blue', value: '#0ea5e9' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Red', value: '#ef4444' },
]

interface ProjectDialogProps {
  project?: Project
  onClose: () => void
}

export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const [name, setName] = useState(project?.name ?? '')
  const [color, setColor] = useState(project?.color ?? COLOR_PRESETS[0].value)
  const addProject = useFocusStore((state) => state.addProject)
  const editProject = useFocusStore((state) => state.editProject)
  const deleteProject = useFocusStore((state) => state.deleteProject)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    if (project) {
      editProject(project.id, { name: name.trim(), color })
    } else {
      addProject({
        name: name.trim(),
        color,
      })
    }
    onClose()
  }

  const handleDelete = () => {
    if (project && window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(project.id)
      onClose()
    }
  }

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-medium">
              {project ? 'Edit Project' : 'New Project'}
            </h3>
            <Button variant="ghost" size="icon" onClick={onClose} type="button">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Project name"
                className="w-full"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Color
              </label>
              <div className="grid grid-cols-6 gap-2 mb-2">
                {COLOR_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    className="w-8 h-8 rounded-full relative"
                    style={{ backgroundColor: preset.value }}
                    onClick={() => setColor(preset.value)}
                  >
                    {color === preset.value && (
                      <Check className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                  </button>
                ))}
              </div>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-8 rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50">
            {project ? (
              <Button
                type="button"
                variant="ghost"
                onClick={handleDelete}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            ) : (
              <div /> {/* Empty div for spacing */}
            )}
            <div className="space-x-2">
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {project ? 'Save Changes' : 'Create Project'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
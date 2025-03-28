
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Inbox, 
  Briefcase, 
  User, 
  FolderPlus, 
  Plus,
  Settings,
  X
} from 'lucide-react'
import { useFocusStore, type Project } from '../lib/store'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { cn } from '../lib/utils'

function ProjectForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('')
  const [color, setColor] = useState('#0ea5e9')
  const addProject = useFocusStore((state) => state.addProject)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    addProject({
      id: Date.now().toString(),
      name: name.trim(),
      color,
    })
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">New Project</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-4">
        <div>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project name"
            className="w-full"
          />
        </div>
        <div>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-8 rounded cursor-pointer"
          />
        </div>
        <Button type="submit" className="w-full">
          Create Project
        </Button>
      </div>
    </form>
  )
}

function ProjectItem({ project }: { project: Project }) {
  const location = useLocation()
  const isActive = location.pathname === `/project/${project.id}`

  return (
    <Link
      to={`/project/${project.id}`}
      className={cn(
        "flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors",
        isActive 
          ? "bg-gray-100 text-gray-900" 
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      )}
    >
      <div 
        className="w-2 h-2 rounded-full" 
        style={{ backgroundColor: project.color }} 
      />
      <span>{project.name}</span>
    </Link>
  )
}

export function Navigation() {
  const [showNewProject, setShowNewProject] = useState(false)
  const projects = useFocusStore((state) => state.projects)
  const location = useLocation()

  return (
    <nav className="w-64 bg-white border-r h-screen p-4 fixed left-0 top-0">
      <div className="flex flex-col h-full">
        <div className="space-y-1">
          <Link
            to="/"
            className={cn(
              "flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors",
              location.pathname === "/" 
                ? "bg-gray-100 text-gray-900" 
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <Inbox className="w-5 h-5" />
            <span>Inbox</span>
          </Link>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between px-3 mb-2">
            <h2 className="text-sm font-medium text-gray-500">Projects</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNewProject(true)}
              className="h-5 w-5"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-1">
            {projects.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>

          {showNewProject && (
            <div className="mt-2">
              <ProjectForm onClose={() => setShowNewProject(false)} />
            </div>
          )}
        </div>

        <div className="mt-auto pt-8 space-y-1">
          <Link
            to="/settings"
            className={cn(
              "flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors",
              location.pathname === "/settings"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
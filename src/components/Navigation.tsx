
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Inbox, 
  Settings,
  Plus,
  X,
  MoreVertical
} from 'lucide-react'
import { useFocusStore, type Project } from '../lib/store'
import { Button } from './ui/button'
import { cn } from '../lib/utils'
import { ProjectDialog } from './ProjectDialog'

function ProjectItem({ project }: { project: Project }) {
  const [showOptions, setShowOptions] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const location = useLocation()
  const isActive = location.pathname === `/project/${project.id}`

  return (
    <>
      <div className="group relative flex items-center">
        <Link
          to={`/project/${project.id}`}
          className={cn(
            "flex-1 flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors",
            isActive 
              ? "bg-accent text-accent-foreground" 
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          )}
        >
          <div 
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: project.color }} 
          />
          <span>{project.name}</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 opacity-0 group-hover:opacity-100 absolute right-1"
          onClick={() => setShowEditDialog(true)}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      {showEditDialog && (
        <ProjectDialog 
          project={project} 
          onClose={() => setShowEditDialog(false)} 
        />
      )}
    </>
  )
}

export function Navigation() {
  const [showNewProject, setShowNewProject] = useState(false)
  const projects = useFocusStore((state) => state.projects)
  const location = useLocation()

  return (
    <nav className="w-64 bg-background border-r h-screen p-4 fixed left-0 top-0">
      <div className="flex flex-col h-full">
        <div className="space-y-1">
          <Link
            to="/"
            className={cn(
              "flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors",
              location.pathname === "/" 
                ? "bg-accent text-accent-foreground" 
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Inbox className="w-5 h-5" />
            <span>Inbox</span>
          </Link>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between px-3 mb-2">
            <h2 className="text-sm font-medium text-muted-foreground">Projects</h2>
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
            <ProjectDialog onClose={() => setShowNewProject(false)} />
          )}
        </div>

        <div className="mt-auto pt-8 space-y-1">
          <Link
            to="/settings"
            className={cn(
              "flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors",
              location.pathname === "/settings"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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
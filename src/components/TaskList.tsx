
import { useMemo } from 'react'
import { ArrowUp, ArrowDown, Play, Trash2 } from 'lucide-react'
import { useFocusStore, calculateImpactScore, type Task } from '../lib/store'
import { Button } from './ui/button'
import { cn } from '../lib/utils'

function ImpactBadge({ score }: { score: number }) {
  return (
    <div 
      className={cn(
        "px-2 py-1 rounded-full text-xs font-medium",
        score >= 8 ? "bg-green-100 text-green-800" :
        score >= 6 ? "bg-blue-100 text-blue-800" :
        "bg-gray-100 text-gray-800"
      )}
    >
      Impact Score: {score.toFixed(1)}
    </div>
  )
}

export function TaskList() {
  const { tasks, deleteTask, reorderTasks, setCurrentTask } = useFocusStore()

  const sortedTasks = useMemo(() => {
    return [...tasks]
      .filter(task => !task.completed)
      .sort((a, b) => calculateImpactScore(b) - calculateImpactScore(a))
  }, [tasks])

  const handleReorder = (taskId: string, direction: 'up' | 'down') => {
    const currentIndex = sortedTasks.findIndex(t => t.id === taskId)
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    
    if (newIndex >= 0 && newIndex < sortedTasks.length) {
      reorderTasks(taskId, newIndex)
    }
  }

  if (sortedTasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No tasks yet. Add your first task above!
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {sortedTasks.map((task, index) => (
        <div
          key={task.id}
          className={cn(
            "bg-white rounded-lg p-4 shadow-sm border transition-all hover:shadow-md",
            index === 0 && "border-blue-200 bg-blue-50/50"
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate">{task.title}</h3>
              <div className="mt-1 flex items-center gap-2">
                <ImpactBadge score={calculateImpactScore(task)} />
                <span className="text-sm text-gray-500">
                  Impact: {task.impact} • Urgency: {task.urgency} • Effort: {task.effort}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleReorder(task.id, 'up')}
                  disabled={index === 0}
                  className="h-6 w-6"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleReorder(task.id, 'down')}
                  disabled={index === sortedTasks.length - 1}
                  className="h-6 w-6"
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentTask(task)}
                className="text-blue-600"
              >
                <Play className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => deleteTask(task.id)}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

import { Task } from '../types'
import { calculatePriority } from '../lib/store'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { CheckCircle2, Circle } from 'lucide-react'
import { cn } from '../lib/utils'

interface CurrentTaskProps {
  task: Task
  onComplete: () => void
}

export function CurrentTask({ task, onComplete }: CurrentTaskProps) {
  const priority = calculatePriority(task)
  
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 p-0"
              onClick={onComplete}
            >
              {task.completed ? (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </Button>
            <h3 className={cn("font-medium", task.completed && "line-through text-muted-foreground")}>
              {task.title}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">{task.description}</p>
        </div>
        <Badge variant={priority >= 0.7 ? "destructive" : priority >= 0.4 ? "default" : "secondary"}>
          Priority: {Math.round(priority * 100)}%
        </Badge>
      </div>
    </Card>
  )
}
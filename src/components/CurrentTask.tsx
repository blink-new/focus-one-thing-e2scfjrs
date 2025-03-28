
import { useFocusStore } from '../lib/store'
import { Button } from './ui/button'
import { Task } from './Task'

export function CurrentTask() {
  const currentTask = useFocusStore(state => state.currentTask)
  const setCurrentTask = useFocusStore(state => state.setCurrentTask)

  if (!currentTask) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Current Task</h1>
        <Button 
          variant="outline"
          onClick={() => setCurrentTask(null)}
        >
          Exit Focus Mode
        </Button>
      </div>
      
      <Task task={currentTask} />
    </div>
  )
}
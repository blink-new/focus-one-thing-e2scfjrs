
import { useFocusStore, calculateImpactScore, calculatePriority } from '../lib/store'

export function CurrentTask() {
  const tasks = useFocusStore(state => state.tasks.filter(t => !t.completed))
  
  if (tasks.length === 0) {
    return (
      <div className="p-6 text-center dark:bg-zinc-900/30 bg-zinc-50/50 rounded-lg">
        <p className="dark:text-zinc-400 text-zinc-600">
          No active tasks. Add a task to get started!
        </p>
      </div>
    )
  }

  // Sort tasks by priority score
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityA = calculatePriority(a)
    const priorityB = calculatePriority(b)
    return priorityB - priorityA
  })

  const currentTask = sortedTasks[0]
  const impactScore = calculateImpactScore(currentTask)
  const priorityScore = calculatePriority(currentTask)

  return (
    <div className="p-6 dark:bg-zinc-900/30 bg-zinc-50/50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 dark:text-zinc-200">Current Focus</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium dark:text-zinc-200">{currentTask.title}</h3>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div className="dark:text-zinc-400 text-zinc-600">
              <p>Impact: {currentTask.impact}/10</p>
              <p>Urgency: {currentTask.urgency}/10</p>
              <p>Effort: {currentTask.effort}/10</p>
            </div>
            <div className="dark:text-zinc-400 text-zinc-600">
              <p>Impact Score: {impactScore.toFixed(1)}</p>
              <p>Priority Score: {priorityScore.toFixed(1)}</p>
              {currentTask.date && (
                <p>Due: {new Date(currentTask.date).toLocaleDateString()}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
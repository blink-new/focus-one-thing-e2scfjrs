
import { useFocusStore, calculateImpactScore } from '../lib/store'

export function TaskHistory() {
  const tasks = useFocusStore((state) => state.tasks)
  const completedTasks = tasks.filter(t => t.completed)

  if (completedTasks.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Completed Tasks</h2>
      <div className="space-y-4">
        {completedTasks.map((task) => (
          <div
            key={task.id}
            className="p-4 rounded-lg bg-white shadow-sm border"
          >
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="font-medium text-gray-900">{task.title}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <div className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">
                    Score: {calculateImpactScore(task).toFixed(1)}
                  </div>
                  <span className="text-sm text-gray-500">
                    Impact: {task.impact} • Urgency: {task.urgency} • Effort: {task.effort}
                  </span>
                </div>
              </div>
              <span className="text-sm text-gray-500 whitespace-nowrap">
                {new Date(task.date).toLocaleDateString()}
              </span>
            </div>
            {task.reflection && (
              <p className="mt-3 text-sm text-gray-600 border-t pt-3">
                {task.reflection}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
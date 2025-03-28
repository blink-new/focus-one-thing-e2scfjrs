
import { useFocusStore } from '../lib/store'

export function TaskHistory() {
  const tasks = useFocusStore((state) => state.tasks)

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">History</h2>
      <div className="space-y-2">
        {tasks.filter(t => t.completed).map((task) => (
          <div
            key={task.id}
            className="p-4 rounded-lg bg-white shadow-sm border"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-gray-500">
                  Impact: {task.impact}/10
                </p>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(task.date).toLocaleDateString()}
              </span>
            </div>
            {task.reflection && (
              <p className="mt-2 text-sm text-gray-600">
                Reflection: {task.reflection}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

import { CurrentTask } from './components/CurrentTask'
import { TaskInput } from './components/TaskInput'
import { TaskList } from './components/TaskList'
import { TaskHistory } from './components/TaskHistory'
import { useFocusStore } from './lib/store'

function App() {
  const currentTask = useFocusStore((state) => state.currentTask)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {currentTask ? (
          <CurrentTask />
        ) : (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Task Manager
              </h1>
              <p className="text-gray-600">
                Add your tasks and we'll help you focus on what matters most.
              </p>
            </div>

            <TaskInput />
            
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Your Tasks
              </h2>
              <TaskList />
            </div>
          </div>
        )}
        
        <div className="mt-12">
          <TaskHistory />
        </div>
      </div>
    </div>
  )
}

export default App
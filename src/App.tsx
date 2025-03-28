
import { CurrentTask } from './components/CurrentTask'
import { TaskSelection } from './components/TaskSelection'
import { TaskHistory } from './components/TaskHistory'
import { useFocusStore } from './lib/store'

function App() {
  const currentTask = useFocusStore((state) => state.currentTask)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {currentTask ? (
          <CurrentTask />
        ) : (
          <TaskSelection />
        )}
        
        <div className="mt-12">
          <TaskHistory />
        </div>
      </div>
    </div>
  )
}

export default App
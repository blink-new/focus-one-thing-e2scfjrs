
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Navigation } from './components/Navigation'
import { CurrentTask } from './components/CurrentTask'
import { TaskInput } from './components/TaskInput'
import { SortableTaskList } from './components/SortableTaskList'
import { TaskHistory } from './components/TaskHistory'
import { ProjectView } from './components/ProjectView'
import { Timer } from './components/Timer'
import { useFocusStore } from './lib/store'

function InboxView() {
  const tasks = useFocusStore((state) => state.tasks)
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Inbox
        </h1>
        <p className="text-gray-600">
          Capture and organize your tasks.
        </p>
      </div>

      <TaskInput />
      
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          All Tasks
        </h2>
        <SortableTaskList tasks={tasks} />
      </div>
    </div>
  )
}

function App() {
  const currentTask = useFocusStore((state) => state.currentTask)

  if (currentTask) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <CurrentTask />
        </div>
        <Toaster position="top-center" />
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="lg:pl-64">
          <div className="container mx-auto px-4 lg:px-8 py-8 max-w-4xl">
            <Routes>
              <Route path="/" element={<InboxView />} />
              <Route path="/project/:projectId" element={<ProjectView />} />
              <Route path="/timer" element={<Timer />} />
            </Routes>
            <div className="mt-12">
              <TaskHistory />
            </div>
          </div>
        </div>
        <Toaster position="top-center" />
      </div>
    </Router>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { TaskList } from './components/TaskList'
import { TaskHistory } from './components/TaskHistory'
import { Settings } from './components/Settings'
import './App.css'

function App() {
  return (
    <Router>
      <div className="container mx-auto px-4 py-8">
        <Navigation />
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/history" element={<TaskHistory />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
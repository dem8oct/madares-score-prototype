import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ComponentDemo from './pages/ComponentDemo'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<ComponentDemo />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

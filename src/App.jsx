import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={
            <div className="flex items-center justify-center h-screen">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Madares Score System
                </h1>
                <p className="text-gray-600">
                  Prototype setup complete! Ready to build components.
                </p>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App

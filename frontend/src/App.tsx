import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage/HomePage'
import TrainingPage from './pages/TrainingPage/TrainingPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/client/training" element={<TrainingPage />} />
      </Routes>
    </>
  )
}

export default App

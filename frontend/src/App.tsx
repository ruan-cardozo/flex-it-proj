import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage/HomePage'
import TrainingPage from './pages/TrainingPage/TrainingPage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import Metrics from './pages/MetricasPage/Metrics'
import DietPage from './pages/DietPage/DietPage'


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/home' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/' element={<RegisterPage />} />
				<Route path='/metricas' element={<Metrics />} /> 
				<Route path='/treinos' element={<TrainingPage />} />
				<Route path='/dietas' element={<DietPage />} />
			</Routes>
		</BrowserRouter>
	);
}


export default App;

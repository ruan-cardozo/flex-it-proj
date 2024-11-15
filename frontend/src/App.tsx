import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import ProtectedRoute from './routes/ProtectedRoute';
import LoginPage from './pages/LoginPage/Login';
import RegisterPage from './pages/RegisterPage/Register';
import HomePage from './pages/HomePage/HomePage';
import Metrics from './pages/MetricasPage/Metrics';
import TrainingPage from './pages/TrainingPage/TrainingPage';
import DietPage from './pages/DietPage/DietPage';
import ExercisePage from './pages/ExercisePage/ExercisePage';
import TraingingPageView from './pages/TrainingPage/TrainingPageView/TrainingPageView';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<RegisterPage />} />
		  <Route element={<ProtectedRoute />}>
            <Route path='/home' element={<HomePage />} />
            <Route path='/metricas' element={<Metrics />} />
            <Route path='/treinos' element={<TrainingPage />} />
            <Route path='treinos/exercicios' element={<ExercisePage />}/>
            <Route path='treinos/visualizar' element={<TraingingPageView />}/>
            <Route path='/dietas' element={<DietPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomeHeaderTitle from './components/HomeHeaderTitle/HomeHeaderTitle';
import HomePageButton from './components/HomePageButton/HomePageButton';
import LoginPage from './components/Login/LoginPage';
import RegisterPage from './components/Register/RegisterPage';
import Metrics from './components/Metricas/Metrics';


function Home() {
	return (
		<>
			<HomeHeaderTitle />
			<HomePageButton buttonText='Login' redirectUrl='/login' />
			<HomePageButton buttonText='Registrar-se' redirectUrl='/register' />
		</>
	);
}

function App() {
	return (
	  <BrowserRouter>
		<Routes>
		  <Route path='/' element={<Home />} />
		  <Route path='/login' element={<LoginPage />} />
		  <Route path='/register' element={<RegisterPage />} />
		  <Route path='/metricas' element={<Metrics />} /> 
		</Routes>
	  </BrowserRouter>
	);
  }
  


export default App;

import './App.css';
import NavBar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddPostPage from './pages/AddPostPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AlertProvider } from './context/alert';
import AccessDenied from './pages/AccessDenied';

function App() {
  return (
    <>
    <AlertProvider>
      <NavBar />
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/addPost' element={<AddPostPage />} />
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/acc' element={<AccessDenied />} />
      </Routes>
    </AlertProvider>
    </>
  );
}
export default App;
import './App.css';
import NavBar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddPostPage from './pages/AddPostPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AlertProvider } from './context/alert';
import AccessDenied from './pages/AccessDenied';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <>
    <AlertProvider>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/home' element={
          <ProtectedRoute
          errorPage={<AccessDenied />}
          targetPage={<NavBar />}
          />
        }>
          <Route path='' element={<HomePage/>} />
          <Route path='add' element={<AddPostPage/>} />
        </Route>
      </Routes>
    </AlertProvider>
    </>
  );
}
export default App;
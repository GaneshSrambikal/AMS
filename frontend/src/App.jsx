import './App.css';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import ProtectedRoute from './routes/ProtectedRoute';
import { NotificationProvider } from './context/notificationContext';

function App() {
  return (
    <Router>
      <NotificationProvider>
        <AuthProvider>
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<Login />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path='/dashboard/*' element={<Dashboard />} />
              <Route path='/admin/*' element={<AdminDashboard />} />
            </Route>

            {/* 404 Page */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </NotificationProvider>
    </Router>
  );
}

export default App;

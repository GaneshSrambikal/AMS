import './App.css';
import AuthContext, { AuthProvider } from './context/AuthContext';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/Dashboard';
import { QueryClient, QueryClientProvider } from 'react-query';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import { useContext } from 'react';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoutes from './routes/ProtectedRoutes';
import PublicRoutes from './routes/PublicRoutes';
// import { io } from 'socket.io-client';
// import { requestPushPermission } from './firebaseConfig';

function App() {
  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   const socket = io('http://localhost:5000', {
  //     transports: ['websocket', 'polling'], // Ensure polling is enabled
  //     withCredentials: true,
  //   });
  //   socket.on('connect', () => {
  //     console.log(`Connected to server`);
  //   });
  //   socket.on(`notify-checkout-67c178fcfc1bb5a2b5f501da`, (data) => {
  //     console.log(`Reminder sent!.${data.message}`);
  //   });

  //   return () => socket.disconnect();
  // }, []);
  // useEffect(() => {
  //   requestPushPermission();
  // }, []);

  // const ProtectedRoute = ({ children, role }) => {
  //   const { user } = useContext(AuthContext);

  //   if (!user) return <Navigate to='/login' />; // Redirect to login instead of '/' for clarity

  //   if (role && user.role !== role) {
  //     return <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} />;
  //   }

  //   return children;
  // };
  return (
    <Router>
      <Navbar />
      {/* <Routes> */}
      {/* <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute role='employee'>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin'
          element={
            <ProtectedRoute role='admin'>
              <AdminDashboard />
            </ProtectedRoute>
          }
        /> */}
      <PublicRoutes />
      <ProtectedRoutes />
      {/* </Routes> */}
    </Router>
  );
}

export default App;

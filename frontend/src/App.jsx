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
import PublicRoutes from './routes/PublicRoutes';
import EmployeeRoutes from './routes/EmployeeRoutes';
import NotFound from './pages/NotFound';
import ProtectedRoute from './routes/ProtectedRoute';
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
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* <Route path='/' element={<LandingPage />} /> */}
          {/* <Route path='/login' element={<Login />} /> */}
          {/* <Route element={<EmployeeRoutes />}> */}
          {/* <Route path='/dashboard' element={<Dashboard />} /> */}
          {/* </Route> */}
          {/* <Route path='/admin' element={<AdminDashboard />} /> */}
          {/* <PublicRoutes /> */}
          {/* <Route path='/*' element/> */}
          {/* <ProtectedRoutes /> */}

          {/* Public Routes */}
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />

          {/* Protected Employee Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard/*' element={<Dashboard />} />
            <Route path='/admin/*' element={<AdminDashboard />} />
          </Route>

          {/* Protected Admin Routes */}
          {/* <Route element={<ProtectedRoute role='admin' />}>
          <Route path='/admin' element={<AdminDashboard />} />
        </Route> */}

          {/* 404 Page */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

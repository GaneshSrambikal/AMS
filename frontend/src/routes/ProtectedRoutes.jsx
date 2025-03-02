import { Navigate, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Dashboard from '../pages/Dashboard';
import AdminDashboard from '../pages/AdminDashboard';

const ProtectedRoutes = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to='/login' />; // Redirect if not logged in

  return (
    <Routes>
      {user.role === 'admin' ? (
        <Route path='/admin' element={<AdminDashboard />} />
      ) : (
        <Route path='/dashboard' element={<Dashboard />} />
      )}
      {/* Redirect any other protected route to respective dashboard */}
      <Route
        path='*'
        element={
          <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} />
        }
      />
    </Routes>
  );
};

export default ProtectedRoutes;

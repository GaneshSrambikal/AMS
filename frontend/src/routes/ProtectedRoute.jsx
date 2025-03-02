// import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
// import { useContext } from 'react';
// import AuthContext from '../context/AuthContext';
// import Dashboard from '../pages/Dashboard';
// import AdminDashboard from '../pages/AdminDashboard';
// import UserManagement from '../pages/UserManagement';

// const ProtectedRoutes = () => {
//   const { user } = useContext(AuthContext);
//   const location = useLocation();
//   if (!user) return <Navigate to='/login' />; // Redirect if not logged in

//   return (
//     <Routes>
//       {user.role === 'admin' ? (
//         <>
//           <Route path='/admin' element={<AdminDashboard />} />
//           <Route path='/admin/users' element={<UserManagement />} />
//         </>
//       ) : (
//         <Route path='/dashboard' element={<Dashboard />} />
//       )}
//       {/* Redirect any other protected route to respective dashboard */}
//       <Route path='*' element={<Navigate to={location.pathname} />} />
//     </Routes>
//   );
// };

// export default ProtectedRoutes;

// NEW CODE

import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to='/' replace />;
  }

  // if (role && user.role !== role) {
  //   return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  // }

  return <Outlet />;
};

export default ProtectedRoute;

// import { Route, Routes } from 'react-router-dom';
// import LandingPage from '../pages/LandingPage';
// import Login from '../pages/Login';

// const PublicRoutes = () => {
//   return (
//     <Routes>
//       <Route path='/' element={<LandingPage />} />
//       <Route path='/login' element={<Login />} />
//     </Routes>
//   );
// };

// export default PublicRoutes;

import { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = () => {
  const { role, isAuthenticated, loadUser } = useContext(AuthContext);
  useEffect(() => {
    loadUser();
  }, []);
  return isAuthenticated ? (
    role === 'admin' ? (
      <Navigate to='/admin' />
    ) : (
      <Navigate to='/dashboard' />
    )
  ) : (
    <Outlet />
  );
};

export default PublicRoutes;

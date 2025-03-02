// import { useContext, useEffect } from 'react';
// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import AuthContext from '../context/AuthContext';
// import { checkToken } from '../services/tokenServices';

// const EmployeeRoutes = () => {
//   const { isAuthenticated, loading, loadUser, token, role } =
//     useContext(AuthContext);
//   const location = useLocation();

//   useEffect(() => {
//     loadUser();
//   }, []);

//   if (loading) return <div>loading...</div>;
//   return isAuthenticated && checkToken(token) && role === 'employee' ? (
//     <Outlet />
//   ) : (
//     <Navigate to='/login' state={{ from: location }} replace />
//   );
// };

// export default EmployeeRoutes;

import { useContext, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { checkToken } from '../services/tokenServices';

const EmployeeRoutes = () => {
  const { isAuthenticated, loading, loadUser, token, role } =
    useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      loadUser();
    }
  }, [isAuthenticated, loadUser]);

  if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        Loading...
      </div>
    );

  // Prevent access if user is not an employee
  if (!isAuthenticated || !checkToken(token) || role !== 'employee') {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default EmployeeRoutes;

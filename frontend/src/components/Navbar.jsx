import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <nav className='bg-blue-600 text-white p-4 flex justify-between items-center shadow-md fixed top-0 left-0 w-full'>
      <h1 className='text-xl font-bold'>AMS</h1>
      {user ? (
        <div className='flex items-center space-x-4'>
          <span className='text-lg'>
            {user?.name}
            {user?.role === 'admin' && ' (Admin)'}
          </span>
          {user.role === 'admin' && (
            <Link to='/admin/users' className='bg-yellow-500 px-4 py-2 rounded'>
              Manage Users
            </Link>
          )}
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className='bg-red-500 px-4 py-2 rounded hover:bg-red-600'
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => navigate('/login')}
            className='bg-red-500 px-4 py-2 rounded hover:bg-red-600'
          >
            login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

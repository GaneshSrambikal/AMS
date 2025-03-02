import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <nav className='bg-linear-to-r from-cyan-500 to-blue-500 text-white p-4 flex justify-between items-center shadow-md fixed top-0 left-0 w-full'>
      <Link to='/'>
        <h1
          className='text-xl font-bold'
          onClick={() =>
            document
              .getElementById('landing-hero')
              .scrollIntoView({ behavior: 'smooth' })
          }
        >
          AMS
        </h1>
      </Link>
      {user ? (
        <div className='flex items-center space-x-4'>
          <span className='text-lg'>
            {user?.name}
            {user?.role === 'admin' && ' (Admin)'}
          </span>
          {user.role === 'admin' && (
            <Link to='/admin/users' className='bg-fuchsia-700 px-4 py-2 rounded'>
              Manage Users
            </Link>
          )}
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className='bg-emerald-500 px-4 py-2 rounded hover:bg-emerald-500'
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => navigate('/login')}
            className='bg-emerald-500 px-4 py-2 rounded hover:bg-emerald-600'
          >
            login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

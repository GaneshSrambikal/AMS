import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const { loading, user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      console.log(user);
      toast.success('Login successful!', { theme: 'dark' });
      user?.role === 'admin' ? navigate('/admin') : navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <div>Loading</div>;
  return (
    <div className='flex h-screen items-center justify-center bg-gray-100 relative'>
      <div className='w-full max-w-sm bg-white p-6 rounded-lg shadow-lg relative overflow-hidden'>
        <div className='absolute -top-50 -right-40 w-full max-w-sm opacity-70'>
          <svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'>
            <path
              fill='#9EF0F0'
              d='M21.2,-3.3C24.9,4.5,23.5,17.5,12.9,27.5C2.3,37.5,-17.6,44.5,-35.7,34.7C-53.9,24.9,-70.3,-1.6,-64.1,-12.8C-57.8,-24.1,-28.9,-19.9,-10.1,-16.7C8.8,-13.4,17.6,-11,21.2,-3.3Z'
              transform='translate(100 100)'
            />
          </svg>
        </div>
        <div className='absolute -top-55 -right-40 w-full max-w-sm opacity-70'>
          <svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'>
            <path
              fill='#FFD6E8'
              d='M48.4,-16.4C53.1,-1.2,40.7,18.8,20,35.7C-0.6,52.7,-29.4,66.4,-39.3,58.3C-49.1,50.1,-39.9,20.1,-30.2,-2C-20.5,-24,-10.3,-38,5.8,-39.9C21.8,-41.8,43.7,-31.6,48.4,-16.4Z'
              transform='translate(100 100)'
            />
          </svg>
        </div>
        <h2 className='text-2xl font-bold text-center mb-4'>Login</h2>
        <form onSubmit={handleLogin} className='space-y-4'>
          <label className='font-bold'>Email</label>
          <input
            className='w-full p-2 mt-2 border border-gray-300 rounded'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className='font-bold'>Password</label>
          <input
            className='w-full p-2 mt-2 border border-gray-300 rounded'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded'
            type='submit'
          >
            Login
          </button>
          <div className='mt-3'>
            <p className='text-sm text-center'>
              Don't have an account? <Link to='#'>Contact Admin</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

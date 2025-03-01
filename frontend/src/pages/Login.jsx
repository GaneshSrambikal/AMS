import { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
// import { toast } from 'react-toastify';

const Login = () => {
  //   const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      //   await login(email, password);
      //   toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      //   toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className='flex h-screen items-center justify-center bg-gray-100'>
      <div className='w-full max-w-sm bg-white p-6 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold text-center mb-4'>Login</h2>
        <form onSubmit={handleLogin} className='space-y-4'>
          <input
            className='w-full p-2 border border-gray-300 rounded'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className='w-full p-2 border border-gray-300 rounded'
            type='password'
            placeholder='Password'
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
        </form>
      </div>
    </div>
  );
};

export default Login;

import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen text-center'>
      <h1 className='text-4xl font-bold'>404 - Page Not Found</h1>
      <p className='text-gray-500 mt-2'>
        The page you are looking for does not exist.
      </p>
      <Link to='/' className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'>
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;

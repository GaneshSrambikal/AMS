import { Link, useLocation } from 'react-router-dom';
import {
  FaBars,
  FaTachometerAlt,
  FaUsers,
  FaSignOutAlt,
  FaFileAlt,
} from 'react-icons/fa';

const Sidebar = ({ onLogout, collapsed, setCollapsed }) => {
  const location = useLocation();
  // console.log('location', location.pathname);
  return (
    <div
      className={`mt-18 h-[90vh] bg-gray-900 text-white fixed left-0 top-0 z-50 ${
        collapsed ? 'w-16' : 'w-64'
      } transition-all duration-300 flex flex-col`}
    >
      {/* Sidebar Toggle Button */}
      <button
        className='p-4 focus:outline-none'
        onClick={() => setCollapsed(!collapsed)}
      >
        <FaBars size={24} />
      </button>

      <nav className='flex flex-col flex-grow'>
        <Link
          to='/dashboard'
          className={`p-4 flex items-center hover:bg-gray-700 ${
            location.pathname === '/dashboard' && 'bg-gray-700'
          }`}
        >
          <FaTachometerAlt size={20} className='mr-3' />
          {!collapsed && <span>Dashboard</span>}
        </Link>
        <Link
          to='/admin/users'
          className={`p-4 flex items-center hover:bg-gray-700 ${
            location.pathname === '/admin/users' && 'bg-gray-700'
          }`}
        >
          <FaUsers size={20} className='mr-3' />
          {!collapsed && <span>Manage Users</span>}
        </Link>
        <Link
          to='/admin/reports'
          className={`p-4 flex items-center hover:bg-gray-700 ${
            location.pathname === '/admin/reports' && 'bg-gray-700'
          }`}
        >
          <FaFileAlt size={20} className='mr-3' />
          {!collapsed && <span>Reports</span>}
        </Link>
      </nav>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className='p-4 flex items-center hover:bg-red-600'
      >
        <FaSignOutAlt size={20} className='mr-3' />
        {!collapsed && <span>Logout</span>}
      </button>
    </div>
  );
};

export default Sidebar;

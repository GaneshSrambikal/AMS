import { useQuery } from 'react-query';
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Route, Routes } from 'react-router-dom';
import UserManagement from './UserManagement';
import AdminReports from './AdminReports';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const { logout } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const {
    data: attendance,

    isLoading,
    isError,
  } = useQuery('allAttendance', async () => {
    const { data } = await api.get('/admin/attendance/history');
    return data;
  });

  const sendReminder = async () => {
    setLoading(true);
    try {
      await api.post('/notifications/send-reminder');
      alert('Reminder sent to all users!');
    } catch (error) {
      alert('Error sending reminder.', error);
    }
    setLoading(false);
  };

  //Show loading message to prevent crash
  if (isLoading) return <p>Loading...</p>;

  // Show error message if API fails
  if (isError) return <p>Error loading attendance records.</p>;
  return (
    <div className='flex h-screen'>
      <Sidebar
        onLogout={logout}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        className={`flex-1 transition-all duration-300 ${
          collapsed ? 'ml-16' : 'ml-64'
        } p-6 bg-gray-100 mt-18 size-full`}
      >
        <Routes>
          <Route
            path='/'
            element={
              <>
                <h2 className='text-3xl font-bold text-gray-800 mb-6'>
                  Admin Dashboard
                </h2>
                <div>
                  {/* 🔹 Send Reminder Button */}
                  <button
                    onClick={sendReminder}
                    className='bg-red-500 text-white px-4 py-2 rounded mt-4'
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Reminder'}
                  </button>
                </div>
                <h3 className='mt-6 text-2xl font-semibold text-gray-700'>
                  All Attendance Records
                </h3>
                {/* <div className='mt-4 bg-white shadow-lg rounded-lg p-4'>
                  <ul className='space-y-2'>
                    {attendance?.map((record) => (
                      <li
                        key={record._id}
                        className='flex justify-between border-b py-2'
                      >
                        <span className='text-gray-800'>
                          {record.user}-{format(record.date, 'yyyy-M-dd')}
                        </span>
                        <span className='text-gray-600'>
                          Check-in: {format(record.checkInTime, 'hh:mm a')}
                        </span>
                        <span className='text-gray-600'>
                          Check-out:{' '}
                          {record.checkOutTime
                            ? format(record.checkOutTime, 'hh:mm a')
                            : 'Not Checked-out'}
                        </span>
                        <button
                          onClick={() =>
                            editMutation.mutate({
                              id: record._id,
                              checkOutTime: new Date(),
                            })
                          }
                          className='bg-blue-500 text-white px-3 py-1 rounded'
                        >
                          Edit
                        </button>
                      </li>
                    ))}
                  </ul>
                </div> */}
                <div className='overflow-x-auto'>
                  <table className='min-w-full border-collapse border border-gray-200 bg-white shadow-lg rounded-lg'>
                    <thead className='bg-gray-100'>
                      <tr>
                        <th className='border border-gray-200 px-4 py-2'>#</th>
                        <th className='border border-gray-200 px-4 py-2'>
                          Name
                        </th>
                        <th className='border border-gray-200 px-4 py-2'>
                          Date
                        </th>
                        <th className='border border-gray-200 px-4 py-2'>
                          Check-in
                        </th>
                        <th className='border border-gray-200 px-4 py-2'>
                          Check-out
                        </th>
                        <th className='border border-gray-200 px-4 py-2'>
                          Work Hours
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendance?.length > 0 ? (
                        attendance.map((record, index) => (
                          <tr
                            key={record._id}
                            className={
                              index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                            }
                          >
                            <td className='border border-gray-200 px-4 py-2 text-center'>
                              {index + 1}
                            </td>
                            <td className='border border-gray-200 px-4 py-2'>
                              {record.user?.name || 'Unknown'}
                            </td>
                            <td className='border border-gray-200 px-4 py-2 text-center'>
                              {new Date(record.date).toLocaleDateString()}
                            </td>
                            <td className='border border-gray-200 px-4 py-2 text-center'>
                              {record.checkInTime
                                ? new Date(
                                    record.checkInTime
                                  ).toLocaleTimeString()
                                : 'N/A'}
                            </td>
                            <td className='border border-gray-200 px-4 py-2 text-center'>
                              {record.checkOutTime
                                ? new Date(
                                    record.checkOutTime
                                  ).toLocaleTimeString()
                                : 'Not Checked-out'}
                            </td>
                            <td className='border border-gray-200 px-4 py-2 text-center'>
                              {record.workHours || 'N/A'}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan='6'
                            className='text-center py-4 text-gray-500'
                          >
                            No attendance records found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            }
          />
          <Route path='/users' element={<UserManagement />} />
          <Route path='/reports' element={<AdminReports />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useContext, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import api from '../services/api';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';
import Notifications from '../components/Notifications';
import { io } from 'socket.io-client';

const EmpDashboard = () => {
  const { user } = useContext(AuthContext);

  console.log('Dashboard', user);
  //  fetch attendance
  const { data, refetch, isLoading } = useQuery(
    'attendanceHistory',
    async () => {
      const { data } = await api.get('/users/attendance/history');
      console.log(data);
      return data;
    }
  );

  const checkInMutation = useMutation(() => api.post('/attendance/check-in'), {
    onSuccess: () => {
      toast.success('Checked in successfully.');
      refetch();
    },
    onError: () => {
      toast.info('Checked-in already', { theme: 'dark' });
    },
  });
  const checkOutMutation = useMutation(
    () => api.post('/attendance/check-out'),
    {
      onSuccess: () => {
        toast.success('Check-out successful.');
        refetch();
      },
      onError: () => {
        toast.info('Check-out already', { theme: 'dark' });
      },
    }
  );

  useEffect(() => {
    const socket = io(import.meta.env.VITE_BACKEND_URL, {
      transports: ['websocket', 'polling'], //Ensure WebSocket transport works
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socket.on('connect', () => {
      console.log(`📡 WebSocket connected: ${socket.id}`);
      socket.emit('User Joined', user.id);
    });
    socket.on('newNotification', () => {
      toast.info('New Notification');
    });
    return () => socket.disconnect();
  }, []);
  if (isLoading) return <p>Loading...</p>;
  if (!data?.attendances || !Array.isArray(data.attendances))
    console.log('no data');
  return (
    <>
      <Notifications />
      <div className='p-6 bg-gray-100 min-h-screen'>
        <h2 className='text-3xl font-bold text-gray-800 mb-6'>
          Attendance Dashboard
        </h2>
        <h3 className='text-3xl font-bold text-gray-800 mb-6'>
          {`Hello, ${user?.name || 'User'}`}
        </h3>
        <div>
          <p>{`Total Work Hours: ${data?.total_w_hours}`}</p>
        </div>
        <div className='flex space-x-4'>
          <button
            onClick={() => checkInMutation.mutate()}
            className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'
          >
            Check In
          </button>
          <button
            onClick={() => checkOutMutation.mutate()}
            className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
          >
            Check Out
          </button>
        </div>

        <h3 className='mt-6 text-2xl font-semibold text-gray-700'>
          Attendance History
        </h3>

        <div className='overflow-x-auto'>
          <table className='min-w-full border-collapse border border-gray-200 bg-white shadow-lg rounded-lg'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='border border-gray-200 px-4 py-2'>#</th>
                <th className='border border-gray-200 px-4 py-2'>Date</th>
                <th className='border border-gray-200 px-4 py-2'>Check-in</th>
                <th className='border border-gray-200 px-4 py-2'>Check-out</th>
                <th className='border border-gray-200 px-4 py-2'>Work Hours</th>
              </tr>
            </thead>
            <tbody>
              {data?.attendances?.length > 0 ? (
                data?.attendances?.map((record, index) => (
                  <tr
                    key={record._id}
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td className='border border-gray-200 px-4 py-2 text-center'>
                      {index + 1}
                    </td>

                    <td className='border border-gray-200 px-4 py-2 text-center'>
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className='border border-gray-200 px-4 py-2 text-center'>
                      {record.checkInTime
                        ? new Date(record.checkInTime).toLocaleTimeString()
                        : 'N/A'}
                    </td>
                    <td className='border border-gray-200 px-4 py-2 text-center'>
                      {record.checkOutTime
                        ? new Date(record.checkOutTime).toLocaleTimeString()
                        : 'Not Checked-out'}
                    </td>
                    <td className='border border-gray-200 px-4 py-2 text-center'>
                      {record.workHours || 'N/A'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='6' className='text-center py-4 text-gray-500'>
                    No attendance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EmpDashboard;

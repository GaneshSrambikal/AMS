import React, { useContext } from 'react';
import { useMutation, useQuery } from 'react-query';
import api from '../services/api';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import AuthContext from '../context/AuthContext';

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
  if (isLoading) return <p>Loading...</p>;
  if (!data?.attendances || !Array.isArray(data.attendances))
    console.log('no data');
  return (
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
      <div className='mt-4 bg-white shadow-lg rounded-lg p-4'>
        <ul className='space-y-2'>
          {data?.attendances?.map((record) => (
            <li key={record._id} className='flex justify-between border-b py-2'>
              <span className='text-gray-800'>
                {format(new Date(record.date), 'yyyy-MM-dd')}
              </span>
              <span className='text-gray-600'>
                {' '}
                Check-in: {format(new Date(record.checkInTime), 'hh:mm a')}
              </span>
              <span className='text-gray-600'>
                Check-out:{' '}
                {record.checkOutTime
                  ? format(new Date(record.checkOutTime), 'hh:mm a')
                  : 'Not Checked-out'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmpDashboard;

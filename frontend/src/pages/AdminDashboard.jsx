import { useQuery, useMutation } from 'react-query';
import api from '../services/api';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import Sidebar from '../components/Sidebar';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Route, Routes } from 'react-router-dom';
import UserManagement from './UserManagement';
import AdminReports from './AdminReports';

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const { data: attendance, refetch } = useQuery('allAttendance', async () => {
    const { data } = await api.get('/admin/attendance/history');
    return data;
  });

  const editMutation = useMutation(
    (updateData) =>
      api.put(`/admin/attendance/edit/${updateData.id}`, updateData),
    {
      onSuccess: () => {
        toast.success('Attendance updated!');
        refetch();
      },
      onError: () => {
        toast.error('Update failed!');
      },
    }
  );

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

                <h3 className='mt-6 text-2xl font-semibold text-gray-700'>
                  All Attendance Records
                </h3>
                <div className='mt-4 bg-white shadow-lg rounded-lg p-4'>
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

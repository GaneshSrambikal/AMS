import { useState } from 'react';
import { useQuery } from 'react-query';
import api from '../services/api';
import { generatePDFReport, generateCSVReport } from '../utils/generateReport';

const AdminReports = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const {
    data: attendance,
    isLoading,
    isError,
  } = useQuery(
    ['attendance', startDate, endDate],
    async () => {
      const { data } = await api.get(
        `/admin/attendance/history?startDate=${startDate}&endDate=${endDate}`
      );

      return data;
    },
    { enabled: !!startDate && !!endDate } // Fetch only when both dates are set
  );
  // ✅ Show loading message to prevent crash
  if (isLoading) return <p>Loading...</p>;

  // ✅ Show error message if API fails
  if (isError) return <p>Error loading attendance records.</p>;
  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold'>Reports</h2>

      {/* 🔹 Date Filters */}
      <div className='flex space-x-4 mb-4'>
        <input
          type='date'
          className='p-2 border rounded'
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type='date'
          className='p-2 border rounded'
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* 🔹 Report Buttons */}
      <button
        onClick={() => generatePDFReport(attendance)}
        className='bg-blue-500 text-white p-2 rounded'
        disabled={!attendance}
      >
        Download PDF
      </button>
      <button
        onClick={() => generateCSVReport(attendance)}
        className='bg-green-500 text-white p-2 rounded ml-2'
        disabled={!attendance}
      >
        Download CSV
      </button>

      {/* 🔹 Attendance History */}
      <h3 className='mt-6 text-xl font-semibold'>Attendance Records</h3>
      <div className='mt-4 bg-white shadow-lg rounded-lg p-4'>
        <ul className='space-y-2'>
          {attendance?.map((record) => (
            <li key={record._id} className='flex justify-between border-b py-2'>
              <span className='text-gray-800'>
                {/* {record.user && typeof record.user === 'object'
                  ? record.user.name
                  : 'Unknown'}{' '}
                - {new Date(record.date).toLocaleDateString()} */}
                {record.user}
              </span>
              <span className='text-gray-600'>
                Check-in: {record.checkInTime}
              </span>
              <span className='text-gray-600'>
                Check-out: {record.checkOutTime || 'Not Checked-out'}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminReports;

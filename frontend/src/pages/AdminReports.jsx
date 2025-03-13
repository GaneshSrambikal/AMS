import { useState } from 'react';
import { useQuery } from 'react-query';
import api from '../services/api';
import { generatePDFReport, generateCSVReport } from '../utils/generateReport';

const AdminReports = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(new Date());

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
      console.log(data);
      return data;
    },
    { enabled: !!startDate && !!endDate } // Fetch only when both dates are set
  );
  //  Show loading message to prevent crash
  if (isLoading) return <p>Loading...</p>;

  //  Show error message if API fails
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
          min={new Date('2025-03-01').toISOString().split('T')[0]}
          max={new Date().toISOString().split('T')[0]}
          onChange={(e) => setStartDate(e.target.value)}
          defaultValue={new Date('2025-03-01').toISOString().split('T')[0]}
        />
        <input
          type='date'
          className='p-2 border rounded'
          value={endDate}
          min={new Date('2025-03-01').toISOString().split('T')[0]}
          max={new Date().toISOString().split('T')[0]}
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

      {/*  Attendance History */}
      <h3 className='mt-6 text-xl font-semibold'>Attendance Records</h3>

      <div className='overflow-x-auto'>
        <table className='min-w-full border-collapse border border-gray-200 bg-white shadow-lg rounded-lg'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='border border-gray-200 px-4 py-2'>#</th>
              <th className='border border-gray-200 px-4 py-2'>Name</th>
              <th className='border border-gray-200 px-4 py-2'>Date</th>
              <th className='border border-gray-200 px-4 py-2'>Check-in</th>
              <th className='border border-gray-200 px-4 py-2'>Check-out</th>
              <th className='border border-gray-200 px-4 py-2'>Work Hours</th>
            </tr>
          </thead>
          <tbody>
            {attendance?.length > 0 ? (
              attendance.map((record, index) => (
                <tr
                  key={record._id}
                  className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
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
  );
};

export default AdminReports;

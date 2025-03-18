import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { addUser, deleteUser, fetchUsers } from '../services/api';
const UserManagement = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [designation, setDesignation] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const departments = ['hr', 'devops', 'web developer', 'sales'];

  const { data, refetch } = useQuery(['users', selectedDepartment], () =>
    fetchUsers(selectedDepartment)
  );

  const addMutation = useMutation((newUser) => addUser(newUser), {
    onSuccess: () => {
      toast.success('Employee added successfully.');
      refetch();
      setName('');
      setEmail('');
      setPassword('');
      setDesignation('');
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || 'Failed to create new employee.'
      );
    },
  });
  //   const editMutation = useMutation(
  //     (userId, updateData) => editUser(userId, updateData),
  //     {
  //       onSuccess: () => {
  //         toast.success('Employee data updated.');
  //         refetch();
  //         setName('');
  //         setEmail('');
  //         setPassword('');
  //         setDesignation('');
  //       },
  //       onError: (err) => {
  //         toast.error(
  //           err?.response?.data?.message || 'Failed to create new employee.'
  //         );
  //       },
  //     }
  //   );
  const deleteMutation = useMutation((id) => deleteUser(id), {
    onSuccess: () => {
      toast.success('Employee deleted successfully!');
      refetch();
    },
    onError: () => {
      toast.error('Failed to delete employee');
    },
  });
  const handleAddEmp = () => {
    if (name && email && password && designation) {
      addMutation.mutate({ name, email, password, designation });
    }
  };
  return (
    <div className='p-6 bg-gray-100 size-auto'>
      <h2 className='text-3xl font-bold text-gray-800 mb-6'>User Management</h2>

      <div className='bg-white p-4 rounded shadow'>
        <h3 className='text-xl font-semibold mb-4'>Add Employee</h3>
        <div className='flex flex-col space-x-2 flex-wrap'>
          <input
            type='text'
            className='p-2 border rounded mb-2'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='email'
            className='p-2 border rounded mb-2'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            className='p-2 border rounded mb-2'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type='type'
            className='p-2 border rounded mb-2'
            placeholder='Designation'
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
          <button
            onClick={handleAddEmp}
            className='mt-2 bg-blue-500 text-white p-2 rounded w-full'
          >
            Add
          </button>
        </div>
      </div>

      <h3 className='mt-6 text-xl font-semibold'>All Employees</h3>
      {/* 🔹 Department Filter */}
      <div className='mt-4'>
        <label className='font-semibold'>Filter by Department:</label>
        <select
          className='p-2 border rounded ml-2'
          value={selectedDepartment}
          onChange={(e) => {
            setSelectedDepartment(e.target.value);
            refetch(); // 🔹 Re-fetch data on change
          }}
        >
          <option value=''>All</option>
          {departments.map((dep) => (
            <option key={dep} value={dep}>
              {dep}
            </option>
          ))}
        </select>
      </div>
      <div className='mt-4 bg-white shadow-lg rounded-lg p-4'>
        <ul className='space-y-2'>
          {data?.users?.map((user) => (
            <li key={user._id} className='flex justify-between border-b py-2'>
              <span className='text-gray-800'>
                {user.name} - {user.email}
              </span>
              <button
                onClick={() => deleteMutation.mutate(user._id)}
                className='bg-red-500 text-white px-3 py-1 rounded'
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserManagement;

import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import EmpDashboard from './EmpDashboard';

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <>Loading</>;

  return (
    <div>{user.role === 'admin' ? <AdminDashboard /> : <EmpDashboard />}</div>
  );
};

export default Dashboard;

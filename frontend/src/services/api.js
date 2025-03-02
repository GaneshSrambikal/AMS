import axios from 'axios';
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ams_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ADMIN Reports
export const fetchAttendance = async (startDate, endDate) => {
  const { data } = await api.get(`/admin/attendance/history`, {
    params: { startDate, endDate },
  });
  return data;
};

// ADMIN (user management)

// fetch all user
export const fetchUsers = async (designation) => {
  const { data } = await api.get(
    `/admin/users${designation ? `?designation=${designation}` : ''}`
  );
  return data;
};

// create an user
export const addUser = async (userData) => {
  const { data } = await api.post('/admin/users/add', userData);
  return data;
};

// edit an user
export const editUser = async (userId, userData) => {
  const { data } = await api.put(`/admin/users/edit/${userId}`, userData);
  return data;
};

// delete an user
export const deleteUser = async (userId) => {
  const { data } = await api.delete(`/admin/users/${userId}`);
  return data;
};
export default api;

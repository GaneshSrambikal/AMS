
import { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem('ams_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setUser(data?.user);
      localStorage.setItem('ams_user', JSON.stringify(data.user));
      localStorage.setItem('ams_token', data.token);
      localStorage.setItem('ams_userId', data?.user?.id);
      navigate('/dashboard');
      return data; // ✅ Instead of navigating here, return the user role
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ams_user');
    localStorage.removeItem('ams_token');
    localStorage.removeItem('ams_userId');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

import { createContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('ams_user');
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      console.log(data);
      setUser(data.user);
      localStorage.setItem('ams_user', JSON.stringify(data.user));
      localStorage.setItem('ams_token', data.token);
      return data.user;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login Failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ams_user');
    localStorage.removeItem('ams_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

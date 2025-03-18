import { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import api from '../services/api';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const id = localStorage.getItem('ams_userId');

  useEffect(() => {
    if (!id) return;
    const socket = io(import.meta.env.VITE_BACKEND_URL, {
      transports: ['websocket', 'polling'], //Ensure WebSocket transport works
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });
    socket.on('connect', () => {
      console.log(`📡 WebSocket connected: ${socket.id}`);
      socket.emit('User Joined', id);
    });

    socket.on('newNotification', (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });
    return () => socket.disconnect();
  }, [id]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data } = await api.get(`/notifications/${id}`);
      setNotifications(data);
    };

    if (id) fetchNotifications();
  }, [id]);

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

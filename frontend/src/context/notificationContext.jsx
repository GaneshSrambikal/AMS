import { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.on(`notify-${localStorage.getItem('userId')}`, (data) => {
      setNotifications((prev) => [...prev, data.message]);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

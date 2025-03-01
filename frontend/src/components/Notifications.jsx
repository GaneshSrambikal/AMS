import { useContext } from 'react';
import NotificationContext from '../context/notificationContext';

const Notifications = () => {
  const { notifications } = useContext(NotificationContext);

  return (
    <div className='fixed top-4 right-4 bg-white p-4 shadow-md rounded-lg'>
      {notifications.length > 0 ? (
        notifications.map((msg, index) => (
          <p key={index} className='text-red-500'>
            {msg}
          </p>
        ))
      ) : (
        <p className='text-gray-600'>No notifications</p>
      )}
    </div>
  );
};

export default Notifications;

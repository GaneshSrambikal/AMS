import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAhE3pipIhybVgk6Xwopq_LOPm4a81hkZY',
  authDomain: 'ams-notifications-render.firebaseapp.com',
  projectId: 'ams-notifications-render',
  storageBucket: 'ams-notifications-render.firebasestorage.app',
  messagingSenderId: '1041236410726',
  appId: '1:1041236410726:web:a89c2e2f213ddc2d2b48a7',
  measurementId: 'G-65XCQEXME0',
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// Request permission for push notifications
export const requestPushPermission = async () => {
  try {
    const token = await getToken(messaging, { vapidKey: 'your-vapid-key' });
    console.log('Push Token:', token);
    return token;
  } catch (error) {
    console.error('Push Notification Permission Denied:', error);
  }
};

// Listen for incoming notifications
onMessage(messaging, (payload) => {
  console.log('Push Notification Received:', payload);
});

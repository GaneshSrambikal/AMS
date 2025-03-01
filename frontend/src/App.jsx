import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
// import { io } from 'socket.io-client';
// import { requestPushPermission } from './firebaseConfig';

function App() {
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   const socket = io('http://localhost:5000', {
  //     transports: ['websocket', 'polling'], // Ensure polling is enabled
  //     withCredentials: true,
  //   });
  //   socket.on('connect', () => {
  //     console.log(`Connected to server`);
  //   });
  //   socket.on(`notify-checkout-67c178fcfc1bb5a2b5f501da`, (data) => {
  //     console.log(`Reminder sent!.${data.message}`);
  //   });

  //   return () => socket.disconnect();
  // }, []);
  // useEffect(() => {
  //   requestPushPermission();
  // }, []);
  return (
    <>
      <div className='bg-green-100 flex justify-center border p-2 mb-2 rounded'>
        <a href='https://vite.dev' target='_blank' className=''>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <h1 class='text-3xl font-bold underline'>Hello world!</h1>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>

    </>
  );
}

export default App;

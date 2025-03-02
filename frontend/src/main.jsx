import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './context/AuthContext.jsx';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <App />
    </AuthProvider>
    <ToastContainer position='top-right' />
  </QueryClientProvider>
);

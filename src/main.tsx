import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/Authcontext';
import AppLayout from './components/AppLayout';
import Login from './pages/Login';
import './index.css';
import Cadastro from './pages/Cadastro';

const router = createBrowserRouter([
  {
    element: <AppLayout />, 
    children: [
      { path: '/', element: <Login /> },      
      { path: '/login', element: <Login /> },
      { path: '/cadastro', element: <Cadastro /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

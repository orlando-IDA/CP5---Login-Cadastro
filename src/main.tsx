import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/Login/index.tsx';
import CadastroPage from './pages/Cadastro/index.tsx';

const router = createBrowserRouter([
  {
    path: "/", element: <App />, children: [
      {path: "/", element: <LoginPage />,},
      {path: "/cadastro", element: <CadastroPage />,},
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
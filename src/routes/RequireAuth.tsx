import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';

export default function RequireAuth() {
  const { usuario } = useAuth();
  if (!usuario) return <Navigate to="/login" replace />;
  return <Outlet />;
}

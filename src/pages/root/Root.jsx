import { Navigate, Outlet } from 'react-router-dom';

export default function Root() {
  const isLogin = localStorage.getItem('auth');

  return isLogin ? <Outlet /> : <Navigate to='/auth/login' />;
}

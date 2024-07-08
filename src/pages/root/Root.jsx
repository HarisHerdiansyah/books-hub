import { Navigate, Outlet } from 'react-router-dom';

export default function Root() {
  const isAuth = localStorage.getItem('auth');

  return isAuth ? <Outlet /> : <Navigate to='/auth/login' />;
}

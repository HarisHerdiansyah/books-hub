import { Navigate, Outlet } from 'react-router-dom';
import { AppAuth } from '../../service/auth';
import { useEffect } from 'react';

export default function Root() {
  const currUser = AppAuth.currentUser;

  useEffect(() => {
    console.log(currUser);
  });

  return currUser ? <Outlet /> : <Navigate to='/auth/login' />;
}

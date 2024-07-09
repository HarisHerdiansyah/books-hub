import AppProvider from './Context';
import UILayout from './UILayout';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <AppProvider>
      <UILayout />
      <Outlet />
    </AppProvider>
  );
}

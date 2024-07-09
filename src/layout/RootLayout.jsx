import AppProvider from './provider/Context';
import UILayout from './ui/UILayout';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <AppProvider>
      <UILayout />
      <Outlet />
    </AppProvider>
  );
}

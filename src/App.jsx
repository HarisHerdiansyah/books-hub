import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import router from './routes';
import './index.css';

export default function App() {
  return (
    <ChakraProvider>
      <RootLayout>
        <RouterProvider router={router} />
      </RootLayout>
    </ChakraProvider>
  );
}

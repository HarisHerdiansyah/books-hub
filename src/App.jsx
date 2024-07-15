import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import './index.css';

export default function App() {
  return (
    <ChakraProvider
      toastOptions={{ defaultOptions: { position: 'top-right' } }}
    >
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

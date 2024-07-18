import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import './index.css';

export default function App() {
  return (
    <ChakraProvider
      toastOptions={{
        defaultOptions: {
          position: 'top-right',
          duration: 3000,
          isClosable: true
        }
      }}
    >
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

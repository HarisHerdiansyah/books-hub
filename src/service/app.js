import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: 'AIzaSyBcb9Di4zgMi1oA2cszE-3XRtrTooxA3O4',
  authDomain: 'books-hub-mock.firebaseapp.com',
  projectId: 'books-hub-mock',
  storageBucket: 'books-hub-mock.appspot.com',
  messagingSenderId: '534367910799',
  appId: '1:534367910799:web:5f34590c9b7f49bb3ce9fa',
  measurementId: 'G-19FPFBDJY6'
};

const app = initializeApp(firebaseConfig);
export default app;

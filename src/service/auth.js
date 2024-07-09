import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import app from './app';
import { functions } from '../constants';

export const auth = getAuth(app);

export async function login() {
  try {
    await signInWithEmailAndPassword(auth, 'haris54237@gmail.com', 'haris1234');
  } catch (error) {
    functions.logError('login', error);
  }
}

export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    functions.logError('logout', error);
  }
}

export async function register() {
  try {
    await createUserWithEmailAndPassword(
      auth,
      'haris54237@gmail.com',
      'haris1234'
    );
  } catch (error) {
    functions.logError('register', error);
  }
}

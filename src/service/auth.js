import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import app from './app';
import { logError } from '../constants/functions';

export const AppAuth = getAuth(app);

export async function login() {
  try {
    await signInWithEmailAndPassword(
      AppAuth,
      'haris54237@gmail.com',
      'haris1234'
    );
  } catch (error) {
    logError('login', error);
  }
}

export async function logout() {
  try {
    await signOut(AppAuth);
  } catch (error) {
    logError('logout', error);
  }
}

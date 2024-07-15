import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { createUserData, getUserData } from './firestore';
import app from './app';
import { functions } from '../constants';

export const auth = getAuth(app);

export async function login(credentials) {
  const { email, password } = credentials;
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const userSnapshot = await getUserData(response.user.uid);
    return userSnapshot;
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

export async function register(credentials) {
  const { email, password } = credentials;
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await createUserData(response.user.uid);
    await signOut(auth);
    console.log('register success');
  } catch (error) {
    functions.logError('register', error);
  }
}

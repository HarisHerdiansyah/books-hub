import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import app from './app';
import { Auth } from '.';
import { functions } from '../constants';

export const firestore = getFirestore(app);
const userId = Auth.auth.currentUser.uid;

export async function getBooks() {
  try {
    const result = [];
    const snapshots = await getDocs(collection(firestore, 'books'));
    snapshots.forEach((snapDoc) => result.push(snapDoc.data()));
    return result;
  } catch (error) {
    functions.logError('get books', error);
  }
}

export async function addBook(payload) {
  try {
    await setDoc(doc(firestore, 'books', userId), payload);
    console.log('add book success');
  } catch (error) {
    functions.logError('add book', error);
  }
}

export async function updateBook(payload) {
  try {
    await updateDoc(doc(firestore, 'books', userId), payload);
    console.log('update book success');
  } catch (error) {
    functions.logError('update book', error);
  }
}

export async function deleteBook() {
  try {
    await deleteDoc(doc(firestore, 'books', userId));
    console.log('delete book success');
  } catch (error) {
    functions.logError('delete book', error);
  }
}

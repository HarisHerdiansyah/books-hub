import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where
} from 'firebase/firestore';
import app from './app';
import { functions } from '../constants';

export const firestore = getFirestore(app);

export async function getBooks(uid) {
  const withQuery = query(
    collection(firestore, 'books'),
    where('userId', '==', uid)
  );
  try {
    const result = [];
    const snapshots = await getDocs(withQuery);
    snapshots.forEach((snapDoc) => result.push(snapDoc.data()));
    return result;
  } catch (error) {
    functions.logError('get books', error);
  }
}

export async function addBook(payload) {
  try {
    await setDoc(doc(firestore, 'books', payload.bookId), payload);
    console.log('add book success');
  } catch (error) {
    functions.logError('add book', error);
  }
}

export async function updateBook(payload) {
  try {
    await updateDoc(doc(firestore, 'books', payload.bookId), payload);
    console.log('update book success');
  } catch (error) {
    functions.logError('update book', error);
  }
}

export async function deleteBook(payload) {
  try {
    await deleteDoc(doc(firestore, 'books', payload.bookId));
    console.log('delete book success');
  } catch (error) {
    functions.logError('delete book', error);
  }
}

import {
  getFirestore,
  getDocs,
  getDoc as getSingleDoc,
  collection,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  writeBatch
} from 'firebase/firestore';
import app from './app';
import { functions } from '../constants';

export const firestore = getFirestore(app);

export async function getBooks(uid) {
  const dataQuery = query(
    collection(firestore, 'books'),
    where('userId', '==', uid)
  );
  try {
    const result = [];
    const snapshots = await getDocs(dataQuery);
    snapshots.forEach((snapDoc) => result.push(snapDoc.data()));
    return result;
  } catch (error) {
    functions.logError('get books', error);
  }
}

export async function addBook(payload) {
  try {
    await setDoc(doc(firestore, 'books', payload.id), payload);
    console.log('add book success');
  } catch (error) {
    functions.logError('add book', error);
  }
}

export async function updateBook(bookId, payload) {
  try {
    await updateDoc(doc(firestore, 'books', bookId), payload);
    console.log('update book success');
  } catch (error) {
    functions.logError('update book', error);
  }
}

export async function updatePinnedBook(payload) {
  const batch = writeBatch(firestore);
  try {
    payload.forEach((book) => {
      batch.update(doc(firestore, 'books', book.id), {
        isPinned: book.isPinned
      });
    });
    await batch.commit();
    console.log('update pinned book in batches success');
  } catch (error) {
    functions.logError('update pinned book', error);
  }
}

export async function deleteBook(bookId) {
  try {
    await deleteDoc(doc(firestore, 'books', bookId));
    console.log('delete book success');
  } catch (error) {
    functions.logError('delete book', error);
  }
}

export async function createUserData(uid) {
  try {
    await setDoc(doc(firestore, 'users', uid), {
      uid,
      firstName: '',
      lastName: '',
      username: '',
      bio: '',
      about: '',
      firstLogin: true,
      profilePhotoURL: ''
    });
    console.log('create user data success');
  } catch (error) {
    functions.logError('create user data', error);
  }
}

export async function getUserData(uid) {
  try {
    const snapshot = await getSingleDoc(doc(firestore, 'users', uid));
    console.log('get user data success');
    return snapshot.data();
  } catch (error) {
    functions.logError('get user data', error);
  }
}

export async function updateUserData(uid, payload) {
  console.log('updateUserData invoked')
  try {
    await updateDoc(doc(firestore, 'users', uid), payload);
    console.log('update user data success');
  } catch (error) {
    functions.logError('update user data', error);
  }
}

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from 'firebase/storage';
import app from './app';

export const storage = getStorage(app);

export function getFileURL(fileRef) {
  return getDownloadURL(fileRef);
}

export function uploadFile(file, uid) {
  return uploadBytesResumable(ref(storage, `users/${uid}/profile`), file);
}

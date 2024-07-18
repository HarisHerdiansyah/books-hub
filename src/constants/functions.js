import {
  getStorage,
  getDownloadURL,
  uploadBytesResumable,
  ref
} from 'firebase/storage';
import app from '../service/app';

const Storage = getStorage(app);

export function logError(action, error) {
  console.error(`Error ${action.toUpperCase()}`, error?.code, error?.message);
}

export function getFileURL(fileRef) {
  return getDownloadURL(fileRef);
}

export function uploadFile(file, path) {
  return uploadBytesResumable(ref(Storage, path), file);
}

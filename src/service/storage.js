import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import app from './app';
import { functions } from '../constants';

export const storage = getStorage(app);

export async function getFileURL(fileRef) {
  try {
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    functions.logError('get file url', error);
  }
}

export async function uploadFile(file, uid) {
  try {
    const snapshot = await uploadBytes(
      ref(storage, `users/${uid}/profile`),
      file
    );
    const fileURL = await getFileURL(snapshot.ref);
    console.log('upload file success', fileURL);
  } catch (error) {
    functions.logError('upload file', error);
  }
}

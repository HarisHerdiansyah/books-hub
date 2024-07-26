import {
  getStorage,
  getDownloadURL,
  uploadBytesResumable,
  ref
} from 'firebase/storage';
import app from '../../service/app';

const Storage = getStorage(app);

export const ACTIONS = {
  START_UPLOAD: 'START_UPLOAD',
  UPLOAD_ERROR: 'UPLOAD_ERROR',
  UPLOAD_SUCCESS: 'UPLOAD_SUCCESS',
  SET_FILE: 'SET_FILE'
};

export default function uploadActionCreator(dispatch) {
  return {
    setFileDispatcher: (payload) => {
      dispatch({ type: ACTIONS.SET_FILE, payload });
      const MAX_SIZE = 2 * 1024 * 1024; // * 2 MB
      if (payload.file.size > MAX_SIZE) {
        dispatch({
          type: ACTIONS.UPLOAD_ERROR,
          payload: { errMsg: 'Ukuran foto terlalu besar.' }
        });
      }
    },
    uploadFileDispatcher: (file, path) => {
      const reference = ref(Storage, path);
      const upload = uploadBytesResumable(reference, file);
      upload.on(
        'state_changed',
        () => {
          // ? START CALLBACK
          dispatch({ type: ACTIONS.START_UPLOAD });
        },
        (error) => {
          // ? ERROR CALLBACK
          dispatch({
            type: ACTIONS.UPLOAD_ERROR,
            payload: { errMsg: error.message }
          });
        },
        async () => {
          // ? SUCCESS CALLBACK
          try {
            const url = await getDownloadURL(upload.snapshot.ref);
            dispatch({ type: ACTIONS.UPLOAD_SUCCESS, payload: { url } });
          } catch (error) {
            dispatch({
              type: ACTIONS.UPLOAD_ERROR,
              payload: { errMsg: error.message }
            });
          }
        }
      );
    }
  };
}

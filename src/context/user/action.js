import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore';
import { DateTime } from 'luxon';
import app from '../../service/app';
import { functions } from '../../constants';

const Auth = getAuth(app);
const Firestore = getFirestore(app);

const singleUserRef = (uid) => doc(Firestore, 'users', uid);

export const ACTIONS = {
  SET_USER: 'SET_USER',
  LOAD_AUTH_PROCESS: 'LOAD_AUTH_PROCESS',
  IS_ERROR: 'IS_ERROR',
  LOGOUT: 'LOGOUT',
  STATE_CHANGED: 'STATE_CHANGED'
};

export default function userActionCreator(dispatch) {
  return {
    loginDispatcher: async (credentials, cb) => {
      dispatch({ type: ACTIONS.LOAD_AUTH_PROCESS, payload: true });
      const { email, password } = credentials;
      try {
        const response = await signInWithEmailAndPassword(
          Auth,
          email,
          password
        );
        const userSnapshot = await getDoc(singleUserRef(response.user.uid));
        const userData = userSnapshot.data();
        dispatch({ type: ACTIONS.LOAD_AUTH_PROCESS, payload: false });
        cb(userData?.firstLogin);
      } catch (e) {
        dispatch({
          type: ACTIONS.IS_ERROR,
          payload: { title: 'Gagal Masuk!', msg: e?.message }
        });
        functions.logError('login', e);
      }
    },
    registerDispatcher: async (credentials, popUpCb) => {
      dispatch({ type: ACTIONS.LOAD_AUTH_PROCESS, payload: true });
      const { email, password } = credentials;
      try {
        const response = await createUserWithEmailAndPassword(
          Auth,
          email,
          password
        );
        await setDoc(singleUserRef(response.user.uid), {
          uid: response.user.uid,
          email,
          firstName: '',
          lastName: '',
          username: '',
          bio: '',
          about: '',
          firstLogin: true,
          profilePhotoURL: '',
          createdAt: DateTime.utc().toISO(),
          updatedAt: ''
        });
        await signOut(Auth);
        dispatch({ type: ACTIONS.LOAD_AUTH_PROCESS, payload: false });
        popUpCb({
          title: 'Registrasi berhasil!',
          status: 'success'
        });
      } catch (e) {
        dispatch({
          type: ACTIONS.IS_ERROR,
          payload: { title: 'Gagal Melakukan Registrasi!', msg: e?.message }
        });
        popUpCb({
          title: 'Registrasi gagal! Coba lagi!',
          status: 'error'
        });
        functions.logError('register', e);
      }
    },
    logoutDispatcher: async () => {
      dispatch({ type: ACTIONS.LOAD_AUTH_PROCESS, payload: true });
      try {
        await signOut(Auth);
        dispatch({ type: ACTIONS.LOAD_AUTH_PROCESS, payload: false });
      } catch (e) {
        dispatch({
          type: ACTIONS.IS_ERROR,
          payload: { title: 'Terjadi Kesalahan!', msg: e?.message }
        });
        functions.logError('logout', e);
      }
    },
    stateChangedDispatcher: async (authState) => {
      try {
        if (authState !== null) {
          const userSnapshot = await getDoc(singleUserRef(authState.uid));
          const userData = userSnapshot.data();
          dispatch({
            type: ACTIONS.STATE_CHANGED,
            payload: { authState, userData }
          });
          return;
        }
        dispatch({
          type: ACTIONS.STATE_CHANGED,
          payload: { authState }
        });
      } catch (e) {
        functions.logError('state changed', e);
      }
    }
  };
}

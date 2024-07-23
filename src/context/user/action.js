import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import {
  getFirestore,
  getDoc,
  doc,
  setDoc,
  updateDoc
} from 'firebase/firestore';
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
        cb(userData?.firstLogin, {
          title: 'Berhasil Masuk!',
          status: 'success'
        });
      } catch (e) {
        cb(false, {
          title: 'Gagal Masuk',
          description: e?.message,
          status: 'error'
        });
        functions.logError('login', e);
      } finally {
        dispatch({ type: ACTIONS.LOAD_AUTH_PROCESS, payload: false });
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
        await sendEmailVerification(response.user);
        await signOut(Auth);
        popUpCb({
          title: 'Registrasi berhasil!',
          description: 'Periksa email anda dan segera verifikasi',
          status: 'success'
        });
      } catch (e) {
        popUpCb({
          title: 'Registrasi gagal! Coba lagi!',
          description: e?.message,
          status: 'error'
        });
        functions.logError('register', e);
      } finally {
        dispatch({ type: ACTIONS.LOAD_AUTH_PROCESS, payload: false });
      }
    },
    logoutDispatcher: async (popUpCb) => {
      dispatch({ type: ACTIONS.LOAD_AUTH_PROCESS, payload: true });
      try {
        await signOut(Auth);
        popUpCb({
          title: 'Berhasil keluar!',
          status: 'success'
        });
      } catch (e) {
        popUpCb({
          title: 'Aksi gagal. Coba lagi.',
          description: e?.message,
          status: 'error'
        });
        functions.logError('logout', e);
      } finally {
        dispatch({ type: ACTIONS.LOAD_AUTH_PROCESS, payload: false });
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
    },
    updateUserDataDispatcher: async (uid, payload, cb) => {
      dispatch({ type: ACTIONS.LOAD_AUTH_PROCESS, payload: true });
      try {
        await updateDoc(singleUserRef(uid), payload);
        dispatch({ type: ACTIONS.SET_USER, payload });
        cb(true);
      } catch (e) {
        cb(false);
        functions.logError('update user data', e);
      } finally {
        dispatch({ type: ACTIONS.LOAD_AUTH_PROCESS, payload: false });
      }
    }
  };
}

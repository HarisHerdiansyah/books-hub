import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  setPersistence,
  browserSessionPersistence
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
import { userDataObjectDefault } from './reducer';

const Auth = getAuth(app);
const Firestore = getFirestore(app);

const singleUserRef = (uid) => doc(Firestore, 'users', uid);

export const ACTIONS = {
  SET_USER: 'SET_USER',
  LOAD_AUTH_PROCESS: 'LOAD_AUTH_PROCESS',
  IS_ERROR: 'IS_ERROR',
  LOGOUT: 'LOGOUT',
  STATE_CHANGED: 'STATE_CHANGED',
  SET_OWNER: 'SET_OWNER'
};

export default function userActionCreator(dispatch) {
  return {
    loginDispatcher: async (credentials, cb) => {
      dispatch({ type: ACTIONS.LOAD_AUTH_PROCESS, payload: true });
      const { email, password } = credentials;
      try {
        await setPersistence(Auth, browserSessionPersistence);
        const response = await signInWithEmailAndPassword(
          Auth,
          email,
          password
        );
        const userSnapshot = await getDoc(singleUserRef(response.user.uid));
        const userData = userSnapshot.data();

        if (userData?.firstLogin) {
          dispatch({ type: ACTIONS.SET_USER, payload: userData });
        } else {
          window.sessionStorage.setItem('userData', JSON.stringify(userData));
        }

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
          ...userDataObjectDefault,
          createdAt: DateTime.utc().toISO()
        });
        await signOut(Auth);
        popUpCb({
          title: 'Registrasi berhasil!',
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
        window.sessionStorage.removeItem('userData');
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
    stateChangedDispatcher: (authState) => {
      dispatch({
        type: ACTIONS.STATE_CHANGED,
        payload: { authState }
      });
    },
    updateUserDataDispatcher: async (payload, popUpCb) => {
      dispatch({ type: ACTIONS.LOAD_AUTH_PROCESS, payload: true });
      try {
        await updateDoc(singleUserRef(Auth.currentUser.uid), payload);

        const currentUserData = JSON.parse(
          window.sessionStorage.getItem('userData')
        );
        window.sessionStorage.setItem(
          'userData',
          JSON.stringify({ ...currentUserData, ...payload })
        );
        popUpCb({
          title: 'Berhasil memperbarui data!',
          status: 'success'
        }, true);
      } catch (e) {
        popUpCb({
          title: 'Gagal memperbarui data!',
          status: 'error'
        });
        functions.logError('update user data', e);
      } finally {
        dispatch({ type: ACTIONS.LOAD_AUTH_PROCESS, payload: false });
      }
    },
    updateEmailDispatcher: async (newEmail, popUpCb) => {
      dispatch({ type: ACTIONS.LOAD_AUTH_PROCESS, payload: true });
      try {
        await updateEmail(Auth.currentUser, newEmail);
        popUpCb({
          title: 'Berhasil',
          description: 'Email telah berhasil diperbarui',
          status: 'success'
        });
      } catch (e) {
        popUpCb({
          title: 'Gagal',
          description: 'Terjadi kesalahan. Coba lagi.',
          status: 'error'
        });
        functions.logError('update email', e);
      } finally {
        dispatch({ type: ACTIONS.LOAD_AUTH_PROCESS, payload: false });
      }
    },
    updatePasswordDispatcher: async (cred, popUpCb) => {
      dispatch({ type: ACTIONS.LOAD_AUTH_PROCESS, payload: true });
      try {
        const credentials = EmailAuthProvider.credential(
          Auth.currentUser.email,
          cred.password
        );
        await reauthenticateWithCredential(Auth.currentUser, credentials);
        await updatePassword(Auth.currentUser, cred.newPassword);
        popUpCb({
          title: 'Berhasil',
          description: 'Password telah berhasil diperbarui',
          status: 'success'
        });
      } catch (e) {
        popUpCb({
          title: 'Gagal',
          description: 'Terjadi kesalahan. Coba lagi.',
          status: 'error'
        });
        functions.logError('update password', e);
      } finally {
        dispatch({ type: ACTIONS.LOAD_AUTH_PROCESS, payload: false });
      }
    },
    resetPasswordDispatcher: async (email, popUpCb) => {
      dispatch({ type: ACTIONS.LOAD_AUTH_PROCESS, payload: true });
      try {
        await sendPasswordResetEmail(Auth, email);
        popUpCb({
          title: 'Email dikirim!',
          description: 'Periksa email kamu untuk mengatur ulang password.',
          status: 'success'
        });
      } catch (e) {
        popUpCb({
          title: 'Gagal',
          description: 'Terjadi kesalahan. Coba lagi.',
          status: 'error'
        });
        functions.logError('reset password', e);
      } finally {
        dispatch({ type: ACTIONS.LOAD_AUTH_PROCESS, payload: false });
      }
    },
    setOwnerDataDispatcher: async (uid) => {
      dispatch({ type: ACTIONS.LOAD_AUTH_PROCESS, payload: true });
      try {
        const snapshot = await getDoc(singleUserRef(uid));
        dispatch({ type: ACTIONS.SET_OWNER, payload: snapshot.data() });
      } catch (e) {
        functions.logError('set owner data', e);
      } finally {
        dispatch({ type: ACTIONS.LOAD_AUTH_PROCESS, payload: false });
      }
    }
  };
}

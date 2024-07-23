import {
  getFirestore,
  query,
  collection,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  writeBatch
} from 'firebase/firestore';
import app from '../../service/app';
import { functions } from '../../constants';

const Firestore = getFirestore(app);

const popUpUpdateDesc = {
  update: 'telah berhasil diperbarui.',
  favourite: 'ditambahkan ke daftar favorit.',
  markDone: 'telah selesai dibaca.',
  wishlist: 'dipindahkan ke daftar baca.'
};

export const ACTIONS = {
  LOAD_BOOKS: 'LOAD_BOOKS',
  SET_BOOKS: 'SET_BOOKS',
  ADD_BOOK: 'ADD_BOOK',
  UPDATE_BOOK: 'UPDATE_BOOK',
  DELETE_BOOK: 'DELETE_BOOK',
  SELECT_BOOK: 'SELECT_BOOK',
  RESET_SELECTED_BOOK: 'RESET_SELECTED_BOOK',
  LOAD_BOOKS_ERROR: 'LOAD_BOOKS_ERROR',
  WRITE_OR_DELETE_BOOK: 'WRITE_OR_DELETE_BOOK',
  STORE_SEARCH_RESULTS: 'STORE_SEARCH_RESULTS'
};

export default function bookActionCreator(dispatch) {
  return {
    getBooksDispatcher: async (uid) => {
      dispatch({ type: ACTIONS.LOAD_BOOKS });
      const dataQuery = query(
        collection(Firestore, 'books'),
        where('userId', '==', uid)
      );
      try {
        const result = [];
        const snapshots = await getDocs(dataQuery);
        snapshots.forEach((snapDoc) => result.push(snapDoc.data()));
        dispatch({ type: ACTIONS.SET_BOOKS, payload: result });
      } catch (e) {
        dispatch({
          type: ACTIONS.LOAD_BOOKS_ERROR,
          payload: { title: 'Gagal memuat buku', msg: e?.message }
        });
        functions.logError('get books', e);
      }
    },
    addBookDispatcher: async (payload, popUpCb) => {
      dispatch({ type: ACTIONS.WRITE_OR_DELETE_BOOK, payload: true });
      try {
        await setDoc(doc(Firestore, 'books', payload.id), payload);
        popUpCb({
          title: 'Berhasil menambahkan buku!',
          description: `${payload.title} telah ditambahkan!`,
          status: 'success'
        });
      } catch (e) {
        popUpCb({
          title: 'Gagal menambahkan buku!',
          description: 'Terjadi kesalahan. Coba lagi!',
          status: 'error'
        });
        functions.logError('add book', e);
      } finally {
        dispatch({ type: ACTIONS.WRITE_OR_DELETE_BOOK, payload: false });
      }
    },
    updateBookDispatcher: async (payload, action, popUpCb) => {
      dispatch({ type: ACTIONS.WRITE_OR_DELETE_BOOK, payload: true });
      try {
        await updateDoc(doc(Firestore, 'books', payload.id), payload);
        popUpCb({
          title: 'Berhasil memperbarui buku!',
          description: `${payload.title} ${popUpUpdateDesc[action]}!`,
          status: 'success'
        });
      } catch (e) {
        popUpCb({
          title: 'Gagal memperbarui buku!',
          description: `${payload.title} gagal diperbarui. Coba lagi!`,
          status: 'error'
        });
        functions.logError('update book', e);
      } finally {
        dispatch({ type: ACTIONS.WRITE_OR_DELETE_BOOK, payload: false });
      }
    },
    deleteBookDispatcher: async (payload, popUpCb) => {
      dispatch({ type: ACTIONS.WRITE_OR_DELETE_BOOK, payload: true });
      try {
        await deleteDoc(doc(Firestore, 'books', payload.id));
        popUpCb({
          title: 'Buku dihapus!',
          description: `${payload.title} telah dihapus.`,
          status: 'info'
        });
      } catch (e) {
        popUpCb({
          title: 'Gagal menghapus buku!',
          description: `${payload.title} gagal dihapus. Coba lagi!`,
          status: 'error'
        });
        functions.logError('delete book', e);
      } finally {
        dispatch({ type: ACTIONS.WRITE_OR_DELETE_BOOK, payload: false });
      }
    },
    selectBookDispatcher: (id) => {
      dispatch({ type: ACTIONS.SELECT_BOOK, payload: id });
    },
    resetSelectedBookDispatcher: () => {
      dispatch({ type: ACTIONS.RESET_SELECTED_BOOK });
    },
    updatePinnedBookDispatcher: async (payload, popUpCb) => {
      dispatch({ type: ACTIONS.WRITE_OR_DELETE_BOOK, payload: true });
      try {
        const batch = writeBatch(Firestore);
        payload.forEach((book) => {
          batch.update(doc(Firestore, 'books', book.id), {
            isPinned: book.isPinned
          });
        });
        await batch.commit();
        popUpCb(true, {
          title: 'Daftar diperbarui!',
          status: 'success'
        });
      } catch (e) {
        popUpCb(false, {
          title: 'Daftar gagal diperbarui. Coba lagi!',
          status: 'error'
        });
        functions.logError('update pin', e);
      } finally {
        dispatch({ type: ACTIONS.WRITE_OR_DELETE_BOOK, payload: false });
      }
    },
    searchBookDispatcher: async (searchInput, uid) => {
      dispatch({ type: ACTIONS.LOAD_BOOKS });
      try {
        const dataQuery = query(
          collection(Firestore, 'books'),
          where('userId', '!=', uid),
          where('searchKeyword', 'array-contains-any', searchInput.split(' ')),
          where('isPublic', '==', true),
          where('isDone', '==', true)
        );
        const result = [];
        const snapshots = await getDocs(dataQuery);
        snapshots.forEach((snapDoc) => result.push(snapDoc.data()));
        dispatch({ type: ACTIONS.STORE_SEARCH_RESULTS, payload: result });
      } catch (e) {
        dispatch({
          type: ACTIONS.LOAD_BOOKS_ERROR,
          payload: { title: 'Gagal memuat buku', msg: e?.message }
        });
        functions.logError('search book', e);
      }
    }
  };
}

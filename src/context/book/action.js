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
  writeBatch,
  onSnapshot,
  getCountFromServer,
  limit,
  startAfter,
  endAt
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import app from '../../service/app';
import { functions } from '../../constants';

const Auth = getAuth(app);
const Firestore = getFirestore(app);

const popUpUpdateDesc = {
  update: 'telah berhasil diperbarui',
  markDone: 'telah selesai dibaca',
  wishlist: 'dipindahkan ke daftar baca'
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

function userDataBookQuery(...args) {
  const [uid, isShowcase] = args;

  const queryBaseOnIsShowcase = isShowcase
    ? where('isPublic', '==', true)
    : where('isPublic', 'in', [true, false]);

  const q = query(
    collection(Firestore, 'books'),
    where('userId', '==', uid),
    queryBaseOnIsShowcase
  );

  return q;
}

function searchDataBookQuery(...args) {
  const [searchInput] = args;
  const q = query(
    collection(Firestore, 'books'),
    where('userId', '!=', Auth.currentUser.uid),
    where(
      'searchKeywords',
      'array-contains-any',
      searchInput.toLowerCase().split(' ')
    ),
    where('isPublic', '==', true),
    where('isDone', '==', true),
    where('isWishlist', '==', false)
  );
  return q;
}

export default function bookActionCreator(dispatch) {
  return {
    setBooksDispatcher: (uid, isShowcase) => {
      dispatch({ type: ACTIONS.LOAD_BOOKS });
      let dataQuery = userDataBookQuery(uid, isShowcase);
      return onSnapshot(query(dataQuery, limit(6)), async (querySnapshot) => {
        const total = (await getCountFromServer(dataQuery)).data().count;
        const result = [];
        querySnapshot.forEach((snapshot) => result.push(snapshot.data()));
        dispatch({
          type: ACTIONS.SET_BOOKS,
          payload: {
            data: result,
            total,
            firstDoc: querySnapshot.docs[0],
            lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1]
          }
        });
      });
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
        let description;
        let status;

        if (action === 'favourite') {
          if (payload.isFavourite) {
            description = `${payload.title} telah ditambahkan ke daftar favorit!`;
            status = 'success';
          } else {
            description = `${payload.title} dihapus dari daftar favorit!`;
            status = 'info';
          }
        } else {
          description = `${payload.title} ${popUpUpdateDesc[action]}!`;
          status = 'success';
        }

        await updateDoc(doc(Firestore, 'books', payload.id), payload);
        popUpCb({
          title: 'Berhasil memperbarui buku!',
          description,
          status
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
    searchBookDispatcher: async (searchInput) => {
      dispatch({ type: ACTIONS.LOAD_BOOKS });
      try {
        let dataQuery = searchDataBookQuery(searchInput);
        const result = [];
        const snapshots = await getDocs(query(dataQuery, limit(10)));
        const total = await getCountFromServer(dataQuery);
        snapshots.forEach((snapDoc) => result.push(snapDoc.data()));
        dispatch({
          type: ACTIONS.SET_BOOKS,
          payload: {
            data: result,
            total,
            firstDoc: snapshots.docs[0],
            lastDoc: snapshots.docs[snapshots.docs.length - 1]
          }
        });
      } catch (e) {
        dispatch({
          type: ACTIONS.LOAD_BOOKS_ERROR,
          payload: { title: 'Gagal memuat buku', msg: e?.message }
        });
        functions.logError('search book', e);
      }
    },
    handlePaginateDataDispatcher: async (params) => {
      dispatch({ type: ACTIONS.LOAD_BOOKS });
      try {
        const { mode, uid, isShowcase, searchInput, direction, cursor } =
          params;

        const queryCursor =
          direction === 'next' ? startAfter(cursor) : endAt(cursor);
        let dataQuery =
          mode === 'regular'
            ? query(userDataBookQuery(uid, isShowcase), limit(6), queryCursor)
            : query(searchDataBookQuery(searchInput), limit(10), queryCursor);
        const result = [];
        const snapshots = await getDocs(dataQuery);
        snapshots.forEach((snapDoc) => result.push(snapDoc));
        dispatch({
          type: ACTIONS.SET_BOOKS,
          payload: {
            data: result,
            firstDoc: snapshots.docs[0],
            lastDoc: snapshots.docs[snapshots.docs.length - 1]
          }
        });
      } catch (e) {
        dispatch({
          type: ACTIONS.LOAD_BOOKS_ERROR,
          payload: { title: 'Gagal memuat buku', msg: e?.message }
        });
        functions.logError('paginate book', e);
      }
    }
  };
}

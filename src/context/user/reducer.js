import { ACTIONS } from './action';

export const userDataObjectDefault = {
  firstName: '',
  lastName: '',
  username: '',
  bio: '',
  about: '',
  firstLogin: true,
  profilePhotoURL: '',
  createdAt: '',
  updatedAt: ''
};

export const userState = {
  authState: null,
  userData: userDataObjectDefault,
  loadUser: true,
  ownerData: userDataObjectDefault
};

export default function userReducer(state, payload) {
  return {
    [ACTIONS.LOAD_AUTH_PROCESS]: () => ({
      ...state,
      isLoading: payload
    }),
    [ACTIONS.STATE_CHANGED]: () => ({
      ...state,
      user: {
        ...state.user,
        loadUser: false,
        authState: payload.authState,
        userData: payload.userData
      }
    }),
    [ACTIONS.SET_USER]: () => ({
      ...state,
      user: {
        ...state.user,
        userData: payload
      }
    }),
    [ACTIONS.SET_OWNER]: () => ({
      ...state,
      user: {
        ...state.user,
        ownerData: payload
      }
    })
  };
}

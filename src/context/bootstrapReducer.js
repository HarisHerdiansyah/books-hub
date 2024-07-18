import userReducer from './user/reducer';
import bookReducer from './book/reducer';

export default function bootstrapReducer(state, action) {
  const { type, payload } = action;
  const rootReducer = {
    ...userReducer(state, payload),
    ...bookReducer(state, payload)
  };
  return rootReducer[type]();
}

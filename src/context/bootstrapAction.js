import userActionCreator from './user/action';
import bookActionCreator from './book/action';

export default function bootstrapAction(dispatch) {
  return {
    ...userActionCreator(dispatch),
    ...bookActionCreator(dispatch)
  };
}

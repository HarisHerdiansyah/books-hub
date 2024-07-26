import userActionCreator from './user/action';
import bookActionCreator from './book/action';
import uploadActionCreator from './upload/action';

export default function bootstrapAction(dispatch) {
  return {
    ...userActionCreator(dispatch),
    ...bookActionCreator(dispatch),
    ...uploadActionCreator(dispatch)
  };
}

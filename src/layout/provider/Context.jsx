import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import app from '../../service/app';
import { Context } from '../../constants';
import { initialState, reducer, actionCreators } from '../../context';
import { GlobalComponent } from '../../components';

export default function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isLoading } = state;
  const action = actionCreators(dispatch);

  useEffect(() => {
    // TODO : Write logic for handle timeout
    const authListener = onAuthStateChanged(getAuth(app), (_user) => {
      action.stateChangedDispatcher(_user);
    });

    return () => authListener();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Context.Provider value={{ state, action }}>
      {!user.loadUser && children}
      {isLoading && <GlobalComponent.LoadingOverlay />}
    </Context.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.any.isRequired
};

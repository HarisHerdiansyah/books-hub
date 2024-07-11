/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { onAuthStateChanged } from 'firebase/auth';
import { Auth } from '../../service';
import { Context } from '../../constants';
import { initialState, reducer, actionCreators } from '../../context';

export default function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const action = actionCreators(dispatch);
  const value = { state, action };

  useEffect(() => {
    // TODO : Write logic for handle timeout
    const authListener = onAuthStateChanged(Auth.auth, (_user) => {
      action.setUserDispatcher(_user);
    });

    return () => authListener();
  }, []);

  return (
    <Context.Provider value={value}>
      {!state.isLoadUser && children}
    </Context.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.any.isRequired
};

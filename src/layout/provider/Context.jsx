import { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { onAuthStateChanged } from 'firebase/auth';
import { Auth } from '../../service';
import { Context } from '../../constants';
import { initialState, reducer, actionCreators, ACTION } from '../../context';

export default function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [user, setUser] = useState(null);
  // const [load, setLoad] = useState(true);

  const action = actionCreators(dispatch);
  const value = { state, action };

  useEffect(() => {
    // TODO : Write logic for handle timeout
    const authListener = onAuthStateChanged(Auth.auth, (_user) => {
      if (_user) {
        // setLoad(false);
        // setUser(_user);
        dispatch({ type: ACTION.LOAD_USER_DONE, payload: _user });
      } else {
        // setLoad(false);
        // setUser(_user);
        dispatch({ type: ACTION.LOAD_USER_DONE, payload: null });
      }
    });

    return () => authListener();
  }, []);

  return (
    <Context.Provider value={value}>
      {!state.auth.isLoadUser && children}
    </Context.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.any.isRequired
};

import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { onAuthStateChanged } from 'firebase/auth';
import { AppAuth } from '../service/auth';

export const Apps = createContext();

export default function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadFetch, setLoadFetch] = useState(true);

  useEffect(() => {
    const authListener = onAuthStateChanged(AppAuth, (_user) => {
      console.log('invoked', _user);
      if (_user) {
        setLoadFetch(false);
        setUser(_user);
      } else {
        setLoadFetch(false);
        setUser(null);
      }
    });

    return () => authListener();
  }, []);

  const value = { user };

  return <Apps.Provider value={value}>{!loadFetch && children}</Apps.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.any.isRequired
};

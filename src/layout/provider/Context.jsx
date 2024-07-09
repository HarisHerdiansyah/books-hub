import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { onAuthStateChanged } from 'firebase/auth';
import { Auth } from '../../service';
import { Context } from '../../constants';

export default function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(true);

  useEffect(() => {
    // TODO : Write logic for handle timeout
    const authListener = onAuthStateChanged(Auth.auth, (_user) => {
      if (_user) {
        setLoadUser(false);
        setUser(_user);
      } else {
        setLoadUser(false);
        setUser(null);
      }
    });

    return () => authListener();
  }, []);

  const value = { user };

  return (
    <Context.Provider value={value}>{!loadUser && children}</Context.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.any.isRequired
};

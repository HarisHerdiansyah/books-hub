import { createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { onAuthStateChanged } from 'firebase/auth';
import { AppAuth } from '../service/auth';

export const Apps = createContext();

export default function AppProvider({ children }) {
  // const [user, setUser] = useState(null);

  useEffect(() => {
    const authListener = onAuthStateChanged(AppAuth, (_user) => {
      console.log('invoked', _user);
      if (_user) {
        // setUser(_user);
      } else {
        // setUser(null);
      }
    });

    return () => authListener();
  }, []);

  // const value = { user };

  return <Apps.Provider>{children}</Apps.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.any.isRequired
};

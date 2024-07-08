export const mockAuth = {
  login: (credentials) => {
    const { username, password } = credentials;
    return new Promise((resolve, reject) => {
      if (username === 'Admin#1234' && password === 'Admin#1234') {
        window.localStorage.setItem('auth', JSON.stringify(credentials));
        resolve('/profile/overview');
      } else {
        reject();
      }
    });
  },
  logout: () => {
    window.localStorage.removeItem('auth');
    window.location.reload();
  }
};

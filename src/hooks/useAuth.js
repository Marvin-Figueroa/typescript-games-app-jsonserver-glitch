import { useEffect, useState } from 'react';
import loginService from '../services/login';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (user) {
      setUser(user);
    }
  }, []);

  async function logIn(credentials) {
    try {
      const user = await loginService.login(credentials);
      if (user) {
        setUser(user);
        window.localStorage.setItem('user', JSON.stringify(user));
        return user;
      }
    } catch (error) {
      console.log('An error ocurred while trying to log in!', error);
    }
  }

  function logOut() {
    window.localStorage.removeItem('user');
    setUser(null);
  }

  return { user, logIn, logOut };
};

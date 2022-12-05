import { useEffect, useState } from 'react';
import { IUser } from '../models/user';
import { IUserCredentials } from '../models/userCredentials';
import loginService from '../services/login';

export const useAuth = () => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const userValue = window.localStorage.getItem('user');
    const user = userValue ? JSON.parse(userValue) : null;
    if (user) {
      console.log('User was found in localStorage: ', user);
      setUser(user);
    }
  }, []);

  async function logIn(credentials: IUserCredentials) {
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

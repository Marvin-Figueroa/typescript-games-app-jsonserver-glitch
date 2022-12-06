import { useEffect, useState } from 'react';

import { IUser } from '../models/user';
import { IUserCredentials } from '../models/userCredentials';

import loginService from '../services/login';

import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const { storedValue, setValue, removeItem } = useLocalStorage<IUser | null>(
    'user',
    user
  );

  useEffect(() => {
    const user = storedValue;
    if (user) {
      setUser(user);
    }
  }, []);

  async function logIn(credentials: IUserCredentials) {
    try {
      const user = await loginService.login(credentials);
      if (user) {
        setUser(user);
        setValue(user);
        return user;
      }
    } catch (error) {
      // console.log('An error ocurred while trying to log in!', error);
    }
  }

  function logOut() {
    removeItem('user');
    setUser(null);
  }

  return { user, logIn, logOut };
};

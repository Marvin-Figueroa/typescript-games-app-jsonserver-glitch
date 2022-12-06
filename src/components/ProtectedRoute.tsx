import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { IUser } from '../models/user';

type Props = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: Props) => {
  const location = useLocation();
  const { storedValue: user } = useLocalStorage<IUser | null>('user', null);

  if (!user) {
    return <Navigate to="/login" state={{ location }} />;
  }

  return children ? children : <Outlet />;
};

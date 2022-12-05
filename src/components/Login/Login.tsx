import React, { FC, ChangeEvent, useState, FormEvent } from 'react';
import { useAuth } from '../../hooks/useAuth';

import './Login.scss';
import { IUserCredentials } from '../../models/userCredentials';

import { useLocation, useNavigate } from 'react-router-dom';

const Login: FC = () => {
  console.log('Login was rendered!!!');
  const { user, logIn } = useAuth();

  const [userData, setUserData] = useState<IUserCredentials>({
    username: '',
    password: '',
  });
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [signInSuccess, setSignInSuccess] = useState<boolean>(true);

  const { state } = useLocation();
  const navigate = useNavigate();

  function handleLogin(e: FormEvent) {
    e.preventDefault();
    setIsSigningIn(true);
    logIn(userData)
      .then((currUser) => {
        if (currUser) {
          setSignInSuccess(true);
          navigate(state?.location?.pathname ?? '/');
        } else {
          setSignInSuccess(false);
        }
      })
      .catch((error) => console.log('Could not log in: ', error))
      .finally(() => setIsSigningIn(false));
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSignInSuccess(true);
    setUserData((prevUser) => {
      return { ...prevUser, [e.target.name]: e.target.value };
    });
  }

  return (
    <form onSubmit={handleLogin} className="form">
      <h1 className="form__title">Sign In</h1>
      {!isSigningIn && !signInSuccess && (
        <p className="form-login-error">Wrong username or password</p>
      )}
      <div className="form-control">
        <label className="form__label" htmlFor="username">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="form__input"
          placeholder="Enter your username"
          onChange={handleChange}
          value={userData.username}
          maxLength={50}
          required
        />
      </div>
      <div className="form-control">
        <label className="form__label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="form__input"
          placeholder="Enter your password"
          onChange={handleChange}
          value={userData.password}
          maxLength={50}
          required
        />
      </div>
      <div className="form-control">
        {isSigningIn ? (
          <button className="form__submit" disabled>
            Signing In...
          </button>
        ) : (
          <button className="form__submit">Sign In</button>
        )}
      </div>
    </form>
  );
};

export default React.memo(Login);

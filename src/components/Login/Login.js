import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

import './Login.scss';

const Login = ({ onLogin }) => {
  console.log('Login was rendered!!!');
  const { logIn } = useAuth();

  const [userData, setUserData] = useState({ username: '', password: '' });
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [signInSuccess, setSignInSuccess] = useState(true);

  function handleLogin(e) {
    e.preventDefault();
    setIsSigningIn(true);
    logIn(userData)
      .then((currUser) => {
        if (currUser) {
          onLogin(currUser);
          setSignInSuccess(true);
        } else {
          setSignInSuccess(false);
        }
      })
      .catch((error) => console.log('Could not log in: ', error))
      .finally(() => setIsSigningIn(false));
    // const errors = validateFormFields(user);

    // if (Object.keys(errors).length > 0) {
    //   setFormErrors(errors);
    //   return;
    // }

    // setHasSubmitted(true);
    // onLogin(user);
  }

  function handleChange(e) {
    setSignInSuccess(true);
    setUserData((prevUser) => {
      return { ...prevUser, [e.target.name]: e.target.value };
    });
  }

  // function validateFormFields(user) {
  //   const errors = {};

  //   if (user.username.trim() === '') {
  //     errors.username = 'Username is required';
  //   } else if (
  //     user.username.trim().length < 4 ||
  //     user.username.trim().length > 20
  //   ) {
  //     errors.username = 'Username must be between 4 and 20 characters';
  //   } else if (user.username.trim().includes(' ')) {
  //     errors.username = 'Username cannot contain blank spaces';
  //   }

  //   if (user.password.trim() === '') {
  //     errors.password = 'Password is required';
  //   } else if (user.password.trim().includes(' ')) {
  //     errors.password = 'Password cannot contain blank spaces';
  //   } else if (
  //     user.password.trim().length < 4 ||
  //     user.password.trim().length > 20
  //   ) {
  //     errors.password = 'Password must be between 4 and 20 characters';
  //   }

  //   return errors;
  // }

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
        {/* <p className='form__input-error'>{formErrors.username}</p> */}
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
        {/* <p className='form__input-error'>{formErrors.password}</p> */}
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

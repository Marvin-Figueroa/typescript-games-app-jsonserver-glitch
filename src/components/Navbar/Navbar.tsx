import React, { FC } from 'react';
import './Navbar.scss';
import { SiNintendogamecube } from 'react-icons/si';
import { useAuth } from '../../hooks/useAuth';
import { NavLink } from 'react-router-dom';

const Navbar: FC = () => {
  console.log('Navbar was rendered!!!');
  const { user, logOut } = useAuth();

  return (
    <nav className="main-nav">
      <NavLink to={'/'} className={'main-nav__logo'}>
        <SiNintendogamecube /> <span>LOGO</span>
      </NavLink>
      <ul className="main-nav__list">
        <li className="main-nav__item">
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              isActive ? 'main-nav__link active' : 'main-nav__link'
            }
          >
            Games
          </NavLink>
        </li>
        <li className="main-nav__item">
          <NavLink
            to={'/about'}
            className={({ isActive }) =>
              isActive ? 'main-nav__link active' : 'main-nav__link'
            }
          >
            About
          </NavLink>
        </li>
        <li className="main-nav__item">
          {user ? (
            <>
              <span className="main-nav__user">({user.username})</span>
              <button
                className="main-nav__link"
                onClick={() => {
                  logOut();
                }}
              >
                Log Out
              </button>
            </>
          ) : (
            <NavLink
              to={'/login'}
              className={({ isActive }) =>
                isActive ? 'main-nav__link active' : 'main-nav__link'
              }
            >
              Log In
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

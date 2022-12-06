import React, { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { SiNintendogamecube } from 'react-icons/si';
import './Navbar.scss';

import { IUser } from '../../models/user';

interface IProps {
  user: IUser | null;
  onLogOut: () => void;
}

const Navbar: FC<IProps> = ({ user, onLogOut }) => {
  const navigate = useNavigate();

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
                  onLogOut();
                  navigate('/', { replace: true });
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

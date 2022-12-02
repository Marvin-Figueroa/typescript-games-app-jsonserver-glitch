// import React, { useRef } from 'react';
import './Navbar.scss';
import { SiNintendogamecube } from 'react-icons/si';
import { useAuth } from '../../hooks/useAuth';

const Navbar = ({ user, onLogOut, currentPage, onLinkClick }) => {
  console.log('Navbar was rendered!!!');
  const { logOut } = useAuth();

  return (
    <nav className="main-nav">
      <div onClick={() => onLinkClick('games')} className="main-nav__logo">
        <SiNintendogamecube /> <span>LOGO</span>
      </div>
      <ul className="main-nav__list">
        <li className="main-nav__item">
          <button
            onClick={() => onLinkClick('games')}
            className={
              currentPage === 'games'
                ? 'main-nav__link current'
                : 'main-nav__link'
            }
          >
            Games
          </button>
        </li>
        <li className="main-nav__item">
          <button
            onClick={() => onLinkClick('about')}
            className={
              currentPage === 'about'
                ? 'main-nav__link current'
                : 'main-nav__link'
            }
          >
            About
          </button>
        </li>
        <li className="main-nav__item">
          {user ? (
            <>
              <span className="main-nav__user">({user.username})</span>
              <button
                className="main-nav__link"
                onClick={() => {
                  onLogOut();
                  logOut();
                }}
              >
                Log Out
              </button>
            </>
          ) : (
            <button
              className={
                currentPage === 'login'
                  ? 'main-nav__link current'
                  : 'main-nav__link'
              }
              onClick={() => onLinkClick('login')}
            >
              Log In
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

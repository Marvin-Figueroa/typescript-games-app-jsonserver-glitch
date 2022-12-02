import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className='footer'>
      <small className='footer__copyright'>
        Created by
        <span className='footer__author'> Marvin Figueroa</span> &copy; 2022
      </small>
    </footer>
  );
};

export default React.memo(Footer);

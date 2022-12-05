import React, { FC } from 'react';
import './Footer.scss';

const Footer: FC = () => {
  return (
    <footer className="footer">
      <small className="footer__copyright">
        Created by
        <span className="footer__author"> Marvin Figueroa</span> &copy; 2022
      </small>
    </footer>
  );
};

export default React.memo(Footer);

import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiPlus } from 'react-icons/fi';

import { ROUTE_DIARY, ROUTE_NEW_ENTRY } from '../../routes';

import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <Link to={{ pathname: ROUTE_DIARY }} className="nav__link">
            <FiHome />
          </Link>
        </li>
        <li className="nav__item">
          <Link to={{ pathname: ROUTE_NEW_ENTRY }} className="nav__link">
            <FiPlus />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

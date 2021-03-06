import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import { FiHome, FiLogOut, FiPlus } from 'react-icons/fi';

import { ROUTE_DIARY, ROUTE_LOGIN, ROUTE_NEW_ENTRY } from '../../routes';

import './Navigation.css';
import rootStoreContext from '../../root.store';
import { AUTH_STATUSES } from '../../modules/auth/auth.store';

const Navigation = () => {
  const { authStore } = useContext(rootStoreContext);

  const logout = async () => {
    try {
      await firebase.auth().signOut();
      authStore.setAuthStatus(AUTH_STATUSES.LOGGED_OUT);
      window.location.reload();
    } catch (e) {
      // TODO: Handle logout error
      console.error('Logout error');
    }
  };

  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <Link
            to={{ pathname: ROUTE_DIARY }}
            className="nav__link"
            aria-label="Дневник"
          >
            <FiHome />
          </Link>
        </li>
        <li className="nav__item">
          <Link
            to={{ pathname: ROUTE_NEW_ENTRY }}
            className="nav__link"
            aria-label="Новая запись"
          >
            <FiPlus />
          </Link>
        </li>
        <li className="nav__item nav__log-out">
          <Link
            to={{ pathname: ROUTE_LOGIN }}
            onClick={logout}
            className="nav__link"
            aria-label="Выйти из приложения"
          >
            <FiLogOut />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

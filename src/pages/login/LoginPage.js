import React, { useContext } from 'react';
import firebase from 'firebase/app';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import './LoginPage.css';

import rootStoreContext from '../../root.store';
import { ROUTE_HOME } from '../../routes';

const provider = new firebase.auth.GoogleAuthProvider();

const LoginPage = () => {
  const { authStore } = useContext(rootStoreContext);

  const signInWithGoogle = async () => {
    try {
      await firebase.auth().signInWithPopup(provider);

      authStore.setUser({
        isLoggedIn: true,
      });
    } catch (e) {
      // TODO: Handle authentication error
      // eslint-disable-next-line no-console
      console.error('Authentication error');
    }
  };

  if (authStore.user.isLoggedIn) {
    return <Redirect to={{ pathname: ROUTE_HOME }} />;
  }

  return (
    <div className="login-page">
      <h1 className="login-page__header --mb-2">Дневник питания</h1>
      <button
        type="button"
        className="primary-button"
        onClick={signInWithGoogle}
      >
        Войти через Google
      </button>
    </div>
  );
};

export default observer(LoginPage);

import React, { useContext } from 'react';
import firebase from 'firebase/app';
import { Redirect } from 'react-router-dom';

import './LoginPage.css';

import rootStoreContext from '../../root.store';

const provider = new firebase.auth.GoogleAuthProvider();

const LoginPage = () => {
  const { authStore } = useContext(rootStoreContext);

  const signInWithGoogle = async () => {
    // TODO: I probably want to use cookies instead of LS, add that later before deploying somewhere
    // TODO: Should I store only token, or more user data?
    try {
      const { user, credential } = await firebase
        .auth()
        .signInWithPopup(provider);

      authStore.setUser({
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        token: credential.accessToken,
      });
    } catch (e) {
      // TODO: Handle authentication error
      // eslint-disable-next-line no-console
      console.error('Authentication error');
    }
  };

  if (authStore.user.token) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return (
    <>
      <h1>Login Page</h1>
      <button type="button" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </>
  );
};

export default LoginPage;

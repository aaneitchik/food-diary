import { action, observable } from 'mobx';
import firebase from 'firebase/app';

export const AUTH_STATUSES = {
  LOGGED_IN: 'LOGGED_IN',
  LOGGED_OUT: 'LOGGED_OUT',
  PENDING: 'PENDING',
};

const authStore = observable({
  authStatus: firebase.auth().currentUser
    ? AUTH_STATUSES.LOGGED_IN
    : AUTH_STATUSES.PENDING,
});

authStore.setAuthStatus = action(status => {
  authStore.authStatus = status;
});

firebase.auth().onAuthStateChanged(user => {
  authStore.setAuthStatus(
    user ? AUTH_STATUSES.LOGGED_IN : AUTH_STATUSES.LOGGED_OUT
  );
});

export default authStore;

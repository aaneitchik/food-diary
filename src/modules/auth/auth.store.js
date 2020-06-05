import { action, observable, reaction } from 'mobx';

const persistedUser = localStorage.getItem('user');
const initialUserValue = persistedUser ? JSON.parse(persistedUser) : {};

const authStore = observable({
  user: initialUserValue,
});

authStore.setUser = action(user => {
  authStore.user = user;
});

reaction(
  () => authStore.user,
  user => {
    localStorage.setItem('user', JSON.stringify(user));
  }
);

export default authStore;

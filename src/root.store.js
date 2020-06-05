import React from 'react';
import authStore from './modules/auth/auth.store';

const rootStore = {
  authStore,
};

export default React.createContext(rootStore);

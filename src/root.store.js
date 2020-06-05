import React from 'react';

import authStore from './modules/auth/auth.store';
import diaryStore from './modules/diary/diary.store';

const rootStore = {
  authStore,
  diaryStore,
};

const rootStoreContext = React.createContext(rootStore);

export default rootStoreContext;

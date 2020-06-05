import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { IconContext } from 'react-icons';

import 'normalize.css';
import './index.css';

import './firebase';

import App from './App';
import * as serviceWorker from './serviceWorker';

configure({
  enforceActions: 'always',
});

ReactDOM.render(
  <React.StrictMode>
    <IconContext.Provider value={{ className: 'icon' }}>
      <App />
    </IconContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

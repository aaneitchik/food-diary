import firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp({
  // In Firebase, production key for a web app is always exposed, so no point in hiding it from the source code.
  // It is secured by setting up according restrictions, and for local development there is a separate API key
  apiKey:
    process.env.NODE_ENV === 'production'
      ? 'AIzaSyD3Fms1XOK-1E_GH24Fm68mdapRT1cHQx4'
      : process.env.REACT_APP_API_KEY,
  authDomain: 'food-diary-3bd57.firebaseapp.com',
  databaseURL: 'https://food-diary-3bd57.firebaseio.com',
  projectId: 'food-diary-3bd57',
  storageBucket: 'food-diary-3bd57.appspot.com',
  messagingSenderId: '806404219978',
  appId: '1:806404219978:web:e465ecae07b419fff4b2b3',
});

let dbLoadResolver;
const dbLoadPromise = new Promise(resolve => {
  dbLoadResolver = resolve;
});

// Do not wait for firestore to load to render the app, but start loading it cause we'll certainly need it
(async () => {
  await import('firebase/firestore');
  const db = firebase.firestore();
  dbLoadResolver(db);
})();

export const getDb = () => dbLoadPromise;

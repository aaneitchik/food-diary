import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyD3Fms1XOK-1E_GH24Fm68mdapRT1cHQx4',
  authDomain: 'food-diary-3bd57.firebaseapp.com',
  databaseURL: 'https://food-diary-3bd57.firebaseio.com',
  projectId: 'food-diary-3bd57',
  storageBucket: 'food-diary-3bd57.appspot.com',
  messagingSenderId: '806404219978',
  appId: '1:806404219978:web:e465ecae07b419fff4b2b3',
});

export const db = firebase.firestore();
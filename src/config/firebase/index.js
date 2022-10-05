import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
// import "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyDjYjDzEKxz46pVqirzv33fUJtWvufkYsI',
  authDomain: 'react-fire-93518.firebaseapp.com',
  projectId: 'react-fire-93518',
  storageBucket: 'react-fire-93518.appspot.com',
  messagingSenderId: '645547569058',
  appId: '1:645547569058:web:91ba24cec0f0f8ec890cfb',
  measurementId: 'G-C32WQ3ZY1G',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export default firebase;

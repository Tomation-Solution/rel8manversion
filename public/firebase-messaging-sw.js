import { initializeApp} from 'firebase/app';

// import {initializeApp} from 'https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js';
// importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js');
// import 'https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js';
// const firebase = lazy(()=> import('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js'))

export const firebaseConfig = {
  // Your Firebase project configuration
  apiKey: "AIzaSyD7IR2MxBAmP-Zige-SPfQufzthvlUGkTY",
  authDomain: "man-web-8b094.firebaseapp.com",
  projectId: "man-web-8b094",
  storageBucket: "man-web-8b094.appspot.com",
  messagingSenderId: "849357691658",
  appId: "1:849357691658:web:f19bf75617db71ac88f8f3",
  measurementId: "G-RKJ37EL2R6"

};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp

// export default firebase;
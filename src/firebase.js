import firebase from 'firebase'


// const firebaseConfig = {
//   apiKey: `${process.env.APIKEY}`,
//   authDomain: `${process.env.AUTH_DOMAIN}`,
//   databaseURL: `${process.env.DATABASE_URL}`,
//   projectId: `${process.env.PROJECTID}`,
//   storageBucket: `${process.env.STORAGE_BUCKET}`,
//   messagingSenderId: `${process.env.MESSAGE_SENDER_ID}`,
//   appId: `${process.env.APP_ID}`,
  
// }

const  firebaseConfig = {
    apiKey: "AIzaSyBUln-s6vg-qHwh3TJuw2sxlUt7QuLE5ho",
    authDomain: "fir-auth-ba28c.firebaseapp.com",
    databaseURL: "https://fir-auth-ba28c.firebaseio.com",
    projectId: "fir-auth-ba28c",
    storageBucket: "fir-auth-ba28c.appspot.com",
    messagingSenderId: "149654765970",
    appId: "1:149654765970:web:638c0ed701dc3277d9414b"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  
  export const auth = firebase.auth();
  export const db = firebase.firestore();
  

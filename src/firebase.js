
// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBZMBo9xtIMI4fhkLh25lu1Z5IIOERqT_8",
  authDomain: "chatapp-94dce.firebaseapp.com",
  databaseURL:"https://chatapp-94dce.firebaseio.com",
  projectId: "chatapp-94dce",
  storageBucket: "chatapp-94dce.appspot.com",
  messagingSenderId: "24057744022",
  appId: "1:24057744022:web:b054fd1abe1b4efbb050b7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
export {auth,storage};
export default db;